const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const { secret } = require("../config/config.json");
const Base = require("./Base");

class Users extends Base {
	constructor() {
		super();
	}

	get routers() {
		const router = this.router;

		router.route("/user/:name").get(this.user);
		router.get("/users", this.users);

		return router;
	}

	async user(request, response) {
		try {
			const { name } = request.params;

            const user = await User.findOne({"username": name});

            response.status(200).json({
				status: 200,
				user,
			});
        } catch (e) {
            console.log(e)
        }
	}

	async users(request, response) {
		try {
            const users = await User.find();
            response.status(200).json({
				status: 200,
				users,
			});
        } catch (e) {
            console.log(e)
        }
	}
}

module.exports = Users;