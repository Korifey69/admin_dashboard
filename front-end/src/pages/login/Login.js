import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Request, Routes } from "../../service/request";

import './Login.css';

export default function Login(props) {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (key, value) => {
        setForm({...form, [key]: value});
    };

    const getErrorMessage = () => {
        if(error.length) {
            return (
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            );
        }
    };

    const makeRequest = async (body, history) => {
        setError("");
        const dateNow = new Date();
        const expires = dateNow.setHours(dateNow.getHours() + 1);
        const url = Routes.login();

        Request.POST_BASE(url, body)
            .then((data) => {
                if (data.status === 200) {
                    localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));
                    const cookie = [`token=${data.token}`, `expires=${expires}`].join(",");
                    document.cookie = cookie;
                    history.push("/dashboard");
                }

                if (data.status === 400) {
                    setError(data.message);
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                {getErrorMessage()}
                            <form onSubmit={(e) => { e.preventDefault(); return false; }}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="User name" value={form.username} onChange={(e) => handleChange("username", e.target.value)} />
                                    <label for="floatingInput">User name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={form.password} onChange={(e) => handleChange("password", e.target.value)} />
                                    <label for="floatingPassword">Password</label>
                                </div>
                                
                                <a className="d-block text-center mt-2 mb-2 small" href="/register">Create account</a>
                                
                                <div className="d-grid">
                                    <Route render={({ history }) => (
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" onClick={() => makeRequest(form, history)}>Sign in</button>
                                    )} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}