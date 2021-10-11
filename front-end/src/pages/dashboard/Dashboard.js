import React, { useState, useEffect } from "react";
import { Request, Routes } from "../../service/request";
import Header from "../../components/header/Header";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    const [timerId, setTimerId] = useState(0);

    const checkCookie = () => {
        const cookie = document.cookie;

        if(cookie.length === 0) {
          return window.location.pathname = "/login";
        }

        const [, expires, user] = cookie.split(",");
        const [, date] = expires.split("=");
        const dateNow = new Date();

        if(dateNow.getTime() > new Date(date)) {
          return window.location.pathname = "/login";
        }

    };

    const makeRequest = async (body) => {
        const url = Routes.users();
        Request.GET_BASE(url)
            .then((data) => {
                setUsers(data.users);
            })
            .catch((error) => console.log(error));
    };
    
    useEffect(() => {
        checkCookie();

        if(user.role === "ADMIN" && window.location.pathname === "/dashboard") {
            makeRequest();
        }
        
    }, []);

    const rows = () => {
        return users.map((user, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                </tr>
            );
        });
    };

    const iAmHere = () => {
        clearTimeout(timerId);
        const id = setTimeout(() => {
            alert("You are not active");
            window.location.pathname = "/offline";
        }, 5000);
        setTimerId(id);
    };

    const dashboard = () => {
        return (
            <>
                <h5 className="card-title text-left mb-5 fw-light fs-5">Dashboard</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows()}
                    </tbody>
                </table>
            </>
        );
    };

    return (
        <>
            <Header user={user}/>
            <main className="container" onMouseMove={() => iAmHere()}>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                {user.role === "ADMIN" && window.location.pathname === "/dashboard" ? dashboard() : `Hi ${user.username}`}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}