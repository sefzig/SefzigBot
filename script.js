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
                .then(() => bot.say('Wenn Andreas online ist, sieht er unsere Unterhaltung. Darf ich Sie zunächst ankündigen?'))
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('Wie sollen wir Sie nennen?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Prima, wir nennen Sie ${name}.`))
                .then(() => 'register');
        }
    },

    register: {
        prompt: (bot) => bot.say('Wollen Sie --Person oder --Kompetenzen?'),
        receive: (bot, message) => {
            
            const wollen = message.text.replace("--", "");
            
            if (wollen == "HALLO") { bot.say('Begrüßung und alles.'); }
            
            return bot.setProp('wollen', wollen)
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then(() => 'finish');
        }
    }
});
