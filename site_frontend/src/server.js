import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import data from "./pages/product-content.json" assert {type: "json"};
import cors from 'cors';
import morgan from 'morgan';

//define our app using express
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => res.status(200).send({
    message: "Server is running"
}));

const WriteTextToFileAsync = async (toWrite) => {
    fs.writeFile('./src/product-content.json', toWrite, (err) => {
        console.log(toWrite);
        if (err){
            console.log(err);
        } else {
            console.log('write done');
        }
    });
}

app.post('/write', async (req, res, next) => {
    const reqContent = JSON.stringify(req.body);
    await WriteTextToFileAsync(reqContent);
})


app.use((req, res, next) => res.status(404).send({
    message: "Could not find specified route"
}));

app.listen(port, () => {
    console.log(`server is running and listening on port ${port}`)
});

