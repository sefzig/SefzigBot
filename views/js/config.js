
 // Einstellungen
    var config = {
       
    // Smooch-Bot
       "smooch": {
          
          "appToken": "d9k415y76nk8ab2croifjshpv"
          
       },
       
    // Syntax
       "syntax": {
          
       // Befehl
          "befehlPrefix": "--",
          "befehlErsatz": ""
          
       },
       
    // Folgt
       "folgt": {
          
          "folgt": "folgt",
          "folgt": "folgt",
          "folgt": "folgt"
          
       }
       
    };
    
 // Texte
    var texte = {
       
    // Texte des Chats
       "chat": {
       	
       // Benutzeroberfläche
          "headerText": "Andreas Sefzigs #Robogeddon",
          "introText": "Dies ist der Anfang unseres Gesprächs.<br/><span class=blink>Schreiben Sie irgendetwas, um zu beginnen!</span>",
          "inputPlaceholder": "Schreiben Sie eine Nachricht...",
          "sendButtonText": "Absenden",
          
       // Email-Eingabe
          "settingsHeaderText": "E-Mail-Einstellungen",
          "settingsText": "Hinterlassen Sie Ihre E-Mail-Adresse, damit ich Kontakt zu Ihnen aufnehmen kann.",
          "settingsNotificationText": "Sollte ich Ihnen nicht schnell genug antworten, <a href data-ui-settings-link>hinterlassen Sie mir bitte Ihre E-Mail-Adresse</a>.",
          "settingsInputPlaceholder": "Ihre E-Mail-Adresse",
          "settingsSaveButtonText": "Speichern",
          "settingsReadOnlyText": "Ich schreibe Ihnen an diese E-Mail-Adresse, sollen wir uns verpasst haben.",
          
       // Fehlermeldungen
          "messageError": "Beim Versenden ist ein Fehler aufgetreten. Bitte versuchen Sie es nochmal.",
          "invalidFileError": "Es tut mir leid, zur Zeit können nur Bild-Dateien hochgeladen werden. Bitte laden Sie ein Jpg, Png, Gif oder Bmp hoch.",
          "actionPaymentError": "Es ist ein Fehler im Bezahlvorgang aufgetreten. <br> Bitte versuchen Sie es nochmal (oder mit einer anderen Karte).",
          
       // Benachrichtigungen
          "actionPaymentCompleted": "Bezahlvorgang abgeschlossen",
          "messageIndicatorTitleSingular": "({count}) neue Nachricht",
          "messageIndicatorTitlePlural": "({count}) neue Nachrichten",
          
       // URL-Parameter übernehmen
          "weiterleiten": "Weiterleiten:"
       },
       
    // Texte der Dateneingabe
       "daten": {
       	
       // Labels
          "vorname": "Vorname",
          "nachname": "Nachname",
          "email": "E-Mail-Adresse",
          
       // Defaults
          "vorname_defaut": "Nicht",
          "nachname_defaut": "Bekannt",
          "email_defaut": "unbekannt@sefzig.net"
          
       }
       
    };
    
 // Templates
    var templates = {
       
    // Templates der Anwendung
       "anpassen": {
       	
       // Befehle
          "befehlButton":
          [
             "<span ",
                "class='befehl' ",
                "onclick='befehlen(\""+config["syntax"]["befehlPrefix"]+"%inhalt%\");'>",
                ""+config["syntax"]["befehlErsatz"]+"%inhalt%",
             "</span>"
          ]
       },
       
    // Module
    // Zeilen werden in Js gejoint
       "modul": {
          
       // Button zu Text
          "Text":
          [
             "<div ",
                "class='sk-action' ",
                "style='margin-bottom:0px; ",
                "display: inline-block; ",
                "width: 100%;'>",
                "<a ",
                   "class='btn btn-sk-primary' ",
                   "href='http://sefzig.net/text%button_url%/' ",
                   "onclick='",
                      "fenster(\"text\",\"%button_url%\"); ",
                      "return false;'>",
                   "%button_text%",
                "</a>",
             "</div>"
          ],
          
       // Button zu Linkliste
          "Linkliste":
          [
             "<div class='sk-action' ",
                "style='margin-bottom:0px; ",
                "display: inline-block; ",
                "width: 100%;'>",
                   "<a ",
                   "class='btn btn-sk-primary' ",
                   "href='http://sefzig.net/link/liste/' ",
                   "onclick='",
                      "fenster(\"link\",\"%button_url%\"); ",
                      "return false;'>",
                   "%button_text%",
                "</a>",
             "</div>"
          ],
          
       // Button mit Link
          "Button":     "<div class='sk-action' style='margin-bottom:0px; display: inline-block; width: 100%;'><a class='btn btn-sk-primary' href='%button_url%' target='_blank'>%button_text%</a></div>",
          
       // QR-Code als Bild
          "Qr":         "<center><img class='%klasse%' src='http://chart.apis.google.com/chart?chs=250x250&cht=qr&chld=L&chf=bg,s,65432100&chl=%inhalt%' /></center> http://sefzigbot.herokuapp.com/ ",
          
       // Bild-Datei
          "Bild":       "<center><img class='%klasse%' src='%inhalt%' /></center>",
          
       // Audio-Player
          "Audio":      "<audio class='%klasse%' controls='true' style='width: 100%; max-width: 500px; margin-top: 10px;' x-webkit-airplay='allow'><source src='%inhalt%' type='audio/mpeg'>Lade Audio...</audio>",
          
       // Iframe
          "Iframe":     "<iframe src='%inhalt%' width='180' height='102' frameborder='0'>Frame laden</iframe>",
          
       // Youtube-Player
          "Youtube":    "<iframe width='180' height='102' class='%klasse%' src='http://www.youtube.com/embed/%inhalt%?rel=0&amp;showinfo=0' frameborder='0' allowfullscreen></iframe>"
          
       }
       
    };
    