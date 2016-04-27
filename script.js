'use strict';

const Script = require('smooch-bot').Script;
const AndreasSefzig = "[AndreasSefzig] ";
const EmpfangsBot =   "[EmpfangsBot] ";
const BeratungsBot =  "[BeratungsBot] ";
const KreationsBot =  "[KreationsBot] ";
const TechnikBot =    "[TechnikBot] ";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(SefzigBot+'Nicht so schnell bitte...'), 
        receive: () => 'processing'
    },

 // -------------------------
 // Start 
 // -------------------------
    
 // 3 Welcome Whispers
 // https://app.smooch.io/apps/571777938ea8c63e0057cc1f/whispers
    
 // Übergabe an Register
    start: {
        receive: (bot) => {
            () => 'register')
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
         // System
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SefzigBot+'--empfang '
                                                              +'\n○ --kreation '
                                                              +'\n○ --beratung '
                                                              +'\n○ --technik '
                                                              +'\n○ --sefzig '); }
            
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
 // Onboarding 
 // -------------------------
    
    name: {
        receive: (bot, message) => {
            
            var antwort = message.text.trim().toUpperCase();
            var name_falsch = "";
            var dann = "";
            
            if (antwort == "--JA")   { 
               
               bot.say(SefzigBot+'Ich kenne Sie nun als');
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
            if ((~befehl.indexOf("--BEFEHL")) ||
                (~befehl.indexOf("--BEFEHL")))        { bot.say(EmpfangsBot +'Text Befehl.');
                                                        bot.say(EmpfangsBot +'Text Befehl.'); }
            if  (~befehl.indexOf("--BEFEHL"))         { bot.say(EmpfangsBot +'Text Befehl.'); }
            if  (~befehl.indexOf("--BEFEHL"))         { bot.say(EmpfangsBot +'Text Befehl.'); }
            if  (~befehl.indexOf("--BEFEHL"))         { bot.say(EmpfangsBot +'Text Befehl.'); }
            if  (~befehl.indexOf("--BEFEHL"))         { bot.say(EmpfangsBot +'Text Befehl.'); }
            
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
