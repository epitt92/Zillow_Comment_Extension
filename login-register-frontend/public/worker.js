const baseUrl = 'https://epicvpn.net';
const consoleLogEnabled = true;
let store = {};

// SYNC BETWEEN SITE AND EXTENSION START
let oldSiteAuth = 'false';
let popupOpened = false

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, value: storeObjValue, key: storeObjKey } = message;

    if (type === 'setProxy') {

        setProxy(message.domain, message.port, message.vpn_name, message.vpn_password);
        
        // Show Notification
        const opts = {
            type: "basic",
            iconUrl: "images/icon128.png",
            title: "EpicVPN",
            message: `Connected to ${store.server.city} proxy successfully.`,
        }
        store.connected = true;
        showNotification("connect-vpn", opts, 2000)
        sendResponse();

    } else if (type == 'disconnectProxy') {
        disconnectProxy();
        const opts = {
            type: "basic",
            iconUrl: "images/icon128.png",
            title: "EpicVPN",
            message: `Disconnected from ${store.server.city} proxy successfully.`,
        }
        store.connected = false;
        showNotification("disconnect-vpn", opts, 2000)
        sendResponse();
    } else if (type === 'deleteCookies') {
        chrome.cookies.remove({ url: baseUrl, name: 'XSRF-TOKEN' }, function (deleted_cookie) {
            consoleLogEnabled && console.log('cookies', deleted_cookie);
        });
        chrome.cookies.remove({ url: baseUrl, name: 'epic_session' }, function (deleted_cookie) {
            consoleLogEnabled && console.log(deleted_cookie);
        });
        chrome.cookies.set({ url: baseUrl, name: 'epic_user_auth', value: 'false' });
    } else if (type === 'request') {
        const { url, method, params } = message;

        consoleLogEnabled && console.log('background request run', url, params);

        if (String(method).toLocaleLowerCase() === 'get') {
            get(url, params)
                .then((response) => sendResponse(response))
                .catch((error) => sendResponse(error));
        } else if (String(method).toLocaleLowerCase() === 'post') {
            post(url, params)
                .then((response) => sendResponse(response))
                .catch((error) => sendResponse(error));
        }
    } else if (type === 'initWS') {
        initWS({ userId: message.userId })
            .then((e) => sendResponse(e))
            .catch((e) => sendResponse(e));
    } else if (type === 'updateStore') {
        chrome.storage.local.set({[storeObjKey]: storeObjValue});
        store[storeObjKey] = storeObjValue;
        sendResponse(store);
    } else if (type === 'getStore') {
        sendResponse(store);
    }

    return true;
});

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === 'popup') {
        popupOpened = true;
        consoleLogEnabled && console.log('popup opened');
        port.onDisconnect.addListener(function () {
            popupOpened = false;
            consoleLogEnabled && console.log('popup has been closed');
        });
    }
});

chrome.runtime.onInstalled.addListener(function (reason) {
    consoleLogEnabled && console.log('installed');
    chrome.cookies.get({ url: baseUrl, name: 'epic_user_auth' }, function (cookie) {
        if (cookie) {
            oldSiteAuth = cookie.value == 'true';
            cookie.value == 'true' && checkAuth();
        }
    });
});

chrome.cookies.onChanged.addListener(async function (changeInfo) {
    if (changeInfo.cookie.domain == 'epicvpn.net' && changeInfo.cookie.name == 'epic_user_auth') {
        if (changeInfo.cookie.value == 'false' && oldSiteAuth == 'true') {
            disconnectProxy();
            clearStorage();
            oldSiteAuth = 'false';
            popupOpened && chrome.runtime.sendMessage({ type: 'loggedOut' });
            consoleLogEnabled && console.log('logged out');
        } else if (changeInfo.cookie.value == 'true' && oldSiteAuth !== changeInfo.cookie.value) {
            oldSiteAuth = 'true';
            checkAuth();
        }
    }
});


// Show Notification
function showNotification( title, options, expireTime ){
    chrome.notifications.create(
        title,
        options,
        function (notificationId) {
            setTimeout(() => {
                chrome.notifications.clear(notificationId);
            }, expireTime)
        }
    );
}

function checkAuth() {
    get('https://epicvpn.net/api/auth/v1/auth-check', null).then((response) => {
        if (response.data.user && response.data.user.api_token) {
            // next 4 fields no need set inside chrome.storage.local, now we have store variable in worker.js
            chrome.storage.local.set({
                user: response.data.user,
            });
            store.user = response.data.user;
            popupOpened && chrome.runtime.sendMessage({ type: 'loggedIn' });
            consoleLogEnabled && console.log('logged in');
            return true;
        } else {
            clearStorage();
            popupOpened && chrome.runtime.sendMessage({ type: 'loggedOut' });
            consoleLogEnabled && console.log('logged out');
            return false;
        }
    });
}
// SYNC BETWEEN SITE AND EXTENTION END

// Clear chrome storage
function clearStorage() {
    chrome.storage.local.clear();
    store = {}
}

// FETCH FUNTION START
const request = async (url, params = {}, method = 'GET') => {
    try {
        let options = {
            method,
            headers: new Headers({ 'content-type': 'application/json' }),
        };

        if ('GET' === method) {
            url += '?' + new URLSearchParams(params).toString();
        } else {
            options.body = JSON.stringify(params);
        }

        const response = await fetch(url, options);

        const result = await response.json();

        if (!response.ok || response.status !== 200 || (result && result.error)) {
            throw new Error(`Error! status: ${response.status}`, {
                cause: result,
            });
        }

        return result;
    } catch (response) {
        if (response.cause) {
            const { error } = response.cause;
            // console.log(`FROM SERVICE WORKER ERROR IN: ${url}`, response.cause);
            error &&
                popupOpened &&
                chrome.runtime.sendMessage({
                    type: 'requestError',
                    response: response.cause,
                    url,
                });
            return response.cause;
        } else {
            // console.log(`FROM SERVICE WORKER ERROR IN: ${url}`);
            return { error: true, url };
        }
    }
};

const get = (url, params) => request(url, params, 'GET');
const post = (url, params) => request(url, params, 'POST');
// FETCH FUNTION END

// WEB SOCKETS START
let wsPingInterval;
let wsInitializationPromis;

// WEB SOCKETS END
