// Authorization
const API_SPOTIFY = 'https://api.spotify.com/v1';

async function getToken() {
    while (true) {
        spotify = getAccessToken();
        if (!spotify['dataToken']) {
            spotify['dataToken'] = await refreshAccessToken();
        } else {
            break;
        }
    }
    return spotify['dataToken'];
}

function getAccessToken() {
    var cookies = document.cookie.split(';');
    var cookiesOj = {}
    cookies.forEach(item => {
        item = item.trim();
        const [key, value] = item.split('=');
        cookiesOj[key] = value
    })
    spotify['dataToken'] = cookiesOj[lsSpotifyKey];
    return spotify;
}

function setAccessToken(data) {
    console.log(data);
    var date = new Date();
    date.setTime(data.expiresIn);
    document.cookie = `${lsSpotifyKey}=${data.accessToken}`;
    document.cookie = `${lsSpotifyTokenType}=${data.tokenType}`;
    return data;
}

async function refreshAccessToken() {
    request.setEndpoint(API_ACCOUNT_ENDPOINT);
    var response = await request.post('/token', {
        grant_type: 'client_credentials',
        client_id: spotify.clientId,
        client_secret: spotify.clientSecret
    }, 'form')

    if (response.status === 'OK') {
        setAccessToken({ accessToken: 'BQBF1LqVouBZ-ZpyQYFQWy2Jj8mSSOzAg6TboAZh3J8w81ATMwHDHRYcel8Q7FePCnvnICxTu1oy8MXLvQ8FYx8u4_GuxDEA3atSjLXbmBGrEsLsV9TvzTQqD5tOVCfZoNOFoYhCLzTXr0GK1fk1gA573JaYj1aIBGo115EVbCX2-9mkdlWgj5f1C3RIAXlWX0n3QEIQDVcFWfHJyJc8o1v7ZCIcki7hVpoIg4a3mmcD0jNYVzI', tokenType: 'Bearer', expiresIn: 3600 })
        return response.data;
    }
    return {}
}


async function getPlayer() {
    request.setEndpoint(API_SPOTIFY);
    request.setHeaders('Authorization', `Bearer ${spotify.dataToken}`);
    var response = await request.get('/me/player/devices');
    console.log(response);
}

(async () => {
    var { href, hash } = window.location;
    var curentPath = href.slice(href.lastIndexOf('/') + 1, href.lastIndexOf('.'));
    if (curentPath === 'login' && hash === '') {
        login();
    }
    getAccessToken();
    getPlayer();
})();
