'use strict';

const Script = require('smooch-bot').Script;
const botVorweg = "";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(botVorweg+'101100111001101...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say(botVorweg+'Wenn Andreas gerade online ist, sieht er dieses Gespräch und kann beitreten.')
                .then(() => 'vorname');
        }
    },

    vorname: {
        prompt: (bot) => bot.say(botVorweg+'Wie heissen Sie mit Vornamen?'),
        receive: (bot, message) => {
            var vorname = message.text;
            return bot.setProp('vorname', vorname)
                .then(() => bot.say(botVorweg+`${vorname}, prima.`))
                .then(() => 'nachname');
        }
    },

    nachname: {
        prompt: (bot) => bot.say(botVorweg+'Und mit Nachnamen?'),
        receive: (bot, message) => {
            var nachname = message.text;
            return bot.setProp('nachname', nachname)
                .then(() => bot.say(botVorweg+`${nachname}, danke.`))
                .then(() => bot.say(botVorweg+'Sie können hier jederzeit eine Nachricht an Andreas eingeben.'))
                .then(() => bot.say(botVorweg+'Unterhalten Sie sich solange mit mir! Bitte schreiben Sie --bot:'))
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
            if (befehl == "--BOT")          { bot.say(botVorweg+'Andreas hat mir viel beigebracht - Sie können das durch Schreiben der mit -- beginnenden Wörter abrufen!'); }
            if (befehl == "--BOT")          { bot.say(botVorweg+'Wollen Sie etwas über seine --Person oder --Neues von ihm erfahren? Oder auf anderem Wege --Kontakt  aufnehmen?'); }
            if (befehl == "--ABBRECHEN")    { bot.say(botVorweg+'Text: Abbruch.'); }
            
         // Über mich
            if (befehl == "--PERSON")       { bot.say(botVorweg+'Andreas ist 38 Jahre alt und lebt in Hamburg. Hier sein --Lebenslauf und ein --Foto.'); }
            if (befehl == "--LEBENSLAUF")   { bot.say(botVorweg+'Tabellarisches und ausformuliertes Curriculum Vitae: %[Lebenslauf öffnen](http://sefzig.net/link/Lebenslauf/)'); }
            if (befehl == "--FOTO")         { bot.say(botVorweg+'[Bild:http://sefzig.net/text/seiten/SefzignetStartseite/dateien/SefzignetStartseiteFotoLogos.png] Andreas Sefzig mit Logo'); }
            if (befehl == "--NEUES")        { bot.say(botVorweg+'Text: Neues.'); }
            
         // Kontakt
            if (befehl == "--KONTAKT")      { bot.say(botVorweg+'Sie erreichen Andreas über andreas@sefzig.net, in seinem --Slackteam, auf --Twitter und auf --Xing. %[Kontakt-Seite öffnen](http://sefzig.net/link/Kontakt/)'); }
            if (befehl == "--SLACKTEAM")    { bot.say(botVorweg+'Andreas betreibt ein offenes Slack-Team, in dem man sich über Marketing-Technologie unterhält. %[Offenes Slack-Team öffnen](http://sefzig.net/link/Slack/)'); }
            if (befehl == "--XING")         { bot.say(botVorweg+'Andreas ist bei Xing: Er ist seit 2004 angemeldet und gehört mit über 500 Kontakten zu den 5% der bestvernetzten Mitglieder. %[Xing-Profil öffnen](http://sefzig.net/link/Xing/)'); bot.say(botVorweg+'[Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/xing_vernetzt.png]'); }
            if (befehl == "--TWITTER")      { bot.say(botVorweg+'Andreas ist auf Twitter: %[Twitter-Profil öffnen](http://sefzig.net/link/Twitter/)'); }
            
         // Vorlage
            if (befehl == "--VORLAGE")      { bot.say(botVorweg+'Text: Vorlage.'); }
            
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
