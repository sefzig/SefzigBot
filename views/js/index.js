
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
    
 // Chat-Inhalte anpassen
    function anpassen() {
       
    // Noch nicht angepasste anpassen
       var selektor = ".sk-messages .sk-left-row .sk-msg > span > span > span:not([data-angepasst])";
       $(selektor).each(function() {
          
       // Inhalte lesen
          var text = $(this).html();
          
       // Neuen Inhalt beginnen
          var text_neu = text;
          
       // Befehle anpassen
          var texte = text;
          texte = texte.split("--");
          for (i = 1; i < texte.length; i++) {
             
             var befehl = texte[i].split(/,|;|:|\.|!|\?| /)[0];
             text_neu = text_neu.replace("--"+befehl, '<span class="befehl" onclick="befehlen(\'--'+befehl+'\')">--'+befehl+'</span>');
             console.log("- Befehl angepasst: "+befehl);
             var befehl = "";
             
          }
          
       // Bilder anpassen
          var bilder = " "+text+" ";
          bilder = bilder.split("[Bild:");
          for (j = 1; j < bilder.length; j++) {
             
             var bild = bilder[j].split("]")[0];
             text_neu = text_neu.replace("[Bild:"+bild+"]", '<img class="bild" src="'+bild+'" />');
             console.log("- Bild angepasst: "+bild);
             var bild = "";
             
          }
          
       // Bots anpassen
          text_alt = text_neu; text_neu = text_neu.replace("[SefzigBot] ","");
          link_alt = text_neu; link_neu = text_neu.replace("[LinkBot] ","");
          
       // SefzigBot 
          if (text_neu != text_alt) {
             
          // Konfiguration
             var name = "Andreas Sefzigs Bot";
             var name_bisher = $(this).parent().parent().parent().parent().children().filter(".sk-from").html();
             
          // Bot-Namen anpassen
             $(this).parent().parent().parent().parent().children().filter(".sk-from").html(name);
             
          // Bot-Bild schreiben
             var pfad = "http://sefzig.net/text/seiten/SefzigBot/dateien/displaybild_sefzig_bot.png";
             $(this).parent().parent().parent().parent().parent().children().filter("img").attr("src", pfad);
             
          }
       // LinkBot 
          else if (link_neu != link_alt) {
             
          // Konfiguration
             var name = "Link Bot";
             var name_bisher = $(this).parent().parent().parent().parent().children().filter(".sk-from").html();
             
          // Bot-Namen anpassen
             $(this).parent().parent().parent().parent().children().filter(".sk-from").html(name);
             
          // Bot-Bild schreiben
             var pfad = "http://sefzig.net/text/seiten/SefzigBot/dateien/displaybild_link_bot.png";
             $(this).parent().parent().parent().parent().parent().children().filter("img").attr("src", pfad);
             
          }
       // Default-Bot (/sk Smooch in Slack)
          else {
             
          // Bot-Bild anpassen
             var pfad = "http://sefzig.net/text/seiten/SefzigBot/dateien/displaybild_andreas_sefzig.jpg";
             $(this).parent().parent().parent().parent().parent().children().filter("img").attr("src", pfad);
          }
          
          text_neu = link_neu;
          
       // Angepasste Inhalte schreiben
          $(this).html(text_neu);
          
       // Als angepasst markieren
          $(this).attr("data-angepasst", "true");
          
       });
       
    }
       
    function befehlen(befehl) {
       
       $(".input-container .message-input").val(befehl).trigger("keydown", {which: 50});
       
    }
    