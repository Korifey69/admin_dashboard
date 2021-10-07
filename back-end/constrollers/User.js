const Base = require("./Base");

class User extends Base {
	constructor() {
		super();
	}

	get routers() {
		const router = this.router;

		router.route("/user").get(this.user);
		router.route("/users").get(this.users);

		return router;
	}

	user(request, response) {
		return response
			.status(200)
			.json({
				status: 200,
				payload: {
					name: "Ivan",
					surname: "Ivanov",
					birthday: "1970-01-01"
				}
			})
			.end();
	}

	users(request, response) {
		return response
			.status(200)
			.json({
				status: 200,
				payload: [
					{
						name: "Ivan",
						surname: "Ivanov1",
						birthday: "1970-01-01"
					},
					{
						name: "Ivan",
						surname: "Ivanov2",
						birthday: "1970-01-01"
					},
					{
						name: "Ivan",
						surname: "Ivanov3",
						birthday: "1970-01-01"
					}
				]
			})
			.end();
	}
}

module.exports = User;