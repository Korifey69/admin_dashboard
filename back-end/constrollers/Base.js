const express = require("express");

class Base {
    constructor() {
        this.router = express.Router();
    }

    get routers() {
        const routes = this.router;

        return routes;
    }
}

module.exports = Base;