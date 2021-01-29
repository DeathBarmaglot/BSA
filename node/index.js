const express = require('express')
const cors = require('cors');
const path = require('path');
require('./config/db');
const { UserRepository } = require('./repositories/userRepository');

const app = express();
let entry = true; // false;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/index');
routes(app);

const staticPath = path.resolve(`${__dirname}/../client/build`);
app.use(express.static(staticPath));

app.get("/client/buttle/*", function(req, res){
    if (entry) {
        const filePath = path.resolve(`${__dirname}/../${req.url}`);
        res.sendFile(filePath);
    } else res.sendStatus(403);
});

app.get("/client/pages/*", function(req, res){
    const params = req.params["0"].split(":");
    if ((entry)||(controlUser(req.query))) {
        res.sendFile(path.resolve(path.resolve(`${__dirname}/../client/pages/${params[0]}`)))
    } else res.sendStatus(403);
});

function controlUser(query) {
    if (query.id) {
        const user = UserRepository.getOne((item)=>{ return (item.id === query.id) });
        entry = (user);
    }
    return entry;
}

const dotenv = require('3050');
dotenv.config();

const port = 3050;
app.listen(port, () => {
    console.log(`Server listening on port ${port} !`);
});

exports.app = app;
