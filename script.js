'use strict';

    const Script = require('smooch-bot').Script;
    
 // Bots
    const AndreasSefzig =  "[AndreasSefzig] ";
    const SefzigBot =      "[SefzigBot] ";
    const EmpfangsBot =    "[EmpfangsBot] ";
    const KreationsBot =   "[KreationsBot] ";
    const BeratungsBot =   "[BeratungsBot] ";
    const KonzeptionsBot = "[KonzeptionsBot] ";
    const StrategieBot =   "[StrategieBot] ";
    const TechnikBot =     "[TechnikBot] ";
    const LinkBot =        "[LinkBot] ";
    const TextBot =        "[TextBot] ";
    const SlackBot =       "[SlackBot] ";
    
 // Zähler
    var versuche_max = 3;
    var versuche = 0;
    var bekannt = false;
    
 // Daten
    var vorname = "Unbekannter";
    var nachname = "Besucher";
    var email = "test@sefzig.net";
    var emailkorrekt = true;
 // var emailregex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
 // Konversationen
    module.exports = new Script({
       
    // --------------
    // GESPRÄCH AN
    // --------------
       
    processing: {
        prompt: (bot) => bot.say(TechnikBot+'Nicht so schnell bitte...'),
        receive: () => 'processing'
    },

    start: {
    	
     // prompt: (bot) => bot.say(TechnikBot+'Starte...'),
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = befehlWort(message.text.trim());
            
         // Nächster Schritt default
            var dann = "empfang";
            
            if (~befehl.indexOf("Weiterleiten:")) {
               
            // bot.say(EmpfangsBot+'Ich leite Sie weiter.');
               
            }
            else {
               
               if (bekannt == false) {
               
                  bot.say(EmpfangsBot+' [Javascript:konsole(start bekannt false)] Start Unbekannt Text 1: --Robogeddon.')
                  .then(() => bot.say(EmpfangsBot+' Start Empfang Text 2: --Beratung, --Kreation, --Konzeption, --Strategie, --Technik.'))
                  .then(() => bot.say(EmpfangsBot+'Start Empfang Text 3. Hinweis Burger-Button.'));
                  
               }
               else {
               
                  bot.say(EmpfangsBot+'[Javascript:konsole(start bekannt true)] Start Bekannt Text 1: --Robogeddon.')
                  .then(() => bot.say(EmpfangsBot+'Start Bekannt Text 2: --Beratung, --Kreation, --Konzeption, --Strategie, --Technik vorstellen.'));
               
               }
            }
            
            return bot.setProp('empfangen', 'ja')
            .then(() => dann);
            
        }
    },

 // -------------------------
 // Onboarding
 // -------------------------
    
    name: {
    	
        receive: (bot, message) => {
            
            var antwort = befehlWort(message.text.trim().toUpperCase());
            var dann = "";
            
            if ((antwort == "--JA") ||
                (antwort == "--ÄNDERN")) { 
               
               bot.say(EmpfangsBot+'Wir werden sorgsam mit Ihren Daten umgehen.');
               dann = "vorname";
               
            }
            if ((antwort == "--NEIN") ||
                (antwort == "--EMPFANG") ||
                (antwort == "--ABBRECHEN")) {
               
               bot.say(EmpfangsBot+'Gehen wir zurück zum Empfang.');
               dann = "empfang";
               
            }
            if ((antwort == "--EMAIL")) {
               
               bot.say(EmpfangsBot+'Wir geben Ihre Adresse nicht weiter.');
               dann = "emailadresse";
               
            }
            
            return bot.setProp('name_eingabe', 'tmp')
                .then(() => dann);
        }
    },

    vorname: {
    	
        prompt: (bot) => bot.say(EmpfangsBot+'Wie heissen Sie mit Vornamen?'),
        receive: (bot, message) => {
            vorname = message.text;
            return bot.setProp('vorname', vorname)
                .then(() => bot.say(EmpfangsBot+`${vorname}, prima. [Javascript:cookies(vorname,`+vorname+`)] [Javascript:konsole(vorname erhalten)] `))
                .then(() => 'nachname');
        }
    },

    nachname: {
    	
        prompt: (bot) => bot.say(EmpfangsBot+'Und wie heissen Sie mit Nachnamen?'),
        receive: (bot, message) => {
            
            nachname = message.text; 
            bot.setProp('nachname', nachname);
            return bot.getProp('vorname')
                .then((vorname) => bot.say(EmpfangsBot+'Sie heissen also '+vorname+' '+nachname+'. Mögen Sie auch Ihre --Email -Adresse hinterlassen? Ansonsten lassen Sie uns zum --Empfang zurückgehen. [Javascript:cookies(nachname,'+nachname+')] [Javascript:konsole(nachname erhalten)] '))
                .then(() => 'name');
            
        }
    },

    emailadresse: {
    	
        prompt: (bot) => bot.say(EmpfangsBot+'Wie lautet Ihre E-Mail-Adresse?'),
        receive: (bot, message) => {
            
            email = message.text;
            
         // emailkorrekt = email.test(emailregex);
            emailkorrekt = true;
            
            if (emailkorrekt == true) {
            	
               return bot.setProp('email', email)
                  .then(() => bot.say(TechnikBot+''+email+' ist eine valide E-Mail-Adresse. [Javascript:cookies(email,'+email+')] [Javascript:konsole(emailadresse valide)] '))
                  .then(() => bot.say(EmpfangsBot+'Schreiben Sie --Email, um sie zu ändern. Oder lassen Sie uns zurück zum --Empfang gehen.'))
                  .then(() => 'empfang');
               
            }
            else {
            	
               return bot.say(TechnikBot+''+email+' wird nicht als E-Mail-Adresse erkannt. [Javascript:konsole(emailadresse invalide)]  ')
                  .then(() => bot.say(EmpfangsBot+'Bitte geben Sie Ihre E-Mail-Adresse nochmal ein - oder lassen Sie uns zum --Empfang zurückkehren.'))
                  .then(() => 'emailadresse');
               
            }
        }
    },

 // -------------------------
 // Empfang
 // -------------------------
    
    empfang: {
       
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "empfang";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // -----------------
       // System
       // -----------------
       
          if  (~befehl.indexOf("--BEFEHLE"))        { versuch = true; bot.say(EmpfangsBot+'--Befehle dieser Seite: '
                                                                            +'\n○ --Mobil '
                                                                            +'\n○ --Newsletter '
                                                                            +'\n○ --Kontakt '
                                                                            +'\n○ --Über').then(function(){
                                                               return bot.say(EmpfangsBot+'Text Empfang Befehle.') }); }
          if  (~befehl.indexOf("--MOBIL"))          { versuch = true; bot.say(EmpfangsBot+'Diesen Chat mobil öffnen: [Qr:https://sefzigbot.herokuapp.com/] ').then(function(){
                                                               return bot.say(TechnikBot+'Leider werden Sie dort nicht automatisch wiedererkannt. Wir arbeiten an einer Lösung...'); }); }
          if ((~befehl.indexOf("--UBER")) ||
              (~befehl.indexOf("--ÜBER")))          { versuch = true; bot.say(EmpfangsBot+'Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text.').then(function(){
                                                               return bot.say(EmpfangsBot+'Sprechen Sie mit unserer --Technik, um mehr zu erfahren!'); }); }
          
       // -----------------
       // Bots
       // -----------------
          
          if  (~befehl.indexOf("--SEFZIG"))         { versuch = true; bot.setProp('persönlich', '@sefzig').then(function(){
                                                               return bot.say(EmpfangsBot+'Sefzig Text 1.') }).then(function(){
                                                               return bot.say(EmpfangsBot+'Sefzig Text 2: --Empfang.'); }); } 
          
          if ((~befehl.indexOf("--EMPFANG")) ||
              (~befehl.indexOf("--ALICE")))         { versuch = true; bot.say(EmpfangsBot+'Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung.').then(function(){
                                                               return bot.say(EmpfangsBot+'Empfang Text 2: --Befehle.'); }); }
          
          if ((~befehl.indexOf("--KREATION")) ||
              (~befehl.indexOf("--DORIS")))         { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(KreationsBot+'Hallo, ich bin Doris, der Kreations-Bot. Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren.') }).then(function(){
                                                               return bot.say(KreationsBot+'Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein.') }).then(function(){
                                                               return bot.say(KreationsBot+'Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer!') });
                                                                      dann = "kreation"; } 
          
          if ((~befehl.indexOf("--BERATUNG")) ||
              (~befehl.indexOf("--BARBARA")))       { versuch = true; bot.say(EmpfangsBot+'Schreiben Sie --Empfang, um zum Empfang zurückzukehren.');
                                                                      dann = "beratung"; } 
          
          if ((~befehl.indexOf("--TECHNIK")) ||
              (~befehl.indexOf("--CYNTHIA")))       { versuch = true; bot.say(EmpfangsBot+'Schreiben Sie --Empfang, um zum Empfang zurückzukehren.');
                                                                      dann = "technik";  } 
          
          if ((~befehl.indexOf("--KONZEPTION")) ||
              (~befehl.indexOf("--ERIKA")))         { versuch = true; bot.say(EmpfangsBot+'Schreiben Sie --Empfang, um zum Empfang zurückzukehren.');
                                                                      dann = "konzeption";  } 
          
          if ((~befehl.indexOf("--STRATEGIE")) ||
              (~befehl.indexOf("--FELINE")))        { versuch = true; bot.say(EmpfangsBot+'Schreiben Sie --Empfang, um zum Empfang zurückzukehren.');
                                                                      dann = "konzeption";  } 
          
       // -----------------
       // Onboarding
       // -----------------
       
          if  (~befehl.indexOf("--NAME"))           { versuch = true; dann = "name";
          	                                                        var aussage = "";
          	                                                        
          	                                                        if ((vorname) && (vorname != "") && (vorname != "Unbekannter") && (nachname) && (nachname != "") && (nachname != "Besucher")) {
          	                                                           aussage = EmpfangsBot+'Ihr Name ist '+vorname+' '+nachname+'. Wollen Sie ihn --ändern?';
                                                                      }
                                                                      else if ((vorname) && (vorname != "") && (vorname != "Unbekannter")) {
          	                                                           aussage = EmpfangsBot+'Ihr Vorname ist '+vorname+'. Wollen Sie Ihren Namen --ändern oder --abbrechen?';
                                                                      }
                                                                      else if ((nachname) && (nachname != "") && (nachname != "Besucher")) {
          	                                                           aussage = EmpfangsBot+'Ihr Nachname ist '+nachname+'. Wollen Sie Ihren Namen --ändern oder --abbrechen?';
                                                                      }
                                                                      else {
          	                                                           aussage = EmpfangsBot+'Ich kenne Ihren Namen noch nicht. Wollen Sie Ihren Namen eingeben? Schreiben Sie bitte --ja oder --nein.';
                                                                      }
                                                                      
                                                                      bot.say(aussage);
                                                                   }
          
          if  (~befehl.indexOf("--EMAIL"))          { versuch = true; dann = "emailadresse";
          	                                                          bot.say(EmpfangsBot+'Wir geben Ihre E-Mail-Adresse nicht an Dritte weiter!');
                                                                   }
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
       // -----------------
       // Vorlagen
       // -----------------
       
          if  (~befehl.indexOf("--VORLAGE"))        { versuch = true; bot.say(EmpfangsBot+'Text: Vorlage.'); }
          
          if  (~befehl.indexOf("--VORLAGE"))        { versuch = true; bot.say(EmpfangsBot+'Vorlage Text 1.').then(function(){
                                                               return bot.say(EmpfangsBot+'Vorlage Text 2.'); }).then(function(){
                                                               return bot.say(EmpfangsBot+'Vorlage Text 3.'); }); }
          
       // Module / Tests
          if  (~befehl.indexOf("--MENU"))           { versuch = true; bot.say(SefzigBot+'Menü öffnen. [Javascript:menu]'); }
          if  (~befehl.indexOf("--ALERT"))          { versuch = true; bot.say(SefzigBot+'[Javascript:alert(123)]'); }
          if  (~befehl.indexOf("--KONSOLE"))        { versuch = true; bot.say(SefzigBot+'[Javascript:konsole(123)]'); }
          if  (~befehl.indexOf("--COOKIE"))         { versuch = true; bot.say(SefzigBot+'[Javascript:cookies(test,123)]'); }
          if  (~befehl.indexOf("--YOUTUBE"))        { versuch = true; bot.say(SefzigBot+'[Youtube:u07XONlDwX8]'); }
          if  (~befehl.indexOf("--LINKTEST"))       { versuch = true; bot.say(SefzigBot+'Ein Link: [Link:Testlink,ThinMedia]'); }
          
       // -----------------
       // Konversation fortführen
       // -----------------
       
       // Irrläufer
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(EmpfangsBot+'Suchen Sie die --Befehle?'); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('versuch_tmp', '1')
          .then(() => dann);
       }
    },

 // -------------------------
 // Kreation (Doris)
 // -------------------------
    
    kreation: {
  	
      receive: (bot, message) => {
          
       // Initialisierung
          var befehl = befehlWort(message.text.trim().toUpperCase()); // Befehl normalisieren
          var dann = "kreation"; // Nächster Schritt default
          var versuch = false; // Nicht-Befehl-Eingaben mitzählen
          
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
              (~befehl.indexOf("--ABBRECHEN")))     { versuch = true; bot.say(KreationsBot+'Bis später!').then(function(){
                                                               return bot.say(EmpfangsBot+'Willkommen zurück! Wie war es in der Kreation? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann.'); });
                                                                      dann = "empfang"; }
          
          
          
          
          
          
          
          
          
       // -----------------
       // Konversation fortführen
       // -----------------
       
       // Irrläufer
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(KreationsBot+'Suchen Sie die --Befehle?').then(function(){ 
             return bot.say(EmpfangsBot+'Wollen Sie zurück zum --Empfang?'); }); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('kreation', 'gesprochen')
              .then(() => dann);
          
       }
        
    },

    finish: {
       receive: (bot, message) => {
          return bot.getProp('name')
             .then(() => 'finish');
       }
    }
    
    // --------------
    // GESPRÄCH AUS
    // --------------
       
    });

 // Befehle
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
    
 // Bots vereinfachen
    function sagenhaft(befehl, dann, bot, text1, text2, text3, text4, text5) {
    // sagenhaft('Strategie', dann, bot,
    //    SefzigBot+'Chatten ist die häufigste digitale Beschäftigung in Deutschland: [Text:Aktuelle Statistiken,RobogeddonChatten] Ein weltweiter --Trend mit erheblichen absehbaren Auswirkungen auf die Benutzeroberflächen des Internets.',
    //    SefzigBot+'Chat-Bots gibt es schon --lange. Sie werden gerade jetzt für das Marketing interessant, weil die meisten Menschen mit Chatten vertraut sind und große Anwendungen wie --Facebook, --Slack u.a. ihre Plattformen für Bots öffnen.',
    //    SefzigBot+'Interessieren Sie sich eher für Bots, die --intern (z.B. mit Ihrem Team) oder --extern (z.B. mit Ihren Kunden) kommunizieren?'
    //  );  
       if  (~befehl.indexOf("--STRATEGIE")) { 
          
          versuch = true; 
          
          if ((text5) && (text5 != "")) {
             bot.say(text1).then(function(){
             return bot.say(text2) }).then(function(){
             return bot.say(text3) }).then(function(){
             return bot.say(text4) }).then(function(){
             return bot.say(text5); });
          }
          else if ((text4) && (text4 != "")) {
             bot.say(text1).then(function(){
             return bot.say(text2) }).then(function(){
             return bot.say(text3) }).then(function(){
             return bot.say(text4); });
          }
          else if ((text3) && (text3 != "")) {
             bot.say(text1).then(function(){
             return bot.say(text2) }).then(function(){
             return bot.say(text3); });
          }
          else if ((text2) && (text2 != "")) {
             bot.say(text1).then(function(){
             return bot.say(text2); });
          }
          else if ((text1) && (text1 != "")) {
             bot.say(text1);
          }
          
       }
       
    }
            