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

var versuche_max = 3;
var versuche = 0;

var vorname = "Unbekannter";
var nachname = "Besucher";
var email = "";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(TechnikBot+'Nicht so schnell bitte...'),
        receive: () => 'processing'
    },

    start: {
    	
        receive: (bot) => {
            return bot.say(EmpfangsBot+'Darf ich Ihnen kurz unsere Agentur vorstellen? Dann schreiben (oder klicken) Sie bitte --Agentur!')
                .then(() => bot.say(EmpfangsBot+'Ich möchte Ihnen auch unsere --Kreation, die --Beratung und unsere --Technik vorstellen. \n Oder lassen Sie uns über --Strategie und --Konzeption reden.'))
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
            
            if (antwort == "--ÄNDERN")   { 
               
               bot.say(EmpfangsBot+'Gut, ändern wir Ihren Namen.');
               name_falsch == "ändern";
               dann = "vorname";
               
            }
            if (antwort == "--NAGUT")   { 
               
               bot.say(EmpfangsBot+'Wir werden sorgsam mit Ihren Daten umgehen.');
               name_falsch == "neu";
               dann = "vorname";
               
            }
            if (antwort == "--EMAIL")   { 
               
               bot.say(EmpfangsBot+'Wir senden Ihnen keinen Spam.');
               name_falsch == "email";
               dann = "email";
               
            }
            if (antwort == "--JA")   { 
               
               bot.say(EmpfangsBot+'Danke. Dürfte ich noch Ihre E-Mail-Adresse haben? Wenn ja, schreiben Sie bitte --Email. Ansonsten lassen Sie uns zurück zum --Empfang gehen.');
               name_falsch == "nein";
               dann = "name";
               
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
    	
        prompt: (bot) => bot.say(EmpfangsBot+'Wie heissen Sie mit Vornamen?'),
        receive: (bot, message) => {
            vorname = message.text;
            return bot.setProp('vorname', vorname)
                .then(() => bot.say(EmpfangsBot+`${vorname}, prima.`))
                .then(() => 'nachname');
        }
    },

    nachname: {
    	
        prompt: (bot) => bot.say(EmpfangsBot+'Und wie heissen Sie mit Nachnamen?'),
        receive: (bot, message) => {
            nachname = message.text; 
            bot.setProp('nachname', nachname);
            return bot.getProp('vorname')
                .then((vorname) => bot.say(EmpfangsBot+'Sie heissen also '+vorname+' '+nachname+', habe ich das richtig verstanden?'))
                .then(() => bot.say(EmpfangsBot+'Bitte bestätigen Sie, indem Sie --ja oder --nein schreiben!'))
                .then(() => 'name');
        }
    },

    email: {
    	
        receive: (bot, message) => {
            email = message.text; 
         // bot.setProp('email', email);
            return bot.getProp('email')
                .then((email) => bot.say(EmpfangsBot+'Ihre E-Mail-Adresse ist '+email+', korrekt?'))
                .then(() => bot.say(EmpfangsBot+'Wenn nicht, schreiben Sie bitte --Email.'))
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
            
         // Nicht-Befehl-Eingaben mitzählen
            var versuch = false;
            
         // -----------------
         // System
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { versuch = true; bot.say(EmpfangsBot+'--Befehle dieser Seite:'
                                                                              +'\n○ --Mobil '
                                                                              +'\n○ --Newsletter '
                                                                              +'\n○ --Kontakt '
                                                                              +'\n○ --Über ');
                                                                        befehl = "--THEMEN"; }
            if  (~befehl.indexOf("--THEMEN"))         { versuch = true; bot.say(EmpfangsBot+'Die Gewerke der --Agentur:'
                                                                              +'\n○ Andreas: --Strategie '
                                                                              +'\n○ Barbara: --Beratung '
                                                                              +'\n○ Cynthia: --Technik '
                                                                              +'\n○ Doris: --Kreation ');
                                                                        bot.say(AndreasSefzig+'Mehr über --Robogeddon:'
                                                                              +'\n○ --Gründung '
                                                                              +'\n○ --Vision '
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
                                               .then(function(){ return bot.say(EmpfangsBot+'Ich habe Andreas benachrichtigt.') })
                                               .then(function(){ return bot.say(EmpfangsBot+'Sprechen Sie solange mit mir! Bitte schreiben Sie --Empfang.'); }); } 
            if ((~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--ALICE")))         { versuch = true; bot.say(EmpfangsBot+'Ich würde Ihnen gerne unsere --Agentur vorstellen! Oder sprechen Sie direkt mit unserer --Kreation, --Technik oder der --Beratung.'); }
            
            if ((~befehl.indexOf("--KREATION")) ||
                (~befehl.indexOf("--DORIS")))         { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.')
                                               .then(function(){ return bot.say(KreationsBot+'Hallo, ich bin Doris, der Kreations-Bot. Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren.') })
                                               .then(function(){ return bot.say(KreationsBot+'Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in das Gespräch ein.') })
                                               .then(function(){ return bot.say(KreationsBot+'Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer!') });
                                                                        dann = "kreation"; } 
            if ((~befehl.indexOf("--BERATUNG")) ||
                (~befehl.indexOf("--BARBARA")))       { versuch = true; bot.say(BeratungsBot+'Schreiben Sie --empfang, um zum Empfang zurückzukehren.');
                                                                        dann = "beratung"; } 
            if ((~befehl.indexOf("--TECHNIK")) ||
                (~befehl.indexOf("--CYNTHIA")))       { versuch = true; bot.say(TechnikBot+'Schreiben Sie --empfang, wenn Sie zum Empfang wollen');
                                                                        dann = "technik";  } 
            
         // -----------------
         // Onboarding
         // -----------------
         
            if  (~befehl.indexOf("--NAME"))           { versuch = true; dann = "name";
            	                                                        var aussage = "";
            	                                                        
            	                                                        if ((vorname) && (vorname != "") && (vorname != "Unbekannter") && (nachname) && (nachname != "") && (nachname != "Besucher")) {
            	                                                           aussage = EmpfangsBot+'Ihr Name ist '+vorname+' '+nachname+'. Wollen Sie ihn ändern? Dann schreiben Sie bitte --ändern.';
                                                                        }
                                                                        else if ((vorname) && (vorname != "") && (vorname != "Unbekannter")) {
            	                                                           aussage = EmpfangsBot+'Ihr Vorname ist '+vorname+'. Wollen Sie Ihren Namen ändern? Dann schreiben Sie bitte --ändern.';
                                                                        }
                                                                        else if ((nachname) && (nachname != "") && (nachname != "Besucher")) {
            	                                                           aussage = EmpfangsBot+'Ihr Nachname ist '+nachname+'. Wollen Sie Ihren Namen ändern? Dann schreiben Sie bitte --ändern.';
                                                                        }
                                                                        else {
            	                                                           aussage = EmpfangsBot+'Ich kenne Ihren Namen noch nicht. Wollen Sie Ihren Namen eingeben? Dann schreiben Sie bitte --nagut.';
                                                                        }
                                                                        
                                                                        bot.say(aussage);
                                                                     }
            
         // -----------------
         // Agentur
         // -----------------
            
            if  (~befehl.indexOf("--AGENTUR"))        { versuch = true; bot.say(EmpfangsBot+'#Robogeddon ist auf Bots für externe und interne Unternehmens-Kommunikation spezialisiert.')
                                               .then(function(){ return bot.say(EmpfangsBot+'Wir bestehen aus Andreas Sefzig, einer Reihe moderner Marketing- und Kommunikations-Technologien und einem Team aus mehreren Bots.') })
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
         // Konversation fortführen
         // -----------------
         
         // Irrläufer
            if (versuch == true) { versuche = 0; }
            else { versuche++; if (versuche == versuche_max) {
               bot.say(EmpfangsBot+'Suchen Sie die --Befehle?');
               versuche = 0; }
            }
            
         // Weiterleiten
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
            
         // Nicht-Befehl-Eingaben mitzählen
            var versuch = false;
            
         // -----------------
         // Befehle
         // -----------------
         
            if ((~befehl.indexOf("--DORIS")) ||
                (~befehl.indexOf("--BEFEHLE")))       { versuch = true; bot.say(KreationsBot +'--Kreation '
                                                                              +'\n○ --Folgt '
                                                                              +'\n○ --Folgt '
                                                                              +'\n○ --Folgt '); }
            if ((~befehl.indexOf("--ALICE")) ||
                (~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { versuch = true; bot.say(KreationsBot+'Bis später!')
                                               .then(function(){ return bot.say(EmpfangsBot+'Willkommen zurück! Schreiben Sie --Befehle um zu sehen, was ich Ihnen noch zeigen kann.'); });
                                                                        dann = "register"; }
            
         // -----------------
         // Inhalte
         // -----------------
         
            if  (~befehl.indexOf("--LEBEN"))          { versuch = true; bot.say(KreationsBot +'Text Leben.'); }
            if  (~befehl.indexOf("--DIALOGE"))        { versuch = true; bot.say(KreationsBot +'Text Dialoge.'); }
            if  (~befehl.indexOf("--PERSÖNLICHKEIT")) { versuch = true; bot.say(KreationsBot +'Text Persönlichkeit.'); }
            if  (~befehl.indexOf("--GESCHICHTEN"))    { versuch = true; bot.say(KreationsBot +'Text Geschichten.'); }
            if  (~befehl.indexOf("--INHALTE"))        { versuch = true; bot.say(KreationsBot +'Text Inhalte.'); }
            if  (~befehl.indexOf("--MEHRWERTE"))      { versuch = true; bot.say(KreationsBot +'Text Mehrwerte.'); }
            if  (~befehl.indexOf("--KANÄLE"))         { versuch = true; bot.say(KreationsBot +'Text Kanäle.'); }
            if  (~befehl.indexOf("--FORMATE"))        { versuch = true; bot.say(KreationsBot +'Text Formate.'); }
            
         // -----------------
         // Konversation fortführen
         // -----------------
         
         // Irrläufer
            if (versuch == true) { versuche = 0; }
            else { versuche++; if (versuche == versuche_max) {
               bot.say(KreationsBot+'Suchen Sie die --Befehle?').then(function(){ return 
               bot.say(EmpfangsBot+'Oder wollen Sie zum --Empfang?'); });
               versuche = 0; }
            }
            
         // Weiterleiten
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
            
         // Nicht-Befehl-Eingaben mitzählen
            var versuch = false;
            
         // -----------------
         // Befehle
         // -----------------
         
            if ((~befehl.indexOf("--DORIS")) ||
                (~befehl.indexOf("--BEFEHLE")))       { versuch = true; bot.say(BeratungsBot +'--Beratung '
                                                                              +'\n○ --Folgt '
                                                                              +'\n○ --Folgt '
                                                                              +'\n○ --Folgt '); }
            if ((~befehl.indexOf("--ALICE")) ||
                (~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { versuch = true; bot.say(BeratungsBot+'Bis später!')
                                               .then(function(){ return bot.say(EmpfangsBot+'Willkommen zurück! Schreiben Sie --Befehle um zu sehen, was ich Ihnen noch zeigen kann.'); });
                                                                        dann = "register"; }
            
         // -----------------
         // Inhalte
         // -----------------
         
            if  (~befehl.indexOf("--XXX"))            { versuch = true; bot.say(BeratungsBot +'Text Xxx.'); }
            if  (~befehl.indexOf("--XXX"))            { versuch = true; bot.say(BeratungsBot +'Text Xxx.'); }
            if  (~befehl.indexOf("--XXX"))            { versuch = true; bot.say(BeratungsBot +'Text Xxx.'); }
            
         // -----------------
         // Konversation fortführen
         // -----------------
         
         // Irrläufer
            if (versuch == true) { versuche = 0; }
            else { versuche++; if (versuche == versuche_max) {
               bot.say(BeratungsBot+'Suchen Sie die --Befehle?').then(function(){ return 
               bot.say(EmpfangsBot+'Oder wollen Sie zum --Empfang?'); });
               versuche = 0; }
            }
            
         // Weiterleiten
            return bot.setProp('beratung', 'gesprochen') 
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
