'use strict';

const Script = require('smooch-bot').Script;
const AndreasSefzig = "[AndreasSefzig] ";
const SefzigBot =     "[SefzigBot] ";
const EmpfangsBot =   "[EmpfangsBot] ";
const KreationsBot =  "[KreationsBot] ";
const BeratungsBot =  "[BeratungsBot] ";
const LinkBot =       "[LinkBot] ";
const TextBot =       "[TextBot] ";
const SlackBot =      "[SlackBot] ";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(SefzigBot+'Nicht so schnell bitte...'),
        receive: () => 'processing'
    },

    start: {
    	
        receive: (bot) => {
            return bot.say(EmpfangsBot+'Darf ich Ihnen kurz unsere Agentur vorstellen? Dann schreiben Sie bitte --Agentur!')
                .then(() => bot.say(EmpfangsBot+'Oder darf ich Ihnen unsere --Kreation,  --Beratung und --Technik vorstellen?'))
                .then(() => bot.say(AndreasSefzig+'Ich bin gerade nicht online. Benachrichtigen Sie mich, indem Sie --Sefzig schreiben!'))
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
            if (antwort == "--ABBRECHEN") {
               
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
         // Onboarding
         // -----------------
            
            if  (~befehl.indexOf("--NAME"))           { dann = "name"; }
            
         // -----------------
         // Bots
         // -----------------
            
            if  (~befehl.indexOf("--KREATION"))       { bot.say(KreationsBot+'Schreiben Sie --empfang, um wieder mit Erika zu sprechen.');
                                                        bot.say(KreationsBot+'Hallo, ich bin Alice, der Kreations-Bot. Befehle Kreation: --Folgt.');
                                                        dann = "kreation"; } 
            if  (~befehl.indexOf("--BERATUNG"))       { dann = "beratung"; } 
            if  (~befehl.indexOf("--TECHNIK"))        { dann = "technik";  } 
            if  (~befehl.indexOf("--SEFZIG"))         { bot.say(AndreasSefzig+'Ich wurde benachrichtigt.'); bot.setProp('persönlich', '@sefzig'); } 
            
         // -----------------
         // System
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(EmpfangsBot+'--Befehle '
                                                              +'\n○ --Mobil '
                                                              +'\n○ --Über '); }
            if  (~befehl.indexOf("--MOBIL"))          { bot.say(EmpfangsBot+'Diesen Chat mobil öffnen: [Bild:https://zxing.org/w/chart?cht=qr&chs=200x200&chld=L&choe=UTF-8&chl=http%3A%2F%2Fsefzigbot.herokuapp.com?v=chat%2F]');
                                                        bot.say(EmpfangsBot+'(Leider werden Sie dort nicht wiedererkannt. Das sollte in einer späteren Version möglich sein...)'); }
            if ((~befehl.indexOf("--UBER")) ||
                (~befehl.indexOf("--ÜBER")))          { bot.say(EmpfangsBot+'#Robogeddon ist auf Bots für externe und interne Unternehmens-Kommunikation spezialisiert.');
                                                        bot.say(EmpfangsBot+'Wir bestehen aus Andreas Sefzig und mehreren Bots.');
                                                        bot.say(EmpfangsBot+'Empfang Befehle: ○ --Folgt.'); }
            
         // -----------------
         // Agentur
         // -----------------
            
            if  (~befehl.indexOf("--AGENTUR"))        { bot.say(EmpfangsBot+'Text Agentur.'); }
            
         // -----------------
         // Tests
         // -----------------
         
            if  (~befehl.indexOf("--JAVASCRIPT"))     { bot.say(SefzigBot+'[Javascript:test_alert]'); }
            if  (~befehl.indexOf("--VIDEO"))          { bot.say(SefzigBot+'[Youtube:u07XONlDwX8]'); }
            
         // -----------------
         // Vorlage
         // -----------------
         
            if  (~befehl.indexOf("--VORLAGE"))        { bot.say(EmpfangsBot+'Text: Vorlage.'); }
            
         // Konversation fortführen
            return bot.setProp('register', 'gesprochen')
            .then(() => dann);
        }
    },

 // -------------------------
 // Kreation
 // -------------------------
    
    kreation: {
    	
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = message.text.trim().toUpperCase();
            
         // Nächster Schritt default
            var dann = "kreation";
            
         // Befehle
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(KreationsBot +'--Kreation '
                                                              +'\n○ --Folgt '
                                                              +'\n○ --Folgt '
                                                              +'\n○ --Folgt '); }
            if ((~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(KreationsBot+'Zurück an Erika. Bis später!');
                                                        bot.say(EmpfangsBot+'Willkommen zurück. Schreiben Sie --Befehle um zu sehen, was ich Ihnen noch zeigen kann.');
                                                        dann = "register"; }
            
         // Inhalte
            if  (~befehl.indexOf("--ARTIKEL"))        { bot.say(KreationsBot +'Text Artikel.'); }
            if  (~befehl.indexOf("--BLOGPOST"))       { bot.say(KreationsBot +'Text Blogpost.'); }
            if  (~befehl.indexOf("--LINKS"))          { bot.say(KreationsBot +'Text Links.'); }
            
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
