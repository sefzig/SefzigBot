
    /* Anwendung starten
     * 
     * 
     */ 
       $(document).ready(function(){
          
       // chatStarten();
          
       // Konto füllen
          var vorname =  Cookies.get('SefzigbotVorname');  if ((vorname)  && (vorname != ""))  { $("#vorname").val(vorname);   } else { vorname  = "Vorname";        } $("#vorname").change(function(){  Cookies.set('SefzigbotVorname',  $(this).val()); });
          var nachname = Cookies.get('SefzigbotNachname'); if ((nachname) && (nachname != "")) { $("#nachname").val(nachname); } else { nachname = "Nachname";       } $("#nachname").change(function(){ Cookies.set('SefzigbotNachname', $(this).val()); });
          var email =    Cookies.get('SefzigbotEmail');    if ((email)    && (email != ""))    { $("#email").val(email);       } else { email    = "E-Mail-Adresse"; } $("#email").change(function(){    Cookies.set('SefzigbotEmail',    $(this).val()); });
          
          $("[data-start]").click(function() {
             
             var starten = $(this).attr("data-start");
             
             $("#seite > div").fadeOut();
             $("#seite #"+starten).fadeIn();
             
             if (starten == "chat") { chatStarten(); }
             
          });
          
       });
       
    /* Chat starten
     * 
     * 
     */ 
       function chatStarten() {
          
          bereit = true;
          if (bereit) {
             
             var vorname =  Cookies.get('SefzigbotVorname');  if ((!vorname)  || (vorname  == "") || (vorname  == "Vorname"))        { vorname  = "Daniel"; }
             var nachname = Cookies.get('SefzigbotNachname'); if ((!nachname) || (nachname == "") || (nachname == "Nachname"))       { nachname = "Tester"; }
             var email =    Cookies.get('SefzigbotEmail');    if ((!email)    || (email    == "") || (email    == "E-Mail-Adresse")) { email    = "daniel.tester@sefzig.net"; }
             
          // Smooch Js
          // https://github.com/smooch/smooch-js
             Smooch.init({ 
                appToken: '{{appToken}}',
                embedded: true,
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
             
             Smooch.render(document.getElementById('chat'));
          // Smooch.open();
             
          }
          
       }
       