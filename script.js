'use strict';

const Script = require('smooch-bot').Script;
const AndreasSefzig = "[AndreasSefzig] ";
const SefzigBot =     "[SefzigBot] ";
const EmpfangsBot =   "[EmpfangsBot] ";
const KreationsBot =  "[KreationsBot] ";
const BeratungsBot =  "[BeratungsBot] ";
const TechnikBot =    "[TechnikBot] ";
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
                .then(() => bot.say(EmpfangsBot+'Ich möchte Ihnen unsere --Kreation, die --Beratung und unsere --Technik vorstellen.'))
                .then(() => bot.say(AndreasSefzig+'Ich bin gerade nicht online. Lassen Sie mich benachrichtigen, indem Sie --Sefzig schreiben!'))
                .then(() => 'register'); /* <-- vorname: automatisches Onboarding */
        }
    },

 // -------------------------
 // Onboarding 
 // -------------------------
    
    name: {
    	
        receive: (bot, message) => {
            
            var antwort = befehlWort(message.text.trim().toUpperCase());
            var name_falsch = "";
            var dann = "";
            
            if (antwort == "--JA")   { 
               
               bot.say(EmpfangsBot+'Unterhalten Sie sich mit mir: Bitte schreiben Sie --Empfang!');
               name_falsch == "nein";
               dann = "register";
               
            }
            if (antwort == "--NEIN") {
               
               bot.say(EmpfangsBot+'Hm. Wie war das nochmal?');
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
 // Register
 // -------------------------
    
    register: {
    	
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = befehlWort(message.text.trim().toUpperCase());
            
         // Nächster Schritt default
            var dann = "register";
            
         // Fehler-Toleranz
            var versuch = false;
            
         // -----------------
         // Onboarding
         // -----------------
            
            if  (~befehl.indexOf("--NAME"))           { versuch = true; dann = "name"; }
            
         // -----------------
         // System
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { versuch = true; bot.say(EmpfangsBot+'Diese --Befehle unterstützen Sie beim Nutzen von #Robogeddon:'
                                                                              +'\n○ --Mobil '
                                                                              +'\n○ --Newsletter '
                                                                              +'\n○ --Über ');
                                                                        befehl = "--THEMEN"; }
            if  (~befehl.indexOf("--THEMEN"))         { versuch = true; bot.say(EmpfangsBot+'Diese Themen haben wir zur Zeit für Sie:'
                                                                              +'\n○ Alice: --Agentur '
                                                                              +'\n○ Barbara: --Beratung '
                                                                              +'\n○ Cynthia: --Technik '
                                                                              +'\n○ Doris: --Kreation '
                                                                              +'\n○ --Über '); }
            if  (~befehl.indexOf("--MOBIL"))          { versuch = true; bot.say(EmpfangsBot+'Diesen Chat mobil öffnen: [Qr:https://sefzigbot.herokuapp.com/] ');
                                                                        bot.say(TechnikBot+'Leider werden Sie dort nicht wiedererkannt. Wir arbeiten an einer Lösung...'); }
            if ((~befehl.indexOf("--UBER")) ||
                (~befehl.indexOf("--ÜBER")))          { versuch = true; bot.say(EmpfangsBot+'Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text.');
                                                                        bot.say(EmpfangsBot+'Sprechen Sie mit unserer --Technik, um mehr zu erfahren!'); }
            
         // -----------------
         // Bots
         // -----------------
            
            if  (~befehl.indexOf("--SEFZIG"))         { versuch = true; bot.say(AndreasSefzig+'Ich werde benachrichtigt.'); 
                                                                        bot.setProp('persönlich', '@sefzig');
                                                                        bot.say(EmpfangsBot+'Sprechen Sie solange mit mir! Bitte schreiben Sie --Empfang.'); } 
            if ((~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--ALICE")))         { versuch = true; bot.say(EmpfangsBot+'Ich würde Ihnen gerne unsere --Agentur vorstellen! Oder sprechen Sie direkt mit unserer --Kreation, --Technik oder der --Beratung.'); }
            
            if ((~befehl.indexOf("--KREATION")) ||
                (~befehl.indexOf("--DORIS")))         { versuch = true; bot.say(KreationsBot+'Schreiben Sie --empfang, um wieder mit Alice zu sprechen.');
                                                                        bot.say(KreationsBot+'Hallo, ich bin Doris, der Kreations-Bot. Befehle Kreation: --Folgt.');
                                                                        dann = "kreation"; } 
            if ((~befehl.indexOf("--BERATUNG")) ||
                (~befehl.indexOf("--BARBARA")))       { versuch = true; bot.say(BeratungsBot+'Schreiben Sie --empfang, um zum Empfang zurückzukehren.');
                                                                        dann = "beratung"; } 
            if ((~befehl.indexOf("--TECHNIK")) ||
                (~befehl.indexOf("--CYNTHIA")))       { versuch = true; bot.say(TechnikBot+'Schreiben Sie --empfang, wenn Sie zum Empfang wollen');
                                                                        dann = "technik";  } 
            
         // -----------------
         // Agentur
         // -----------------
            
            if  (~befehl.indexOf("--AGENTUR"))        { versuch = true; bot.say(EmpfangsBot+'#Robogeddon ist auf Bots für externe und interne Unternehmens-Kommunikation spezialisiert.');
                                                                        bot.say(EmpfangsBot+'Wir bestehen aus Andreas Sefzig und mehreren Bots.');
                                                                        bot.say(EmpfangsBot+'Mehr über uns: ○ --Folgt.'); }
            
         // -----------------
         // Tests
         // -----------------
         
            if  (~befehl.indexOf("--JAVASCRIPT"))     { versuch = true; bot.say(SefzigBot+'[Javascript:test_alert]'); }
            if  (~befehl.indexOf("--VIDEO"))          { versuch = true; bot.say(SefzigBot+'[Youtube:u07XONlDwX8]'); }
            
         // -----------------
         // Vorlage
         // -----------------
         
            if  (~befehl.indexOf("--VORLAGE"))        { versuch = true; bot.say(EmpfangsBot+'Text: Vorlage.'); }
            
         // -----------------
         // Irrläufer
         // -----------------
         
            var versuche = 0;
            var versuchen = 3;
            if (versuch == true) { bot.setProp('versuch', 0); }
            else { 
               var versuche = bot.getProp('versuch'); 
               bot.setProp('versuch', versuche++);
               if (versuche < versuchen) {
                  bot.say(EmpfangsBot+'Wollen Sie zurück zum --Empfang?');
                  bot.setProp('versuch', 0);
               }
            }
            
         // -----------------
         // Konversation fortführen
         // -----------------
         
            return bot.setProp('versuch', '1')
            .then(() => dann);
        }
    },

 // -------------------------
 // Kreation
 // -------------------------
    
    kreation: {
    	
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = befehlWort(message.text.trim().toUpperCase());
            
         // Nächster Schritt default
            var dann = "kreation";
            
         // Befehle
            if ((~befehl.indexOf("--DORIS")) ||
                (~befehl.indexOf("--BEFEHLE")))       { bot.say(KreationsBot +'--Kreation '
                                                                              +'\n○ --Folgt '
                                                                              +'\n○ --Folgt '
                                                                              +'\n○ --Folgt '); }
            if ((~befehl.indexOf("--ALICE")) ||
                (~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(KreationsBot+'Zurück an Alice. Bis später!');
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

    function befehlWort(befehl) {
       
         // Wenn die Nachricht nur ein Wort ist
            var test = befehl.split(" "); 
            if ((!test[1]) || (test[1] == "")) {
               
            // In Befehl umwandeln
               befehl = befehl.replace("--", "");
               befehl = "--"+befehl;
               
            // Satzzeichen entfernen
               befehl = befehl.replace(".", "");
               befehl = befehl.replace("!", "");
               befehl = befehl.replace("?", "");
               
            }
            
            return befehl;
            
    }
