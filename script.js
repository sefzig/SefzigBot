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
            
            if (~befehl.indexOf("--EMPFANG"))         { bot.say(EmpfangsBot+'Empfang 1');
                                                        bot.say(EmpfangsBot+'Empfang 2');
                                                        bot.say(EmpfangsBot+'Empfang 3');
                                                        dann = "empfang"; } 
            
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
                                                              
            if ((~befehl.indexOf("--AUS")) ||
                (~befehl.indexOf("--ZURÜCK")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(EmpfangsBot +'Bis später!');
                                                        dann = "register"; }
            
         // Inhalte
            if ((~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--BEFEHL")))        { bot.say(EmpfangsBot +'Text Befehl.');
                                                        bot.say(EmpfangsBot +'Text Befehl.'); }
         // if  (~befehl.indexOf("--BEFEHL"))         { bot.say(EmpfangsBot +'Text Befehl.'); }
            
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
