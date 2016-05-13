
'use strict'; 

   const Script = require('smooch-bot').Script; 

// Bots   const AndreasSefzig = "[AndreasSefzig] "; 
   const SefzigBot = "[SefzigBot] "; 
   const EmpfangsBot = "[EmpfangsBot] "; 
   const KreationsBot = "[KreationsBot] "; 
   const BeratungsBot = "[BeratungsBot] "; 
   const KonzeptionsBot = "[KonzeptionsBot] "; 
   const StrategieBot = "[StrategieBot] "; 
   const TechnikBot = "[TechnikBot] "; 
   const LinkBot = "[LinkBot] "; 
   const TextBot = "[TextBot] "; 
   const SlackBot = "[SlackBot] "; 

// Variablen 
   var versuche_max = 3; 
   var versuche = 0; 
   var zuletzt = ""; 
   var bekannt = false;

// Daten 
   var vorname = "Unbekannter";
   var nachname = "Besucher";
   var email = "test@sefzig.net";
   var emailkorrekt = true;
// Konversationen 
   module.exports = new Script({ 
   
   // ---------------
   // GESPRÄCH ANFANG
   // ---------------
     
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
                
                                return bot.say(EmpfangsBot+' Start Unbekannt Text 1. ').then(() => bot.say(EmpfangsBot+' Start Unbekannt Text 2:  --Robogeddon, --Beratung, --Kreation, --Konzeption, --Strategie, --Technik. ')).then(() => bot.say(EmpfangsBot+' Start Unbekannt Text 3. Hinweis Burger-Button. [Javascript:menu(an)] ')).then(() => 'empfang');                
             }
             else {
                
                                return bot.say(EmpfangsBot+' Start Bekannt Text 1: --Robogeddon. ').then(() => bot.say(EmpfangsBot+' Start Bekannt Text 2: --Beratung, --Kreation, --Konzeption, --Strategie, --Technik vorstellen. ')).then(() => 'empfang');                
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
   
 // ---------------------------
 // Empfang (Alice)
 // ---------------------------
 // - name_klein: empfang
 // - name_kamel: Empfang
 // - name_gross: EMPFANG
 // - frau_klein: alice
 // - frau_kamel: Alice
 // - frau_gross: ALICE
 // - bot_name:   EmpfangsBot
 // - bot_klein:  empfangsbot
 // - bot_kamel:  Empfangsbot
 // - bot_gross:  EMPFANGSBOT
 // ---------------------------
 
    empfang: {
  	
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "empfang";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // Default-Zurück
          var zuruck = "Empfang";
          
       // -----------------
       // Befehle
       // -----------------
          
          if ("empfang" != "empfang") {
          	 
             if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Empfang? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Empfang? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ABBRECHEN")) { versuch = true; return bot.say(EmpfangsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Empfang? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }             
          }
          
          if (zuletzt != "Empfang") { 
             
             if  (~befehl.indexOf("--ZURüCK")) { versuch = true; return bot.say(+' 0 ').then(() => 'empfang'); }             
          } 
          else {
             
             if  (~befehl.indexOf("--ZURüCK")) { versuch = true; return bot.say(EmpfangsBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'empfang'); }             
          }
          
       // -----------------
       // Onboarding
       // -----------------
          
       	 if ((vorname) && (vorname != "") && (vorname != "Unbekannter") && (nachname) && (nachname != "") && (nachname != "Besucher")) {
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(+' 0 ').then(() => 'name'); }             
          }
          else if ((vorname) && (vorname != "") && (vorname != "Unbekannter")) {
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(+' 0 ').then(() => 'name'); }             
          }
          else if ((nachname) && (nachname != "") && (nachname != "Besucher")) {
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(+' 0 ').then(() => 'name'); }             
          }
          else {
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(EmpfangsBot+' Wir kennen Ihren Namen noch nicht. Wollen Sie Ihren Namen eingeben? Schreiben Sie bitte --ja oder --nein. ').then(() => 'name'); }             
          }
          
          if  (~befehl.indexOf("--EMAIL")) { versuch = true; return bot.say(EmpfangsBot+' Wir geben Ihre E-Mail-Adresse nicht an Dritte weiter! ').then(() => 'emailadresse'); }          
       // -----------------
       // System
       // -----------------
       
          if  (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(EmpfangsBot+' --Befehle dieser Seite:, --Mobil, --Newsletter, --Kontakt, --Über ').then(() => 'empfang'); }          
          if  (~befehl.indexOf("--MOBIL")) { versuch = true; return bot.say(EmpfangsBot+' Diesen Chat mobil öffnen: [Qr:https://sefzigbot.herokuapp.com/] ').then(() => bot.say(TechnikBot+' Leider werden Sie dort nicht automatisch wiedererkannt. Wir arbeiten an einer Lösung... ')).then(() => bot.say(EmpfangsBot+' Oder öffnen Sie [Textlink:Robogeddon.herokuapp.com,http://sefzigbot.herokuapp.com] in Ihrem mobilen Browser. ')).then(() => 'empfang'); }
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(EmpfangsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => bot.say(EmpfangsBot+' Sprechen Sie mit unserer --Technik, um mehr zu erfahren. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--üBER")) { versuch = true; return bot.say(EmpfangsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => bot.say(EmpfangsBot+' Sprechen Sie mit unserer --Technik, um mehr zu erfahren. ')).then(() => 'empfang'); }          
       // -----------------
       // Bots
       // -----------------
          
       // Vorlage (Gewerk, Name)
          if  (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Name. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Name. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }
          if  (~befehl.indexOf("--SEFZIG")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Sefzig Text 1. ').then(() => bot.say(EmpfangsBot+' Hallo Sefzig Text 2: --Empfang. ')).then(() => 'empfang'); }
          if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }          
          if  (~befehl.indexOf("--BERATUNG")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Barbara. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo Beratung Text 1: Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Barbara. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo Beratung Text 1: Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }		   
		    if  (~befehl.indexOf("--TECHNIK")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Cynthia. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo Technik Text 1: Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }if  (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Cynthia. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo Technik Text 1: Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }		    
          if  (~befehl.indexOf("--KREATION")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo Kreation Text 1: Hallo, ich bin Doris, der Kreations-Bot. ')).then(() => bot.say(KreationsBot+' Hallo Kreation Text 2: Befehle: --Leben, --Dialoge, --Persönlichkeit, --Geschichten, --Inhalte, --Mehrwerte. ')).then(() => bot.say(KreationsBot+' Hallo Kreation Text 3. ')).then(() => 'kreation'); }if  (~befehl.indexOf("--DORIS")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo Kreation Text 1: Hallo, ich bin Doris, der Kreations-Bot. ')).then(() => bot.say(KreationsBot+' Hallo Kreation Text 2: Befehle: --Leben, --Dialoge, --Persönlichkeit, --Geschichten, --Inhalte, --Mehrwerte. ')).then(() => bot.say(KreationsBot+' Hallo Kreation Text 3. ')).then(() => 'kreation'); }		    
		    if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Erika. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 1: Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--ERIKA")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Erika. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 1: Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }		    
		    if  (~befehl.indexOf("--STRATEGIE")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Feline. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo Strategie Text 1: Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }if  (~befehl.indexOf("--FELINE")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Feline. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo Strategie Text 1: Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }
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
       // Inhalte
       // -----------------
          
       // -----------------
       // Bot aus
       // -----------------
       
       // Zurück merken
          zuletzt = zuruck;
          
       // Irrläufer
       // if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
       //    bot.say(EmpfangsBot+'Suchen Sie meine --Befehle?').then(function(){ 
       //    return bot.say(EmpfangsBot+'Wollen Sie zurück zum --Empfang?'); }); versuche = 0; }
       // }
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(EmpfangsBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('empfang', 'gesprochen')
              .then(() => dann);
          
       }
        
    },
   
 // ---------------------------
 // Kreation (Doris)
 // ---------------------------
 // - name_klein: kreation
 // - name_kamel: Kreation
 // - name_gross: KREATION
 // - frau_klein: doris
 // - frau_kamel: Doris
 // - frau_gross: DORIS
 // - bot_name:   KreationsBot
 // - bot_klein:  kreationsbot
 // - bot_kamel:  Kreationsbot
 // - bot_gross:  KREATIONSBOT
 // ---------------------------
 
    kreation: {
  	
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "kreation";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // Default-Zurück
          var zuruck = "Kreation";
          
       // -----------------
       // Befehle
       // -----------------
          
          if ("kreation" != "empfang") {
          	 
             if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(KreationsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Kreation? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(KreationsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Kreation? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ABBRECHEN")) { versuch = true; return bot.say(KreationsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Kreation? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }             
          }
          
          if (zuletzt != "Kreation") { 
             
             if  (~befehl.indexOf("--ZURüCK")) { versuch = true; return bot.say(+' 0 ').then(() => 'kreation'); }             
          } 
          else {
             
             if  (~befehl.indexOf("--ZURüCK")) { versuch = true; return bot.say(KreationsBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'kreation'); }             
          }
          
       // -----------------
       // Onboarding
       // -----------------
          
       	 if ((vorname) && (vorname != "") && (vorname != "Unbekannter") && (nachname) && (nachname != "") && (nachname != "Besucher")) {
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(+' 0 ').then(() => 'name'); }             
          }
          else if ((vorname) && (vorname != "") && (vorname != "Unbekannter")) {
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(+' 0 ').then(() => 'name'); }             
          }
          else if ((nachname) && (nachname != "") && (nachname != "Besucher")) {
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(+' 0 ').then(() => 'name'); }             
          }
          else {
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(KreationsBot+' Wir kennen Ihren Namen noch nicht. Wollen Sie Ihren Namen eingeben? Schreiben Sie bitte --ja oder --nein. ').then(() => 'name'); }             
          }
          
          if  (~befehl.indexOf("--EMAIL")) { versuch = true; return bot.say(KreationsBot+' Wir geben Ihre E-Mail-Adresse nicht an Dritte weiter! ').then(() => 'emailadresse'); }                    
       // -----------------
       // System
       // -----------------
       
          if  (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(KreationsBot+' Kreation Befehle:, --Uber, --Dialoge, --Persönlichkeit, --Geschichten, --Leben, --Inhalte, --Mehrwerte. ').then(() => bot.say(KreationsBot+' Kreation Befehle Text. ')).then(() => 'kreation'); }if  (~befehl.indexOf("--BEFEHL")) { versuch = true; return bot.say(KreationsBot+' Kreation Befehle:, --Uber, --Dialoge, --Persönlichkeit, --Geschichten, --Leben, --Inhalte, --Mehrwerte. ').then(() => bot.say(KreationsBot+' Kreation Befehle Text. ')).then(() => 'kreation'); }          
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(KreationsBot+' Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren. ').then(() => bot.say(KreationsBot+' Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein. ')).then(() => bot.say(KreationsBot+' Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer! ')).then(() => 'kreation'); }if  (~befehl.indexOf("--üBER")) { versuch = true; return bot.say(KreationsBot+' Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren. ').then(() => bot.say(KreationsBot+' Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein. ')).then(() => bot.say(KreationsBot+' Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer! ')).then(() => 'kreation'); }if  (~befehl.indexOf("--KREATION")) { versuch = true; return bot.say(KreationsBot+' Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren. ').then(() => bot.say(KreationsBot+' Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein. ')).then(() => bot.say(KreationsBot+' Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer! ')).then(() => 'kreation'); }if  (~befehl.indexOf("--DORIS")) { versuch = true; return bot.say(KreationsBot+' Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren. ').then(() => bot.say(KreationsBot+' Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein. ')).then(() => bot.say(KreationsBot+' Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer! ')).then(() => 'kreation'); }          
       // -----------------
       // Inhalte
       // -----------------
          
          if  (~befehl.indexOf("--DIALOGE")) { versuch = true; return bot.say(KreationsBot+' Dialoge mit Bots können durch Wiederholungen dröge werden. Wir bringen unseren Bots verschiedene Ausdrucksweisen entlang ihrer --Persönlichkeit bei, um Konversationen trotz möglicher Wiederholungen lebendig zu gestalten. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--PERSöNLICHKEIT")) { versuch = true; return bot.say(KreationsBot+' Mit Bots chattet man wie mit Menschen. Um --Dialoge abwechslungsreich zu gestalten, erhalten unsere Bots eine --Persönlichkeit und eine --Geschichte. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--GESCHICHTEN")) { versuch = true; return bot.say(KreationsBot+' Menschen chatten nicht nur, um Informationen weiterzugeben. Unsere Bots haben eine Geschichte, die ihre --Persönlichkeit illustriert und den Bots --Leben einhaucht. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--LEBEN")) { versuch = true; return bot.say(KreationsBot+' Das Leben der Bots ist ein einfaches Leben: Sie verarbeiten Informationen. Aber ihre --Persönlichkeit und --Geschichte macht sie einzigartig - mithilfe reichhaltiger --Inhalte. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--INHALTE")) { versuch = true; return bot.say(KreationsBot+' Die Techniker haben alle möglichen Inhalts-Formate entwickelt, mit denen unsere Bots kommunizieren: Bilder, Videos, Microsites und natürlich Texte. So sind die --Mehrwerte unserer Bots unterhaltsam und leicht zu konsumieren. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--MEHRWERTE")) { versuch = true; return bot.say(KreationsBot+' Ein Bot mag eine nette --Persönlichkeit und eine interessante --Geschichte transportieren - relevant für den Nutzer werden sie nur durch konkrete Mehrwerte. Wir achten darauf, dass unsere Bots den nutzern nützliche Hilfestellungen, wertvolle Inhalte und echte Vorteile verschaffen. ').then(() => 'kreation'); }          
       // -----------------
       // Bot aus
       // -----------------
       
       // Zurück merken
          zuletzt = zuruck;
          
       // Irrläufer
       // if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
       //    bot.say(KreationsBot+'Suchen Sie meine --Befehle?').then(function(){ 
       //    return bot.say(KreationsBot+'Wollen Sie zurück zum --Empfang?'); }); versuche = 0; }
       // }
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(KreationsBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
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
      