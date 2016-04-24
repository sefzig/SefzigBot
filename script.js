'use strict';

const Script = require('smooch-bot').Script;
const SefzigBot = "[SefzigBot] ";
const LinkBot = "[LinkBot] ";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(SefzigBot+'101100111001101...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say(SefzigBot+'Wenn Andreas gerade online ist, sieht er dieses Gespräch und kann beitreten.')
                .then(() => 'vorname'); /* <-- register */
        }
    },

    vorname: {
        prompt: (bot) => bot.say(SefzigBot+'Wie heissen Sie mit Vornamen?'),
        receive: (bot, message) => {
            var vorname = message.text;
            return bot.setProp('vorname', vorname)
                .then(() => bot.say(SefzigBot+`${vorname}, prima.`))
                .then(() => 'nachname');
        }
    },

    nachname: {
        prompt: (bot) => bot.say(SefzigBot+'Und mit Nachnamen?'),
        receive: (bot, message) => {
            var nachname = message.text;
            return bot.setProp('nachname', nachname)
                .then(() => bot.say(SefzigBot+`${nachname}, danke.`))
                .then(() => bot.say(SefzigBot+'Sie können hier jederzeit eine Nachricht an Andreas eingeben.'))
                .then(() => bot.say(SefzigBot+'Unterhalten Sie sich solange mit mir! Bitte schreiben Sie --bot:'))
                .then(() => 'register');
        }
    },

    register: {
        receive: (bot, message) => {
            
            var wollen = message.text;
            var befehl = wollen;
            befehl = befehl.trim();
            befehl = befehl.toUpperCase();
            
         // -----------------
         // System
         // -----------------
         
            if (befehl == "--BOT")            { bot.say(SefzigBot+'Ich weiß eine Menge über Andreas - und bin sein Ersatz für eine klassische Webseite. Rufen Sie mein Wissen durch Schreiben der mit -- beginnenden Wörter ab!');
                                                bot.say(SefzigBot+'Wollen Sie etwas über seine --Person oder --Neues von ihm erfahren? Oder auf anderem Wege --Kontakt  aufnehmen?'); }
            if (befehl == "--ABBRECHEN")      { bot.say(SefzigBot+'Text: Abbruch.'); }
            if (befehl == "--QRCODE")         { bot.say(SefzigBot+'Diesen Chat mobil öffnen: [Bild:https://zxing.org/w/chart?cht=qr&chs=200x200&chld=L&choe=UTF-8&chl=http%3A%2F%2Fsefzigbot.herokuapp.com%2F]'); }
            if (befehl == "--JAVASCRIPT")     { bot.say(SefzigBot+'[Javascript:test_alert]'); }
            
         // -----------------
         // Über mich
         // -----------------
         
            if (befehl == "--PERSON")         { bot.say(SefzigBot+'Andreas ist 38 Jahre alt und lebt in Hamburg. Hier sein --Lebenslauf und ein --Foto.'); }
            if (befehl == "--LEBENSLAUF")     { bot.say(SefzigBot+'Sein Lebenslauf als druckbares PDF-Dokument: %[Lebenslauf.pdf](http://sefzig.net/text/seiten/Lebenslauf/dateien/Andreas_Sefzig_Lebenslauf.pdf)');
                                                bot.say(SefzigBot+'Tabellarisches und ausformuliertes CV: %[Lebenslauf öffnen](http://sefzig.net/link/Lebenslauf/)'); }
            if (befehl == "--FOTO")           { bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzignetStartseite/dateien/SefzignetStartseiteFotoLogos.png] Andreas Sefzig mit Logo'); }
            if (befehl == "--NEUES")          { bot.say(SefzigBot+'Text: Neues.'); }
            
         // -----------------
         // Links
         // -----------------
         
            if (befehl == "--LINKS")          { bot.say(LinkBot+'Andreas speichert interessante Links für sich und andere: %[Linkliste öffnen](http://sefzig.net/link/liste/)');
                                                bot.say(LinkBot+'URLs der Link-Verwaltung: --LinkEingabe, --LinkListe, --LinkEinrichten, --LinkAdmin, --LinkUber.'); }
            if (befehl == "--LINKEINGABE")    { bot.say(LinkBot+'Link: Eingabe.'); }
            if (befehl == "--LINKLISTE")      { bot.say(LinkBot+'Link: Liste.'); }
            if (befehl == "--LINKEINRICHTEN") { bot.say(LinkBot+'Link: Einrichten.'); }
            if (befehl == "--LINKADMIN")      { bot.say(LinkBot+'Link: Administration.'); }
            if (befehl == "--LINKUBER")       { bot.say(LinkBot+'Link: Über.'); }
            
         // -----------------
         // Kontakt
         // -----------------
         
            if (befehl == "--KONTAKT")        { bot.say(SefzigBot+'Sie erreichen Andreas über andreas@sefzig.net, in seinem --Slackteam, auf --Twitter und auf --Xing. %[Kontakt-Seite öffnen](http://sefzig.net/link/Kontakt/)'); }
            if (befehl == "--SLACKTEAM")      { bot.say(SefzigBot+'Andreas betreibt ein offenes Slack-Team, in dem man sich über Marketing-Technologie unterhält. %[Slack-Team öffnen](http://sefzig.net/link/Slack/)'); }
            if (befehl == "--XING")           { bot.say(SefzigBot+'Andreas ist bei Xing: Er ist seit 2004 angemeldet und gehört mit über 500 Kontakten zu den 5% der bestvernetzten Mitglieder. %[Xing-Profil öffnen](http://sefzig.net/link/XingProfil/)'); 
                                                bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/xing_vernetzt.png]'); }
            if (befehl == "--TWITTER")        { bot.say(SefzigBot+'Andreas ist auf Twitter: Er ist seit 2008 angemeldet, hat beinahe 500 Follower und sah sich kürzlich gezwungen, alle Tweets zu löschen: Neustart 2016. %[Twitter-Profil öffnen](http://sefzig.net/link/TwitterProfil/)'); 
                                                bot.say(SefzigBot+'Schreiben Sie einen Tweet über @sefzig: %[@sefzig twittern](http://sefzig.net/link/TwitterTweet/)'); }
            
         // -----------------
         // Vorlage
         // -----------------
         
            if (befehl == "--VORLAGE")        { bot.say(SefzigBot+'Text: Vorlage.'); }
            
         // .then(function(){ bot.say(''); })
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
