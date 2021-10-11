const GET_BASE = async (url) => {
    const cookie = document.cookie;
    const [token, expires] = cookie.split(",");
    const [, jwt] = token.split("=");

    return fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json());
};

const POST_BASE = async (url, body) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((res) => res.json());
};

export default {
    GET_BASE,
    POST_BASE,
};
