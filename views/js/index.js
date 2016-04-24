
 // Anwendung starten
    $(document).ready(function(){
       
    // Konto füllen
       var vorname =  Cookies.get('SefzigbotVorname');  if ((vorname)  && (vorname != ""))  { $("#vorname").val(vorname);   } else { vorname  = "Vorname";        } $("#vorname").change(function(){  Cookies.set('SefzigbotVorname',  $(this).val()); });
       var nachname = Cookies.get('SefzigbotNachname'); if ((nachname) && (nachname != "")) { $("#nachname").val(nachname); } else { nachname = "Nachname";       } $("#nachname").change(function(){ Cookies.set('SefzigbotNachname', $(this).val()); });
       var email =    Cookies.get('SefzigbotEmail');    if ((email)    && (email != ""))    { $("#email").val(email);       } else { email    = "E-Mail-Adresse"; } $("#email").change(function(){    Cookies.set('SefzigbotEmail',    $(this).val()); });
       
    // Chat starten
       var starten = "chat";
       window.setTimeout(function() { start(starten); }, 1000);
       
    // Benutzeroberfläche
       $("[data-start]").click(function(e) {
          
       // Elemente
          var starten = $(this).attr("data-start");
          
       // Navigation
          start(starten);
          
       // Klick verhindern
          e.preventDefault();
          
       });
       
    // Chat-Inhalte anpassen
       var zuletzt = 0;
       window.setInterval(function() { anpassen(); }, 333);
       
    });
    
 // Chat starten
    function start(methode) {
       
    // Ansichten anpassen
       $("#seite > div").fadeOut();
       $("#seite #"+methode).fadeIn();
          
       if (methode == "chat") {
          
       // Umgebungs-Parameter einsammeln
          var vorname =  Cookies.get('SefzigbotVorname');  if ((!vorname)  || (vorname  == "") || (vorname  == "Vorname"))        { vorname  = "Nicht"; }
          var nachname = Cookies.get('SefzigbotNachname'); if ((!nachname) || (nachname == "") || (nachname == "Nachname"))       { nachname = "Bekannt"; }
          var email =    Cookies.get('SefzigbotEmail');    if ((!email)    || (email    == "") || (email    == "E-Mail-Adresse")) { email    = "unbekannt@sefzig.net"; }
          
       // Smooch Js
       // https://github.com/smooch/smooch-js
          Smooch.init({ 
             appToken: 'd9k415y76nk8ab2croifjshpv',
             embedded: true,
             customText: {
                headerText: 'Andreas Sefzig (und Bots)',
                inputPlaceholder: 'Schreiben Sie eine Nachricht...',
                sendButtonText: 'Absenden',
                introText: 'Dies ist der Anfang unseres Gesprächs.<br/>Schreiben Sie irgendetwas, um zu beginnen!',
                settingsText: 'Hinterlassen Sie Ihre E-Mail-Adresse, damit ich Kontakt zu Ihnen aufnehmen kann.',
                settingsReadOnlyText: 'Ich schreibe Ihnen an diese E-Mail-Adresse, sollen wir uns verpasst haben.',
                settingsInputPlaceholder: 'Ihre E-Mail-Adresse',
                settingsSaveButtonText: 'Speichern',
                settingsHeaderText: 'E-Mail-Einstellungen',
                settingsNotificationText: 'Sollte ich Ihnen nicht schnell genug antworten, <a href data-ui-settings-link>hinterlassen Sie mir bitte Ihre E-Mail-Adresse</a>.',
                actionPaymentError: 'Es ist ein Fehler im Bezahlvorgang aufgetreten. <br> Bitte versuchen Sie es nochmal (oder mit einer anderen Karte).',
                actionPaymentCompleted: 'Bezahlvorgang abgeschlossen',
                messageError: 'Beim Versenden ist ein Fehler aufgetreten. Bitte versuchen Sie es nochmal.',
                invalidFileError: 'Es tut mir leid, zur Zeit können nur Bild-Dateien hochgeladen werden. Bitte laden Sie ein Jpg, Png, Gif oder Bmp hoch.',
                messageIndicatorTitleSingular: '({count}) neue Nachricht',
                messageIndicatorTitlePlural: '({count}) neue Nachrichten'
             }
          }); 
          
       // Smooch.open();
          Smooch.render(document.getElementById('chat'));
          
       // Nutzer-Infos aktualisieren
       // Smooch.updateUser({ vorname: vorname });
       // Smooch.updateUser({ nachname: nachname });
       // Smooch.updateUser({ email: email });
          
       }
       
       if (methode == "facebook") {
          
       // Facebook Messenger in Iframe laden
          $("#facebook > iframe").attr("src", "http://www.messenger.com/t/1195928167086850/");
          
       }
       
    }
    
    function inhalt(methode, text_string, var1, var2) {
       
       text_string = " "+text_string+" ";
       var inhalte = text_string;
       
       if (methode == "befehl") { 
       // methode: befehl
       
       // Befehle anpassen
          inhalte = inhalte.split("--");
          for (i = 1; i < inhalte.length; i++) {
             
             var inhalt = inhalte[i].split(/,|;|:|\.|!|\?| /)[0];
             text_string = text_string.replace("--"+inhalt, '<span class="befehl" onclick="befehlen(\'--'+inhalt+'\')">--'+inhalt+'</span>');
             console.log("- Befehl angepasst: "+inhalt);
             var inhalt = "";
             
          }
          
       }
       
       if ((methode == "modul") && (var1) && (var1 != "")) {
       // methode: modul
       // var1: Bild
          
       // Modulnamen kamelisieren
          var modul = var1;
          modul = modul.charAt(0).toUpperCase() + modul.slice(1);
          
       // Klasse in Kleinbuchstaben
          var klasse = var1;
          klasse = klasse.toLowerCase();
          
       // Modul anpassen
          inhalte = inhalte.split("["+modul+":");
          for (i = 1; i < inhalte.length; i++) {
             
          // Inhalt freistellen
             var inhalt = inhalte[i].split("]")[0];
             
          // Neuen Text anpassen
             text_string = text_string.replace("["+modul+":"+inhalt+"]", '<img class="'+klasse+'" src="'+inhalt+'" />');
             
          // Debuggen
             console.log("- "+modul+" angepasst; "+inhalt);
             
          // Zurücksetzen
             var inhalt = "";
             
          }
          
       }
       
       if ((methode == "bot") && (var1) && (var1 != "") && (var2) && (var2 != "")) {
       // methode: bot
       // var1: SefzigBot
       // var2: Andreas Sefzigs Bot
          
       // Wenn Text den Botnamen enthält
          bot_alt = inhalte; bot_neu = inhalte.replace("["+var1+"] ","");
          if (bot_neu != bot_alt) {
             
          // Konfiguration
             var name = var2;
             var pfad = "img/bots/Displaybild_"+var1+".png";
             
          // Botnamen anpassen
             $(this).parent().parent().parent().parent().children().filter(".sk-from").html(name);
             
          // Botbild anpassen
             $(this).parent().parent().parent().parent().parent().children().filter("img").attr("src", pfad);
             
          // Neuen Text anpassen
             text_string = text_string.replace("["+var1+"] ","");
             
          // Debuggen
             console.log("- Bot angepasst: "+name);
             
          }
          
       }
       
       if ((methode == "javascript") && (var1) && (var1 != "") && (var2) && (var2 != "")) {
       // methode: javascript
       // var1: var funktionen
       // var2: Ich habe den Text geöffnet.
          
       // Javascript ausführen
          inhalte = inhalte.split("[Javascript:");
          for (i = 1; i < inhalte.length; i++) {
             
          // Funktionen übernehmen
             var funktionen = var1;
             
          // Meldung übernehmen
             var meldung = var2;
             
          // Funktions-Namen freistellen
             var skript = inhalte[i].split("]")[0];
             
          // Neuen Text anpassen
             text_neu = text_neu.replace("[Javascript:"+skript+"]", meldung);
             
          // Bekannte Funktionen ausführen
             funktionen[skript]();
             
          // Debuggen
             console.log("- Javascript ausgeführt: "+skript);
             
          // Zurücksetzen
             var skript = "";
             
          }
          
       }
          
       return text_string;
       
    }
    
 // Chat-Inhalte anpassen
    function anpassen() {
       
    // Noch nicht angepasste anpassen
       var selektor = ".sk-messages .sk-left-row .sk-msg > span > span > span:not([data-angepasst])";
       $(selektor).each(function() {
          
       // Inhalte lesen
          var text_alt = $(this).html();
          
       // Neuen Inhalt beginnen // String wird von allen folgenden Funktionen angepasst
          var text_neu = text_alt;
          
       // Zugelassene Javascript-Funktionen
          var funktionen = {
             test_alert:   function () { alert('Hallo Welt!'); },
             test_console: function () { console.log('Hallo Welt!'); }
          };
          
       // Inhalte anpassen
          text_neu = inhalt("befehl", text_neu);
          text_neu = inhalt("modul", text_neu, "Bild"); 
          text_neu = inhalt("javascript", text_neu, funktionen, "Ich habe ein Javascript ausgeführt.");
          
       // Bots anpassen
          var text_merken = text_neu;
          text_neu = inhalt("bot", text_neu, "SefzigBot", "Andreas Sefzigs Bot");
          text_neu = inhalt("bot", text_neu, "LinkBot", "Link Bot");
          if (text_neu != text_merken) { text_neu = "[AndreasSefzig] "+text_neu; }
          text_neu = inhalt("bot", text_neu, "AndreasSefzig", "Andreas Sefzig");
          
       // Angepasste Inhalte schreiben
          $(this).html(text_neu);
          
       // Als angepasst markieren
          $(this).attr("data-angepasst", "true");
          
       });
       
    }
    
    function befehlen(befehl) {
       
       $(".input-container .message-input").val(befehl).trigger("keydown", {which: 50});
       
    }
    