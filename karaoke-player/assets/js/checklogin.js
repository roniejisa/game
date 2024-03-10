const API_ACCOUNT_ENDPOINT = 'https://accounts.spotify.com/api';
const API_LOGIN_ENPOINT = 'https://accounts.spotify.com/authorize/?';
const lsSpotifyKey = 'access_token';
const lsSpotifyTokenType = 'token-type';

let spotify = {
    clientId: '8aed6ae3bc374799994af5bb33bac0c0',
    clientSecret: "82d9b5043dc54b7f9d89a865be54db00",
};

let generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


const request = {
    endpoint: "",
    headers: {},
    setHeaders: (key, value) => {
        request.headers[key] = value;
    },
    buildData: (data, type) => {
        if (type === 'json') {
            return JSON.stringify(data)
        } else {
            var params = [];
            for (const [key, value] of Object.entries(data)) {
                params.push(`${key}=${value}`);
            }
            params = params.join('&');
            return params;
        }
    },
    send: async (method, url, body = null, type = "json") => {
        let dataParam = "";
        const options = {
            headers: request.headers
        }
        if (type === "json") {
            options.headers["Content-Type"] = "application/json"
        } else if (type === 'form') {
            options.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }
        if (body) {
            if (method === 'GET' || options.headers["Content-Type"] === "application/x-www-form-urlencoded") {
                dataParam += (`?${request.buildData(body, type)}`);
            } else {
                options["body"] = JSON.stringify(body);
            }
        }

        options['method'] = method;
        console.log(options);
        try {
            const response = await fetch(`${request.getEndpoint()}${url}${dataParam}`, options);
            const json = await response.json();

            return {
                error: false,
                status: "OK",
                data: json
            }
        } catch (err) {
            return {
                error: true,
                message: err
            }
        }
    },
    getEndpoint: () => {
        return request.endpoint;
    },
    setEndpoint: (endpoint) => {
        request.endpoint = endpoint
    },

    get: async (url, body, type = 'json') => {
        return await request.send('GET', url, body, type);
    },
    post: async (url, body, type = 'json') => {
        return await request.send("POST", url, body, type);
    }
}

function login() {
    // request.setEndpoint(API_LOGIN_ENPOINT);
    var scope = "streaming user-read-email user-read-private user-top-read user-follow-read playlist-read-private user-library-read"
    // var state = generateRandomString(16);

    const param = request.buildData({
        client_id: spotify.clientId,
        response_type: "token",
        redirect_uri: "http://127.0.0.1:5502/karaoke-player/login.html",
        scope: scope,
        show_dialog: true
    }, 'form');
    const url = `${API_ACCOUNT_ENDPOINT}${param}`;
    window.open(url, "login", "width=800,height=600");
}

window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
    console.log(accessToken, tokenType, expiresIn);
}

window.addEventListener("load", () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
    }

    if (window.opener !== null && !window.opener.closed) {
        window.focus();
        if (window.location.href.includes("error")) {
            window.close();
        }

        const { hash } = window.location;
        const searchParams = new URLSearchParams(hash);
        const accessToken = searchParams.get("#access_token");
        const tokenType = searchParams.get("token_type");
        const expiresIn = searchParams.get("expires_in");
        if (accessToken) {
            window.close();
            window.opener.setItemsInLocalStorage({ accessToken, tokenType, expiresIn });
        } else {
            window.close();
        }
    }
})