import Joi from "joi";

export default Joi.object({
    username: Joi.string().invalid("").max(255).error((errors) => {
        errors.forEach((error) => {
            error.message = "Username is empty";
        });
        return errors;
    }),
    password: Joi.string().invalid("").pattern(new RegExp('^[a-zA-Z0-9]{4,10}$')).error((errors) => {
        errors.forEach((error) => {
            error.message = "Password is required";
        });
        
        return errors;
    }),
    email: Joi.string().invalid("").error((errors) => {
        errors.forEach((error) => {
            error.message = "Email is required";
        });
        return errors;
    }),
    role: Joi.string().allow("ADMIN", "USER"),
});