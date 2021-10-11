const express = require("express");
const app = express();
const config = require("../../config/config.json");
const Mongo = require("../db/mongo");
const { User, Auth } = require("../../constrollers");
const roleMiddleware = require("../../middleware/roleMiddleware");

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

        const user = new User();
        const auth = new Auth();
        
        app.use(express.json());
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
          });
        app.use("/api", auth.routers);
        app.use("/api", roleMiddleware(["ADMIN"]), user.routers);
        
    }

    async run() {
        await this.init();
        
        app.listen(this._PORT, () => {
            console.log(`Server start on port ${this._PORT}`);
        });
    }
}

module.exports = Server;