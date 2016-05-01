'use strict';

const Script = require('smooch-bot').Script;
const AndreasSefzig =  "[AndreasSefzig] ";
const SefzigBot =      "[SefzigBot] ";
const EmpfangsBot =    "[EmpfangsBot] ";
const KreationsBot =   "[KreationsBot] ";
const BeratungsBot =   "[BeratungsBot] ";
const KonzeptionsBot = "[KonzeptionsBot] ";
const TechnikBot =     "[TechnikBot] ";
const LinkBot =        "[LinkBot] ";
const TextBot =        "[TextBot] ";
const SlackBot =       "[SlackBot] ";

var versuche_max = 3;
var versuche = 0;

var vorname = "Unbekannter";
var nachname = "Besucher";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(TechnikBot+'Nicht so schnell bitte...'),
        receive: () => 'processing'
    },

    start: {
    	
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = befehlWort(message.text.trim());
            
         // Nächster Schritt default
            var dann = "register";
            
            if (~befehl.indexOf("Weiterleiten:")) {
               
            // bot.say(EmpfangsBot+'Ich leite Sie weiter.');
               
            }
            else {
               
               bot.say(EmpfangsBot+'Darf ich Ihnen unsere Agentur vorstellen? Dann schreiben (oder klicken/berühren) Sie bitte --Agentur!')
               .then(() => bot.say(EmpfangsBot+'Ich möchte Ihnen unsere  --Beratung, die --Kreation, die --Konzeption und unsere --Technik vorstellen.'))
               .then(() => bot.say(AndreasSefzig+'Ich bin gerade nicht online. Lassen Sie mich benachrichtigen, indem Sie --Sefzig schreiben. \n Bitte sprechen Sie solange mit meinem Bot über --Strategie und --Konzeption.'));
               
            }
            
            return bot.setProp('empfangen', 'ja')
            .then(() => dann);
            
        }
    },

 // -------------------------
 // Onboarding: Name
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
            if (antwort == "--BITTE")   { 
               
               bot.say(EmpfangsBot+'Wir werden sorgsam mit Ihren Daten umgehen.');
               name_falsch == "neu";
               dann = "vorname";
               
            }
            if (antwort == "--JA")   { 
               
               bot.say(EmpfangsBot+'Danke. Mögen Sie mir Ihre E-Mail-Adresse geben? Wenn ja, schreiben Sie --Email. Ansonsten lassen Sie uns zurück zum --Empfang gehen.');
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
            if  (~befehl.indexOf("--MOBIL"))          { versuch = true; bot.say(EmpfangsBot+'Diesen Chat mobil öffnen: [Qr:https://sefzigbot.herokuapp.com/] ').then(function(){
                                                                 return bot.say(TechnikBot+'Leider werden Sie dort nicht wiedererkannt. Wir arbeiten an einer Lösung...'); }); }
            if ((~befehl.indexOf("--UBER")) ||
                (~befehl.indexOf("--ÜBER")))          { versuch = true; bot.say(EmpfangsBot+'Diese Seite setzt sich aus verschiedenen Technologien zusammen: Ein Website-Container in Html5, ein Chat-Widget von Smooch.io (realisiert in Node.js, gehostet auf Heroku) und den statischen Inhalten, geschrieben in Text.').then(function(){
                                                                 return bot.say(EmpfangsBot+'Sprechen Sie mit unserer --Technik, um mehr zu erfahren!'); }); }
            
         // -----------------
         // Bots
         // -----------------
            
            if  (~befehl.indexOf("--SEFZIG"))         { versuch = true; bot.setProp('persönlich', '@sefzig').then(function(){
                                                                 return bot.say(EmpfangsBot+'Ich habe Andreas benachrichtigt.') }).then(function(){
                                                                 return bot.say(EmpfangsBot+'Sprechen Sie solange mit mir! Bitte schreiben Sie --Empfang.'); }); } 
            if ((~befehl.indexOf("--EMPFANG")) ||
                (~befehl.indexOf("--ALICE")))         { versuch = true; bot.say(EmpfangsBot+'Ich würde Ihnen gerne unsere --Agentur vorstellen! Oder sprechen Sie direkt mit unserer --Kreation, --Technik oder der --Beratung.'); }
            
            if ((~befehl.indexOf("--KREATION")) ||
                (~befehl.indexOf("--DORIS")))         { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                                 return bot.say(KreationsBot+'Hallo, ich bin Doris, der Kreations-Bot. Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren.') }).then(function(){
                                                                 return bot.say(KreationsBot+'Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in das Gespräch ein.') }).then(function(){
                                                                 return bot.say(KreationsBot+'Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer!') });
                                                                        dann = "kreation"; } 
            if ((~befehl.indexOf("--BERATUNG")) ||
                (~befehl.indexOf("--BARBARA")))       { versuch = true; bot.say(BeratungsBot+'Schreiben Sie --empfang, um zum Empfang zurückzukehren.');
                                                                        dann = "beratung"; } 
            if ((~befehl.indexOf("--TECHNIK")) ||
                (~befehl.indexOf("--CYNTHIA")))       { versuch = true; bot.say(TechnikBot+'Schreiben Sie --empfang, wenn Sie zum Empfang wollen');
                                                                        dann = "technik";  } 
            if ((~befehl.indexOf("--KONZEPTION")) ||
                (~befehl.indexOf("--ERIKA")))         { versuch = true; bot.say(KonzeptionsBot+'Schreiben Sie --empfang, wenn Sie zum Empfang wollen');
                                                                        dann = "konzeption";  } 
            
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
            	                                                           aussage = EmpfangsBot+'Ich kenne Ihren Namen noch nicht. Wollen Sie Ihren Namen eingeben? Dann schreiben Sie bitte --Bitte.';
                                                                        }
                                                                        
                                                                        bot.say(aussage);
                                                                     }
            
            if  (~befehl.indexOf("--EMAIL"))          { versuch = true; dann = "email";
            	                                                        bot.say('Email-Eingabe folgt.');
                                                                     }
            
         // -----------------
         // Agentur
         // -----------------
            
            if  (~befehl.indexOf("--AGENTUR"))        { versuch = true; bot.say(EmpfangsBot+'#Robogeddon ist Deutschlands erste Agentur, die Bots für und mit ihren Kunden Bots entwickelt. \n Unsere Bots vereinfachen die Unternehmens-Kommunikation --intern und --extern.').then(function(){
                                                                 return bot.say(EmpfangsBot+'Wir bestehen aus Andreas Sefzig, einer Reihe moderner Marketing- und Kommunikations-Technologien und einem Team aus mehreren Bots (und freien Mitarbeitern).') }).then(function(){
                                                                 return bot.say(EmpfangsBot+'Sprechen Sie mit Andreas über die --Strategie und --Konzeption Ihres eigenen Chat-Bots.') }).then(function(){
                                                                 return bot.say(EmpfangsBot+'Wir sind eine junge Agentur auf einem jungen Markt. Lassen Sie uns gemeinsam ein --Konzept für Ihren Bot erstellen: Innovation! '); }); }
            
         // -----------------
         // Strategie
         // -----------------
            
            if  (~befehl.indexOf("--STRATEGIE"))      { versuch = true; bot.say(SefzigBot+'Chatten ist die häufigste digitale Beschäftigung in Deutschland: [Text:Aktuelle Statistiken,RobogeddonChatten] Ein weltweiter Trend mit erheblichen absehbaren --Auswirkungen auf die Benutzeroberflächen des Internets.').then(function(){
                                                                 return bot.say(SefzigBot+'Chat-Bots gibt es schon --lange. Sie werden gerade jetzt interessant, weil die meisten Menschen mit Chatten vertraut sind und große Anwendungen wie --Facebook, --Slack u.a. ihre Plattformen für Bots öffnen.') }).then(function(){
                                                                 return bot.say(SefzigBot+'Interessieren Sie sich eher für Bots, die --intern (z.B. mit Ihrem Team) oder --extern (z.B. mit Ihren Kunden) kommunizieren?'); }); }
            
            if  (~befehl.indexOf("--INTERN"))         { versuch = true; bot.say(SefzigBot+'Es lohnt sich, die interne Kommunikation auf Chat umzustellen. \n Dies zeigt eine --Studie von Slack und wir können das von uns und unseren Kunden bestätigen.').then(function(){
                                                                 return bot.say(SefzigBot+'Wenn Ihr Team dann schon den ganzen Tag einen Chat-Client nutzt, können Sie viele interne und externe --Daten in den Chat holen.') }).then(function(){
                                                                 return bot.say(SefzigBot+'Mit den Prinzipien der --ChatOps als Teil Ihrer --Strategie erleichtern Sie Ihrem Team die Arbeit immens!'); }); }
            
            if  (~befehl.indexOf("--DATEN"))          { versuch = true; bot.say(SefzigBot+'Mit Bots und Erweiterungen geben Sie Ihrem Team rollen-basierten Zugriff auf diverse Daten-Quellen und Marketing-Technologien, deren Daten aufgrund der Natur des Chats immer nur ein, zwei Wörter weit entfernt sind.').then(function(){
                                                                 return bot.say(SefzigBot+'Viele Erweiterungen, z.B. von Slack, erlauben auch die (eingeschränkte) Steuerung von Diensten wie Jira, Skype oder Mailchimp.') }).then(function(){
                                                                 return bot.say(SefzigBot+'Daten in Konversationen haben zudem einen --intern lehrreichen Charakter: Man sieht im Chat, wie die Kollegen Daten abfragen und Ihre Tools steuern. Gut für Ihre --Strategie!'); }); }
            
            if  (~befehl.indexOf("--STUDIE"))         { versuch = true; bot.say(SefzigBot+'Der führende Chat-Anbieter Slack hat im Juli 2015 eine Studie durchgeführt: [Button:Studie von Slack,http://slack.com/results] Nach eigenen Angaben haben Teams einen Produktivitäts-Gewinn von bis zu 32% durch den Einsatz von Slack, 80% sehen mehr Transparenz und fast 50% weniger Emails.').then(function(){
                                                                 return bot.say(TechnikBot+'Wir in der Technik setzen auf --ChatOps und haben --intern eine eigene Studie durchgeführt: Wir kommunizieren schriftlich zu 100% über --Slack und steuern unsere Marketing-Technologien zu 80% im Chat.'); }); }
            
            if  (~befehl.indexOf("--EXTERN"))         { versuch = true; bot.say(SefzigBot+'Bots erleichtern Nutzern den Zugang zu den Marketing-Aktivitäten Ihres Unternehmens. Verstehen Sie Ihren Bot als virtuellen Mitarbeiter, der Nutzer in Empfang nimmt, einfache Fragen beantwortet und sie bei Bedarf direkt in Ihre digitalen Marketing-Maßnahmen verlinkt.').then(function(){
                                                                 return bot.say(SefzigBot+'Dabei können Bots alle möglichen zusätzlichen --Aufgaben übernehmen: Von der Newsletter-Registrierung über einen Produkt-Finder bis zum Support mit oder ohne menschliche Unterstützung.') }).then(function(){
                                                                 return bot.say(SefzigBot+'Bots sind leicht aufzusetzen. Vor allem aber sind sie leicht in die unterschiedlichsten Marketing --Kanäle integrierbar!') }).then(function(){
                                                                 return bot.say(KreationsBot+'Wir in der Kreation liebt es, interessante Dialoge zu erschaffen, die Nutzern einen konkreten Mehrwert bieten und sie mit reichhaltigen Inhalten erfreuen.'); }); }
            
            if  (~befehl.indexOf("--KANÄLE"))         { versuch = true; bot.say(SefzigBot+'Ein Bot lässt sich einfach in Ihre bestehenden Marketing-Kanäle einbinden - letztlich ist er nur die URL einer für alle Geräte optimierten Webseite.').then(function(){
                                                                 return bot.say(SefzigBot+'CRM/Dialog: Link in Newslettern, Kurzlink/QR-Code auf Drucksachen.') }).then(function(){
                                                                 return bot.say(SefzigBot+'Marke: Webseiten-Widget, Link in Social Media, E-Mail-Signaturen, Kurzlink/QR-Code auf Visitenkarten.') }).then(function(){
                                                                 return bot.say(SefzigBot+'Offline: Kurzlink/QR-Code auf Plakat, Flyer, Schaufenster, Produkt.') }).then(function(){
                                                                 return bot.say(KonzeptionsBot+'Wir in der --Konzeption haben viele Ideen, wie Ihre Bots die größtmögliche Wirkung entfalten!'); }); }
            
            if  (~befehl.indexOf("--LANGE"))          { versuch = true; bot.say(SefzigBot+'1966 entstand mit dem Chatbot ELIZA die erste künstliche Intelligenz: %[Ein Nachbau von ELIZA](http://sefzig.net/link/ElizaMedai/) ').then(function(){ 
                                                              // return bot.say(SefzigBot+'1999 chattete Prince (The artist formerly known usw.) regelmäßig im AOL Messenger: %[Artikel auf Medium (englisch)](http://sefzig.net/link/ChattingWithPrince/) ') }).then(function(){
                                                                 return bot.say(SefzigBot+'2001 setzte das Marketing erstmals im großen Stil einen Chatbot ein - für Radioheads neues Album: %[Artikel auf Medium (englisch)](http://sefzig.net/link/GooglyMinotaur/) ') }).then(function(){
                                                                 return bot.say(SefzigBot+'Ah, Geschichte, immer spannend. Zurück zur --Strategie?'); }); }
            
            if  (~befehl.indexOf("--AUSWIRKUNGEN"))   { versuch = true; bot.say(SefzigBot+'Auswirkungen Text 1.').then(function(){
                                                                 return bot.say(SefzigBot+'Auswirkungen Text 2.'); }).then(function(){
                                                                 return bot.say(SefzigBot+'Auswirkungen Text 3.'); }); }
            
            if  (~befehl.indexOf("--CHATOPS"))        { versuch = true; bot.say(SefzigBot+'ChatOps Text 1.').then(function(){
                                                                 return bot.say(SefzigBot+'ChatOps Text 2.'); }).then(function(){
                                                                 return bot.say(SefzigBot+'ChatOps Text 3.'); }); }
            
         // -----------------
         // Konzeption
         // -----------------
            
            if  (~befehl.indexOf("--KONZEPTION"))     { versuch = true; bot.say(SefzigBot+'Konzeption Text 1.').then(function(){
                                                                 return bot.say(SefzigBot+'Konzeption Text 2.'); }).then(function(){
                                                                 return bot.say(SefzigBot+'Konzeption Text 3.'); }); }
            
         // -----------------
         // Plattformen
         // -----------------
            
            if  (~befehl.indexOf("--FACEBOOK"))       { versuch = true; bot.say(SefzigBot+'Facebook Text 1.').then(function(){
                                                                 return bot.say(SefzigBot+'Facebook Text 2.'); }).then(function(){
                                                                 return bot.say(SefzigBot+'Facebook Text 3.'); }); }
            
            if  (~befehl.indexOf("--SLACK-ARTIKEL"))  { versuch = true; befehl = "leer"; bot.say(AndreasSefzig+'Ich habe einen fundierten Artikel zu --Slack geschrieben: Was Sie als Marketer über Slack wissen müssen. [Text:Slack-Artikel öffnen,SefzignetBlogSlack] '); }
            if  (~befehl.indexOf("--SLACK-BLOGPOST")) { versuch = true; befehl = "leer"; bot.say(AndreasSefzig+'Lesen Sie auch meinen Blogpost zu --Slack: Was ist Slack und wie nutzt man es? [Text:Slack-Artikel öffnen,SefzignetBlogSlack] '); }
            if  (~befehl.indexOf("--SLACK-LINKS"))    { versuch = true; befehl = "leer"; bot.say(AndreasSefzig+'Ich habe eine Menge Artikel zu --Slack gelesen. Empfehlenswerte habe ich in meiner Linkliste gespeichert: [Linkliste:Linkliste Slack-Artikel öffnen,Slack;Artikel]'); }
            if  (~befehl.indexOf("--SLACK-TEAM"))     { versuch = true; befehl = "leer"; bot.say(AndreasSefzig+'Treten Sie meinem offenen Slack-Team  bei, um sich mit mir zu beraten und um --Slack im laufenden Betrieb zu sehen: [Button:Anmeldung,http://sefzig.net/link/SlackAnmeldung/]'); }
            
            if  (~befehl.indexOf("--SLACK"))          { versuch = true; bot.say(SlackBot+'Slack ist eine fantastische neue Kommunikationsplattform für Teams!').then(function(){
                                                                 return bot.say(SefzigBot+'Wenn Sie Slack noch nicht kennen, erwägen Sie, es für Ihre Interne Kommunikation zu nutzen! Lesen Sie dazu Andreas --Slack-Artikel für Marketer, seinen --Slack-Blogpost für Anwender, öffnen Sie seine --Slack-Links oder treten Sie seinem --Slack-Team bei.'); }).then(function(){
                                                                 return bot.say(SefzigBot+'Mit Slack lässt sich --intern die effizienz-steigernde --Strategie von --ChatOps am besten auf ein Team oder Unternehmen anwenden.'); }); }
            
            if  (~befehl.indexOf("--HIPCHAT"))        { versuch = true; bot.say(SefzigBot+'HipChat Text 1.').then(function(){
                                                                 return bot.say(SefzigBot+'HipChat Text 2.'); }).then(function(){
                                                                 return bot.say(SefzigBot+'HipChat Text 3.'); }); }
            
         // -----------------
         // Tests
         // -----------------
         
            if  (~befehl.indexOf("--JAVASCRIPT"))     { versuch = true; bot.say(SefzigBot+'[Javascript:test_alert]'); }
            if  (~befehl.indexOf("--VIDEO"))          { versuch = true; bot.say(SefzigBot+'[Youtube:u07XONlDwX8]'); }
            
         // -----------------
         // Vorlage
         // -----------------
         
            if  (~befehl.indexOf("--VORLAGE"))        { versuch = true; bot.say(EmpfangsBot+'Text: Vorlage.'); }
            
            if  (~befehl.indexOf("--VORLAGE"))        { versuch = true; bot.say(EmpfangsBot+'Vorlage Text 1.').then(function(){
                                                                 return bot.say(EmpfangsBot+'Vorlage Text 2.'); }).then(function(){
                                                                 return bot.say(EmpfangsBot+'Vorlage Text 3.'); }); }
            
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
 // Kreation
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
                                                                 return bot.say(EmpfangsBot+'Willkommen zurück! Schreiben Sie --Befehle um zu sehen, was ich Ihnen noch zeigen kann.'); });
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
            if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
               bot.say(KreationsBot+'Suchen Sie die --Befehle?').then(function(){ 
               return bot.say(EmpfangsBot+'Oder wollen Sie zum --Empfang?'); }); versuche = 0; }
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

         // sagenhaft('Strategie', dann, bot,
         //           SefzigBot+'Chatten ist die häufigste digitale Beschäftigung in Deutschland: [Text:Aktuelle Statistiken,RobogeddonChatten] Ein weltweiter Trend mit erheblichen absehbaren --Auswirkungen auf die Benutzeroberflächen des Internets.',
         //           SefzigBot+'Chat-Bots gibt es schon --lange. Sie werden gerade jetzt für das Marketing interessant, weil die meisten Menschen mit Chatten vertraut sind und große Anwendungen wie --Facebook, --Slack u.a. ihre Plattformen für Bots öffnen.',
         //           SefzigBot+'Interessieren Sie sich eher für Bots, die --intern (z.B. mit Ihrem Team) oder --extern (z.B. mit Ihren Kunden) kommunizieren?'
         //          );
            
            function sagenhaft(befehl, dann, bot, text1, text2, text3, text4, text5) {
               
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
            