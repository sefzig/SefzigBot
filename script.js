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
                .then(() => bot.say('Wenn Andreas online ist, sieht er, was Sie schreiben und kann diesem Gespräch beitreten.'))
                .then(() => 'vorname');
        }
    },

    vorname: {
        prompt: (bot) => bot.say('Vielleicht darf ich Sie erstmal begrüßen: Wie heissen Sie mit Vornamen?'),
        receive: (bot, message) => {
            const vorname = message.text;
            return bot.setProp('vorname', vorname)
                .then(() => bot.say(`${vorname}, prima.`))
                .then(() => 'nachname');
        }
    },

    nachname: {
        prompt: (bot) => bot.say('Und mit Nachnamen?'),
        receive: (bot, message) => {
            const nachname = message.text;
            return bot.setProp('nachname', nachname)
                .then(() => bot.say(`${nachname}, danke.`))
                .then(() => 'register');
        }
    },

    register: {
        prompt: (bot) => bot.say('Schreiben Sie Andreas eine Nachricht oder unterhalten Sie sich mit mir über ihn, indem Sie --bot schreiben.'),
        receive: (bot, message) => {
            
            const wollen = message.text;
            var befehl = wollen;
            befehl = befehl.trim();
            befehl = befehl.toUpperCase();
            
            if (befehl == "--BOT")       { bot.say('Die Hilfe usw.'); }
            if (befehl == "--HALLO")     { bot.say('Begrussung und alles.'); }
            if (befehl == "--ABBRECHEN") { bot.say('Text zum Abbruch.'); }
            
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
