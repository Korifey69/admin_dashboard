import React, { useState } from "react";
import { Request, Routes } from "../../service/request";
import validate from "../../service/validation";

import './Register.css';

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        role: "USER",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (key, value) => {
        setForm({...form, [key]: value});
    };

    const getError = (field) => formErrors.find((error) => error.path === field);
    const getErrorMessage = () => {
        if(error.length) {
            return (
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            );
        }
    };
    const getSuccessMessage = () => {
        if(success.length) {
            return (
                <div class="alert alert-success" role="alert">
                    {success}
                </div>
            );
        }
    };

    const makeRequest = async (body) => {
        setError("");
        setSuccess("");
        const errors = validate("Register", body);

        if(errors.length) {
            return setFormErrors(errors);
        }

        const url = Routes.register();
        Request.POST_BASE(url, body)
            .then((data) => {
                if (data.status === 400) {
                    setError(data.message);
                }

                if (data.status === 200) {
                    setSuccess(data.message);
                }
                
                setFormErrors([]);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="container">
            <div className="row">
            <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                <div className="card-body p-4 p-sm-5">
                    <form className="needs-validation" onSubmit={(e) => { e.preventDefault(); return false; }} novalidate>
                        <h5 className="card-title text-center mb-5 fw-light fs-5">Register</h5>
                        {getErrorMessage()}
                        {getSuccessMessage()}

                        <div className="form-floating mb-3 input-group has-validation">
                            <input type="text" className={`form-control ${(getError("username")) !== undefined ? "is-invalid" : ""}`} id="floatingInputUsername" placeholder="User name" value={form.username} onChange={(e) => handleChange("username", e.target.value)}/>
                            <label for="floatingInputUsername">User name</label>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="email" className={`form-control ${(getError("email")) !== undefined ? "is-invalid" : ""}`} id="floatingInputEmail" placeholder="name@example.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                            <label for="floatingInputEmail">Email address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className={`form-control ${(getError("password")) !== undefined ? "is-invalid" : ""}`} id="floatingPassword" placeholder="Password" value={form.password} onChange={(e) => handleChange("password", e.target.value)}/>
                            <label for="floatingPassword">Password</label>
                        </div>

                        <div className="d-grid mb-2">
                            <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit" onClick={() => makeRequest(form)} >Register</button>
                        </div>
                    </form>
                
                    <a className="d-block text-center mt-2 small" href="/login">Have an account? Sign In</a>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}