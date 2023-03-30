import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import data from "./product-content.json" assert {type: 'json'};
import cors from 'cors';
import morgan from 'morgan';

//define our app using express
const app = express();
const port = 8000;
const host = 'localhost';

//MAYBE WANT TO REMOVE MORGAN BEFORE SUBMITTING?
//"middleware" used to help with developing this monster
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//default route for our server
app.get('/', (req, res) => res.status(200).send({
    message: "Server is running"
}));


app.get('/api/product/:productId', (req, res) => {
    
    const toFind = req.params.productId;
    let productMatch = null;
    data.forEach(product => {
        if (product.productId === toFind){
            productMatch = product;
        };
    });
    if (productMatch == null){
        res.status(404);
        res.send(`Product with id: ${toFind} not found.`);
        res.end();
    } else {
        res.status(200);
        res.json(productMatch);
        res.end();
    }
    
});

app.delete('/api/product/:productId', (req, res) => {
    const toFind = req.params.productId;
    var productMatch = null;
    var index = 0
    data.forEach(product => {
        if (product.productId == toFind){
            productMatch = index;
        } else {
            index += 1;
        }
    });
    if (productMatch == null) {
        res.status(404);
        res.send(`Product with id: ${toFind} not found.`);
        res.end();
    } else {
        data.splice(productMatch, 1);
        WriteTextToFileAsync(JSON.stringify(data));
        res.status(200);
        res.end();
    }
})

app.put('/api/product/', async (req, res, next) => {
    var productIdIn = req.body.productId;
    fs.readFile('./src/product-content.json', function (err, data) {
        var json = JSON.parse(data);
        var clash = false;
        json.forEach(product => {
            if (product.productId == productIdIn){
                res.status(500);
                res.send('productID clash. Unable to put.');
                res.end();
                clash = true;
                return;
            }
        })
        if (!clash){
            json.push(req.body);
            WriteTextToFileAsync(JSON.stringify(json));
            if (err){
                res.status(500);
                res.send('unable to add product.');
                res.end();
            } else{
                res.status(200);
                res.end();
            }
        }
        
    })
    
})

app.post('/api/read', async (req, res, next) => {
    const resJson = JSON.stringify(data);
    res.json(resJson);
});

const WriteTextToFileAsync = async (toWrite) => {
    fs.writeFile('./src/product-content.json', toWrite, (err) => {
        if (err){
            console.log(err);
        } else {
            console.log('write done');
        }
    });
};

app.post('/api/update', async (req, res, next) => {
    const reqContent = JSON.stringify(req.body);
    await WriteTextToFileAsync(reqContent);
});


//404 route - used when page or api call is not defined
app.use((req, res, next) => res.status(404).send({
    message: "Could not find specified route"
}));

//run our server listen for requests made to port as defined above
app.listen(port, host, () => {
    console.log(`server is running and listening on port ${port}`)
});

