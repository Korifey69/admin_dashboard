import schemas from "./schemas";

export default function validate(name, data) {
    const errors = schemas[name].validate(data, { abortEarly: false });

    if(errors.error) {
        return errors.error.details.reduce((previous, current) => {
            if(current.type === "any.invalid") {
                previous.push({
                    message: current.message,
                    path: current.path.join("."),
                });
            }
    
            return previous;
        }, []);
    }
    
    return [];
}