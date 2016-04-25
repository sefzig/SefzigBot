'use strict';

const Script = require('smooch-bot').Script;
const SefzigBot = "[SefzigBot] ";
const LinkBot = "[LinkBot] ";
const TextBot = "[TextBot] ";
const SlackBot = "[SlackBot] ";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(SefzigBot+'Nicht so schnell bitte...'),
        receive: () => 'processing'
    },

 // -------------------------
 // Onboarding 
 // -------------------------
         
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

 // -------------------------
 // Register
 // -------------------------
         
    register: {
        receive: (bot, message) => {
            
            var befehl = message.text.trim().toUpperCase();
            var gehezu = "register";
            
         // -----------------
         // Bots
         // -----------------
            
            if ((~befehl.indexOf("--LINK")) ||
                (~befehl.indexOf("--LINKS")))         { bot.say(LinkBot  +'Andreas speichert viele interessante Links - für sich wie auch für Sie: [Linkliste:Allgemein] 1.000 Links, 6.000 Aufrufe!');
                                                        bot.say(LinkBot  +'Steuern Sie mich mit diesen Befehlen: \n○ --Eingabe \n○ --Liste \n○ --Listen \n○ --Einrichten \n○ --Admin \n○ --Uber');
                                                        bot.say(LinkBot  +'(Schreiben Sie --bot, um wieder mit SefzigBot zu sprechen.)');
                                                        gehezu = "link"; } 
            
            if ((~befehl.indexOf("--TEXT")) ||
                (~befehl.indexOf("--TEXTE")))         { bot.say(TextBot  +'Andreas verwaltet, bearbeitet und teilt alle seine Texte mit einer eigens entwickelten Software: [Text:Text] ');
                                                        bot.say(TextBot  +'(Schreiben Sie --bot, um wieder mit SefzigBot zu sprechen.)');
                                                        bot.say(TextBot  +'Steuern Sie mich mit diesen Befehlen: \n○ --Startseite \n○ --Hilfe \n○ --Uber');
                                                        gehezu = "text"; } 
            
            if  (~befehl.indexOf("--SLACK"))          { bot.say(SlackBot +'Andreas mag Interne Kommunikation und Automatisierung - er liebt Slack! Das sollte Ihr Team auch tun...');
                                                        bot.say(SlackBot +'(Schreiben Sie --bot, um wieder mit SefzigBot zu sprechen.)');
                                                        bot.say(SlackBot +'Ich empfehle Ihnen seinen --Artikel, den --Blogpost und diverse --Links zu Slack. Wollen Sie Andreas offenem Slack --Team beitreten?');
                                                        gehezu = "slack"; } 
            
         // -----------------
         // System
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SefzigBot+'--bot '
                                                              +'\n○ --mobil '
                                                              +'\n○ --befehle '
                                                              +'\n○ --abbrechen '); }
            
            if ((~befehl.indexOf("--BOT")) ||
                (~befehl.indexOf("--UBER")))          { bot.say(SefzigBot+'Ich weiß eine Menge über Andreas - und bin sein Ersatz für eine klassische Webseite. Rufen Sie mein Wissen durch Schreiben der mit -- beginnenden Wörter ab!');
                                                        bot.say(SefzigBot+'Wollen Sie etwas über seine --Person oder --Neues von ihm erfahren? Oder auf anderem Wege --Kontakt  aufnehmen?'); }
            if  (~befehl.indexOf("--ABBRECHEN"))      { bot.say(SefzigBot+'Sie können das Gespräch mit mir beenden'); }
            if  (~befehl.indexOf("--MOBIL"))          { bot.say(SefzigBot+'Diesen Chat mobil öffnen: [Bild:https://zxing.org/w/chart?cht=qr&chs=200x200&chld=L&choe=UTF-8&chl=http%3A%2F%2Fsefzigbot.herokuapp.com%2F]');
                                                        bot.say(SefzigBot+'(Leider werden Sie dort nicht wiedererkannt. Das sollte in einer späteren Version möglich sein...)'); }
            
         // -----------------
         // Person
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SefzigBot+'--Person '
                                                              +'\n○ --Über '
                                                              +'\n○ --Foto '
                                                              +'\n○ --Lebenslauf '
                                                              +'\n○ --Kompetenzen '
                                                              +'\n○ --Disziplinen '); }
            
            if  (~befehl.indexOf("--PERSON"))         { bot.say(SefzigBot+'Lesen Sie den --Lebenslauf von Andreas, eine Liste seiner --Kompetenzen oder über die Marketing --Disziplinen, die er beherrscht.');
                                                        bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzignetStartseite/dateien/SefzignetStartseiteFotoLogos.png]');
                                                        bot.say(SefzigBot+'Andreas ist 38 Jahre alt und lebt in Hamburg.'); }
            if  (~befehl.indexOf("--LEBENSLAUF"))     { bot.say(SefzigBot+'Sein Lebenslauf als druckbares PDF-Dokument: %[Lebenslauf.pdf](http://sefzig.net/text/seiten/Lebenslauf/dateien/Andreas_Sefzig_Lebenslauf.pdf)');
                                                        bot.say(SefzigBot+'Tabellarisches und ausformuliertes CV: %[Lebenslauf öffnen](http://sefzig.net/link/Lebenslauf/)'); }
            if  (~befehl.indexOf("--KOMPETENZEN"))    { bot.say(SefzigBot+'Text Kompetenzen: [Text:Kompetenzen] '); }
            if  (~befehl.indexOf("--DISZIPLINEN"))    { bot.say(SefzigBot+'Text Disziplinen: [Text:Disziplinen] '); }
            if  (~befehl.indexOf("--FOTO"))           { bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzignetStartseite/dateien/SefzignetStartseiteFotoLogos.png] Andreas Sefzig mit Logo'); }
            
         // -----------------
         // Neues
         // -----------------
         
         // Übersicht
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SefzigBot+'--neues '
                                                              +'\n○ --jobsuche '
                                                              +'\n○ --slack '
                                                              +'\n○ --rtm '); }
            
         // Befehle
            if  (~befehl.indexOf("--NEUES"))          { bot.say(SefzigBot  +'○ --jobsuche '
                                                              +'\n○ --slack / --rtm '
                                                              +'\n○ --newsletter ');
                                                        bot.say(SefzigBot  +' Was es bei Andreas --Neues gibt? So einiges... '); }
            
            if ((~befehl.indexOf("--FRISKY")) ||
                (~befehl.indexOf("--RADIO")) ||
                (~befehl.indexOf("--FRISKYRADIO")))   { bot.say(SefzigBot+'Frisky Radio: Global EDM [Audio:http://www.friskyradio.com/m3u/frisky.m3u] Mitglied seit 2003.'); }
            
            if  (~befehl.indexOf("--ROBOGEDDON"))     { bot.say(SefzigBot+'#Robogeddon ist Andreas Hashtag für den Einzug von Chatbots in unser Leben. [Text:Robogeddon] Bots werden die digitale Welt verändern! '); }
            
         // -----------------
         // Kontakt 
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SefzigBot+'--kontakt '
                                                              +'\n○ --kontaktSeite '
                                                              +'\n○ --kontaktTwitter '
                                                              +'\n○ --kontaktSlack '); }
            
            if  (~befehl.indexOf("--KONTAKT"))        { bot.say(SefzigBot+'Andreas E-Mail-Adresse: [Button:andreas@sefzig.net,mailto:andreas@sefzig.net] Andreas Kontaktdaten: [Text:SefzignetKontakt]');
                                                        bot.say(SefzigBot+'Besuchen Sie Andreas auf --Twitter und --Xing oder treten Sie seinem offenen --SlackTeam bei!');
                                                        bot.say(SefzigBot+'Rufen Sie Andreas an! [Button:0151 - 15 92 00 82,tel:+4915115920082] (D1 Telekom)'); }
            if  (~befehl.indexOf("--SLACKTEAM"))      { bot.say(SefzigBot+'Andreas betreibt ein offenes Slack-Team, in dem man sich über Marketing-Technologie unterhält. %[Slack-Team öffnen](http://sefzig.net/link/SlackAnmeldung/)'); }
            if  (~befehl.indexOf("--XING"))           { bot.say(SefzigBot+'Andreas ist bei Xing: Er ist seit 2004 angemeldet und gehört mit über 500 Kontakten zu den 5% der bestvernetzten Mitglieder. %[Xing-Profil öffnen](http://sefzig.net/link/XingProfil/)'); 
                                                        bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/xing_vernetzt.png]'); }
            if  (~befehl.indexOf("--TWITTER"))        { bot.say(SefzigBot+'Andreas ist auf Twitter: Er ist seit 2008 angemeldet, hat beinahe 500 Follower und sah sich kürzlich gezwungen, alle Tweets zu löschen: Neustart 2016. %[Twitter-Profil öffnen](http://sefzig.net/link/TwitterProfil/)'); 
                                                        bot.say(SefzigBot+'Schreiben Sie einen Tweet über @sefzig: %[@sefzig twittern](http://sefzig.net/link/TwitterTweet/)'); }
            
         // -----------------
         // Tests
         // -----------------
         
            if  (~befehl.indexOf("--JAVASCRIPT"))     { bot.say(SefzigBot+'[Javascript:test_alert]'); }
            if  (~befehl.indexOf("--VIDEO"))          { bot.say(SefzigBot+'[Youtube:u07XONlDwX8]'); }
            
         // -----------------
         // Vorlage
         // -----------------
         
            if  (~befehl.indexOf("--VORLAGE"))        { bot.say(SefzigBot+'Text: Vorlage.'); }
            
         // .then(function(){ bot.say(''); })
            return bot.setProp('register', 'gesprochen')
                .then(() => gehezu);
        }
    },

 // -------------------------
 // Link
 // -------------------------
    
    link: {
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = message.text.trim().toUpperCase();
            
         // Nächster Schritt default
            var gehezu = "link";
            
         // Befehle
            if ((~befehl.indexOf("--BEFEHLE")) ||
                (~befehl.indexOf("--LINK")))          { bot.say(LinkBot  +'--Link '
                                                              +'\n○ --Eingabe '
                                                              +'\n○ --Liste '
                                                              +'\n○ --Listen '
                                                              +'\n○ --Einrichten '
                                                              +'\n○ --Admin '
                                                              +'\n○ --Über'),
                                                        bot.say(LinkBot  +'Andreas speichert interessante Links für sich und andere: %[Linkliste öffnen](http://sefzig.net/link/liste/)'); }
            if ((~befehl.indexOf("--BOT")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(LinkBot  +'Zurück an Sefzig --Bot. Bis später!');
                                                        gehezu = "register"; }
            
         // Inhalte
            if ((~befehl.indexOf("--EINGABE")) ||
                (~befehl.indexOf("--EINGEBEN")))      { bot.say(LinkBot  +'Fügen Sie einen Link zu Andreas Liste hinzu! %[Link: Eingabe](http://sefzig.net/link/)'); }
            if  (~befehl.indexOf("--EINRICHTEN"))     { bot.say(LinkBot  +'Jeder kann Link benutzen. Die Einrichtung ist einfach und interaktiv: %[Link: Einrichtung](http://sefzig.net/link/einrichten/)'); }
            if  (~befehl.indexOf("--ADMIN"))          { bot.say(LinkBot  +'In der Administration werden die Links verwaltet: %[Link: Administration](http://sefzig.net/link/admin/)'); }
            if  (~befehl.indexOf("--UBER"))           { bot.say(LinkBot  +'"Link" ist  gut dokumentiert - hier Andreas Text dazu: %[Link: Dokumentation](http://sefzig.net/text/link/)'); }
            if  (~befehl.indexOf("--LISTE"))          { bot.say(LinkBot  +'Alle Links von Andreas fließen in eine filterbare Linkliste ein: %[Link: Allgemeine Liste](http://sefzig.net/link/liste/)'); }
            if ((~befehl.indexOf("--UBER")) ||
                (~befehl.indexOf("--ÜBER")))          { bot.say(LinkBot  +'"Link" ist eine Web-Anwendung zur Verwaltung von Links. Hier die Dokumentation: [Text:link] Link basiert auf der Open Source-Software Yourls: %[Externer Link: Yourls](http://yourls.org)'); }
            
         // Linklisten
            if ((~befehl.indexOf("--LINKS")) ||
                (~befehl.indexOf("--LISTEN")))        { bot.say(LinkBot  +'Empfohlene Linklisten '
                                                              +'\n○ --Werkzeuge '
                                                              +'\n○ --Mappe '
                                                              +'\n○ --Innovation '
                                                              +'\n○ --Rtm '
                                                              +'\n○ --Anhang'); }
            if  (~befehl.indexOf("--WERKZEUGE"))      { bot.say(LinkBot  +'Das Netz ist voller nützlicher Werkzeuge - hier eine nützliche Linkliste: %[Linkliste: Werkzeuge](http://sefzig.net/link/liste/Werkzeug/)'); }
            if  (~befehl.indexOf("--MAPPE"))          { bot.say(LinkBot  +'Andreas produziert Links am laufenden Band: %[Linkliste: Mappe](http://sefzig.net/link/liste/Mappe/)'); }
            if  (~befehl.indexOf("--INNOVATION"))     { bot.say(LinkBot  +'Links zu innovativen Ideen und Techniken aus Marketing und Kultur: %[Linkliste: Innovationen](http://sefzig.net/link/liste/Innovation/)'); }
            if  (~befehl.indexOf("--RTM"))            { bot.say(LinkBot  +'Real Time Messaging wird schon 2016 Robogeddon über das Marketing bringen! %[Linkliste: Rtm](http://sefzig.net/link/liste/Rtm/)'); }
            if  (~befehl.indexOf("--ANHANG"))         { bot.say(LinkBot  +'In dieser Liste hält Andreas Unterhaltsames fest: %[Linkliste: Anhang](http://sefzig.net/link/liste/Anhang/)'); }
            
         // Konversation fortführen
         // .then(function(){ bot.say(''); })
            return bot.setProp('link', 'gesprochen')
                .then(() => gehezu);
            
        }
        
    },

 // -------------------------
 // Text
 // -------------------------
    
    text: {
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = message.text.trim().toUpperCase();
            
         // Nächster Schritt default
            var gehezu = "text";
            
         // Befehle
            if ((~befehl.indexOf("--BEFEHLE")) ||
                (~befehl.indexOf("--TEXT")))          { bot.say(TextBot  +'--Text '
                                                              +'\n○ --Startseite '
                                                              +'\n○ --Hilfe '
                                                              +'\n○ --Über');
                                                        bot.say(TextBot  +'Andreas speichert interessante Links für sich und andere: %[Linkliste öffnen](http://sefzig.net/link/liste/)'); }
            if ((~befehl.indexOf("--BOT")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(TextBot  +'Zurück an Sefzig --Bot. Bis später!');
                                                        gehezu = "register"; }
            
         // Inhalte
            if  (~befehl.indexOf("--STARTSEITE"))     { bot.say(TextBot  +'Auf der Startseite können bestehende Texte geöffnet oder ein neuer Text angelegt werden: %[Startseite öffnen](http://sefzig.net/text/)'); }
            if  (~befehl.indexOf("--HILFE"))          { bot.say(TextBot  +'Die Hilfeseite erklärt Text, die Wikisprache Textile und die verfügbaren Inhalts-Module: %[Hilfe öffnen](http://sefzig.net/text/)'); }
            if  (~befehl.indexOf("--UBER"))           { bot.say(TextBot  +'"Text" ist eine Web-Anwendung zur Verwaltung von Texten wie Notizen, Artikel, Whitepapers, Wikis und sogar Präsentationen.');
                                                        bot.say(TextBot  +'Hier die Dokumentation: [Text:text] ');
                                                        bot.say(TextBot  +'Andreas hat Text entwickelt, um sich und seinem Umfeld einen leichteren Umgang mit Texten zu verschaffen.'); }
            
         // Konversation fortführen
            return bot.setProp('text', 'gesprochen')
                .then(() => gehezu);
            
        }
        
    },

 // -------------------------
 // Slack
 // -------------------------
    
    slack: {
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = message.text.trim().toUpperCase();
            
         // Nächster Schritt default
            var gehezu = "slack";
            
         // Befehle
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SlackBot +'--Slack '
                                                              +'\n○ --Über '
                                                              +'\n○ --Artikel '
                                                              +'\n○ --Blogpost '
                                                              +'\n○ --Links '
                                                              +'\n○ --Team'); }
            if ((~befehl.indexOf("--BOT")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(SlackBot +'Zurück an Sefzig --Bot. Bis später!');
                                                        gehezu = "register"; }
            
         // Inhalte
            if ((~befehl.indexOf("--UBER")) ||
                (~befehl.indexOf("--ÜBER")))          { bot.say(SlackBot +'Slack ist zur Zeit die beste Chat-Anwendung für Teams. Bedienfreundlich, automatisierbar und operationalisierbar. Über Slack wurde Andreas auf #Robogeddon aufmerksam!');
                                                        bot.say(SlackBot +'[Bild:http://sefzig.net/text/seiten/SefzignetSlack/dateien/slack_logo.png]');
                                                        bot.say(SlackBot +'Lesen Sie Andreas --Artikel oder --Blogpost, öffnen Sie seine --Links oder treten Sie Andreas offenem --Team bei.'); }
            if  (~befehl.indexOf("--ARTIKEL"))        { bot.say(SlackBot +'Andreas hat einen fundierten Artikel zu Slack geschrieben: [Text:Slack] Was Sie als Marketer über Slack wissen müssen.'); }
            if  (~befehl.indexOf("--BLOGPOST"))       { bot.say(SlackBot +'Lesen Sie auch Andreas Blogpost zu Slack: [Text:SefzignetBlogSlack] Was ist Slack und wie nutzt man es? '); }
            if  (~befehl.indexOf("--LINKS"))          { bot.say(SlackBot +'Andreas hat viele Artikel zu Slack gesammelt: [Linkliste:Slack;Artikel] '); }
            if  (~befehl.indexOf("--TEAM"))           { bot.say(SlackBot +'Treten Sie dem offenen Slack-Team von Andreas bei, um sich mit ihm zu beraten und um Slack im laufenden Betrieb zu sehen: [Button:Anmeldung,http://sefzig.net/link/SlackAnmeldung/] '); }
            
         // Konversation fortführen
            return bot.setProp('text', 'gesprochen')
                .then(() => gehezu);
            
        }
        
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then(() => 'finish');
        }
    }
});
