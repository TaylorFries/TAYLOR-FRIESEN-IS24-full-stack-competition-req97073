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
    //send basic response 
    message: "Server is running"
}));

app.get('/api/load', (req, res) => {
    const resJson = JSON.stringify(data);
    res.status(200);
    res.json(resJson);
    res.end();
})

//endpoint to manage get requests for specific product Ids
app.get('/api/product/:productId', (req, res) => {
    //get the product ID in question from parameters sent
    const toFind = req.params.productId;
    //using this as a switch if we find the ID we are looking for
    let productMatch = null;
    //go through each product in the json file 
    data.forEach(product => {
        //if we match the id we are looking for update productMatch
        if (product.productId === toFind){
            productMatch = product;
        };
    });
    //if we didnt find the id send fof status and message
    if (productMatch == null){
        res.status(404);
        res.send(`Product with id: ${toFind} not found.`);
        res.end();
    } // if we did find the id send back the entire element
    else {
        res.status(200);
        res.json(productMatch);
        res.end();
    }
    
});

//endpoint to handle delete requests for one product
app.delete('/api/product/:productId', async (req, res) => {
    //get the id we are looking for, set index and switch var
    const toFind = req.params.productId;
    var productMatch = null;
    var index = 0
    //go through products if we find the ID get the index 
    data.forEach(product => {
        if (product.productId == toFind){
            productMatch = index;
        } else {
            index += 1;
        }
    });
    //if we didnt find the ID send back fof and message
    if (productMatch == null) {
        res.status(404);
        res.send(`Product with id: ${toFind} not found.`);
        res.end();
    } //if we found the ID splice that index out and rewrite file 
      //then send back 200 OK 
    else {
        data.splice(productMatch, 1);
        WriteTextToFileAsync(JSON.stringify(data));
        res.status(200);
        res.end();
    }
})

//endpoint to handle additions to the products list
app.post('/api/product/', async (req, res, next) => {
    //get the new product ID in
    var productIdIn = req.body.productId;

    fs.readFile('./src/product-content.json', function (err, data) {
        //get the data in from the json file set up switch var
        var json = JSON.parse(data);
        var clash = false;
        //go through each product if we hit the ID send back error message and flip switch
        json.forEach(product => {
            if (product.productId == productIdIn){
                //this might not be the right status code... but it seemed to fit best?
                res.status(500);
                res.send('productID clash. Unable to ost new product.');
                res.end();
                clash = true;
                return;
            }
        })//if we didnt find that product id add the new data to the json string
        if (!clash){
            json.push(req.body);
            //update json file to new list
            WriteTextToFileAsync(JSON.stringify(json));
            //I should probably do more error checking. 
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

//endpoint for handling editing of products
app.put('/api/product/:productId', async (req, res, next) => {
    //get the product id from endpoint params
    const toFind = req.params.productId;
    var productMatch = null;
    var index = 0;
    //go through products if we find the ID get the index 
    fs.readFile('./src/product-content.json', function (err, data) {
        var json = JSON.parse(data);
        json.forEach(product => {
            console.log(toFind);
            console.log(product.productId);
            if (product.productId == toFind){
                productMatch = index;
            } else {
                index += 1;
            }
        });

        //if we didnt find the match send back 500
        if(productMatch == null) {
            res.status(500);
            res.send("No product with that ID to edit");
            res.end();
        } 
        //if we find the match update the index with new data
        else {
            json[productMatch] = req.body;
            //write new list to file
            WriteTextToFileAsync(JSON.stringify(json));
             
            if (err){
                res.status(500);
                res.send('unable to edit product.');
                res.end();
            } else{
                res.status(200);
                res.end();
            }
        }
    }
)})

//initial read to load list of products
//i tried to get this to run at the start of the front end but that was not working
//so now a button triggers it
app.post('/api/read', async (req, res, next) => {
    const resJson = JSON.stringify(data);
    res.json(resJson);
});

//write over current json file with new json file
const WriteTextToFileAsync = async (toWrite) => {
    fs.writeFile('./src/product-content.json', toWrite, (err) => {
        if (err){
            console.log(err);
        } else {
            console.log('write done');
        }
    });
};

//this is to handle all other requests right now, as I flesh out each of the endpoints this will be used less
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

