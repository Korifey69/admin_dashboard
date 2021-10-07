const Base = require("./Base");

class Auth extends Base {
	constructor() {
		super();
	}

	get routers() {
		const router = this.router;

		router.route("/loggin").get(this.loggin);

		return router;
	}

	loggin(request, response) {
		return response
			.status(200)
			.json({msg: "Loggin"})
			.end();
	}
}

module.exports = Auth;