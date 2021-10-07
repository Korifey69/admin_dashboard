const mongoose = require("mongoose");

class Mongo {
    constructor({conectionURL, options}) {
        this._conectionURL = conectionURL;
        this._options = options;
    }

    async connect() {
        console.log(this._conectionURL, this._options);
        return mongoose.connect(this._conectionURL, this._options);
    }
}

module.exports = Mongo;