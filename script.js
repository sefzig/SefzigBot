'use strict';

const Script = require('smooch-bot').Script;
const SefzigBot = "[SefzigBot] ";
const LinkBot = "[LinkBot] ";
const TextBot = "[TextBot] ";
const SlackBot = "[SlackBot] ";
const AndreasSefzig = "[AndreasSefzig] ";

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
            return bot.say(SefzigBot+'Neues Skript.')
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
        prompt: (bot) => bot.say(SefzigBot+'Und wie heissen Sie mit Nachnamen?'),
        receive: (bot, message) => {
            var nachname = message.text; 
            bot.setProp('nachname', nachname)
            return bot.getProp('vorname')
                .then((vorname) => bot.say(SefzigBot+`Sie heissen ${vorname} ${nachname}, ist das richtig?`))
                .then((vorname) => bot.say(SefzigBot+`Bitte bestätigen Sie, indem Sie --ja oder --nein schreiben!`))
                .then(() => 'name');
        }
    },

    name: {
        receive: (bot, message) => {
            
            var antwort = message.text.trim().toUpperCase();
            var name_falsch = "";
            var dann = "";
            
            if (antwort == "--JA")   { 
               
               bot.say(SefzigBot+'Sie können hier jederzeit eine Nachricht an Andreas schreiben!');
               bot.say(SefzigBot+'Unterhalten Sie sich mit mir: Bitte schreiben Sie --bot:');
               name_falsch == "nein";
               dann = "register";
               
            }
            if (antwort == "--NEIN") {
               
               name_falsch == "ja";
               dann = "vorname";
               
            }
            if (antwort == "--BOT") {
               
               name_falsch == "";
               dann = "register";
               
            }
            
            return bot.setProp('name_falsch', name_falsch)
                .then(() => dann);
        }
    },

 // -------------------------
 // Register
 // -------------------------
    
    register: {
        receive: (bot, message) => {
            
            var befehl = message.text.trim().toUpperCase();
            var dann = "register";
            
         // -----------------
         // Bots
         // -----------------
            
            if  (~befehl.indexOf("--SLACK"))          { bot.say(SlackBot +'Andreas mag Interne Kommunikation und Automatisierung - er liebt Slack! Das sollte Ihr Team auch tun...');
                                                        bot.say(SlackBot +'(Schreiben Sie --bot, um wieder mit SefzigBot zu sprechen.)');
                                                        bot.say(SlackBot +'Lesen Sie Andreas --Artikel oder --Blogpost, öffnen Sie seine --Links oder treten Sie Andreas offenem Slack --Team bei.');
                                                        dann = "slack"; } 
            
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
            if  (~befehl.indexOf("--NAME"))           { dann = "name"; }
            
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
                .then(() => dann);
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
            var dann = "link";
            
         // Befehle
            if ((~befehl.indexOf("--BEFEHLE")) ||
                (~befehl.indexOf("--LINK")))          { bot.say(LinkBot  +'--Link '
                                                              +'\n○ --Links '
                                                              +'\n○ --Listen '
                                                              +'\n○ --Liste '
                                                              +'\n○ --Eingabe '
                                                              +'\n○ --Einrichten '
                                                              +'\n○ --Admin '
                                                              +'\n○ --Über'),
                                                        bot.say(LinkBot  +'Andreas speichert interessante Links für sich und andere: %[Linkliste öffnen](http://sefzig.net/link/liste/)'); }
            if ((~befehl.indexOf("--BOT")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(LinkBot  +'Zurück an Sefzig --Bot. Bis später!');
                                                        dann = "register"; }
            
         // Inhalte
            if ((~befehl.indexOf("--EINGABE")) ||
                (~befehl.indexOf("--EINGEBEN")))      { bot.say(LinkBot  +'Fügen Sie einen Link zu Andreas Liste hinzu! %[Link: Eingabe](http://sefzig.net/link/)'); }
            if  (~befehl.indexOf("--EINRICHTEN"))     { bot.say(LinkBot  +'Jeder kann Link benutzen. Die Einrichtung ist einfach und interaktiv: %[Link: Einrichtung](http://sefzig.net/link/einrichten/)'); }
            if  (~befehl.indexOf("--ADMIN"))          { bot.say(LinkBot  +'In der Administration werden die Links verwaltet: %[Link: Administration](http://sefzig.net/link/admin/)'); }
            if  (~befehl.indexOf("--UBER"))           { bot.say(LinkBot  +'"Link" ist  gut dokumentiert - hier Andreas Text dazu: %[Link: Dokumentation](http://sefzig.net/text/link/)'); }
            if ((~befehl.indexOf("--UBER")) ||
                (~befehl.indexOf("--ÜBER")))          { bot.say(LinkBot  +'"Link" ist eine Web-Anwendung zur Verwaltung von Links. Hier die Dokumentation: [Text:link] Link basiert auf der Open Source-Software Yourls: %[Externer Link: Yourls](http://yourls.org)'); }
            
         // Linklisten
            if  (~befehl.indexOf("--LINKS"))          { bot.say(LinkBot  +'Alle Links von Andreas fließen in eine filterbare Linkliste ein: %[Link: Allgemeine Liste](http://sefzig.net/link/liste/)'); }
            if  (~befehl.indexOf("--LISTEN"))         { bot.say(LinkBot  +'Empfohlene Linklisten '
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
            
         // URL-Generator
            if  (~befehl.indexOf("--LISTE"))          { dann = "link_liste"; }
            
         // Konversation fortführen
            return bot.setProp('link', 'gesprochen')
                .then(() => dann);
            
        }
        
    },

 // URL-Generator 
    link_liste: { 
       prompt: (bot) => bot.say(LinkBot+'Schreiben Sie das Kürzel der Linkliste, um deren URLs zu generieren!'), 
       receive: (bot, message) => { var kurzel = message.text; return bot.setProp('link_liste', kurzel)    .then(() => 
          bot.say(LinkBot+`Die Linkliste     "${kurzel}": http://sefzig.net/link/liste/${kurzel}/.`))      .then(() => 
          bot.say(LinkBot+`Der RSS-Feed  von "${kurzel}": http://sefzig.net/link/liste/${kurzel}/rss/.`))  .then(() => 
          bot.say(LinkBot+`Der Json-Feed von "${kurzel}": http://sefzig.net/link/liste/${kurzel}/json/.`)) .then(() => 'link');
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
            var dann = "slack";
            
         // Befehle
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SlackBot +'--Slack '
                                                              +'\n○ --Über '
                                                              +'\n○ --Artikel '
                                                              +'\n○ --Blogpost '
                                                              +'\n○ --Links '
                                                              +'\n○ --Team'); }
            if ((~befehl.indexOf("--BOT")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(SlackBot +'Zurück an Sefzig --Bot. Bis später!');
                                                        dann = "register"; }
            
         // Inhalte
            if ((~befehl.indexOf("--UBER")) ||
                (~befehl.indexOf("--ÜBER")))          { bot.say(SlackBot +'Slack ist zur Zeit die beste Chat-Anwendung für Teams. Bedienfreundlich, automatisierbar und operationalisierbar. Über Slack wurde Andreas auf #Robogeddon aufmerksam!');
                                                        bot.say(SlackBot +'[Bild:http://sefzig.net/text/seiten/SefzignetSlack/dateien/slack_logo.png]'); }
            if  (~befehl.indexOf("--ARTIKEL"))        { bot.say(SlackBot +'Andreas hat einen fundierten Artikel zu Slack geschrieben: [Text:Slack] Was Sie als Marketer über Slack wissen müssen.'); }
            if  (~befehl.indexOf("--BLOGPOST"))       { bot.say(SlackBot +'Lesen Sie auch Andreas Blogpost zu Slack: [Text:SefzignetBlogSlack] Was ist Slack und wie nutzt man es? '); }
            if  (~befehl.indexOf("--LINKS"))          { bot.say(SlackBot +'Andreas hat viele Artikel zu Slack gesammelt: [Linkliste:Slack;Artikel] '); }
            if  (~befehl.indexOf("--TEAM"))           { bot.say(SlackBot +'Treten Sie dem offenen Slack-Team von Andreas bei, um sich mit ihm zu beraten und um Slack im laufenden Betrieb zu sehen: [Button:Anmeldung,http://sefzig.net/link/SlackAnmeldung/] '); }
            
         // Konversation fortführen
            return bot.setProp('text', 'gesprochen')
                .then(() => dann);
            
        }
        
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then(() => 'finish');
        }
    }
});
