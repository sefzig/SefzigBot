
    /* Anwendung starten
     * 
     */ 
       $(document).ready(function(){
          
          formStarten();
          
       });
       
    /* Formular vorbereiten
     * 
     */ 
       function formStarten() {
          
          var vorname = Cookies.get('BewerbotVorname');
          var nachname = Cookies.get('BewerbotNachname');
          var email = Cookies.get('BewerbotEmail');
          
          if (vorname) { $("#vorname").val(vorname); }
          if (nachname) { $("#nachname").val(nachname); }
          if (email) { $("#email").val(email); }
          
          if ((vorname) && (nachname) && (email)) { chatStarten(); }
           
       }
       
    /* Chat starten
     * 
     * Smooch Js-Dokumentation
     * https://github.com/smooch/smooch-js
     */ 
       function chatStarten() {
          
          var bereit = false;
          
          var vorname =  $("#vorname").val();  if ((vorname == "")  || (vorname  == "Ihr Vorname"))         { vorname  = false; } else { Cookies.set('BewerbotVorname',  vorname); }
          var nachname = $("#nachname").val(); if ((nachname == "") || (nachname == "Ihr Nachname"))        { nachname = false; } else { Cookies.set('BewerbotNachname', nachname); }
          var email =    $("#email").val();    if ((email == "")    || (email    == "Ihre E-Mail-Adresse")) { email    = false; } else { Cookies.set('BewerbotEmail',    email); }
          
          if ((vorname) && (nachname) && (email)) { bereit = true; } else { alert("Bitte geben Sie alle Daten an."); }
          
          if (bereit) {
             
             Smooch.init({ 
                appToken: '{{appToken}}',
                givenName: vorname,
                surname: nachname,
                email: email,
                customText: {
                   headerText: 'Andreas Sefzigs Bot',
                   inputPlaceholder: 'Schreiben Sie eine Nachricht...',
                   sendButtonText: 'Absenden',
                   introText: 'Dies ist der Anfang unseres Gesprächs.',
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
             
             Smooch.open();
             
          }
          
       }
       