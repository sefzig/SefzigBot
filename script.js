'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('101100111001101...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Wenn Andreas gerade online ist, sieht er dieses Gespräch und kann beitreten.')
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
                .then(() => bot.say(`${nachname}, danke.`))
                .then(() => bot.say('Sie können hier jederzeit eine Nachricht an Andreas eingeben.'))
                .then(() => bot.say('Unterhalten Sie sich solange mit mir! Bitte schreiben Sie --bot:'))
                .then(() => 'register');
        }
    },

    register: {
        receive: (bot, message) => {
            
            var wollen = message.text;
            var befehl = wollen;
            befehl = befehl.trim();
            befehl = befehl.toUpperCase();
            
         // System
            if (befehl == "--BOT")          { bot.say('Andreas hat mir viel beigebracht - Sie können das durch Schreiben der mit -- beginnenden Wörter abrufen!'); }
            if (befehl == "--BOT")          { bot.say('Wollen Sie etwas über seine --Person oder --Neues von ihm erfahren? Oder auf anderem Wege --Kontakt  aufnehmen?'); }
            if (befehl == "--ABBRECHEN")    { bot.say('Text: Abbruch.'); }
            
         // Über mich
            if (befehl == "--PERSON")       { bot.say('Text: Person; Links: --Lebenslauf, --Foto.'); }
            if (befehl == "--LEBENSLAUF")   { bot.say('Text: Lebenslauf. %[Lebenslauf öffnen](http://sefzig.net/link/Lebenslauf/)'); }
            if (befehl == "--FOTO")         { bot.say('[Bild:http://sefzig.net/text/seiten/SefzignetStartseite/dateien/SefzignetStartseiteFotoLogos.png]'); }
            if (befehl == "--NEUES")        { bot.say('Text: Neues.'); }
            
         // Kontakt
            if (befehl == "--KONTAKT")      { bot.say('Text: Kontakt mit Webseite; Links: --Twitter, --Slackteam, --Xing. %[Kontakt-Seite öffnen](http://sefzig.net/link/Kontakt/)'); }
            if (befehl == "--SLACKTEAM")    { bot.say('Andreas betreibt ein offenes Slack-Team, in dem man sich über Marketing-Technologie unterhält. %[Offenes Slack-Team öffnen](http://sefzig.net/link/Slack/)'); }
            if (befehl == "--XING")         { bot.say('Andreas ist Xing: Er ist seit 2004 angemeldet und gehört mit über 500 Kontakten zu den 5% der bestvernetzten Mitglieder. %[Xing-Profil ansehen](http://sefzig.net/link/Xing/)'); bot.say('[Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/xing_vernetzt.png]'); }
            if (befehl == "--TWITTER")      { bot.say('Andreas ist auf Twitter: %[Twitter-Profil öffnen](http://sefzig.net/link/Twitter/)'); }
            
         // Vorlage
            if (befehl == "--VORLAGE")      { bot.say('Text: Vorlage.'); }
            
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
