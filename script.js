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
                .then(() => bot.say('Wenn Andreas online ist, sieht er diese Unterhaltung.'))
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('Wie sollen wir Sie nennen?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Prima, wir nennen Sie ${name}.`)),
                .then(() => bot.say('Wollen Sie --Person oder --Kompetenzen?'))
                .then(() => 'register');
        }
    },

    register: {
        receive: (bot, message) => {
            
            const wollen = message.text;
            var befehl = wollen;
            befehl = befehl.replace("--", "");
            befehl = befehl.trim();
            befehl = befehl.toUpperCase();
            
            if (befehl == "HALLO")     { bot.say('Begrüßung und alles.'); }
            if (befehl == "ABBRECHEN") { bot.say('Text zum Abbruch.'); }
            
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
