const mongoose = require("mongoose");

class Mongo {
    constructor({conectionURL, options}) {
        this._conectionURL = conectionURL;
        this._options = options;
    }

    async connect() {
        return mongoose.connect(this._conectionURL, this._options);
    }
}

module.exports = Mongo;