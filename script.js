'use strict';

const Script = require('smooch-bot').Script;
const SefzigBot = "[SefzigBot] ";
const LinkBot = "[LinkBot] ";
const TextBot = "[TextBot] ";
const SlackBot = "[SlackBot] ";
const AndreasSefzig = "[AndreasSefzig] ";
const Empfangsbot = "[EmpfangsBot] ";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(SefzigBot+'Nicht so schnell bitte...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say(SefzigBot+'Neues Skript.')
                .then(() => 'register'); /* <-- vorname: automatisches Onboarding */
        }
    },

 // -------------------------
 // Onboarding 
 // -------------------------
    
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
                .then(() => bot.say(SefzigBot+'Bitte bestätigen Sie, indem Sie --ja oder --nein schreiben!'))
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
            
            if  (~befehl.indexOf("--SLACK"))          { bot.say(EmpfangsBot +'Andreas mag Interne Kommunikation und Automatisierung - er liebt Slack! Das sollte Ihr Team auch tun...');
                                                        bot.say(EmpfangsBot +'(Schreiben Sie --bot, um wieder mit SefzigBot zu sprechen.)');
                                                        bot.say(EmpfangsBot +'Lesen Sie Andreas --Artikel oder --Blogpost, öffnen Sie seine --Links oder treten Sie Andreas offenem Slack --Team bei.');
                                                        dann = "slack"; } 
            if  (~befehl.indexOf("--EMPFANG"))        { bot.say(EmpfangsBot +'Empfang 1.');
                                                        bot.say(EmpfangsBot +'Empfang 2.');
                                                        bot.say(EmpfangsBot +'Empfang 3.');
                                                        dann = "empfang"; } 
            
         // -----------------
         // System
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(EmpfangsBot+'--bot '
                                                              +'\n○ --mobil '
                                                              +'\n○ --befehle '
                                                              +'\n○ --abbrechen '); }
            
            if ((~befehl.indexOf("--BOT")) ||
                (~befehl.indexOf("--UBER")))          { bot.say(EmpfangsBot+'Ich weiß eine Menge über Andreas - und bin sein Ersatz für eine klassische Webseite. Rufen Sie mein Wissen durch Schreiben der mit -- beginnenden Wörter ab!');
                                                        bot.say(EmpfangsBot+'Wollen Sie etwas über seine --Person oder --Neues von ihm erfahren? Oder auf anderem Wege --Kontakt  aufnehmen?'); }
            if  (~befehl.indexOf("--ABBRECHEN"))      { bot.say(EmpfangsBot+'Sie können das Gespräch mit mir beenden'); }
            if  (~befehl.indexOf("--MOBIL"))          { bot.say(EmpfangsBot+'Diesen Chat mobil öffnen: [Bild:https://zxing.org/w/chart?cht=qr&chs=200x200&chld=L&choe=UTF-8&chl=http%3A%2F%2Fsefzigbot.herokuapp.com%2F]');
                                                        bot.say(EmpfangsBot+'(Leider werden Sie dort nicht wiedererkannt. Das sollte in einer späteren Version möglich sein...)'); }
            if  (~befehl.indexOf("--NAME"))           { dann = "name"; }
            
         // -----------------
         // Tests
         // -----------------
         
            if  (~befehl.indexOf("--JAVASCRIPT"))     { bot.say(EmpfangsBot+'[Javascript:test_alert]'); }
            if  (~befehl.indexOf("--VIDEO"))          { bot.say(EmpfangsBot+'[Youtube:u07XONlDwX8]'); }
            
         // -----------------
         // Vorlage
         // -----------------
         
            if  (~befehl.indexOf("--VORLAGE"))        { bot.say(EmpfangsBot+'Text: Vorlage.'); }
            
         // .then(function(){ bot.say(''); })
            return bot.setProp('register', 'gesprochen')
                .then(() => dann);
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

 // -------------------------
 // Empfangs-Bot
 // -------------------------
    
    empfang: {
    	
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = message.text.trim().toUpperCase();
            
         // Nächster Schritt default
            var dann = "empfang";
            
         // Befehle
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(EmpfangsBot +'--Empfang '
                                                              +'\n○ --Folgt '
                                                              +'\n○ --Folgt '
                                                              +'\n○ --Folgt '
                                                              +'\n○ --Folgt '
                                                              +'\n○ --Folgt'); }
                                                              
            if ((~befehl.indexOf("--ZURÜCK")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(EmpfangsBot +'Bis später!');
                                                        dann = "register"; }
            
         // Inhalte
            if ((~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--BEFEHL")))        { bot.say(EmpfangsBot +'Text Befehl.');
                                                        bot.say(EmpfangsBot +'Text Befehl.'); }
            if  (~befehl.indexOf("--ANDERS"))         { bot.say(EmpfangsBot +'Text Anders.'); }
            
         // Konversation fortführen
            return bot.setProp('empfang', 'gesprochen')
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
