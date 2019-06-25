"use strict";
const {
    actionssdk,
    Image,
} = require('actions-on-google')

// Create an app instance
const app = actionssdk()
const Avaamo = require("./avaamo")
// Register handlers for Actions SDK intents

app.intent('actions.intent.MAIN', conv => {
    console.log(conv.user.name)
    return Avaamo.sendMessage(conv.user, "Reset").then(data => {
        let responses = [];
        console.log(data.incoming_message.bot_replies);
        data.incoming_message.bot_replies.forEach(reply => {
            console.log("Reply ====>>>>>", reply)
            if (reply.ssml) {
                responses.push(conv.ask(reply.ssml))
            } else if (reply.text) {
                responses.push(conv.ask(reply.text))
            }
        });
        return responses;
    })
})

app.intent('actions.intent.TEXT', (conv, input) => {
    // if (input === 'bye' || input === 'goodbye') {
    //     return conv.close('See you later!')
    // }
    // conv.ask(`I didn't understand. Can you tell me something else?`)
    console.log(conv.user);
    return Avaamo.sendMessage(conv.user, input).then(data => {
        let responses = [];
        console.log(JSON.stringify(data.incoming_message.bot_replies));
        data.incoming_message.bot_replies.forEach(reply => {
            if (reply.ssml) {
                responses.push(conv.ask(reply.ssml))
            } else if (reply.text) {
                responses.push(conv.ask(reply.text))
            }
        });
        return responses;
    })
})


const express = require('express')
const bodyParser = require('body-parser')

// ... app code here

const expressApp = express().use(bodyParser.json())

expressApp.post('/fulfillment', app)

expressApp.listen(9990)
