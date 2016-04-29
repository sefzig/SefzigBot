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
                .then(() => bot.say(EmpfangsBot+'Ich möchte Ihnen gerne unsere --Kreation, die --Beratung und unsere --Technik vorstellen.'))
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
            
         // Nicht-Befehl-eingaben mitzählen
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
            if  (~befehl.indexOf("--MOBIL"))          { versuch = true; bot.say(EmpfangsBot+'Diesen Chat mobil öffnen: [Qr:https://sefzigbot.herokuapp.com/] ')
                                               .then(function(){ return bot.say(TechnikBot+'Leider werden Sie dort nicht wiedererkannt. Wir arbeiten an einer Lösung...'); }); }
            if ((~befehl.indexOf("--UBER")) ||
                (~befehl.indexOf("--ÜBER")))          { versuch = true; bot.say(EmpfangsBot+'Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text.')
                                               .then(function(){ return bot.say(EmpfangsBot+'Sprechen Sie mit unserer --Technik, um mehr zu erfahren!'); }); }
            
         // -----------------
         // Bots
         // -----------------
            
            if  (~befehl.indexOf("--SEFZIG"))         { versuch = true; bot.setProp('persönlich', '@sefzig')
                                               .then(function(){ return bot.say(AndreasSefzig+'Ich werde benachrichtigt.') })
                                               .then(function(){ return bot.say(EmpfangsBot+'Sprechen Sie solange mit mir! Bitte schreiben Sie --Empfang.'); }); } 
            if ((~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--ALICE")))         { versuch = true; bot.say(EmpfangsBot+'Ich würde Ihnen gerne unsere --Agentur vorstellen! Oder sprechen Sie direkt mit unserer --Kreation, --Technik oder der --Beratung.'); }
            
            if ((~befehl.indexOf("--KREATION")) ||
                (~befehl.indexOf("--DORIS")))         { versuch = true; bot.say(KreationsBot+'Schreiben Sie --empfang, um wieder mit Alice zu sprechen.')
                                               .then(function(){ return bot.say(KreationsBot+'Hallo, ich bin Doris, der Kreations-Bot. Befehle Kreation: --Folgt.'); });
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
            
            if  (~befehl.indexOf("--AGENTUR"))        { versuch = true; bot.say(EmpfangsBot+'#Robogeddon ist auf Bots für externe und interne Unternehmens-Kommunikation spezialisiert.')
                                               .then(function(){ return bot.say(EmpfangsBot+'Wir bestehen aus Andreas Sefzig, einer Reihe moderner Technologien und einem Team aus mehreren Bots.') })
                                               .then(function(){ return bot.say(EmpfangsBot+'Mehr über uns: ○ --Folgt.'); }); }
            
         // -----------------
         // Strategie
         // -----------------
            
            if  (~befehl.indexOf("--STRATEGIE"))      { versuch = true; bot.say(EmpfangsBot+'Für --Strategie ist Andreas zuständig, das können wir Bots nicht gut.')
                                               .then(function(){ return bot.say(AndreasSefzig+'Chatten ist bereits die häufigste digitale Beschäftigung in Deutschland (wie auch dem Rest der Welt, Quelle: Folgt).') })
                                               .then(function(){ return bot.say(AndreasSefzig+'Auch wenn es Chat-Bots schon lange gibt, werden sie auch gerade jetzt interessant, da Facebook, Slack, Telegram u.a. ihre Plattformen für Bots öffnen.') })
                                               .then(function(){ return bot.say(AndreasSefzig+'Interessieren Sie sich eher für Bots, die --intern (z.B. im Team) oder --extern (z.B. für Kunden) eingesetzt werden?'); }); }
            if  (~befehl.indexOf("--INTERN"))         { versuch = true; bot.say(AndreasSefzig+'Folgt.')
                                               .then(function(){ return bot.say(AndreasSefzig+'Folgt.') })
                                               .then(function(){ return bot.say(TechnikBot+'Wir in der Technik kommunizieren am liebsten über --Slack. Wir steuern darin sogar unsere Server! Aber auch HipChat bietet eine schöne Plattform für #ChatOps.'); }); }
            if  (~befehl.indexOf("--EXTERN"))         { versuch = true; bot.say(AndreasSefzig+'Folgt.')
                                               .then(function(){ return bot.say(AndreasSefzig+'Folgt.') })
                                               .then(function(){ return bot.say(KreationsBot+'Wir in der Kreation lieben es, interessante Dialoge zu erschaffen, die Nutzern einen konkreten Mehrwert bieten und sie mit reichhaltigen Inhalten unterhalten.'); }); }
            
         // -----------------
         // Tests
         // -----------------
         
            if  (~befehl.indexOf("--JAVASCRIPT"))     { versuch = true; bot.say(SefzigBot+'[Javascript:test_alert]'); }
            if  (~befehl.indexOf("--VIDEO"))          { versuch = true; bot.say(SefzigBot+'[Youtube:u07XONlDwX8]'); }
            if  (~befehl.indexOf("--REIHE"))          { versuch = true; bot.say('Sentence #1')
                                               .then(function(){ return bot.say('Sentence #2'); })
                                               .then(function(){ return bot.say('Sentence #3'); }); }
            
         // -----------------
         // Vorlage
         // -----------------
         
            if  (~befehl.indexOf("--VORLAGE"))        { versuch = true; bot.say(EmpfangsBot+'Text: Vorlage.'); }
            
         // -----------------
         // Irrläufer
         // -----------------
         
            var versuche = 0;
            var versuche_max = 3;
            
            if (versuch == true) { 
               
               bot.setProp('versuch', 0);
               bot.say(SefzigBot+'Versuch auf 0 gesetzt.');
               
            }
            else { 
               
            // bot.say(SefzigBot+'Max. Versuche: '+versuche_max+'.');
               
            // return bot.getProp('versuch')
            // .then((versuch) => bot.say(`Hello again, ${versuch}!`))
            // .then(() => 'register');
               
               return bot.getProp('versuch')
               .then((versuch) => bot.say(SefzigBot+'Es funktioniert: '+versuch))
               .then(() => 'register');
               
               
               
               
               
               
            /* 
               var versuche_objekt = bot.getProp('versuch');
               var versuche_text = JSON.stringify(versuche_objekt, null, 4); 
            // bot.say(SefzigBot+'Versuche bisher Objekt: '+versuche_text+'.');
               
               var versuche_bisher = versuche_objekt["_s"];
               if ((!versuche_bisher) || (versuche_bisher == "")) { versuche_bisher = 0; }
            // bot.say(SefzigBot+'Versuche bisher Wert: '+versuche_bisher+'.');
               
               var versuch = versuche_bisher - (-1);
               bot.setProp('versuch', versuch);
            // bot.say(SefzigBot+'Versuch hochgezählt: '+versuch+'.');
               
               if (versuch >= versuche_max) {
                  
                  bot.say(SefzigBot+'Versuche größer als Versuchen.');
                  bot.say(EmpfangsBot+'Wollen Sie zurück zum --Empfang?');
                  
                  bot.setProp('versuch', 0);
                  bot.say(SefzigBot+'Versuch auf 0 zurückgesetzt.');
                  
               }
             */
            }
            
         // -----------------
         // Konversation fortführen
         // -----------------
         
            return bot.setProp('versuch_tmp', '1')
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
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(KreationsBot+'Bis später!')
                                               .then(function(){ return bot.say(EmpfangsBot+'Willkommen zurück. Schreiben Sie --Befehle um zu sehen, was ich Ihnen noch zeigen kann.'); });
                                                                        dann = "register"; }
            
         // Inhalte
            if  (~befehl.indexOf("--ARTIKEL"))        { bot.say(KreationsBot +'Text Artikel.'); }
            if  (~befehl.indexOf("--BLOGPOST"))       { bot.say(KreationsBot +'Text Blogpost.'); }
            if  (~befehl.indexOf("--LINKS"))          { bot.say(KreationsBot +'Text Links.'); }
            
         // Konversation fortführen
            return bot.setProp('kreation', 'gesprochen') 
                .then(() => dann);
            
        }
        
    },

 // -------------------------
 // Beratung
 // -------------------------
    
    beratung: {
    	
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = befehlWort(message.text.trim().toUpperCase());
            
         // Nächster Schritt default
            var dann = "beratung";
            
         // Konversation fortführen
            return bot.setProp('beratung', 'gesprochen') 
                .then(() => dann);
            
        }
        
    },

    technik: {
    	
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = befehlWort(message.text.trim().toUpperCase());
            
         // Nächster Schritt default
            var dann = "technik";
            
         // Konversation fortführen
            return bot.setProp('technik', 'gesprochen') 
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
