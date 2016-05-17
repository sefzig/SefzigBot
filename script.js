
'use strict'; 

   const Script = require('smooch-bot').Script; 

// Bots
   const AndreasSefzig = "[AndreasSefzig] "; 
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
                
                                return bot.say(EmpfangsBot+' Unterhalten Sie sich mit uns, indem sie die die blau hinterlegten Wörter sagen (schreiben, klicken oder berühren), z.B. --Empfang. ').then(() => bot.say(EmpfangsBot+' Sprechen Sie mit mir über --Robogeddon - oder mit den anderen Bots aus der --Beratung, --Kreation, --Konzeption, --Strategie oder --Technik! ')).then(() => bot.say(EmpfangsBot+' Ich habe rechts ein Menü für Sie geöffnet. Sie können es mit dem Button oben rechts bedienen - oder indem Sie --Menü schreiben. [Javascript:menu(an)] ')).then(() => 'empfang');                
             }
             else {
                
                                return bot.say(EmpfangsBot+' Willkommen zurück! Sprechen Sie mit mir über --Robogeddon! ').then(() => bot.say(EmpfangsBot+' Oder mit den anderen Bots über --Beratung, --Kreation, --Konzeption, --Strategie oder --Technik. ')).then(() => 'empfang');                
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
               
               bot.say(EmpfangsBot+'Wir werden sorgsam mit Ihren Daten umgehen.');
               dann = "vorname";
               
            }
            if ((antwort == "--NEIN") ||
                (antwort == "--EMPFANG") ||
                (antwort == "--ABBRECHEN")) {
               
               bot.say(EmpfangsBot+'Gehen wir zurück zum --Empfang.');
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
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(+' 0 ').then(() => 'empfang'); }             
          } 
          else {
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(EmpfangsBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'empfang'); }             
          }
          
          if  (~befehl.indexOf("--MENÜAN")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'empfang'); }if  (~befehl.indexOf("--MENUAN")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'empfang'); }if  (~befehl.indexOf("--MENUEAN")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'empfang'); }          if  (~befehl.indexOf("--MENÜAUS")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'empfang'); }if  (~befehl.indexOf("--MENUAUS")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'empfang'); }if  (~befehl.indexOf("--MENUEAUS")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'empfang'); }          if  (~befehl.indexOf("--MENÜ")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'empfang'); }if  (~befehl.indexOf("--MENU")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'empfang'); }if  (~befehl.indexOf("--MENUE")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'empfang'); }          
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
       // Bots
       // -----------------
          
          if  (~befehl.indexOf("--SEFZIG")) { versuch = true; return bot.say(EmpfangsBot+' Ich habe Andreas benachrichtigt. ').then(() => bot.say(EmpfangsBot+' Sprechen Sie solange mit mir, indem Sie --Empfang schreiben! ')).then(() => 'empfang'); }
          if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }          
          if  (~befehl.indexOf("--BERATUNG")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Barbara. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Barbara. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }		   
		    if  (~befehl.indexOf("--TECHNIK")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Cynthia. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }if  (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Cynthia. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }		    
          if  (~befehl.indexOf("--KREATION")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }if  (~befehl.indexOf("--DORIS")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }		    
		    if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Erika. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--ERIKA")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Erika. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }		    
		    if  (~befehl.indexOf("--STRATEGIE")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Feline. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }if  (~befehl.indexOf("--FELINE")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Feline. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }
       // -----------------
       // Über uns
       // -----------------
          
          if  (~befehl.indexOf("--ROBOGEDDON")) { versuch = true; return bot.say(EmpfangsBot+' #Robogeddon sind Andreas Sefzig und freie Mitarbeiter, eine Handvoll Marketing-Technologien und wir Bots. ').then(() => bot.say(EmpfangsBot+' Wir realisieren Chat-Bots für die --interne und --externe Unternehmens-Kommunikation. ')).then(() => bot.say(EmpfangsBot+' Wir befinden uns in einem sehr jungen Markt. Lassen Sie sich von uns beraten, warum und wie Sie Ihren Bot haben wollen! ')).then(() => bot.say(EmpfangsBot+' Lassen Sie uns über die --Strategie oder --Konzeption Ihres eigenen Chat-Bots sprechen! ')).then(() => 'empfang'); }	       // Lassen Sie uns gemeinsam ein --Konzept für Ihren Bot erstellen!
	       // #Robogeddon sind die ersten in Deutschland, die Chat-Bots für und mit ihren Kunden entwickeln. \n Unsere Bots vereinfachen die Unternehmens-Kommunikation --intern und --extern.
          // Wir bestehen aus Andreas Sefzig, einer Reihe moderner Marketing- und Kommunikations-Technologien und einem Team aus mehreren Bots (und freien Mitarbeitern).
          // Chatbots sind im --Kommen. Sie sind ideale digitale Rezeptionisten für Ihr digitales Universum.
          
          if  (~befehl.indexOf("--PRODUKTE")) { versuch = true; return bot.say(EmpfangsBot+' Über Produkte Text 1. ').then(() => bot.say(EmpfangsBot+' Über Produkte Text 2. ')).then(() => bot.say(EmpfangsBot+' Über Produkte Text 3. ')).then(() => 'empfang'); }	       
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(EmpfangsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'empfang'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(EmpfangsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'empfang'); }          
          if  (~befehl.indexOf("--KONTAKT")) { versuch = true; return bot.say(EmpfangsBot+' Rufen Sie Andreas Sefzig an: [Telefon:+49 151 15920082] Oder schreiben Sie ihm eine Email: [Email:sefzig@robogeddon.de] ').then(() => bot.say(EmpfangsBot+' Alle unsere Kontaktwege: [Text:RobogeddonKontakt]  ')).then(() => 'empfang'); }          
       // -----------------
       // Vorlage (Gewerk, Name)
       // -----------------
       
          if  (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Name. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Name. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }
       // -----------------
       // System
       // -----------------
       
          if  (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(EmpfangsBot+' --Befehle dieser Seite:, --Mobil, --Newsletter, --Kontakt, --Über ').then(() => 'empfang'); }          
          if  (~befehl.indexOf("--MOBIL")) { versuch = true; return bot.say(EmpfangsBot+' Diesen Chat mobil öffnen: [Qr:https://sefzigbot.herokuapp.com/] ').then(() => bot.say(TechnikBot+' Leider werden Sie dort nicht automatisch wiedererkannt. Wir arbeiten an einer Lösung... ')).then(() => bot.say(EmpfangsBot+' Oder öffnen Sie [Textlink:Robogeddon.herokuapp.com,http://sefzigbot.herokuapp.com] in Ihrem mobilen Browser. ')).then(() => 'empfang'); }
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(EmpfangsBot+' Sprechen Sie mit unserer --Technik, um mehr über diese Seite zu erfahren. ').then(() => 'empfang'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(EmpfangsBot+' Sprechen Sie mit unserer --Technik, um mehr über diese Seite zu erfahren. ').then(() => 'empfang'); }          
       // -----------------
       // Inhalte
       // -----------------
          
          
          
          
          
          
          
          
          
          
          
          
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
          else if  (~befehl.indexOf("--TESTMENUE"))      { versuch = true; bot.say(SefzigBot+' [Javascript:menu()] Javascript ausgeführt: Menü getoggelt.'); }
          else if  (~befehl.indexOf("--TESTMENUAN"))     { versuch = true; bot.say(SefzigBot+' [Javascript:menu(an)] Javascript ausgeführt: Menü an.'); }
          else if  (~befehl.indexOf("--TESTMENUAUS"))    { versuch = true; bot.say(SefzigBot+' [Javascript:menu(aus)] Javascript ausgeführt: Menü aus.'); }
          else if  (~befehl.indexOf("--TESTALERT"))      { versuch = true; bot.say(SefzigBot+' [Javascript:alert(123)] Javascript ausgeführt: Alert.'); }
          else if  (~befehl.indexOf("--TESTKONSOLE"))    { versuch = true; bot.say(SefzigBot+' [Javascript:konsole(123)] Javascript ausgeführt: Konsole.'); }
          else if  (~befehl.indexOf("--TESTCOOKIE"))     { versuch = true; bot.say(SefzigBot+' [Javascript:cookies(test,123)] Javascript ausgeführt: Cookies.'); }
          
       // -----------------
       // Vorlagen
       // -----------------
       
       // Einzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(EmpfangsBot+' Text Empfang 1. ').then(() => 'empfang'); }          
       // Mehrzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(EmpfangsBot+' Text Empfang 1. ').then(() => bot.say(EmpfangsBot+' Text Empfang 2. ')).then(() => 'empfang'); }          
          

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
 // Beratung (Barbara)
 // ---------------------------
 // - name_klein: beratung
 // - name_kamel: Beratung
 // - name_gross: BERATUNG
 // - frau_klein: barbara
 // - frau_kamel: Barbara
 // - frau_gross: BARBARA
 // - bot_name:   BeratungsBot
 // - bot_klein:  beratungsbot
 // - bot_kamel:  Beratungsbot
 // - bot_gross:  BERATUNGSBOT
 // ---------------------------
 
    beratung: {
  	
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "beratung";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // Default-Zurück
          var zuruck = "Beratung";
          
       // -----------------
       // Befehle
       // -----------------
          
          if ("beratung" != "empfang") {
          	 
             if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(BeratungsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Beratung? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(BeratungsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Beratung? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ABBRECHEN")) { versuch = true; return bot.say(BeratungsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Beratung? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }             
          }
          
          if (zuletzt != "Beratung") { 
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(+' 0 ').then(() => 'beratung'); }             
          } 
          else {
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(BeratungsBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'beratung'); }             
          }
          
          if  (~befehl.indexOf("--MENÜAN")) { versuch = true; return bot.say(BeratungsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'beratung'); }if  (~befehl.indexOf("--MENUAN")) { versuch = true; return bot.say(BeratungsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'beratung'); }if  (~befehl.indexOf("--MENUEAN")) { versuch = true; return bot.say(BeratungsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'beratung'); }          if  (~befehl.indexOf("--MENÜAUS")) { versuch = true; return bot.say(BeratungsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'beratung'); }if  (~befehl.indexOf("--MENUAUS")) { versuch = true; return bot.say(BeratungsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'beratung'); }if  (~befehl.indexOf("--MENUEAUS")) { versuch = true; return bot.say(BeratungsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'beratung'); }          if  (~befehl.indexOf("--MENÜ")) { versuch = true; return bot.say(BeratungsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'beratung'); }if  (~befehl.indexOf("--MENU")) { versuch = true; return bot.say(BeratungsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'beratung'); }if  (~befehl.indexOf("--MENUE")) { versuch = true; return bot.say(BeratungsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'beratung'); }          
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
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(BeratungsBot+' Wir kennen Ihren Namen noch nicht. Wollen Sie Ihren Namen eingeben? Schreiben Sie bitte --ja oder --nein. ').then(() => 'name'); }             
          }
          
          if  (~befehl.indexOf("--EMAIL")) { versuch = true; return bot.say(BeratungsBot+' Wir geben Ihre E-Mail-Adresse nicht an Dritte weiter! ').then(() => 'emailadresse'); }          
       // -----------------
       // Bots
       // -----------------
          
          if  (~befehl.indexOf("--SEFZIG")) { versuch = true; return bot.say(EmpfangsBot+' Ich habe Andreas benachrichtigt. ').then(() => bot.say(BeratungsBot+' Sprechen Sie solange mit mir, indem Sie --Beratung schreiben! ')).then(() => 'empfang'); }
          if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }          
          if  (~befehl.indexOf("--BERATUNG")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Barbara. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Barbara. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }		   
		    if  (~befehl.indexOf("--TECHNIK")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Cynthia. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }if  (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Cynthia. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }		    
          if  (~befehl.indexOf("--KREATION")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Doris. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }if  (~befehl.indexOf("--DORIS")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Doris. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }		    
		    if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Erika. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--ERIKA")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Erika. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }		    
		    if  (~befehl.indexOf("--STRATEGIE")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Feline. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }if  (~befehl.indexOf("--FELINE")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Feline. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }
       // -----------------
       // Über uns
       // -----------------
          
          if  (~befehl.indexOf("--ROBOGEDDON")) { versuch = true; return bot.say(BeratungsBot+' #Robogeddon sind Andreas Sefzig und freie Mitarbeiter, eine Handvoll Marketing-Technologien und wir Bots. ').then(() => bot.say(BeratungsBot+' Wir realisieren Chat-Bots für die --interne und --externe Unternehmens-Kommunikation. ')).then(() => bot.say(BeratungsBot+' Wir befinden uns in einem sehr jungen Markt. Lassen Sie sich von uns beraten, warum und wie Sie Ihren Bot haben wollen! ')).then(() => bot.say(BeratungsBot+' Lassen Sie uns über die --Strategie oder --Konzeption Ihres eigenen Chat-Bots sprechen! ')).then(() => 'beratung'); }	       // Lassen Sie uns gemeinsam ein --Konzept für Ihren Bot erstellen!
	       // #Robogeddon sind die ersten in Deutschland, die Chat-Bots für und mit ihren Kunden entwickeln. \n Unsere Bots vereinfachen die Unternehmens-Kommunikation --intern und --extern.
          // Wir bestehen aus Andreas Sefzig, einer Reihe moderner Marketing- und Kommunikations-Technologien und einem Team aus mehreren Bots (und freien Mitarbeitern).
          // Chatbots sind im --Kommen. Sie sind ideale digitale Rezeptionisten für Ihr digitales Universum.
          
          if  (~befehl.indexOf("--PRODUKTE")) { versuch = true; return bot.say(BeratungsBot+' Über Produkte Text 1. ').then(() => bot.say(BeratungsBot+' Über Produkte Text 2. ')).then(() => bot.say(BeratungsBot+' Über Produkte Text 3. ')).then(() => 'beratung'); }	       
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(BeratungsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'beratung'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(BeratungsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'beratung'); }          
          if  (~befehl.indexOf("--KONTAKT")) { versuch = true; return bot.say(BeratungsBot+' Rufen Sie Andreas Sefzig an: [Telefon:+49 151 15920082] Oder schreiben Sie ihm eine Email: [Email:sefzig@robogeddon.de] ').then(() => bot.say(BeratungsBot+' Alle unsere Kontaktwege: [Text:RobogeddonKontakt]  ')).then(() => 'beratung'); }          
       // -----------------
       // Vorlage (Gewerk, Name)
       // -----------------
       
          if  (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Name. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(BeratungsBot+' Ich übergebe an Name. Schreiben Sie --Beratung, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }          
       // -----------------
       // System
       // -----------------
       
          if  (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(BeratungsBot+' Text Beratung 1. Befehle: --Produkte, --Leistungen, --Kalkulation. ').then(() => bot.say(BeratungsBot+' Text Beratung 2. ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BEFEHL")) { versuch = true; return bot.say(BeratungsBot+' Text Beratung 1. Befehle: --Produkte, --Leistungen, --Kalkulation. ').then(() => bot.say(BeratungsBot+' Text Beratung 2. ')).then(() => 'beratung'); }
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. Ich möchte Ihnen unsere --Produkte und --Leistungen zeigen. ').then(() => bot.say(BeratungsBot+' Wenn Sie möchten, erstellen wir gleich eine --Kalkulation für Ihren Bot! ')).then(() => 'beratung'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. Ich möchte Ihnen unsere --Produkte und --Leistungen zeigen. ').then(() => bot.say(BeratungsBot+' Wenn Sie möchten, erstellen wir gleich eine --Kalkulation für Ihren Bot! ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BERATUNG")) { versuch = true; return bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. Ich möchte Ihnen unsere --Produkte und --Leistungen zeigen. ').then(() => bot.say(BeratungsBot+' Wenn Sie möchten, erstellen wir gleich eine --Kalkulation für Ihren Bot! ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. Ich möchte Ihnen unsere --Produkte und --Leistungen zeigen. ').then(() => bot.say(BeratungsBot+' Wenn Sie möchten, erstellen wir gleich eine --Kalkulation für Ihren Bot! ')).then(() => 'beratung'); }          
       // -----------------
       // Inhalte
       // -----------------
          
          if  (~befehl.indexOf("--PRODUKTE")) { versuch = true; return bot.say(BeratungsBot+' Text Beratung Produkte. ').then(() => 'beratung'); }          
          if  (~befehl.indexOf("--LEISTUNGEN")) { versuch = true; return bot.say(BeratungsBot+' Text Beratung Leistungen. ').then(() => 'beratung'); }          
          if  (~befehl.indexOf("--KALKULATION")) { versuch = true; return bot.say(BeratungsBot+' Text Beratung Kalkulation. ').then(() => 'beratung'); }          
          if  (~befehl.indexOf("--SLACK-ARTIKEL"))  { versuch = true; befehl = "leer"; bot.say(AndreasSefzig+'Ich habe einen fundierten Artikel zu --Slack geschrieben: Was Sie als Marketer über Slack wissen müssen. [Text:Slack-Artikel öffnen,SefzignetBlogSlack] '); }
          if  (~befehl.indexOf("--SLACK-BLOGPOST")) { versuch = true; befehl = "leer"; bot.say(AndreasSefzig+'Lesen Sie auch meinen Blogpost zu --Slack: Was ist Slack und wie nutzt man es? [Text:Slack-Artikel öffnen,SefzignetBlogSlack] '); }
          if  (~befehl.indexOf("--SLACK-LINKS"))    { versuch = true; befehl = "leer"; bot.say(AndreasSefzig+'Ich habe eine Menge Artikel zu --Slack gelesen. Empfehlenswerte habe ich in meiner Linkliste gespeichert: [Linkliste:Linkliste Slack-Artikel öffnen,Slack;Artikel]'); }
          if  (~befehl.indexOf("--SLACK-TEAM"))     { versuch = true; befehl = "leer"; bot.say(AndreasSefzig+'Treten Sie meinem offenen Slack-Team  bei, um sich mit mir zu beraten und um --Slack im laufenden Betrieb zu sehen: [Button:Anmeldung,http://sefzig.net/link/SlackAnmeldung/]'); }
          
          
          
          
          
          
          
          
          
          
          
       // -----------------
       // Vorlagen
       // -----------------
       
       // Einzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(BeratungsBot+' Text Beratung 1. ').then(() => 'beratung'); }          
       // Mehrzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(BeratungsBot+' Text Beratung 1. ').then(() => bot.say(BeratungsBot+' Text Beratung 2. ')).then(() => 'beratung'); }          

       // -----------------
       // Bot aus
       // -----------------
       
       // Zurück merken
          zuletzt = zuruck;
          
       // Irrläufer
       // if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
       //    bot.say(BeratungsBot+'Suchen Sie meine --Befehle?').then(function(){ 
       //    return bot.say(BeratungsBot+'Wollen Sie zurück zum --Empfang?'); }); versuche = 0; }
       // }
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(BeratungsBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('beratung', 'gesprochen')
              .then(() => dann);
          
       }
        
    },
   
 // ---------------------------
 // Technik (Cynthia)
 // ---------------------------
 // - name_klein: technik
 // - name_kamel: Technik
 // - name_gross: TECHNIK
 // - frau_klein: cynthia
 // - frau_kamel: Cynthia
 // - frau_gross: CYNTHIA
 // - bot_name:   TechnikBot
 // - bot_klein:  technikbot
 // - bot_kamel:  Technikbot
 // - bot_gross:  TECHNIKBOT
 // ---------------------------
 
    technik: {
  	
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "technik";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // Default-Zurück
          var zuruck = "Technik";
          
       // -----------------
       // Befehle
       // -----------------
          
          if ("technik" != "empfang") {
          	 
             if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(TechnikBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Technik? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(TechnikBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Technik? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ABBRECHEN")) { versuch = true; return bot.say(TechnikBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Technik? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }             
          }
          
          if (zuletzt != "Technik") { 
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(+' 0 ').then(() => 'technik'); }             
          } 
          else {
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(TechnikBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'technik'); }             
          }
          
          if  (~befehl.indexOf("--MENÜAN")) { versuch = true; return bot.say(TechnikBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'technik'); }if  (~befehl.indexOf("--MENUAN")) { versuch = true; return bot.say(TechnikBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'technik'); }if  (~befehl.indexOf("--MENUEAN")) { versuch = true; return bot.say(TechnikBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'technik'); }          if  (~befehl.indexOf("--MENÜAUS")) { versuch = true; return bot.say(TechnikBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'technik'); }if  (~befehl.indexOf("--MENUAUS")) { versuch = true; return bot.say(TechnikBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'technik'); }if  (~befehl.indexOf("--MENUEAUS")) { versuch = true; return bot.say(TechnikBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'technik'); }          if  (~befehl.indexOf("--MENÜ")) { versuch = true; return bot.say(TechnikBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'technik'); }if  (~befehl.indexOf("--MENU")) { versuch = true; return bot.say(TechnikBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'technik'); }if  (~befehl.indexOf("--MENUE")) { versuch = true; return bot.say(TechnikBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'technik'); }          
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
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(TechnikBot+' Wir kennen Ihren Namen noch nicht. Wollen Sie Ihren Namen eingeben? Schreiben Sie bitte --ja oder --nein. ').then(() => 'name'); }             
          }
          
          if  (~befehl.indexOf("--EMAIL")) { versuch = true; return bot.say(TechnikBot+' Wir geben Ihre E-Mail-Adresse nicht an Dritte weiter! ').then(() => 'emailadresse'); }          
       // -----------------
       // Bots
       // -----------------
          
          if  (~befehl.indexOf("--SEFZIG")) { versuch = true; return bot.say(EmpfangsBot+' Ich habe Andreas benachrichtigt. ').then(() => bot.say(TechnikBot+' Sprechen Sie solange mit mir, indem Sie --Technik schreiben! ')).then(() => 'empfang'); }
          if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }          
          if  (~befehl.indexOf("--BERATUNG")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Barbara. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Barbara. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }		   
		    if  (~befehl.indexOf("--TECHNIK")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Cynthia. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }if  (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Cynthia. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }		    
          if  (~befehl.indexOf("--KREATION")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Doris. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }if  (~befehl.indexOf("--DORIS")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Doris. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }		    
		    if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Erika. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--ERIKA")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Erika. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }		    
		    if  (~befehl.indexOf("--STRATEGIE")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Feline. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }if  (~befehl.indexOf("--FELINE")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Feline. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }
       // -----------------
       // Über uns
       // -----------------
          
          if  (~befehl.indexOf("--ROBOGEDDON")) { versuch = true; return bot.say(TechnikBot+' #Robogeddon sind Andreas Sefzig und freie Mitarbeiter, eine Handvoll Marketing-Technologien und wir Bots. ').then(() => bot.say(TechnikBot+' Wir realisieren Chat-Bots für die --interne und --externe Unternehmens-Kommunikation. ')).then(() => bot.say(TechnikBot+' Wir befinden uns in einem sehr jungen Markt. Lassen Sie sich von uns beraten, warum und wie Sie Ihren Bot haben wollen! ')).then(() => bot.say(TechnikBot+' Lassen Sie uns über die --Strategie oder --Konzeption Ihres eigenen Chat-Bots sprechen! ')).then(() => 'technik'); }	       // Lassen Sie uns gemeinsam ein --Konzept für Ihren Bot erstellen!
	       // #Robogeddon sind die ersten in Deutschland, die Chat-Bots für und mit ihren Kunden entwickeln. \n Unsere Bots vereinfachen die Unternehmens-Kommunikation --intern und --extern.
          // Wir bestehen aus Andreas Sefzig, einer Reihe moderner Marketing- und Kommunikations-Technologien und einem Team aus mehreren Bots (und freien Mitarbeitern).
          // Chatbots sind im --Kommen. Sie sind ideale digitale Rezeptionisten für Ihr digitales Universum.
          
          if  (~befehl.indexOf("--PRODUKTE")) { versuch = true; return bot.say(TechnikBot+' Über Produkte Text 1. ').then(() => bot.say(TechnikBot+' Über Produkte Text 2. ')).then(() => bot.say(TechnikBot+' Über Produkte Text 3. ')).then(() => 'technik'); }	       
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(TechnikBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'technik'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(TechnikBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'technik'); }          
          if  (~befehl.indexOf("--KONTAKT")) { versuch = true; return bot.say(TechnikBot+' Rufen Sie Andreas Sefzig an: [Telefon:+49 151 15920082] Oder schreiben Sie ihm eine Email: [Email:sefzig@robogeddon.de] ').then(() => bot.say(TechnikBot+' Alle unsere Kontaktwege: [Text:RobogeddonKontakt]  ')).then(() => 'technik'); }          
       // -----------------
       // Vorlage (Gewerk, Name)
       // -----------------
       
          if  (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Name. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(TechnikBot+' Ich übergebe an Name. Schreiben Sie --Technik, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }          
       // -----------------
       // System
       // -----------------
          
          if  (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(TechnikBot+' Text Technik 1. Befehle: --folgt. ').then(() => bot.say(TechnikBot+' Text Technik 2. ')).then(() => 'technik'); }if  (~befehl.indexOf("--BEFEHL")) { versuch = true; return bot.say(TechnikBot+' Text Technik 1. Befehle: --folgt. ').then(() => bot.say(TechnikBot+' Text Technik 2. ')).then(() => 'technik'); }          
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ').then(() => bot.say(TechnikBot+' Schreiben Sie: --Slack, --Folgt und --HipChat. ')).then(() => 'technik'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ').then(() => bot.say(TechnikBot+' Schreiben Sie: --Slack, --Folgt und --HipChat. ')).then(() => 'technik'); }if  (~befehl.indexOf("--TECHNIK")) { versuch = true; return bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ').then(() => bot.say(TechnikBot+' Schreiben Sie: --Slack, --Folgt und --HipChat. ')).then(() => 'technik'); }if  (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ').then(() => bot.say(TechnikBot+' Schreiben Sie: --Slack, --Folgt und --HipChat. ')).then(() => 'technik'); }          
       // -----------------
       // Inhalte
       // -----------------
          
          if  (~befehl.indexOf("--SLACK"))          { versuch = true; bot.say(SlackBot+'Slack ist eine fantastische neue Kommunikationsplattform für Teams!').then(function(){
                                                               return bot.say(SefzigBot+'Wenn Sie Slack noch nicht kennen, erwägen Sie, es für Ihre Interne Kommunikation zu nutzen! Lesen Sie dazu Andreas --Slack-Artikel für Marketer, seinen --Slack-Blogpost für Anwender, öffnen Sie seine --Slack-Links oder treten Sie seinem --Slack-Team bei.'); }).then(function(){
                                                               return bot.say(SefzigBot+'Mit Slack lässt sich --intern die effizienz-steigernde --Strategie von --ChatOps am besten auf ein Team oder Unternehmen anwenden.'); }); }
          
          if  (~befehl.indexOf("--HIPCHAT"))        { versuch = true; bot.say(SefzigBot+'HipChat Text 1.').then(function(){
                                                               return bot.say(SefzigBot+'HipChat Text 2.'); }).then(function(){
                                                               return bot.say(SefzigBot+'HipChat Text 3.'); }); }
          
          
          
          
          
          
          
          
          
          
          
          
          
       // -----------------
       // Vorlagen
       // -----------------
          
       // Einzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(TechnikBot+' Text Technik 1. ').then(() => 'technik'); }          
       // Mehrzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(TechnikBot+' Text Technik 1. ').then(() => bot.say(TechnikBot+' Text Technik 2. ')).then(() => 'technik'); }          

       // -----------------
       // Bot aus
       // -----------------
       
       // Zurück merken
          zuletzt = zuruck;
          
       // Irrläufer
       // if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
       //    bot.say(TechnikBot+'Suchen Sie meine --Befehle?').then(function(){ 
       //    return bot.say(TechnikBot+'Wollen Sie zurück zum --Empfang?'); }); versuche = 0; }
       // }
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(TechnikBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('technik', 'gesprochen')
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
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(+' 0 ').then(() => 'kreation'); }             
          } 
          else {
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(KreationsBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'kreation'); }             
          }
          
          if  (~befehl.indexOf("--MENÜAN")) { versuch = true; return bot.say(KreationsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'kreation'); }if  (~befehl.indexOf("--MENUAN")) { versuch = true; return bot.say(KreationsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'kreation'); }if  (~befehl.indexOf("--MENUEAN")) { versuch = true; return bot.say(KreationsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'kreation'); }          if  (~befehl.indexOf("--MENÜAUS")) { versuch = true; return bot.say(KreationsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'kreation'); }if  (~befehl.indexOf("--MENUAUS")) { versuch = true; return bot.say(KreationsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'kreation'); }if  (~befehl.indexOf("--MENUEAUS")) { versuch = true; return bot.say(KreationsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'kreation'); }          if  (~befehl.indexOf("--MENÜ")) { versuch = true; return bot.say(KreationsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'kreation'); }if  (~befehl.indexOf("--MENU")) { versuch = true; return bot.say(KreationsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'kreation'); }if  (~befehl.indexOf("--MENUE")) { versuch = true; return bot.say(KreationsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'kreation'); }          
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
       // Bots
       // -----------------
          
          if  (~befehl.indexOf("--SEFZIG")) { versuch = true; return bot.say(EmpfangsBot+' Ich habe Andreas benachrichtigt. ').then(() => bot.say(KreationsBot+' Sprechen Sie solange mit mir, indem Sie --Kreation schreiben! ')).then(() => 'empfang'); }
          if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }          
          if  (~befehl.indexOf("--BERATUNG")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Barbara. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Barbara. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }		   
		    if  (~befehl.indexOf("--TECHNIK")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Cynthia. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }if  (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Cynthia. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }		    
          if  (~befehl.indexOf("--KREATION")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Doris. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }if  (~befehl.indexOf("--DORIS")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Doris. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }		    
		    if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Erika. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--ERIKA")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Erika. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }		    
		    if  (~befehl.indexOf("--STRATEGIE")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Feline. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }if  (~befehl.indexOf("--FELINE")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Feline. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }
       // -----------------
       // Über uns
       // -----------------
          
          if  (~befehl.indexOf("--ROBOGEDDON")) { versuch = true; return bot.say(KreationsBot+' #Robogeddon sind Andreas Sefzig und freie Mitarbeiter, eine Handvoll Marketing-Technologien und wir Bots. ').then(() => bot.say(KreationsBot+' Wir realisieren Chat-Bots für die --interne und --externe Unternehmens-Kommunikation. ')).then(() => bot.say(KreationsBot+' Wir befinden uns in einem sehr jungen Markt. Lassen Sie sich von uns beraten, warum und wie Sie Ihren Bot haben wollen! ')).then(() => bot.say(KreationsBot+' Lassen Sie uns über die --Strategie oder --Konzeption Ihres eigenen Chat-Bots sprechen! ')).then(() => 'kreation'); }	       // Lassen Sie uns gemeinsam ein --Konzept für Ihren Bot erstellen!
	       // #Robogeddon sind die ersten in Deutschland, die Chat-Bots für und mit ihren Kunden entwickeln. \n Unsere Bots vereinfachen die Unternehmens-Kommunikation --intern und --extern.
          // Wir bestehen aus Andreas Sefzig, einer Reihe moderner Marketing- und Kommunikations-Technologien und einem Team aus mehreren Bots (und freien Mitarbeitern).
          // Chatbots sind im --Kommen. Sie sind ideale digitale Rezeptionisten für Ihr digitales Universum.
          
          if  (~befehl.indexOf("--PRODUKTE")) { versuch = true; return bot.say(KreationsBot+' Über Produkte Text 1. ').then(() => bot.say(KreationsBot+' Über Produkte Text 2. ')).then(() => bot.say(KreationsBot+' Über Produkte Text 3. ')).then(() => 'kreation'); }	       
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(KreationsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'kreation'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(KreationsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--KONTAKT")) { versuch = true; return bot.say(KreationsBot+' Rufen Sie Andreas Sefzig an: [Telefon:+49 151 15920082] Oder schreiben Sie ihm eine Email: [Email:sefzig@robogeddon.de] ').then(() => bot.say(KreationsBot+' Alle unsere Kontaktwege: [Text:RobogeddonKontakt]  ')).then(() => 'kreation'); }          
       // -----------------
       // Vorlage (Gewerk, Name)
       // -----------------
       
          if  (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Name. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(KreationsBot+' Ich übergebe an Name. Schreiben Sie --Kreation, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }          
       // -----------------
       // System
       // -----------------
       
          if  (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(KreationsBot+' Kreation Befehle:, --Uber, --Dialoge, --Persönlichkeit, --Geschichten, --Leben, --Inhalte, --Mehrwerte. ').then(() => bot.say(KreationsBot+' Kreation Befehle Text. ')).then(() => 'kreation'); }if  (~befehl.indexOf("--BEFEHL")) { versuch = true; return bot.say(KreationsBot+' Kreation Befehle:, --Uber, --Dialoge, --Persönlichkeit, --Geschichten, --Leben, --Inhalte, --Mehrwerte. ').then(() => bot.say(KreationsBot+' Kreation Befehle Text. ')).then(() => 'kreation'); }          
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(KreationsBot+' Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren. ').then(() => bot.say(KreationsBot+' Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein. ')).then(() => bot.say(KreationsBot+' Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer! ')).then(() => 'kreation'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(KreationsBot+' Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren. ').then(() => bot.say(KreationsBot+' Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein. ')).then(() => bot.say(KreationsBot+' Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer! ')).then(() => 'kreation'); }if  (~befehl.indexOf("--KREATION")) { versuch = true; return bot.say(KreationsBot+' Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren. ').then(() => bot.say(KreationsBot+' Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein. ')).then(() => bot.say(KreationsBot+' Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer! ')).then(() => 'kreation'); }if  (~befehl.indexOf("--DORIS")) { versuch = true; return bot.say(KreationsBot+' Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren. ').then(() => bot.say(KreationsBot+' Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein. ')).then(() => bot.say(KreationsBot+' Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer! ')).then(() => 'kreation'); }          
       // -----------------
       // Inhalte
       // -----------------
          
          if  (~befehl.indexOf("--DIALOGE")) { versuch = true; return bot.say(KreationsBot+' Dialoge mit Bots können durch Wiederholungen dröge werden. Wir bringen unseren Bots verschiedene Ausdrucksweisen entlang ihrer --Persönlichkeit bei, um Konversationen trotz möglicher Wiederholungen lebendig zu gestalten. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--PERSÖNLICHKEIT")) { versuch = true; return bot.say(KreationsBot+' Mit Bots chattet man wie mit Menschen. Um --Dialoge abwechslungsreich zu gestalten, erhalten unsere Bots eine --Persönlichkeit und eine --Geschichte. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--GESCHICHTEN")) { versuch = true; return bot.say(KreationsBot+' Menschen chatten nicht nur, um Informationen weiterzugeben. Unsere Bots haben eine Geschichte, die ihre --Persönlichkeit illustriert und den Bots --Leben einhaucht. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--LEBEN")) { versuch = true; return bot.say(KreationsBot+' Das Leben der Bots ist ein einfaches Leben: Sie verarbeiten Informationen. Aber ihre --Persönlichkeit und --Geschichte macht sie einzigartig - mithilfe reichhaltiger --Inhalte und --Formate. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--INHALTE")) { versuch = true; return bot.say(KreationsBot+' So sind die --Mehrwerte unserer Bots unterhaltsam und leicht zu konsumieren. Wir achten darauf, dass unsere Bots den nutzern nützliche Hilfestellungen, wertvolle Inhalte und echte Vorteile verschaffen. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--FORMATE")) { versuch = true; return bot.say(KreationsBot+' Unsere --Technik hat alle möglichen Inhalts-Formate entwickelt, mit denen unsere Bots kommunizieren können: --Bilder und --Videos, --Texte und --Microsites sowie diverse Bedien- --Elemente. ').then(() => 'kreation'); }          
          if  (~befehl.indexOf("--MEHRWERTE")) { versuch = true; return bot.say(KreationsBot+' Ein Bot mag eine nette --Persönlichkeit und eine interessante --Geschichte haben - relevant für den Nutzer werden sie nur durch konkrete Mehrwerte.  ').then(() => 'kreation'); }          
          
          
          
          
          
          
          
          
          
          
          
       // -----------------
       // Vorlagen
       // -----------------
       
       // Einzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(KreationsBot+' Text Kreation 1. ').then(() => 'kreation'); }          
       // Mehrzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(KreationsBot+' Text Kreation 1. ').then(() => bot.say(KreationsBot+' Text Kreation 2. ')).then(() => 'kreation'); }          

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
   
 // ---------------------------
 // Konzeption (Erika)
 // ---------------------------
 // - name_klein: konzeption
 // - name_kamel: Konzeption
 // - name_gross: KONZEPTION
 // - frau_klein: erika
 // - frau_kamel: Erika
 // - frau_gross: ERIKA
 // - bot_name:   KonzeptionsBot
 // - bot_klein:  konzeptionsbot
 // - bot_kamel:  Konzeptionsbot
 // - bot_gross:  KONZEPTIONSBOT
 // ---------------------------
 
    konzeption: {
  	
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "konzeption";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // Default-Zurück
          var zuruck = "Konzeption";
          
       // -----------------
       // Befehle
       // -----------------
          
          if ("konzeption" != "empfang") {
          	 
             if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(KonzeptionsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Konzeption? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(KonzeptionsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Konzeption? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ABBRECHEN")) { versuch = true; return bot.say(KonzeptionsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Konzeption? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }             
          }
          
          if (zuletzt != "Konzeption") { 
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(+' 0 ').then(() => 'konzeption'); }             
          } 
          else {
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(KonzeptionsBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'konzeption'); }             
          }
          
          if  (~befehl.indexOf("--MENÜAN")) { versuch = true; return bot.say(KonzeptionsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'konzeption'); }if  (~befehl.indexOf("--MENUAN")) { versuch = true; return bot.say(KonzeptionsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'konzeption'); }if  (~befehl.indexOf("--MENUEAN")) { versuch = true; return bot.say(KonzeptionsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'konzeption'); }          if  (~befehl.indexOf("--MENÜAUS")) { versuch = true; return bot.say(KonzeptionsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'konzeption'); }if  (~befehl.indexOf("--MENUAUS")) { versuch = true; return bot.say(KonzeptionsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'konzeption'); }if  (~befehl.indexOf("--MENUEAUS")) { versuch = true; return bot.say(KonzeptionsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'konzeption'); }          if  (~befehl.indexOf("--MENÜ")) { versuch = true; return bot.say(KonzeptionsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'konzeption'); }if  (~befehl.indexOf("--MENU")) { versuch = true; return bot.say(KonzeptionsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'konzeption'); }if  (~befehl.indexOf("--MENUE")) { versuch = true; return bot.say(KonzeptionsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'konzeption'); }          
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
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(KonzeptionsBot+' Wir kennen Ihren Namen noch nicht. Wollen Sie Ihren Namen eingeben? Schreiben Sie bitte --ja oder --nein. ').then(() => 'name'); }             
          }
          
          if  (~befehl.indexOf("--EMAIL")) { versuch = true; return bot.say(KonzeptionsBot+' Wir geben Ihre E-Mail-Adresse nicht an Dritte weiter! ').then(() => 'emailadresse'); }          
       // -----------------
       // Bots
       // -----------------
          
          if  (~befehl.indexOf("--SEFZIG")) { versuch = true; return bot.say(EmpfangsBot+' Ich habe Andreas benachrichtigt. ').then(() => bot.say(KonzeptionsBot+' Sprechen Sie solange mit mir, indem Sie --Konzeption schreiben! ')).then(() => 'empfang'); }
          if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }          
          if  (~befehl.indexOf("--BERATUNG")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Barbara. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Barbara. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }		   
		    if  (~befehl.indexOf("--TECHNIK")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Cynthia. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }if  (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Cynthia. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }		    
          if  (~befehl.indexOf("--KREATION")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Doris. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }if  (~befehl.indexOf("--DORIS")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Doris. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }		    
		    if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Erika. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--ERIKA")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Erika. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }		    
		    if  (~befehl.indexOf("--STRATEGIE")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Feline. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }if  (~befehl.indexOf("--FELINE")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Feline. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }
       // -----------------
       // Über uns
       // -----------------
          
          if  (~befehl.indexOf("--ROBOGEDDON")) { versuch = true; return bot.say(KonzeptionsBot+' #Robogeddon sind Andreas Sefzig und freie Mitarbeiter, eine Handvoll Marketing-Technologien und wir Bots. ').then(() => bot.say(KonzeptionsBot+' Wir realisieren Chat-Bots für die --interne und --externe Unternehmens-Kommunikation. ')).then(() => bot.say(KonzeptionsBot+' Wir befinden uns in einem sehr jungen Markt. Lassen Sie sich von uns beraten, warum und wie Sie Ihren Bot haben wollen! ')).then(() => bot.say(KonzeptionsBot+' Lassen Sie uns über die --Strategie oder --Konzeption Ihres eigenen Chat-Bots sprechen! ')).then(() => 'konzeption'); }	       // Lassen Sie uns gemeinsam ein --Konzept für Ihren Bot erstellen!
	       // #Robogeddon sind die ersten in Deutschland, die Chat-Bots für und mit ihren Kunden entwickeln. \n Unsere Bots vereinfachen die Unternehmens-Kommunikation --intern und --extern.
          // Wir bestehen aus Andreas Sefzig, einer Reihe moderner Marketing- und Kommunikations-Technologien und einem Team aus mehreren Bots (und freien Mitarbeitern).
          // Chatbots sind im --Kommen. Sie sind ideale digitale Rezeptionisten für Ihr digitales Universum.
          
          if  (~befehl.indexOf("--PRODUKTE")) { versuch = true; return bot.say(KonzeptionsBot+' Über Produkte Text 1. ').then(() => bot.say(KonzeptionsBot+' Über Produkte Text 2. ')).then(() => bot.say(KonzeptionsBot+' Über Produkte Text 3. ')).then(() => 'konzeption'); }	       
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(KonzeptionsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'konzeption'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(KonzeptionsBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'konzeption'); }          
          if  (~befehl.indexOf("--KONTAKT")) { versuch = true; return bot.say(KonzeptionsBot+' Rufen Sie Andreas Sefzig an: [Telefon:+49 151 15920082] Oder schreiben Sie ihm eine Email: [Email:sefzig@robogeddon.de] ').then(() => bot.say(KonzeptionsBot+' Alle unsere Kontaktwege: [Text:RobogeddonKontakt]  ')).then(() => 'konzeption'); }          
       // -----------------
       // Vorlage (Gewerk, Name)
       // -----------------
       
          if  (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Name. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(KonzeptionsBot+' Ich übergebe an Name. Schreiben Sie --Konzeption, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }
       // -----------------
       // System
       // -----------------
       
          if  (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(KonzeptionsBot+' Text Konzeption 1. Befehle: --Kanäle, --Facebook. ').then(() => bot.say(KonzeptionsBot+' Text Konzeption 2. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--BEFEHL")) { versuch = true; return bot.say(KonzeptionsBot+' Text Konzeption 1. Befehle: --Kanäle, --Facebook. ').then(() => bot.say(KonzeptionsBot+' Text Konzeption 2. ')).then(() => 'konzeption'); }
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(KonzeptionsBot+' Text Konzeption Über 1. ').then(() => bot.say(KonzeptionsBot+' Text Konzeption Über 2. ')).then(() => bot.say(KonzeptionsBot+' Text Konzeption Über 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(KonzeptionsBot+' Text Konzeption Über 1. ').then(() => bot.say(KonzeptionsBot+' Text Konzeption Über 2. ')).then(() => bot.say(KonzeptionsBot+' Text Konzeption Über 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(KonzeptionsBot+' Text Konzeption Über 1. ').then(() => bot.say(KonzeptionsBot+' Text Konzeption Über 2. ')).then(() => bot.say(KonzeptionsBot+' Text Konzeption Über 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--ERIKA")) { versuch = true; return bot.say(KonzeptionsBot+' Text Konzeption Über 1. ').then(() => bot.say(KonzeptionsBot+' Text Konzeption Über 2. ')).then(() => bot.say(KonzeptionsBot+' Text Konzeption Über 3. ')).then(() => 'konzeption'); }          
       // -----------------
       // Inhalte
       // -----------------
          
          if  (~befehl.indexOf("--KANÄLE")) { versuch = true; return bot.say(KonzeptionsBot+' Ein Bot lässt sich einfach in Ihre bestehenden Marketing-Kanäle einbinden - letztlich ist er nur die URL einer für alle Geräte optimierten Webseite. ').then(() => bot.say(KonzeptionsBot+' CRM/Dialog: Link in Newslettern, Kurzlink/QR-Code auf Drucksachen. ')).then(() => bot.say(KonzeptionsBot+' Marke: Webseiten-Widget, Link in Social Media und E-Mail-Signaturen, Kurzlink/QR-Code auf Visitenkarten. ')).then(() => bot.say(KonzeptionsBot+' Vor Ort: Kurzlink/QR-Code auf Plakat, Aufsteller, Schaufenster, Produkt. ')).then(() => bot.say(KonzeptionsBot+' Text mit --Konzeption und --extern. ')).then(() => 'konzeption'); }          
          if  (~befehl.indexOf("--FACEBOOK"))       { versuch = true; bot.say(SefzigBot+'Facebook Text 1.').then(function(){
                                                               return bot.say(SefzigBot+'Facebook Text 2.'); }).then(function(){
                                                               return bot.say(SefzigBot+'Facebook Text 3.'); }); }
          
          
          
          
          
          
          
          
          
          
          
       // -----------------
       // Vorlagen
       // -----------------
       
       // Einzeilig
          if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(KonzeptionsBot+' Text Konzeption 1. ').then(() => 'konzeption'); }          
       // Mehrzeilig
          if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(KonzeptionsBot+' Text Konzeption 1. ').then(() => bot.say(KonzeptionsBot+' Text Konzeption 2. ')).then(() => 'konzeption'); }          

       // -----------------
       // Bot aus
       // -----------------
       
       // Zurück merken
          zuletzt = zuruck;
          
       // Irrläufer
       // if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
       //    bot.say(KonzeptionsBot+'Suchen Sie meine --Befehle?').then(function(){ 
       //    return bot.say(KonzeptionsBot+'Wollen Sie zurück zum --Empfang?'); }); versuche = 0; }
       // }
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(KonzeptionsBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('konzeption', 'gesprochen')
              .then(() => dann);
          
       }
        
    },
   
 // ---------------------------
 // Strategie (Feline)
 // ---------------------------
 // - name_klein: strategie
 // - name_kamel: Strategie
 // - name_gross: STRATEGIE
 // - frau_klein: feline
 // - frau_kamel: Feline
 // - frau_gross: FELINE
 // - bot_name:   StrategieBot
 // - bot_klein:  strategiebot
 // - bot_kamel:  Strategiebot
 // - bot_gross:  STRATEGIEBOT
 // ---------------------------
 
    strategie: {
  	
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "strategie";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // Default-Zurück
          var zuruck = "Strategie";
          
       // -----------------
       // Befehle
       // -----------------
          
          if ("strategie" != "empfang") {
          	 
             if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(StrategieBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Strategie? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(StrategieBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Strategie? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ABBRECHEN")) { versuch = true; return bot.say(StrategieBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es in der --Strategie? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang'); }             
          }
          
          if (zuletzt != "Strategie") { 
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(+' 0 ').then(() => 'strategie'); }             
          } 
          else {
             
             if  (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(StrategieBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'strategie'); }             
          }
          
          if  (~befehl.indexOf("--MENÜAN")) { versuch = true; return bot.say(StrategieBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'strategie'); }if  (~befehl.indexOf("--MENUAN")) { versuch = true; return bot.say(StrategieBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'strategie'); }if  (~befehl.indexOf("--MENUEAN")) { versuch = true; return bot.say(StrategieBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'strategie'); }          if  (~befehl.indexOf("--MENÜAUS")) { versuch = true; return bot.say(StrategieBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'strategie'); }if  (~befehl.indexOf("--MENUAUS")) { versuch = true; return bot.say(StrategieBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'strategie'); }if  (~befehl.indexOf("--MENUEAUS")) { versuch = true; return bot.say(StrategieBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'strategie'); }          if  (~befehl.indexOf("--MENÜ")) { versuch = true; return bot.say(StrategieBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'strategie'); }if  (~befehl.indexOf("--MENU")) { versuch = true; return bot.say(StrategieBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'strategie'); }if  (~befehl.indexOf("--MENUE")) { versuch = true; return bot.say(StrategieBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'strategie'); }          
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
       	    
             if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(StrategieBot+' Wir kennen Ihren Namen noch nicht. Wollen Sie Ihren Namen eingeben? Schreiben Sie bitte --ja oder --nein. ').then(() => 'name'); }             
          }
          
          if  (~befehl.indexOf("--EMAIL")) { versuch = true; return bot.say(StrategieBot+' Wir geben Ihre E-Mail-Adresse nicht an Dritte weiter! ').then(() => 'emailadresse'); }          
       // -----------------
       // Bots
       // -----------------
          
          if  (~befehl.indexOf("--SEFZIG")) { versuch = true; return bot.say(EmpfangsBot+' Ich habe Andreas benachrichtigt. ').then(() => bot.say(StrategieBot+' Sprechen Sie solange mit mir, indem Sie --Strategie schreiben! ')).then(() => 'empfang'); }
          if  (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }if  (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Hallo Empfang Text 1: --Strategie, --Konzeption, --Kreation, --Technik, --Beratung. ').then(() => bot.say(EmpfangsBot+' Hallo Empfang Text 2: --Befehle. ')).then(() => 'empfang'); }          
          if  (~befehl.indexOf("--BERATUNG")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Barbara. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }if  (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Barbara. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(BeratungsBot+' Hallo, ich bin Barbara, der Beratungs-Bot. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 2: --Befehle folgt. ')).then(() => bot.say(BeratungsBot+' Hallo Beratung Text 3. ')).then(() => 'beratung'); }		   
		    if  (~befehl.indexOf("--TECHNIK")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Cynthia. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }if  (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Cynthia. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(TechnikBot+' Hallo, ich bin Cynthia, der Technik-Bot. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 2: --Befehle folgt. ')).then(() => bot.say(TechnikBot+' Hallo Technik Text 3. ')).then(() => 'technik'); }		    
          if  (~befehl.indexOf("--KREATION")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Doris. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }if  (~befehl.indexOf("--DORIS")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Doris. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(KreationsBot+' Hallo, ich bin Doris, der Kreations-Bot. Ich möchte Ihnen erzählen, wie wir den trockenen, technischen Bots --Leben einhauchen. ')).then(() => bot.say(KreationsBot+' Oder wollen Sie sehen, wie schön unsere --Inhalte und --Formate sind? ')).then(() => bot.say(KreationsBot+' Ihre Entscheidung :D ')).then(() => 'kreation'); }		    
		    if  (~befehl.indexOf("--KONZEPTION")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Erika. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }if  (~befehl.indexOf("--ERIKA")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Erika. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(KonzeptionsBot+' Hallo, ich bin Erika, der Konzeptions-Bot. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 2: --Befehle folgt. ')).then(() => bot.say(KonzeptionsBot+' Hallo Konzeption Text 3. ')).then(() => 'konzeption'); }		    
		    if  (~befehl.indexOf("--STRATEGIE")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Feline. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }if  (~befehl.indexOf("--FELINE")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Feline. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(StrategieBot+' Hallo, ich bin Feline, der Strategie-Bot. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 2: --Befehle folgt. ')).then(() => bot.say(StrategieBot+' Hallo Strategie Text 3. ')).then(() => 'strategie'); }
       // -----------------
       // Über uns
       // -----------------
          
          if  (~befehl.indexOf("--ROBOGEDDON")) { versuch = true; return bot.say(StrategieBot+' #Robogeddon sind Andreas Sefzig und freie Mitarbeiter, eine Handvoll Marketing-Technologien und wir Bots. ').then(() => bot.say(StrategieBot+' Wir realisieren Chat-Bots für die --interne und --externe Unternehmens-Kommunikation. ')).then(() => bot.say(StrategieBot+' Wir befinden uns in einem sehr jungen Markt. Lassen Sie sich von uns beraten, warum und wie Sie Ihren Bot haben wollen! ')).then(() => bot.say(StrategieBot+' Lassen Sie uns über die --Strategie oder --Konzeption Ihres eigenen Chat-Bots sprechen! ')).then(() => 'strategie'); }	       // Lassen Sie uns gemeinsam ein --Konzept für Ihren Bot erstellen!
	       // #Robogeddon sind die ersten in Deutschland, die Chat-Bots für und mit ihren Kunden entwickeln. \n Unsere Bots vereinfachen die Unternehmens-Kommunikation --intern und --extern.
          // Wir bestehen aus Andreas Sefzig, einer Reihe moderner Marketing- und Kommunikations-Technologien und einem Team aus mehreren Bots (und freien Mitarbeitern).
          // Chatbots sind im --Kommen. Sie sind ideale digitale Rezeptionisten für Ihr digitales Universum.
          
          if  (~befehl.indexOf("--PRODUKTE")) { versuch = true; return bot.say(StrategieBot+' Über Produkte Text 1. ').then(() => bot.say(StrategieBot+' Über Produkte Text 2. ')).then(() => bot.say(StrategieBot+' Über Produkte Text 3. ')).then(() => 'strategie'); }	       
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(StrategieBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'strategie'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(StrategieBot+' Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text. ').then(() => 'strategie'); }          
          if  (~befehl.indexOf("--KONTAKT")) { versuch = true; return bot.say(StrategieBot+' Rufen Sie Andreas Sefzig an: [Telefon:+49 151 15920082] Oder schreiben Sie ihm eine Email: [Email:sefzig@robogeddon.de] ').then(() => bot.say(StrategieBot+' Alle unsere Kontaktwege: [Text:RobogeddonKontakt]  ')).then(() => 'strategie'); }          
       // -----------------
       // Vorlage (Gewerk, Name)
       // -----------------
       
          if  (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Name. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }if  (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(StrategieBot+' Ich übergebe an Name. Schreiben Sie --Strategie, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk'); }
       // -----------------
       // System
       // -----------------
       
          if  (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(StrategieBot+' Text Strategie 1. Befehle: --folgt. ').then(() => bot.say(StrategieBot+' Text Strategie 2. ')).then(() => 'strategie'); }if  (~befehl.indexOf("--BEFEHL")) { versuch = true; return bot.say(StrategieBot+' Text Strategie 1. Befehle: --folgt. ').then(() => bot.say(StrategieBot+' Text Strategie 2. ')).then(() => 'strategie'); }
          if  (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(StrategieBot+' Dank ihrer einfachen und direkten Kommunikation sind Chats ein weltweiter --Trend, Tendenz stark zunehmend. ').then(() => bot.say(StrategieBot+' Für das --Marketing sind Chat-Bots ein naheliegender Kanal für den Dialog mit den Menschen. Die Herausforderung ist, Bots nützlich zu machen. ')).then(() => bot.say(StrategieBot+' Chat-Bots gibt es schon --lange. Sie werden plötzlich interessant, da nun alle modernen Menschen mobil und mit Chatten vertraut sind und sich die großen --Plattformen wie Facebook Messenger für Bots öffnen. ')).then(() => bot.say(StrategieBot+' Interessieren Sie sich eher für Bots, die --intern (z.B. mit Ihrem Team) oder --extern (z.B. mit Ihren Kunden) kommunizieren? ')).then(() => 'strategie'); }if  (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(StrategieBot+' Dank ihrer einfachen und direkten Kommunikation sind Chats ein weltweiter --Trend, Tendenz stark zunehmend. ').then(() => bot.say(StrategieBot+' Für das --Marketing sind Chat-Bots ein naheliegender Kanal für den Dialog mit den Menschen. Die Herausforderung ist, Bots nützlich zu machen. ')).then(() => bot.say(StrategieBot+' Chat-Bots gibt es schon --lange. Sie werden plötzlich interessant, da nun alle modernen Menschen mobil und mit Chatten vertraut sind und sich die großen --Plattformen wie Facebook Messenger für Bots öffnen. ')).then(() => bot.say(StrategieBot+' Interessieren Sie sich eher für Bots, die --intern (z.B. mit Ihrem Team) oder --extern (z.B. mit Ihren Kunden) kommunizieren? ')).then(() => 'strategie'); }if  (~befehl.indexOf("--STRATEGIE")) { versuch = true; return bot.say(StrategieBot+' Dank ihrer einfachen und direkten Kommunikation sind Chats ein weltweiter --Trend, Tendenz stark zunehmend. ').then(() => bot.say(StrategieBot+' Für das --Marketing sind Chat-Bots ein naheliegender Kanal für den Dialog mit den Menschen. Die Herausforderung ist, Bots nützlich zu machen. ')).then(() => bot.say(StrategieBot+' Chat-Bots gibt es schon --lange. Sie werden plötzlich interessant, da nun alle modernen Menschen mobil und mit Chatten vertraut sind und sich die großen --Plattformen wie Facebook Messenger für Bots öffnen. ')).then(() => bot.say(StrategieBot+' Interessieren Sie sich eher für Bots, die --intern (z.B. mit Ihrem Team) oder --extern (z.B. mit Ihren Kunden) kommunizieren? ')).then(() => 'strategie'); }if  (~befehl.indexOf("--FELINE")) { versuch = true; return bot.say(StrategieBot+' Dank ihrer einfachen und direkten Kommunikation sind Chats ein weltweiter --Trend, Tendenz stark zunehmend. ').then(() => bot.say(StrategieBot+' Für das --Marketing sind Chat-Bots ein naheliegender Kanal für den Dialog mit den Menschen. Die Herausforderung ist, Bots nützlich zu machen. ')).then(() => bot.say(StrategieBot+' Chat-Bots gibt es schon --lange. Sie werden plötzlich interessant, da nun alle modernen Menschen mobil und mit Chatten vertraut sind und sich die großen --Plattformen wie Facebook Messenger für Bots öffnen. ')).then(() => bot.say(StrategieBot+' Interessieren Sie sich eher für Bots, die --intern (z.B. mit Ihrem Team) oder --extern (z.B. mit Ihren Kunden) kommunizieren? ')).then(() => 'strategie'); }          
       // -----------------
       // Inhalte
       // -----------------
          
       // Intern
          if  (~befehl.indexOf("--INTERN")) { versuch = true; return bot.say(StrategieBot+' Die Erfahrung und eine --Studie von Slack zeigen, dass es sich lohnt, die interne Kommunikation auf Chat umzustellen. ').then(() => bot.say(StrategieBot+' Wenn Ihr Team dann schon den ganzen Tag einen Chat-Client nutzt, können Sie über Erweiterungen und Bots viele interne und externe --Daten in die Konversation holen. ')).then(() => bot.say(StrategieBot+' Mit den Prinzipien der --ChatOps als Teil Ihrer --Strategie erleichtern Sie Ihrem Team die Arbeit immens! ')).then(() => 'strategie'); }          if  (~befehl.indexOf("--CHATOPS")) { versuch = true; return bot.say(StrategieBot+' ChatOps Text 1. ').then(() => bot.say(StrategieBot+' ChatOps Text 2. ')).then(() => bot.say(StrategieBot+' Zurück zu --Strategie --intern. ')).then(() => 'strategie'); }          if  (~befehl.indexOf("--DATEN")) { versuch = true; return bot.say(StrategieBot+' Mit Bots und Erweiterungen geben Sie Ihrem Team rollen-basierten Zugriff auf diverse Daten-Quellen und Marketing-Technologien, deren Daten aufgrund der Natur des Chats immer nur ein, zwei Wörter weit entfernt sind. ').then(() => bot.say(StrategieBot+' Viele Erweiterungen, z.B. von Slack, erlauben auch die (eingeschränkte) Steuerung von Diensten wie Jira, Skype oder Mailchimp. ')).then(() => bot.say(StrategieBot+' Daten in Konversationen haben zudem einen --intern lehrreichen Charakter: Man sieht im Chat, wie die Kollegen Daten abfragen und Ihre Werkzeuge steuern. Gut für Ihre --Strategie! ')).then(() => 'strategie'); }          if  (~befehl.indexOf("--STUDIE")) { versuch = true; return bot.say(TechnikBot+' Wir in der Technik setzen --intern auf --ChatOps und stellen fest: Wir kommunizieren schriftlich zu 100% über --Slack und steuern unsere Marketing-Technologien zu 80% im Chat. ').then(() => bot.say(StrategieBot+' Der führende Chat-Anbieter Slack hat im Juli 2015 eine Studie durchgeführt: [Button:Studie von Slack,http://slack.com/results] Nach eigenen Angaben haben Teams einen Produktivitäts-Gewinn von bis zu 32% durch den Einsatz von Slack, 80% sehen mehr Transparenz und fast 50% weniger Emails. ')).then(() => 'strategie'); }          
       // Extern
          if  (~befehl.indexOf("--EXTERN")) { versuch = true; return bot.say(StrategieBot+' Bots ermöglichen einen eleganten Zugang zu Ihren Marketing-Aktivitäten. Verstehen Sie einen Bot als virtuellen Mitarbeiter, der Nutzer in Empfang nimmt, einfache Fragen beantwortet und sie - bei Bedarf! - direkt in Ihre Marketing-Maßnahmen verlinkt. ').then(() => bot.say(StrategieBot+' Bots können auch alle möglichen --Aufgaben übernehmen: Von der Newsletter-Registrierung über einen Produkt-Finder bis zum Support mit oder ohne menschliche Unterstützung. ')).then(() => bot.say(KreationsBot+' Wir in der --Kreation legen Wert darauf, interessante --Dialoge zu erschaffen, die Nutzern einen konkreten --Mehrwert bieten und sie mit reichhaltigen --Inhalten erfreuen. ')).then(() => bot.say(StrategieBot+' Bots sind leicht aufzusetzen (wenn man weiß wie es geht ;). Vor allem aber sind sie leicht in alle Marketing- --Kanäle integrierbar! ')).then(() => 'strategie'); }if  (~befehl.indexOf("--EXTERNE")) { versuch = true; return bot.say(StrategieBot+' Bots ermöglichen einen eleganten Zugang zu Ihren Marketing-Aktivitäten. Verstehen Sie einen Bot als virtuellen Mitarbeiter, der Nutzer in Empfang nimmt, einfache Fragen beantwortet und sie - bei Bedarf! - direkt in Ihre Marketing-Maßnahmen verlinkt. ').then(() => bot.say(StrategieBot+' Bots können auch alle möglichen --Aufgaben übernehmen: Von der Newsletter-Registrierung über einen Produkt-Finder bis zum Support mit oder ohne menschliche Unterstützung. ')).then(() => bot.say(KreationsBot+' Wir in der --Kreation legen Wert darauf, interessante --Dialoge zu erschaffen, die Nutzern einen konkreten --Mehrwert bieten und sie mit reichhaltigen --Inhalten erfreuen. ')).then(() => bot.say(StrategieBot+' Bots sind leicht aufzusetzen (wenn man weiß wie es geht ;). Vor allem aber sind sie leicht in alle Marketing- --Kanäle integrierbar! ')).then(() => 'strategie'); }          
       // Allgemein
          if  (~befehl.indexOf("--LANGE")) { versuch = true; return bot.say(StrategieBot+' 1966 entstand mit dem Chatbot ELIZA die erste künstliche Intelligenz: %[Ein Nachbau von ELIZA](http://sefzig.net/link/ElizaMedai/)  ').then(() => bot.say(StrategieBot+' 1999 chattete Prince (The artist formerly known usw.) regelmäßig im AOL Messenger: %[Artikel auf Medium (englisch)](http://sefzig.net/link/ChattingWithPrince/)  ')).then(() => bot.say(StrategieBot+' 2001 setzte das Marketing erstmals im großen Stil einen Chatbot ein - für Radioheads neues Album: %[Artikel auf Medium (englisch)](http://sefzig.net/link/GooglyMinotaur/)  ')).then(() => bot.say(StrategieBot+' Ah, Geschichte, immer spannend. Zurück zur --Strategie? ')).then(() => 'strategie'); }if  (~befehl.indexOf("--LÄNGE")) { versuch = true; return bot.say(StrategieBot+' 1966 entstand mit dem Chatbot ELIZA die erste künstliche Intelligenz: %[Ein Nachbau von ELIZA](http://sefzig.net/link/ElizaMedai/)  ').then(() => bot.say(StrategieBot+' 1999 chattete Prince (The artist formerly known usw.) regelmäßig im AOL Messenger: %[Artikel auf Medium (englisch)](http://sefzig.net/link/ChattingWithPrince/)  ')).then(() => bot.say(StrategieBot+' 2001 setzte das Marketing erstmals im großen Stil einen Chatbot ein - für Radioheads neues Album: %[Artikel auf Medium (englisch)](http://sefzig.net/link/GooglyMinotaur/)  ')).then(() => bot.say(StrategieBot+' Ah, Geschichte, immer spannend. Zurück zur --Strategie? ')).then(() => 'strategie'); }          if  (~befehl.indexOf("--TRENDS")) { versuch = true; return bot.say(StrategieBot+' Chatten ist inzwischen die häufigste digitale Beschäftigung, auch in Deutschland. Ein paar Statistiken: [Text:Aktuelle Statistiken,RobogeddonChatten]  ').then(() => bot.say(StrategieBot+' Seit 2015 verbringt man in den Usa mehr Zeit mit Messaging-Apps als mit den Apps der Sozialen Netzwerke: [Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/Mesaging_vs_Social.png] Quelle: [Textlink:BI Intelligence Report,MessagingVsSocial] ')).then(() => bot.say(StrategieBot+' Eine Liste lesenswerter Artikel zur --Strategie in Real Time Messaging: [Linkliste:Linkliste öffnen,Rtm:Strategie:Artikel] ')).then(() => 'strategie'); }if  (~befehl.indexOf("--TREND")) { versuch = true; return bot.say(StrategieBot+' Chatten ist inzwischen die häufigste digitale Beschäftigung, auch in Deutschland. Ein paar Statistiken: [Text:Aktuelle Statistiken,RobogeddonChatten]  ').then(() => bot.say(StrategieBot+' Seit 2015 verbringt man in den Usa mehr Zeit mit Messaging-Apps als mit den Apps der Sozialen Netzwerke: [Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/Mesaging_vs_Social.png] Quelle: [Textlink:BI Intelligence Report,MessagingVsSocial] ')).then(() => bot.say(StrategieBot+' Eine Liste lesenswerter Artikel zur --Strategie in Real Time Messaging: [Linkliste:Linkliste öffnen,Rtm:Strategie:Artikel] ')).then(() => 'strategie'); }          if  (~befehl.indexOf("--MARKETING")) { versuch = true; return bot.say(StrategieBot+' Marketing Text 1. ').then(() => bot.say(StrategieBot+' Marketing Text 2. ')).then(() => bot.say(StrategieBot+' Zurück zur --Strategie. ')).then(() => 'strategie'); }          
       // -----------------
       // Vorlagen
       // -----------------
       
       // Einzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(StrategieBot+' Text Strategie 1. ').then(() => 'strategie'); }          
       // Mehrzeilig
          if  (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(StrategieBot+' Text Strategie 1. ').then(() => bot.say(StrategieBot+' Text Strategie 2. ')).then(() => 'strategie'); }          

       // -----------------
       // Bot aus
       // -----------------
       
       // Zurück merken
          zuletzt = zuruck;
          
       // Irrläufer
       // if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
       //    bot.say(StrategieBot+'Suchen Sie meine --Befehle?').then(function(){ 
       //    return bot.say(StrategieBot+'Wollen Sie zurück zum --Empfang?'); }); versuche = 0; }
       // }
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(StrategieBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('strategie', 'gesprochen')
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
      