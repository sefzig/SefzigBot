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
    var zuletzt = "";
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
               
                  bot.say(EmpfangsBot+' Start Unbekannt Text 1. ')
                  .then(() => bot.say(EmpfangsBot+' Start Empfang Text 2:  --Robogeddon, --Beratung, --Kreation, --Konzeption, --Strategie, --Technik. '))
                  .then(() => bot.say(EmpfangsBot+' Start Empfang Text 3. Hinweis Burger-Button. [Javascript:menu(an)] '));
                  
               }
               else {
               
                  bot.say(EmpfangsBot+' Start Bekannt Text 1: --Robogeddon. ')
                  .then(() => bot.say(EmpfangsBot+' Start Bekannt Text 2: --Beratung, --Kreation, --Konzeption, --Strategie, --Technik vorstellen. '));
               
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
            var dann = "name";
            
            if ((antwort == "--JA") ||
                (antwort == "--NAME") ||
                (antwort == "--ÄNDERN")) { 
               
            // bot.say(EmpfangsBot+'Wir werden sorgsam mit Ihren Daten umgehen.');
               dann = "vorname";
               
            }
            if ((antwort == "--NEIN") ||
                (antwort == "--EMPFANG") ||
                (antwort == "--ABBRECHEN")) {
               
               bot.say(EmpfangsBot+'Gehen wir zurück zum --Empfang.');
               dann = "empfang";
               
            }
            if ((antwort == "--EMAIL")) {
               
            // bot.say(EmpfangsBot+'Wir geben Ihre Adresse nicht weiter.');
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
            vorname = vorname.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
            
            return bot.setProp('vorname', vorname)
                .then(() => bot.say(EmpfangsBot+`${vorname}, prima. Und wie heissen Sie mit Nachnamen? [Javascript:cookies(vorname,`+vorname+`)] [Javascript:konsole(vorname erhalten)] `))
                .then(() => 'nachname');
        }
    },

    nachname: {
    	
        receive: (bot, message) => {
            
            nachname = message.text; 
            nachname = nachname.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
            
            bot.setProp('nachname', nachname);
            return bot.getProp('vorname')
                .then((vorname) => bot.say(EmpfangsBot+'Sie heissen also '+vorname+' '+nachname+'. Mögen Sie Ihre --Email -Adresse hinterlassen? Ansonsten lassen Sie uns zum --Empfang zurückkehren. [Javascript:cookies(nachname,'+nachname+')] [Javascript:konsole(nachname erhalten)] '))
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
                                                               return bot.say(TechnikBot+'Leider werden Sie dort nicht automatisch wiedererkannt. Wir arbeiten an einer Lösung...'); }).then(function(){
                                                               return bot.say(EmpfangsBot+'Oder öffnen Sie [Textlink:Robogeddon.herokuapp.com,http://sefzigbot.herokuapp.com] in Ihrem mobilen Browser.'); }); }
          
          if ((~befehl.indexOf("--UBER")) ||
              (~befehl.indexOf("--ÜBER")))          { versuch = true; bot.say(EmpfangsBot+'Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text.').then(function(){
                                                               return bot.say(EmpfangsBot+'Sprechen Sie mit unserer --Technik, um mehr zu erfahren!'); }); }
          
          if  (~befehl.indexOf("--ZURÜCK"))         { versuch = true; bot.say(EmpfangsBot+'Wollen Sie zurück zu --'+zuletzt+'?'); }
          
       // -----------------
       // Bots
       // -----------------
          
          if  (~befehl.indexOf("--SEFZIG"))         { versuch = true; bot.setProp('persönlich', '@sefzig').then(function(){
                                                               return bot.say(EmpfangsBot+'Hallo Sefzig Text 1.') }).then(function(){
                                                               return bot.say(EmpfangsBot+'Hallo Sefzig Text 2: --Empfang.'); }); } 
          
          if ((~befehl.indexOf("--EMPFANG")) ||
              (~befehl.indexOf("--ALICE")))         { versuch = true; bot.say(EmpfangsBot+'Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung.').then(function(){
                                                               return bot.say(EmpfangsBot+'Hallo Empfang Text 2: --Befehle.'); }); }
          
       // Vorlage (Gewerk, Name)
       // if ((~befehl.indexOf("--GEWERK")) ||
       //     (~befehl.indexOf("--NAME")))          { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Name. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
       //                                                      return bot.say(GewerksBot+'Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot.') }).then(function(){
       //                                                      return bot.say(GewerksBot+'Hallo Gewerk Text 2: Befehle: --Folgt.') }).then(function(){
       //                                                      return bot.say(GewerksBot+'Hallo Gewerk Text 3.') });
       //                                                             dann = "gewerk"; } 
          
          if ((~befehl.indexOf("--BERATUNG")) ||
              (~befehl.indexOf("--BARBARA")))       { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Barbara. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(BeratungsBot+'Hallo Beratung Text 1: Hallo, ich bin Barbara, der Beratungs-Bot.') }).then(function(){
                                                               return bot.say(BeratungsBot+'Hallo Beratung Text 2: Befehle: --Folgt.') }).then(function(){
                                                               return bot.say(BeratungsBot+'Hallo Beratung Text 3.') });
                                                                      dann = "beratung"; } 
          
          if ((~befehl.indexOf("--TECHNIK")) ||
              (~befehl.indexOf("--CYNTHIA")))       { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Cynthia. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(TechnikBot+'Hallo Technik Text 1: Hallo, ich bin Cynthia, der Technik-Bot.') }).then(function(){
                                                               return bot.say(TechnikBot+'Hallo Technik Text 2: Befehle: --Folgt.') }).then(function(){
                                                               return bot.say(TechnikBot+'Hallo Technik Text 3.') });
                                                                      dann = "technik"; } 
          
          if ((~befehl.indexOf("--KREATION")) ||
              (~befehl.indexOf("--DORIS")))         { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(KreationsBot+'Hallo Kreation Text 1: Hallo, ich bin Doris, der Kreations-Bot.') }).then(function(){
                                                               return bot.say(KreationsBot+'Hallo Kreation Text 2: Befehle: --Leben, --Dialoge, --Persönlichkeit, --Geschichten, --Inhalte, --Mehrwerte.') }).then(function(){
                                                               return bot.say(KreationsBot+'Hallo Kreation Text 3.') });
                                                                      dann = "kreation"; } 
          
          if ((~befehl.indexOf("--KONZEPTION")) ||
              (~befehl.indexOf("--ERIKA")))         { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Erika. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(KonzeptionsBot+'Hallo Konzeption Text 1: Hallo, ich bin Erika, der Konzeptions-Bot.') }).then(function(){
                                                               return bot.say(KonzeptionsBot+'Hallo Konzeption Text 2: Befehle: --Folgt.') }).then(function(){
                                                               return bot.say(KonzeptionsBot+'Hallo Konzeption Text 3.') });
                                                                      dann = "konzeption"; } 
          
          if ((~befehl.indexOf("--STRATEGIE")) ||
              (~befehl.indexOf("--FELINE")))        { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Feline. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(StrategieBot+'Hallo Strategie Text 1: Hallo, ich bin Feline, der Strategie-Bot.') }).then(function(){
                                                               return bot.say(StrategieBot+'Hallo Strategie Text 2: Befehle: --Folgt.') }).then(function(){
                                                               return bot.say(StrategieBot+'Hallo Strategie Text 3.') });
                                                                      dann = "strategie"; } 
          
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
       // Inhalte
       // -----------------
       
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
       // -----------------
       // Vorlagen
       // -----------------
       
       // Einzeilig
          if  (~befehl.indexOf("--VORLAGE"))        { versuch = true; bot.say(EmpfangsBot+' Text: Vorlage. '); }
          
       // Mehrzeilig
          if  (~befehl.indexOf("--VORLAGE"))        { versuch = true; bot.say(EmpfangsBot+' Vorlage Text 1. ').then(function(){
                                                               return bot.say(EmpfangsBot+' Vorlage Text 2. '); }).then(function(){
                                                               return bot.say(EmpfangsBot+' Vorlage Text 3. '); }); }
          
       // -----------------
       // Tests
       // -----------------
       
       // Inhalte
               if  (~befehl.indexOf("--TESTTEXT"))       { versuch = true; bot.say(SefzigBot+' [Text:Slack-Blogpost öffnen,SefzignetBlogSlack] Text.'); }
          else if  (~befehl.indexOf("--TESTBILD"))       { versuch = true; bot.say(SefzigBot+' [Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/Mesaging_vs_Social.png] Bild.'); }
          else if  (~befehl.indexOf("--TESTQR"))         { versuch = true; bot.say(SefzigBot+' [Qr:https://sefzigbot.herokuapp.com/] QR-Code.'); }
          else if  (~befehl.indexOf("--TESTYOUTUBE"))    { versuch = true; bot.say(SefzigBot+' [Youtube:u07XONlDwX8] Youtube.'); }
          
       // Links
          else if  (~befehl.indexOf("--TESTLINK"))       { versuch = true; bot.say(SefzigBot+' [Link:Testlink,ThinMedia] Link.'); }
          else if  (~befehl.indexOf("--TESTTEXTLINK"))   { versuch = true; bot.say(SefzigBot+' [Textlink:BI Intelligence Report,MessagingVsSocial] Textlink.'); }
          else if  (~befehl.indexOf("--TESTLINKLISTE"))  { versuch = true; bot.say(SefzigBot+' [Linkliste:Linkliste öffnen,Rtm:Strategie:Artikel] Linkliste.'); }
          else if  (~befehl.indexOf("--TESTBUTTON"))     { versuch = true; bot.say(SefzigBot+' [Button:Studie von Slack,http://slack.com/results] Button.'); }
          else if  (~befehl.indexOf("--TESTACTION"))     { versuch = true; bot.say(SefzigBot+' %[Ein Nachbau von ELIZA](http://sefzig.net/link/ElizaMedai/) Action.'); }
          
       // Javascript
          else if  (~befehl.indexOf("--TESTMENU"))       { versuch = true; bot.say(SefzigBot+' [Javascript:menu] Javascript ausgeführt: Menü.'); }
          else if  (~befehl.indexOf("--TESTALERT"))      { versuch = true; bot.say(SefzigBot+' [Javascript:alert(123)] Javascript ausgeführt: Alert.'); }
          else if  (~befehl.indexOf("--TESTKONSOLE"))    { versuch = true; bot.say(SefzigBot+' [Javascript:konsole(123)] Javascript ausgeführt: Konsole.'); }
          else if  (~befehl.indexOf("--TESTCOOKIE"))     { versuch = true; bot.say(SefzigBot+' [Javascript:cookies(test,123)] Javascript ausgeführt: Cookies.'); }
          
       // -----------------
       // Konversation fortführen
       // -----------------
          
       // Zurück merken
          zuletzt = "Empfang";
          
       // Irrläufer
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(EmpfangsBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
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
          
          if  (~befehl.indexOf("--ZURÜCK"))         { versuch = true; bot.say(KreationsBot+'Wollen Sie zurück zu --'+zuletzt+'?'); }
          
       // -----------------
       // Inhalte
       // -----------------
       
          
          
          
          
          
          
          
          
       // -----------------
       // Konversation fortführen
       // -----------------
       
       // Zurück merken
          zuletzt = "Kreation";
          
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
            