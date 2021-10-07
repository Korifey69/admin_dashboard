const express = require("express");
const app = express();
const config = require("../../config/config.json");
const Mongo = require("../db/mongo");
const { User, Auth } = require("../../constrollers");

class Server {
    constructor() {
        this._PORT = this.port;
        this._mongo = new Mongo(config.mongo);
    }

    get port() {
        return 3001;
    }

    async init() {
        const mongoDB = await this._mongo.connect();
        console.log(mongoDB);
        const user = new User();
        const auth = new Auth();
        
        app.use("/api", user.routers);
        app.use("/api", auth.routers);
    }

    async run() {
        await this.init();
        
        app.listen(this._PORT, () => {
            console.log(`Server start on port ${this._PORT}`);
        });
    }
}

module.exports = Server;