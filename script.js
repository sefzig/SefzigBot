'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hallo! ich bin Andreas Sefzigs Bot.')
                .then(() => bot.say('Hinweis: Wenn Andreas online ist, sieht er dieses Gespräch und kann beitreten.'))
                .then(() => 'vorname');
        }
    },

    vorname: {
        prompt: (bot) => bot.say('Wie heissen Sie mit Vornamen?'),
        receive: (bot, message) => {
            var vorname = message.text;
            return bot.setProp('vorname', vorname)
                .then(() => bot.say(`${vorname}, prima.`))
                .then(() => 'nachname');
        }
    },

    nachname: {
        prompt: (bot) => bot.say('Und mit Nachnamen?'),
        receive: (bot, message) => {
            var nachname = message.text;
            return bot.setProp('nachname', nachname)
                .then(() => bot.say(`${vorname} ${nachname}, danke.`))
                .then(() => bot.say('Schreiben Sie hier eine Nachricht an Andreas. Oder unterhalten Sie sich mit mir, indem Sie --bot schreiben!'))
                .then(() => 'register');
        }
    },

    register: {
        receive: (bot, message) => {
            
            var wollen = message.text;
            var befehl = wollen;
            befehl = befehl.trim();
            befehl = befehl.toUpperCase();
            
         // Über mich
            if (befehl == "--PERSON")       { bot.say('Person.'); }
            if (befehl == "--LEBENSLAUF")   { bot.say('Lebenslauf.'); }
            
         // System
            if (befehl == "--BOT")       { bot.say('Bot.'); }
            if (befehl == "--ABBRECHEN") { bot.say('Abbruch.'); }
            
            return bot.setProp('wollen', wollen)
                .then(() => 'register');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then(() => 'finish');
        }
    }
});
