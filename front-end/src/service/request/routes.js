const DOMAIN = process.env.NODE_ENV === "production" ? process.env.NODE_ENV : "localhost:3001"

export default {
    login: () => `http://${DOMAIN}/api/login`,
    register: () => `http://${DOMAIN}/api/registration`,
    user: (id) => `http://${DOMAIN}/api/user/${id}`,
    users: () => `http://${DOMAIN}/api/users`
};