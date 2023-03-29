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

app.post('/read', async (req, res, next) => {
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

app.post('/update', async (req, res, next) => {
    const reqContent = JSON.stringify(req.body);
    await WriteTextToFileAsync(reqContent);
});

const requestListener = (req, res) => {
    res.setHeader("Content-type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(data, null, 3));
};

//404 route - used when page or api call is not defined
app.use((req, res, next) => res.status(404).send({
    message: "Could not find specified route"
}));

//run our server listen for requests made to port as defined above
app.listen(port, host, () => {
    console.log(`server is running and listening on port ${port}`)
});

