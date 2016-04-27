'use strict';

const Script = require('smooch-bot').Script;
const AndreasSefzig = "[AndreasSefzig] ";
const EmpfangsBot = "[EmpfangsBot] ";
const BeratungsBot = "[BeratungsBot] ";
const KreationsBot = "[KreationsBot] ";
const TechnikBot = "[TechnikBot] ";

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say(SefzigBot+'Nicht so schnell bitte...'),
        receive: () => 'processing'
    },

 // -------------------------
 // Onboarding 
 // -------------------------
         
    start: {
        receive: (bot) => {
            return bot.then(() => 'vorname'); /* <-- register */
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

    name: {
        receive: (bot, message) => {
            
            var antwort = message.text.trim().toUpperCase();
            var name_falsch = "";
            var dann = "";
            
            if (antwort == "--JA")   { 
               
               bot.say(SefzigBot+'Sie können hier jederzeit eine Nachricht an Andreas schreiben!');
               bot.say(SefzigBot+'Unterhalten Sie sich mit mir: Bitte schreiben Sie --bot:');
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

 // -------------------------
 // Register
 // -------------------------
         
    register: {
        receive: (bot, message) => {
            
            var befehl = message.text.trim().toUpperCase();
            var dann = "register";
            
         // -----------------
         // Bots
         // -----------------
            
            if ((~befehl.indexOf("--LINK")) ||
                (~befehl.indexOf("--LINKS")))         { bot.say(LinkBot  +'Andreas speichert viele interessante Links - für sich wie auch für Sie: [Linkliste:Allgemein] 1.000 Links, 6.000 Aufrufe!');
                                                        bot.say(LinkBot  +'Steuern Sie mich mit diesen Befehlen: \n○ --Links \n○ --Listen \n○ --Liste \n○ --Eingabe \n○ --Einrichten \n○ --Admin \n○ --Uber');
                                                        bot.say(LinkBot  +'(Schreiben Sie --bot, um wieder mit SefzigBot zu sprechen.)');
                                                        dann = "link"; } 
            
            if ((~befehl.indexOf("--TEXT")) ||
                (~befehl.indexOf("--TEXTE")))         { bot.say(TextBot  +'Andreas verwaltet, bearbeitet und teilt alle seine Texte mit einer eigens entwickelten Software: [Text:Text] ');
                                                        bot.say(TextBot  +'(Schreiben Sie --bot, um wieder mit SefzigBot zu sprechen.)');
                                                        bot.say(TextBot  +'Steuern Sie mich mit diesen Befehlen: \n○ --Startseite \n○ --Hilfe \n○ --Uber');
                                                        dann = "text"; } 
            
            if  (~befehl.indexOf("--SLACK"))          { bot.say(SlackBot +'Andreas mag Interne Kommunikation und Automatisierung - er liebt Slack! Das sollte Ihr Team auch tun...');
                                                        bot.say(SlackBot +'(Schreiben Sie --bot, um wieder mit SefzigBot zu sprechen.)');
                                                        bot.say(SlackBot +'Lesen Sie Andreas --Artikel oder --Blogpost, öffnen Sie seine --Links oder treten Sie Andreas offenem Slack --Team bei.');
                                                        dann = "slack"; } 
            
         // -----------------
         // System
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SefzigBot+'--bot '
                                                              +'\n○ --mobil '
                                                              +'\n○ --befehle '
                                                              +'\n○ --abbrechen '); }
            
            if ((~befehl.indexOf("--BOT")) ||
                (~befehl.indexOf("--UBER")))          { bot.say(SefzigBot+'Ich weiß eine Menge über Andreas - und bin sein Ersatz für eine klassische Webseite. Rufen Sie mein Wissen durch Schreiben der mit -- beginnenden Wörter ab!');
                                                        bot.say(SefzigBot+'Wollen Sie etwas über seine --Person oder --Neues von ihm erfahren? Oder auf anderem Wege --Kontakt  aufnehmen?'); }
            if  (~befehl.indexOf("--ABBRECHEN"))      { bot.say(SefzigBot+'Sie können das Gespräch mit mir beenden'); }
            if  (~befehl.indexOf("--MOBIL"))          { bot.say(SefzigBot+'Diesen Chat mobil öffnen: [Bild:https://zxing.org/w/chart?cht=qr&chs=200x200&chld=L&choe=UTF-8&chl=http%3A%2F%2Fsefzigbot.herokuapp.com%2F]');
                                                        bot.say(SefzigBot+'(Leider werden Sie dort nicht wiedererkannt. Das sollte in einer späteren Version möglich sein...)'); }
            if  (~befehl.indexOf("--NAME"))           { dann = "name"; }
            
         // -----------------
         // Person
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SefzigBot+'--Person '
                                                              +'\n○ --Über '
                                                              +'\n○ --Foto '
                                                              +'\n○ --Lebenslauf '
                                                              +'\n○ --Kompetenzen '
                                                              +'\n○ --Disziplinen '); }
            
            if  (~befehl.indexOf("--PERSON"))         { bot.say(SefzigBot+'Ich hätte da Andreas --Lebenslauf, eine Liste seiner --Kompetenzen und eine Liste der Marketing --Disziplinen, die er beherrscht.');
                                                        bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzignetStartseite/dateien/SefzignetStartseiteFotoLogos.png]');
                                                        bot.say(SefzigBot+'Andreas ist 38 Jahre alt und lebt in Hamburg.'); }
            if  (~befehl.indexOf("--LEBENSLAUF"))     { bot.say(SefzigBot+'Sein Lebenslauf als druckbares PDF-Dokument: %[Lebenslauf.pdf](http://sefzig.net/text/seiten/Lebenslauf/dateien/Andreas_Sefzig_Lebenslauf.pdf)');
                                                        bot.say(SefzigBot+'Tabellarisches und ausformuliertes CV: %[Lebenslauf öffnen](http://sefzig.net/link/Lebenslauf/)'); }
            if  (~befehl.indexOf("--KOMPETENZEN"))    { bot.say(SefzigBot+'Text Kompetenzen: [Text:Kompetenzen] '); }
            if  (~befehl.indexOf("--DISZIPLINEN"))    { bot.say(SefzigBot+'Text Disziplinen: [Text:Disziplinen] '); }
            if  (~befehl.indexOf("--FOTO"))           { bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzignetStartseite/dateien/SefzignetStartseiteFotoLogos.png] Andreas Sefzig mit Logo'); }
            
         // -----------------
         // Neues
         // -----------------
         
         // Übersicht
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SefzigBot+'--neues '
                                                              +'\n○ --jobsuche '
                                                              +'\n○ --slack '
                                                              +'\n○ --rtm '); }
            
         // Befehle
            if  (~befehl.indexOf("--NEUES"))          { bot.say(SefzigBot  +'○ --jobsuche '
                                                              +'\n○ --slack / --rtm '
                                                              +'\n○ --newsletter ');
                                                        bot.say(SefzigBot  +' Was es bei Andreas --Neues gibt? So einiges... '); }
            
            if ((~befehl.indexOf("--FRISKY")) ||
                (~befehl.indexOf("--RADIO")) ||
                (~befehl.indexOf("--FRISKYRADIO")))   { bot.say(SefzigBot+'Frisky Radio: Global EDM [Audio:http://www.friskyradio.com/m3u/frisky.m3u] Mitglied seit 2003.'); }
            
            if  (~befehl.indexOf("--ROBOGEDDON"))     { bot.say(SefzigBot+'#Robogeddon ist Andreas Hashtag für den Einzug von Chatbots in unser Leben. [Text:Robogeddon] Bots werden die digitale Welt verändern!'); }
            if  (~befehl.indexOf("--SLACKTEAM"))      { bot.say(SefzigBot+'Treten Sie dem offenen Slack-Team von Andreas bei, um sich mit ihm zu beraten und um Slack im laufenden Betrieb zu sehen: [Button:Anmeldung,http://sefzig.net/link/SlackAnmeldung/] '); }
            
         // -----------------
         // Kontakt 
         // -----------------
         
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SefzigBot+'--kontakt '
                                                              +'\n○ --kontaktSeite '
                                                              +'\n○ --kontaktTwitter '
                                                              +'\n○ --kontaktSlack '); }
            
            if  (~befehl.indexOf("--KONTAKT"))        { bot.say(SefzigBot+'Andreas mobile Telefonnummer: [Button:0151 - 15 92 00 82,tel:+4915115920082] Andreas E-Mail-Adresse: [Button:andreas@sefzig.net,mailto:andreas@sefzig.net] Weitere Kontaktdaten: [Text:SefzignetKontakt]');
                                                        bot.say(SefzigBot+'Besuchen Sie Andreas auf --Twitter und --Xing oder treten Sie seinem offenen --SlackTeam bei!'); }
            if  (~befehl.indexOf("--SLACKTEAM"))      { bot.say(SefzigBot+'Andreas betreibt ein offenes Slack-Team, in dem man sich über Marketing-Technologie unterhält. %[Slack-Team öffnen](http://sefzig.net/link/SlackAnmeldung/)'); }
            if  (~befehl.indexOf("--XING"))           { bot.say(SefzigBot+'Andreas ist bei Xing: Er ist seit 2004 angemeldet und gehört mit über 500 Kontakten zu den 5% der bestvernetzten Mitglieder. %[Xing-Profil öffnen](http://sefzig.net/link/XingProfil/)'); 
                                                        bot.say(SefzigBot+'[Bild:http://sefzig.net/text/seiten/SefzigBot/dateien/xing_vernetzt.png]'); }
            if  (~befehl.indexOf("--TWITTER"))        { bot.say(SefzigBot+'Andreas ist auf Twitter: Er ist seit 2008 angemeldet, hat beinahe 500 Follower und sah sich kürzlich gezwungen, alle Tweets zu löschen: Neustart 2016. %[Twitter-Profil öffnen](http://sefzig.net/link/TwitterProfil/)'); 
                                                        bot.say(SefzigBot+'Schreiben Sie einen Tweet über @sefzig: %[@sefzig twittern](http://sefzig.net/link/TwitterTweet/)'); }
            
         // -----------------
         // Simon the cat
         // -----------------
            
            if  (~befehl.indexOf("--MAUNZ"))          { bot.say(SefzigBot+'Befehle: --maunz: --maudreh, --maukuschel, --maubox, --maukugel, --mauohr'); }
            if  (~befehl.indexOf("--MAUDREH"))        { bot.say(SefzigBot+'[Bild:://49.media.tumblr.com/14633d451a8cb2642fd644fdd9a0a319/tumblr_meqaedpljZ1qal0zgo1_r1_500.gif ]'); }
            if  (~befehl.indexOf("--MAUKUSCHEL"))     { bot.say(SefzigBot+'[Bild:://2.bp.blogspot.com/-A0RNd-nRhyc/UDfcMvTV-MI/AAAAAAAAC6M/cKd3J47vqmg/s1600/tumblr_lvqjn0woFq1qerhg8o1_500_large.gif]'); }
            if  (~befehl.indexOf("--MAUBOX"))         { bot.say(SefzigBot+'[Bild:://ic.pics.livejournal.com/akira_001/66442224/134158/134158_900.gif]'); }
            if  (~befehl.indexOf("--MAUKUGEL"))       { bot.say(SefzigBot+'[Bild:://media.giphy.com/media/NFRXs0b3DyIve/giphy.gif]'); }
            if  (~befehl.indexOf("--MAUOHR"))         { bot.say(SefzigBot+'[Bild:://media.giphy.com/media/k03ZWbT5M7QfC/giphy.gif]'); }
            
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
 // Slack
 // -------------------------
    
    slack: {
        receive: (bot, message) => {
            
         // Befehl normalisieren
            var befehl = message.text.trim().toUpperCase();
            
         // Nächster Schritt default
            var dann = "slack";
            
         // Befehle
            if  (~befehl.indexOf("--BEFEHLE"))        { bot.say(SlackBot +'--Slack '
                                                              +'\n○ --Über '
                                                              +'\n○ --Artikel '
                                                              +'\n○ --Blogpost '
                                                              +'\n○ --Links '
                                                              +'\n○ --Team'); }
            if ((~befehl.indexOf("--BOT")) ||
                (~befehl.indexOf("--ABBRECHEN")))     { bot.say(SlackBot +'Zurück an Sefzig --Bot. Bis später!');
                                                        dann = "register"; }
            
         // Inhalte
            if ((~befehl.indexOf("--UBER")) ||
                (~befehl.indexOf("--ÜBER")))          { bot.say(SlackBot +'Slack ist zur Zeit die beste Chat-Anwendung für Teams. Bedienfreundlich, automatisierbar und operationalisierbar. Über Slack wurde Andreas auf #Robogeddon aufmerksam!');
                                                        bot.say(SlackBot +'[Bild:http://sefzig.net/text/seiten/SefzignetSlack/dateien/slack_logo.png]'); }
            if  (~befehl.indexOf("--ARTIKEL"))        { bot.say(SlackBot +'Andreas hat einen fundierten Artikel zu Slack geschrieben: [Text:Slack] Was Sie als Marketer über Slack wissen müssen.'); }
            if  (~befehl.indexOf("--BLOGPOST"))       { bot.say(SlackBot +'Lesen Sie auch Andreas Blogpost zu Slack: [Text:SefzignetBlogSlack] Was ist Slack und wie nutzt man es? '); }
            if  (~befehl.indexOf("--LINKS"))          { bot.say(SlackBot +'Andreas hat viele Artikel zu Slack gesammelt: [Linkliste:Slack;Artikel] '); }
            if  (~befehl.indexOf("--TEAM"))           { bot.say(SlackBot +'Treten Sie dem offenen Slack-Team von Andreas bei, um sich mit ihm zu beraten und um Slack im laufenden Betrieb zu sehen: [Button:Anmeldung,http://sefzig.net/link/SlackAnmeldung/] '); }
            
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
