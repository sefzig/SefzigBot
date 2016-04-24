'use strict';

const Script = require('smooch-bot').Script;
const SefzigBot = "[SefzigBot] ";
const LinkBot = "[LinkBot] ";
const TextBot = "[TextBot] ";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(SefzigBot+'Nicht so schnell bitte...'),
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
         
            if (befehl == "--BEFEHLE")        { bot.say(SefzigBot+'Hier die wichtigsten --befehle:');
                                                bot.say(SefzigBot+'--bot '
                                                             +'\n- --mobil '
                                                             +'\n- --befehle '
                                                             +'\n- --abbrechen '); }
            
            if ((befehl == "--BOT") ||
                (befehl == "--UBER"))         { bot.say(SefzigBot+'Ich weiß eine Menge über Andreas - und bin sein Ersatz für eine klassische Webseite. Rufen Sie mein Wissen durch Schreiben der mit -- beginnenden Wörter ab!');
                                                bot.say(SefzigBot+'Wollen Sie etwas über seine --Person oder --Neues von ihm erfahren? Oder auf anderem Wege --Kontakt  aufnehmen?'); }
            if (befehl == "--ABBRECHEN")      { bot.say(SefzigBot+'Text: Abbruch.'); }
            if (befehl == "--MOBIL")          { bot.say(SefzigBot+'Diesen Chat mobil öffnen: [Bild:https://zxing.org/w/chart?cht=qr&chs=200x200&chld=L&choe=UTF-8&chl=http%3A%2F%2Fsefzigbot.herokuapp.com%2F]');
                                                bot.say(SefzigBot+'(Leider werden Sie dort nicht wiedererkannt. Das sollte in einer späteren Version möglich sein...)'); }
            
         // -----------------
         // Über mich
         // -----------------
         
            if (befehl == "--BEFEHLE")        { bot.say(SefzigBot+'--über '
                                                             +'\n- --person '
                                                             +'\n- --neues '
                                                             +'\n- --kontakt '); }
            
            if (befehl == "--PERSON")         { bot.say(SefzigBot+'Andreas ist 38 Jahre alt und lebt in Hamburg. Hier sein --Lebenslauf und ein --Foto.'); }
            if (befehl == "--LEBENSLAUF")     { bot.say(SefzigBot+'Sein Lebenslauf als druckbares PDF-Dokument: %[Lebenslauf.pdf](http://sefzig.net/text/seiten/Lebenslauf/dateien/Andreas_Sefzig_Lebenslauf.pdf)');
                                                bot.say(SefzigBot+'Tabellarisches und ausformuliertes CV: %[Lebenslauf öffnen](http://sefzig.net/link/Lebenslauf/)'); }
            if (befehl == "--FOTO")           { bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzignetStartseite/dateien/SefzignetStartseiteFotoLogos.png] Andreas Sefzig mit Logo'); }
            if (befehl == "--NEUES")          { bot.say(SefzigBot+'Text: Neues.'); }
            
         // -----------------
         // Link
         // -----------------
         
            if (befehl == "--BEFEHLE")        { bot.say(LinkBot  +'--link '
                                                             +'\n- --linkEingabe '
                                                             +'\n- --linkListe '
                                                             +'\n- --linkUber '); }
            
            if (befehl == "--LINK")           { bot.say(LinkBot  +'Andreas speichert interessante Links für sich und andere: %[Linkliste öffnen](http://sefzig.net/link/liste/)');
                                                bot.say(LinkBot  +'URLs der Link-Verwaltung: --LinkEingabe, --LinkListe, --LinkEinrichten, --LinkAdmin, --LinkUber.'); }
            if (befehl == "--LINKEINGABE")    { bot.say(LinkBot  +'Eingabemaske für einen neuen Link: %[Link eigeben](http://sefzig.net/link/)'); }
            if (befehl == "--LINKLISTE")      { bot.say(LinkBot  +'Andreas allgemeine Linkliste: %[Link eigeben](http://sefzig.net/link/)');
                                                bot.say(LinkBot  +'Empfohlene Linklisten: --LinksWerkzeuge, --LinksDemo, --LinksInnovation, --LinksRtm, --LinksAnhang'); }
            if (befehl == "--LINKEINRICHTEN") { bot.say(LinkBot  +'Link: Einrichten.'); }
            if (befehl == "--LINKADMIN")      { bot.say(LinkBot  +'Link: Administration.'); }
            if (befehl == "--LINKUBER")       { bot.say(LinkBot  +'Link: Über.'); }
            
         // -----------------
         // Text
         // -----------------
         
            if (befehl == "--BEFEHLE")        { bot.say(TextBot  +'--text '
                                                             +'\n- --textUber '); }
            
            if (befehl == "--TEXT")           { bot.say(TextBot  +'Andreas hat SefzigBot dokumentiert: [Text:SefzigBot]'); }
            if (befehl == "--TEXTUBER")       { bot.say(TextBot  +'Über Text.'); }
            
         // -----------------
         // Kontakt
         // -----------------
         
            if (befehl == "--BEFEHLE")        { bot.say(SefzigBot+'--kontakt '
                                                              +'\n- --kontaktSeite '
                                                              +'\n- --kontaktTwitter '
                                                              +'\n- --kontaktSlack '); }
            
            if (befehl == "--KONTAKT")        { bot.say(SefzigBot+'Sie erreichen Andreas über andreas@sefzig.net, in seinem --Slackteam, auf --Twitter und auf --Xing. %[Kontakt-Seite öffnen](http://sefzig.net/link/Kontakt/)'); }
            if (befehl == "--SLACKTEAM")      { bot.say(SefzigBot+'Andreas betreibt ein offenes Slack-Team, in dem man sich über Marketing-Technologie unterhält. %[Slack-Team öffnen](http://sefzig.net/link/Slack/)'); }
            if (befehl == "--XING")           { bot.say(SefzigBot+'Andreas ist bei Xing: Er ist seit 2004 angemeldet und gehört mit über 500 Kontakten zu den 5% der bestvernetzten Mitglieder. %[Xing-Profil öffnen](http://sefzig.net/link/XingProfil/)'); 
                                                bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/xing_vernetzt.png]'); }
            if (befehl == "--TWITTER")        { bot.say(SefzigBot+'Andreas ist auf Twitter: Er ist seit 2008 angemeldet, hat beinahe 500 Follower und sah sich kürzlich gezwungen, alle Tweets zu löschen: Neustart 2016. %[Twitter-Profil öffnen](http://sefzig.net/link/TwitterProfil/)'); 
                                                bot.say(SefzigBot+'Schreiben Sie einen Tweet über @sefzig: %[@sefzig twittern](http://sefzig.net/link/TwitterTweet/)'); }
            
         // -----------------
         // Tests
         // -----------------
         
            if (befehl == "--JAVASCRIPT")     { bot.say(SefzigBot+'[Javascript:test_alert]'); }
            if (befehl == "--VIDEO")          { bot.say(SefzigBot+'[Youtube:u07XONlDwX8]'); }
            
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
