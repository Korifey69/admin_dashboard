const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const { secret } = require("../config/config.json");
const Base = require("./Base");

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "1h"} );
}

class Auth extends Base {
	constructor() {
		super();
	}

	get routers() {
		const router = this.router;

		router.post("/login", this.login);
		router.post("/registration", [
			check("username", "Имя пользователя не может быть пустым").notEmpty(),
			check("password", "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min:4, max:10 }),
            check("email", "Email is not valid").notEmpty(),
		], this.registration);

		return router;
	}

	async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({
                        status: 400,
                        message: "Registration error",
                        errors
                    });
            }

            const {username, password, email} = req.body;
            const candidate = await User.findOne({username});
            
            if (candidate) {
                return res
                    .status(400)
                    .json({
                        status: 400,
                        message: "A user with the same name already exists!",
                    });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, password: hashPassword, email, roles: [userRole.value]});

            await user.save();
            return res
                .status(200)
                .json({
                    status: 200,
                    message: "User registered successfully!",
                });
        } catch (error) {
            res
                .status(400)
                .json({
                    status: 400,
                    message: "Registration error",
                });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username });

            if (!user) {
                return res
                    .status(400)
                    .json({
                        message: `User ${username} not found`,
                        status: 400,
                    });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res
                    .status(400)
                    .json({
                        message: "Wrong password entered",
                        status: 400,
                    });
            }

            const token = generateAccessToken(user._id, user.roles);

            return res
                .status(200)
                .json({
                    username: user.username,
                    role: user.roles[0],
                    token,
                    status: 200,
                });
        } catch (e) {
            res
                .status(400)
                .json({message: "Login error"});
        }
    }
}

module.exports = Auth;