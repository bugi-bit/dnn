var express = require('express');
var e = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');
const cls_model = require('./sdk/cls_model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1825016672:AAFVtA4QKSCzQdRfOz5pYMGYACjl_8xxwS0'
const bot = new TelegramBot(token, {polling: true});
state = 0;
// bots
bot.onText(/\/start/, (msg) => { 
       bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );  
    state = 0;
});

bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `Masukan nilai i|v contohnya 9|9`
    );   
    state = 1
});
bot.on('message', (msg) => {
    if(state == 1){
        s = [req.params.i, req.params.r];
        // s = msg.text.split("|");   
        model.predict(
        [
           parseFloat(s[0]),
           parseFloat(s[1])
        ]
        ).then((jres1)=>{
            console.log(jres1);
          
              cls_model.classify([parseFloat(s[0]),parseFloat(s[1]), parseFloat(jres1[0]),parseFloat(jres1[1])]).then((jres2) => {
                bot.sendMessage(
                    msg.chat.id,
                    `nilai Radius Kanan ${s[0]} mm`
        );
                bot.sendMessage(
                    msg.chat.id,
                    `nilai Radius Kiri ${s[1]} mm`
        );       
                bot.sendMessage(
                    msg.chat.id,
                    `nilai Presure yang diprediksi adalah ${jres1[0]} kg/cm2`
        ); 
                bot.sendMessage(
                    msg.chat.id,
                    `nilai Radius yang diprediksi adalah ${jres1[1]} mm`
        );
                 bot.sendMessage(
                    msg.chat.id,
                    `klasifikasi Radius Shaping ${jres2}`
                     
                 );
            })
        })
    }else{
     
    state = 0;
    }
})

// routers
e.get('/classify/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.i), // string to float
            parseFloat(req.params.r)
        ]
    ).then((jres)=>{
        cls_model.classify(
            [
                parseFloat(req.params.i), // string to float
                parseFloat(req.params.r),
                parseFloat(jres[0]),
                parseFloat(jres[1])
        ]
        ).then((jres_)=>{
        res.json({jres, jres_})
    })
    })
});

module.exports = e;
