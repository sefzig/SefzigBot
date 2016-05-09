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

var bekannt = false;

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
               
               if (bekannt == false) {
               
                  bot.say(EmpfangsBot+'Darf ich uns Ihnen kurz vorstellen? Dann schreiben (oder klicken oder berühren) Sie bitte --Robogeddon.')
                  .then(() => bot.say(EmpfangsBot+'Ich möchte Sie mit den Bots aus unserer  --Beratung, der --Kreation, der --Konzeption und unserer --Technik bekannt machen!'))
                  .then(() => bot.say(AndreasSefzig+'Ich bin gerade nicht online. Lassen Sie mich benachrichtigen, indem Sie --Sefzig schreiben. Bitte sprechen Sie solange mit meinem Bot über die --Strategie hinter Bots!'));
               
               }
               else {
               
                  bot.say(EmpfangsBot+'Darf ich Ihnen mehr über uns zeigen? Dann schreiben Sie bitte --Robogeddon!')
                  .then(() => bot.say(EmpfangsBot+'Ich möchte Ihnen unsere  --Beratung, die --Kreation, die --Konzeption und unsere --Technik vorstellen!'));
               
               }
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
                .then(() => bot.say(EmpfangsBot+`${vorname}, prima. [Javascript:cookies(vorname,`+vorname+`)]`))
                .then(() => 'nachname');
        }
    },

    nachname: {
    	
        prompt: (bot) => bot.say(EmpfangsBot+'Und wie heissen Sie mit Nachnamen?'),
        receive: (bot, message) => {
            nachname = message.text; 
            bot.setProp('nachname', nachname);
            return bot.getProp('vorname')
                .then((vorname) => bot.say(EmpfangsBot+'Sie heissen also '+vorname+' '+nachname+', habe ich das richtig verstanden? [Javascript:cookies(nachname,'+nachname+')] '))
                .then(() => bot.say(EmpfangsBot+'Bitte bestätigen Sie, indem Sie --ja oder --nein schreiben!'))
                .then(() => 'name');
        }
    },

    email: {
    	
        prompt: (bot) => bot.say(EmpfangsBot+'Wie lautet Ihre E-Mail-Adresse?'),
        receive: (bot, message) => {
            emailz = message.text; 
            return bot.setProp('email', emailz)
                .then(() => bot.say(EmpfangsBot+`Ihre E-Mail-Adresse ist ${emailz}. [Javascript:cookies(email,${emailz})] `))
                .then(() => bot.say(EmpfangsBot+`Schreiben Sie --Email, um sie zu ändern.`))
                .then(() => 'register');
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
       
          if  (~befehl.indexOf("--BEFEHLE"))        { versuch = true; bot.say(EmpfangsBot+'--Befehle dieser Seite: '
                                                                            +'\n○ --Mobil '
                                                                            +'\n○ --Newsletter '
                                                                            +'\n○ --Kontakt '
                                                                            +'\n○ --Über').then(function(){
                                                               return bot.say(EmpfangsBot+'Die Gewerke von --Robogeddon: '
                                                                            +'\n○ Andreas: --Strategie '
                                                                            +'\n○ Barbara: --Beratung '
                                                                            +'\n○ Cynthia: --Technik '
                                                                            +'\n○ Doris: --Kreation '
                                                                            +'\n○ Erika: --Konzeption') }).then(function(){
                                                               return bot.say(EmpfangsBot+'Mehr über --Robogeddon: '
                                                                            +'\n○ --Gründung '
                                                                            +'\n○ --Vision '
                                                                            +'\n○ --Über '); }); }
          if  (~befehl.indexOf("--MOBIL"))          { versuch = true; bot.say(EmpfangsBot+'Diesen Chat mobil öffnen: [Qr:https://sefzigbot.herokuapp.com/] ').then(function(){
                                                               return bot.say(TechnikBot+'Leider werden Sie dort nicht automatisch wiedererkannt. Wir arbeiten an einer Lösung...'); }); }
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
              (~befehl.indexOf("--ALICE")))         { versuch = true; bot.say(EmpfangsBot+'Ich würde Ihnen gerne --Robogeddon vorstellen! Oder sprechen Sie direkt mit unserer --Kreation, --Konzeption, --Technik oder --Beratung.').then(function(){
                                                               return bot.say(EmpfangsBot+'Ich habe noch mehr --Befehle.'); }); }
          
       // if ((~befehl.indexOf("--KREATION")) ||
       //     (~befehl.indexOf("--DORIS")))         { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
       //                                                      return bot.say(KreationsBot+'Hallo, ich bin Doris, der Kreations-Bot. Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren.') }).then(function(){
       //                                                      return bot.say(KreationsBot+'Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein.') }).then(function(){
       //                                                      return bot.say(KreationsBot+'Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer!') });
       //                                                             dann = "kreation"; } 
       // 
       // if ((~befehl.indexOf("--BERATUNG")) ||
       //     (~befehl.indexOf("--BARBARA")))       { versuch = true; bot.say(BeratungsBot+'Schreiben Sie --empfang, um zum Empfang zurückzukehren.');
       //                                                             dann = "beratung"; } 
       // if ((~befehl.indexOf("--TECHNIK")) ||
       //     (~befehl.indexOf("--CYNTHIA")))       { versuch = true; bot.say(TechnikBot+'Schreiben Sie --empfang, wenn Sie zum Empfang wollen');
       //                                                             dann = "technik";  } 
       // 
       // if ((~befehl.indexOf("--KONZEPTION")) ||
       //     (~befehl.indexOf("--ERIKA")))         { versuch = true; bot.say(KonzeptionsBot+'Schreiben Sie --empfang, wenn Sie zum Empfang wollen');
       //                                                             dann = "konzeption";  } 
          
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
          	                                                          bot.say(EmpfangsBot+'Wir geben Ihre E-Mail-Adresse nicht an Dritte weiter. ');
                                                                   }
          
       // -----------------
       // Agentur
       // -----------------
          
          if ((~befehl.indexOf("--ROBOGEDON")) ||
              (~befehl.indexOf("--ROBOGEDDON")))    { versuch = true; bot.say(EmpfangsBot+'#Robogeddon sind Andreas Sefzig, mehrere freie Mitarbeiter, eine Handvoll Marketing-Technologien und ein Team aus Bots.').then(function(){
                                                               return bot.say(EmpfangsBot+'Wir realisieren Chat-Bots für die --interne und --externe Unternehmens-Kommunikation.') }).then(function(){
                                                               return bot.say(EmpfangsBot+'Wir befinden uns in einem sehr jungen Markt. Lassen Sie sich von uns beraten, warum und wie Sie Ihren Bot haben wollen!') }).then(function(){
                                                            // return bot.say(EmpfangsBot+'Lassen Sie uns gemeinsam ein --Konzept für Ihren Bot erstellen!') }).then(function(){
                                                            // return bot.say(EmpfangsBot+'#Robogeddon sind die ersten in Deutschland, die Chat-Bots für und mit ihren Kunden entwickeln. \n Unsere Bots vereinfachen die Unternehmens-Kommunikation --intern und --extern.') }).then(function(){
                                                            // return bot.say(EmpfangsBot+'Wir bestehen aus Andreas Sefzig, einer Reihe moderner Marketing- und Kommunikations-Technologien und einem Team aus mehreren Bots (und freien Mitarbeitern).') }).then(function(){
                                                            // return bot.say(EmpfangsBot+'Chatbots sind im --Kommen. Sie sind ideale digitale Rezeptionisten für Ihr digitales Universum.') }).then(function(){
                                                               return bot.say(EmpfangsBot+'Sprechen Sie mit Andreas über die --Strategie und --Konzeption Ihres eigenen Chat-Bots. '); }); }
          
       // -----------------
       // Strategie
       // -----------------
          
          if  (~befehl.indexOf("--STRATEGIE"))      { versuch = true; bot.say(SefzigBot+'Dank ihrer einfachen und direkten Kommunikation sind Chats ein weltweiter --Trend, Tendenz stark zunehmend.').then(function(){
                                                               return bot.say(SefzigBot+'Für das --Marketing sind Chat-Bots ein naheliegender Kanal für den Dialog mit den Menschen. Die Herausforderung ist, Bots nützlich zu machen.') }).then(function(){
                                                               return bot.say(SefzigBot+'Chat-Bots gibt es schon --lange. Sie werden plötzlich interessant, da nun alle "modernen" Menschen mobil und mit Chatten vertraut sind und sich die großen --Plattformen wie Facebook Messenger für Bots öffnen.') }).then(function(){
                                                               return bot.say(SefzigBot+'Interessieren Sie sich eher für Bots, die --intern (z.B. mit Ihrem Team) oder --extern (z.B. mit Ihren Kunden) kommunizieren?'); }); }
          
       // Intern
       
          if ((~befehl.indexOf("--INTERN")) ||
              (~befehl.indexOf("--INTERNE")))       { versuch = true; bot.say(SefzigBot+'Die Erfahrung und eine --Studie von Slack zeigen, dass es sich lohnt, die interne Kommunikation auf Chat umzustellen.').then(function(){
                                                               return bot.say(SefzigBot+'Wenn Ihr Team dann schon den ganzen Tag einen Chat-Client nutzt, können Sie über Erweiterungen und Bots viele interne und externe --Daten in die Konversation holen.') }).then(function(){
                                                               return bot.say(SefzigBot+'Mit den Prinzipien der --ChatOps als Teil Ihrer --Strategie erleichtern Sie Ihrem Team die Arbeit immens!'); }); }
          
          if  (~befehl.indexOf("--CHATOPS"))        { versuch = true; bot.say(SefzigBot+'ChatOps Text 1.').then(function(){
                                                               return bot.say(SefzigBot+'ChatOps Text 2.'); }).then(function(){
                                                               return bot.say(SefzigBot+'Zurück zu --Strategie --intern.'); }); }
          
          if  (~befehl.indexOf("--DATEN"))          { versuch = true; bot.say(SefzigBot+'Mit Bots und Erweiterungen geben Sie Ihrem Team rollen-basierten Zugriff auf diverse Daten-Quellen und Marketing-Technologien, deren Daten aufgrund der Natur des Chats immer nur ein, zwei Wörter weit entfernt sind.').then(function(){
                                                               return bot.say(SefzigBot+'Viele Erweiterungen, z.B. von Slack, erlauben auch die (eingeschränkte) Steuerung von Diensten wie Jira, Skype oder Mailchimp.') }).then(function(){
                                                               return bot.say(SefzigBot+'Daten in Konversationen haben zudem einen --intern lehrreichen Charakter: Man sieht im Chat, wie die Kollegen Daten abfragen und Ihre Werkzeuge steuern. Gut für Ihre --Strategie!'); }); }
          
          if  (~befehl.indexOf("--STUDIE"))         { versuch = true; bot.say(SefzigBot+'Der führende Chat-Anbieter Slack hat im Juli 2015 eine Studie durchgeführt: [Button:Studie von Slack,http://slack.com/results] Nach eigenen Angaben haben Teams einen Produktivitäts-Gewinn von bis zu 32% durch den Einsatz von Slack, 80% sehen mehr Transparenz und fast 50% weniger Emails.').then(function(){
                                                               return bot.say(TechnikBot+'Wir in der Technik setzen auf --ChatOps und haben --intern eine eigene Studie durchgeführt: Wir kommunizieren schriftlich zu 100% über --Slack und steuern unsere Marketing-Technologien zu 80% im Chat.'); }); }
          
       // Extern
       
          if ((~befehl.indexOf("--EXTERN")) ||
              (~befehl.indexOf("--EXTERNE")))       { versuch = true; bot.say(SefzigBot+'Bots ermöglichen einen eleganten Zugang zu Ihren Marketing-Aktivitäten. Verstehen Sie einen Bot als virtuellen Mitarbeiter, der Nutzer in Empfang nimmt, einfache Fragen beantwortet und sie - bei Bedarf! - direkt in Ihre Marketing-Maßnahmen verlinkt.').then(function(){
                                                               return bot.say(SefzigBot+'Bots können auch alle möglichen --Aufgaben übernehmen: Von der Newsletter-Registrierung über einen Produkt-Finder bis zum Support mit oder ohne menschliche Unterstützung.') }).then(function(){
                                                               return bot.say(SefzigBot+'Bots sind leicht aufzusetzen (wenn man weiß wie es geht ;). Vor allem aber sind sie leicht in alle Marketing- --Kanäle integrierbar!') }).then(function(){
                                                               return bot.say(KreationsBot+'Wir in der --Kreation liebt es, interessante --Dialoge zu erschaffen, die Nutzern einen konkreten --Mehrwert bieten und sie mit reichhaltigen --Inhalten erfreuen.'); }); }
          
       // Allgemein
       
          if  (~befehl.indexOf("--LANGE"))          { versuch = true; bot.say(SefzigBot+'1966 entstand mit dem Chatbot ELIZA die erste künstliche Intelligenz: %[Ein Nachbau von ELIZA](http://sefzig.net/link/ElizaMedai/) ').then(function(){ 
                                                            // return bot.say(SefzigBot+'1999 chattete Prince (The artist formerly known usw.) regelmäßig im AOL Messenger: %[Artikel auf Medium (englisch)](http://sefzig.net/link/ChattingWithPrince/) ') }).then(function(){
                                                               return bot.say(SefzigBot+'2001 setzte das Marketing erstmals im großen Stil einen Chatbot ein - für Radioheads neues Album: %[Artikel auf Medium (englisch)](http://sefzig.net/link/GooglyMinotaur/) ') }).then(function(){
                                                               return bot.say(SefzigBot+'Ah, Geschichte, immer spannend. Zurück zur --Strategie?'); }); }
          
          if  (~befehl.indexOf("--TREND"))          { versuch = true; bot.say(SefzigBot+'Chatten ist inzwischen die häufigste digitale Beschäftigung, auch in Deutschland. Ein paar Statistiken: [Text:Aktuelle Statistiken,RobogeddonChatten]').then(function(){
                                                               return bot.say(SefzigBot+'Seit 2015 verbringt man in den Usa mehr Zeit mit Messaging-Apps als mit den Apps der Sozialen Netzwerke: [Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/Mesaging_vs_Social.png] Quelle: [Textlink:BI Intelligence Report,MessagingVsSocial]'); }).then(function(){
                                                               return bot.say(SefzigBot+'Eine Liste lesenswerter Artikel zur --Strategie in Real Time Messaging: [Linkliste:Linkliste öffnen,Rtm:Strategie:Artikel]'); }); }
          
          if  (~befehl.indexOf("--MARKETING"))      { versuch = true; bot.say(SefzigBot+'Marketing Text 1.').then(function(){
                                                               return bot.say(SefzigBot+'Marketing Text 2.'); }).then(function(){
                                                               return bot.say(SefzigBot+'Zurück zur --Strategie.'); }); }
          
       // -----------------
       // Konzeption
       // -----------------
          
          if  (~befehl.indexOf("--KONZEPTION"))     { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Erika. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(KonzeptionsBot+'Hallo, ich bin Erika, der Konzeptions-Bot.'); }).then(function(){
                                                               return bot.say(KonzeptionsBot+'Konzeption Text 3.'); }); }
          
          if  (~befehl.indexOf("--KANÄLE"))         { versuch = true; bot.say(KonzeptionsBot+'Ein Bot lässt sich einfach in Ihre bestehenden Marketing-Kanäle einbinden - letztlich ist er nur die URL einer für alle Geräte optimierten Webseite.').then(function(){
                                                               return bot.say(KonzeptionsBot+'CRM/Dialog: Link in Newslettern, Kurzlink/QR-Code auf Drucksachen.') }).then(function(){
                                                               return bot.say(KonzeptionsBot+'Marke: Webseiten-Widget, Link in Social Media und E-Mail-Signaturen, Kurzlink/QR-Code auf Visitenkarten.') }).then(function(){
                                                               return bot.say(KonzeptionsBot+'Vor Ort: Kurzlink/QR-Code auf Plakat, Aufsteller, Schaufenster, Produkt.') }).then(function(){
                                                               return bot.say(KonzeptionsBot+'Text mit --Konzeption und --extern.'); }); }
          
       // -----------------
       // Kreation
       // -----------------
          
          if  (~befehl.indexOf("--KREATION"))       { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Doris. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(KreationsBot+'Hallo, ich bin Doris, der Kreations-Bot. Hier in der Kreation hauchen wir den Bots --Leben ein, indem wir die --Dialoge menschlich und direkt formulieren.') }).then(function(){
                                                               return bot.say(KreationsBot+'Für ein Plus an --Persönlichkeit weben wir einfache --Geschichten und reichhaltige --Inhalte in die Konversationen ein.') }).then(function(){
                                                               return bot.say(KreationsBot+'Letztendlich geht es aber nur um eines: --Mehrwerte für die Nutzer!') }); }
          
          if  (~befehl.indexOf("--DIALOGE"))        { versuch = true; bot.say(KreationsBot +'Dialoge mit Bots können durch Wiederholungen dröge werden. Wir bringen unseren Bots verschiedene Ausdrucksweisen entlang ihrer --Persönlichkeit bei, um Konversationen trotz möglicher Wiederholungen lebendig zu gestalten.'); }
          if  (~befehl.indexOf("--PERSÖNLICHKEIT")) { versuch = true; bot.say(KreationsBot +'Mit Bots chattet man wie mit Menschen. Um --Dialoge abwechslungsreich zu gestalten, erhalten unsere Bots eine Persönlichkeit und eine --Geschichte.'); }
          if  (~befehl.indexOf("--GESCHICHTEN"))    { versuch = true; bot.say(KreationsBot +'Menschen chatten nicht nur, um Informationen weiterzugeben. Unsere Bots haben eine Geschichte, die ihre --Persönlichkeit illustriert und den Bots --Leben einhaucht. '); }
          if  (~befehl.indexOf("--LEBEN"))          { versuch = true; bot.say(KreationsBot +'Das Leben der Bots ist ein einfaches Leben: Sie verarbeiten Informationen. Aber ihre --Persönlichkeit und --Geschichte macht sie einzigartig - mithilfe reichhaltiger --Inhalte.'); }
          if  (~befehl.indexOf("--INHALTE"))        { versuch = true; bot.say(KreationsBot +'Die Techniker haben alle möglichen Inhalts-Formate entwickelt, mit denen unsere Bots kommunizieren: Bilder, Videos, Microsites und natürlich Texte. So sind die --Mehrwerte unserer Bots unterhaltsam und leicht zu konsumieren.'); }
          if  (~befehl.indexOf("--MEHRWERTE"))      { versuch = true; bot.say(KreationsBot +'Ein Bot mag eine nette --Persönlichkeit und eine interessante --Geschichte transportieren - relevant für den Nutzer werden sie nur durch konkrete Mehrwerte. Wir achten darauf, dass unsere Bots den nutzern nützliche Hilfestellungen, wertvolle Inhalte und echte Vorteile verschaffen.'); }
          
       // -----------------
       // Beratung
       // -----------------
          
          if  (~befehl.indexOf("--BERATUNG"))       { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Barbara. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(BeratungsBot+'Hallo, ich bin Barbara, der Beratungs-Bot. Ich möchte Ihnen unsere --Produkte und --Leistungen zeigen.'); }).then(function(){
                                                               return bot.say(BeratungsBot+'Wenn Sie möchten, erstellen wir gleich eine --Kalkulation für Ihren Bot!'); }); }
          
          if  (~befehl.indexOf("--PRODUKTE"))       { versuch = true; bot.say(BeratungsBot +'Text Produkte.'); }
          if  (~befehl.indexOf("--LEISTUNGEN"))     { versuch = true; bot.say(BeratungsBot +'Text Leistungen.'); }
          if  (~befehl.indexOf("--KALKULATION"))    { versuch = true; bot.say(BeratungsBot +'Text Kalkulation.'); }
          
       // -----------------
       // Technik
       // -----------------
          
          if  (~befehl.indexOf("--TECHNIK"))        { versuch = true; bot.say(EmpfangsBot+'Ich übergebe an Cynthia. Schreiben Sie --Empfang, um wieder mit mir zu sprechen.').then(function(){
                                                               return bot.say(TechnikBot+'Hallo, ich bin Cynthia, der Technik-Bot.'); }).then(function(){
                                                               return bot.say(TechnikBot+'Schreiben Sie: --Technik1, --Technik2 und --Technik3.'); }); }
          
          if  (~befehl.indexOf("--TECHNIK1"))       { versuch = true; bot.say(BeratungsBot +'Text Technik 1.'); }
          if  (~befehl.indexOf("--TECHNIK2"))       { versuch = true; bot.say(BeratungsBot +'Text Technik 2.'); }
          if  (~befehl.indexOf("--TECHNIK3"))       { versuch = true; bot.say(BeratungsBot +'Text Technik 3.'); }
          
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
       
          if  (~befehl.indexOf("--JAVASCRIPT"))     { versuch = true; bot.say(SefzigBot+'[Javascript:test_alert(123)]'); }
          if  (~befehl.indexOf("--VIDEO"))          { versuch = true; bot.say(SefzigBot+'[Youtube:u07XONlDwX8]'); }
          if  (~befehl.indexOf("--LINKTEST"))       { versuch = true; bot.say(SefzigBot+'Ein Link: [Link:Testlink,ThinMedia]'); }
          
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
       
          if  (~befehl.indexOf("--VORLAGE"))        { versuch = true; bot.say(KreationsBot +'Text Vorlage.'); }
          
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
         //           SefzigBot+'Chatten ist die häufigste digitale Beschäftigung in Deutschland: [Text:Aktuelle Statistiken,RobogeddonChatten] Ein weltweiter --Trend mit erheblichen absehbaren Auswirkungen auf die Benutzeroberflächen des Internets.',
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
            