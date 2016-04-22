
 /* Anwendung starten
  * 
  * 
  */ 
    $(document).ready(function(){
       
    // Konto füllen
       var vorname =  Cookies.get('SefzigbotVorname');  if ((vorname)  && (vorname != ""))  { $("#vorname").val(vorname);   } else { vorname  = "Vorname";        } $("#vorname").change(function(){  Cookies.set('SefzigbotVorname',  $(this).val()); });
       var nachname = Cookies.get('SefzigbotNachname'); if ((nachname) && (nachname != "")) { $("#nachname").val(nachname); } else { nachname = "Nachname";       } $("#nachname").change(function(){ Cookies.set('SefzigbotNachname', $(this).val()); });
       var email =    Cookies.get('SefzigbotEmail');    if ((email)    && (email != ""))    { $("#email").val(email);       } else { email    = "E-Mail-Adresse"; } $("#email").change(function(){    Cookies.set('SefzigbotEmail',    $(this).val()); });
       
    // Benutzeroberfläche
       $("[data-start]").click(function(e) {
          
          var starten = $(this).attr("data-start");
          
          $("#seite > div").fadeOut();
          $("#seite #"+starten).fadeIn();
          
          start(starten);
          
          e.preventDefault();
          
       });
       
       var zuletzt = 0;
       window.setInterval(function() { anpassen(); }, 1000);
       function anpassen() {
          
          var selektor = ".sk-messages .sk-left-row .sk-msg > span > span > span:not([data-angepasst])";
          $(selektor+":contains('--'), "+selektor+":contains('[Bild:'), "+selektor+":contains('/sefzigbot')").each(function() {
             
             var text = $(this).html();
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
             text_alt = text_neu;
             text_neu = text_neu.replace("/sefzigbot","");
             if (text_neu != text_alt) {
                
                console.log("- Ist Bot");
                $(this).parent().parent().parent().parent().children().filter(".sk-from").css("background-color", "red");
             // var inhalt = $(this).parent().parent().parent().parent().parent().children().filter(".sk-from").html();
             // $(this).parent().parent().parent().parent().parent().children().filter(".sk-from").attr("data-bot", "true").html(inhalt+"s Bot");
                
             }
             
             $(this).html(text_neu);
             $(this).attr("data-angepasst", "true");
             
          });
          
       }
       
    });
    
 /* Chat starten
  * 
  * 
  */ 
    function start(methode) {
       
       if (methode == "chat") {
          
          var vorname =  Cookies.get('SefzigbotVorname');  if ((!vorname)  || (vorname  == "") || (vorname  == "Vorname"))        { vorname  = "Nicht"; }
          var nachname = Cookies.get('SefzigbotNachname'); if ((!nachname) || (nachname == "") || (nachname == "Nachname"))       { nachname = "Bekannt"; }
          var email =    Cookies.get('SefzigbotEmail');    if ((!email)    || (email    == "") || (email    == "E-Mail-Adresse")) { email    = "unbekannt@sefzig.net"; }
          
       // Smooch Js
       // https://github.com/smooch/smooch-js
          Smooch.init({ 
             appToken: 'd9k415y76nk8ab2croifjshpv',
             embedded: true,
             givenName: vorname,
             surname: nachname,
             email: email,
             customText: {
                headerText: 'Andreas Sefzig und Bot',
                inputPlaceholder: 'Schreiben Sie eine Nachricht...',
                sendButtonText: 'Absenden',
                introText: 'Dies ist der Anfang unseres Gesprächs.<br/>Bitte schreiben Sie irgendetwas, um das Gespräch zu beginnen!',
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
          
          Smooch.updateUser({ vorname: vorname });
          Smooch.updateUser({ nachname: nachname });
          Smooch.updateUser({ email: email });
          
       }
       
       if (methode == "facebook") {
          
          $("#facebook > iframe").attr("src", "http://www.messenger.com/t/1195928167086850/");
          
       }
       
    }
    
    function befehlen(befehl) {
       
       $(".input-container .message-input").val(befehl).trigger("keydown", {which: 50});
       
    }
    