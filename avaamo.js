const fetch = require('node-fetch')
const Avaamo = {
    url: "https://c3.avaamo.com//bot_connector_webhooks/d0850ab6-2be9-452a-889f-1621d1b99e2b/message.json",

    sendMessage(user, message) {
        let payload = {
            // "channel_uuid": "53babb60-804f-47e8-805c-420cde4e26eb",
            "channel_uuid": "7772fd78-66c7-4738-b3d0-688c100fde68",//"fe5aa036-4ac2-41c5-8290-f7a87170ffc7",
            "user": {
                "first_name": user.name.display || "Google Home",
                "last_name": user.name.family || "User",
                "uuid": user.raw.userId
            },
            "message": {
                "text": message
            }
        };
        console.log(user.raw.userId);
        return fetch(this.url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json()).then(data => {
            console.log(data)
            return data;
        })
    },
}

module.exports = Avaamo
