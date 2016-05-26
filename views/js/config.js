
 // Einstellungen
    var config = {
       
    // Anwendung
       "anwendung": {
          
          "id": "Sefzigbot", // Robogeddon
          "name": "Andreas Sefzigs Robogeddon",
          "defaultAnsicht": "chat", // chat, daten
          "defaultStil": "robogeddon", // tag, robogeddon, nacht
          "defaultMenu": "robogeddon", // anderesmenu
          "defaultButton": "aus", // an, aus
          "cdn" : "http://sefzig.net/text/seiten/RobogeddonCdn/dateien/"
          
       },
       
    // Syntax
       "syntax": {
          
       // Befehl
          "befehlPrefix": "--",
          "befehlErsatz": ""
          
       },
       
    // Smooch-Bot
       "smooch": {
          
          "appToken": "d9k415y76nk8ab2croifjshpv"
          
       }
       
    };
    
 // Nutzerdaten
    var daten = {
       
    // Labels
       "label": {
       	
       // Datensatz
          "vorname": "Vorname",
          "nachname": "Nachname",
          "email": "E-Mail-Adresse"
          
       },
       
    // Defaults
       "default": {
       	
       // Datensatz
          "vorname": "Daniel",
          "nachname": "Tester",
          "email": "daniel.tester@sefzig.net"
          
       },
       
    // Cookies
       "cookie": {
       	
       // Namen
          "vorname":  ""+config["anwendung"]["id"]+"Vorname",
          "nachname": ""+config["anwendung"]["id"]+"Nachname",
          "email":    ""+config["anwendung"]["id"]+"Email"
          
       }
       
    };
       
 // Texte
    var texte = {
       
    // Texte des Chats
       "chat": {
       	
       // Benutzeroberfläche
          "headerText": "Andreas Sefzigs #Robogeddon",
          "introText": "Dies ist der Anfang unseres Gesprächs.<br/><span class=blink>Schreiben Sie irgendetwas, um zu beginnen - z.B. Hallo!</span>",
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
          "weiterleiten": "Weiterleiten zu:"
       }
       
    };
    
 // Templates
    var templates = {
       
    // Templates der Anwendung
       "befehl": {
       	
       // Befehle
          "link": [
             
             "<span class='befehl' ",
                "onclick='",
                   "befehlen(\""+config["syntax"]["befehlPrefix"]+"%inhalt%\");",
                "'>",
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
             "<div class='modulButton sk-action'>",
                "<a class='btn btn-sk-primary' ",
                   "href='http://sefzig.net/text/%var2%/#%var3%' ",
                   "target='_blank' ",
                   "onclick='",
                      "fenster(\"text\",\"%var2%\"); ",
                      "return false;'>",
                   "%var1%",
                "</a>",
             "</div>"
          ],
          
       // Button zu Linkliste
          "Linkliste":
          [
             "<div class='modulButton sk-action'>",
                "<a class='btn btn-sk-primary' ",
                   "href='http://sefzig.net/link/liste/%var2%/' ",
                   "target='_blank' ",
                   "onclick='",
                      "fenster(\"links\",\"%var2%\"); ",
                      "return false;'>",
                   "%var1%",
                "</a>",
             "</div>"
          ],
          
       // Link aus Linkliste (Button)
          "Link":
          [
             "<div class='modulButton sk-action'>",
                "<a class='btn btn-sk-primary' ",
                   "href='http://sefzig.net/link/%var2%/' ",
                   "target='_blank' ",
                   "onclick='",
                      "fenster(\"link\",\"%var2%\"); ",
                      "return false;'>",
                   "%var1%",
                "</a>",
             "</div>"
          ],
          
       // Link aus Linkliste (Textlink)
          "Textlink":
          [
             "<a class='textLink' ",
                "href='http://sefzig.net/link/%var2%/' ",
                "target='_blank' ",
                "onclick='",
                   "fenster(\"link\",\"%var2%\"); ",
                   "return false;'>",
                "%var1%",
             "</a>",
          ],
          
       // Button mit Link
          "Button":
          [
             "<div class='modulButton sk-action'>",
                "<a class='btn btn-sk-primary' ",
                   "href='%var2%' ",
                   "target='_blank' ",
                   "onclick='",
                      "fenster(\"link\",\"%var2%\"); ",
                      "return false;'>",
                   "%var1%",
                "</a>",
             "</div>"
          ],
          
       // Bild-Datei
          "Bild": 
          [
             "<center>",
                "<img class='%klasse%' ",
                "src='%inhalt%' ",
                "onclick='",
                   "fenster(\"bild\",\"%inhalt%\"); ",
                   "console.log(\"bild: %inhalt%\"); ",
                   "return false;' />",
             "</center>"
          ],
          
       // QR-Code als Bild
          "Qr":
          [
             "<center>",
                "<img class='%klasse%' ",
                   "src='http://chart.apis.google.com/chart?chs=225x225&cht=qr&chld=L&chf=bg,s,65432100&chl=%inhalt%' />",
             "</center> ",
             "%inhalt%"
          ],
          
       // Iframe
          "Iframe":
          [
             "<iframe ",
                "src='%inhalt%' ",
                "width='225' ",
                "height='127' ",
                "frameborder='0'>",
                "Frame laden",
             "</iframe>"
          ],
          
       // Audio-Player
          "Audio":
          [
             "<audio ",
                "class='%klasse%' ",
                "controls='true' ",
                "style='width: 100%; ",
                "max-width: 500px; ",
                "margin-top: 10px;' ",
                "x-webkit-airplay='allow'>",
                "<source src='%inhalt%' type='audio/mpeg'>",
                   "Lade Audio...",
             "</audio>"
          ],
          
       // Email
          "Email":
          [
             "<div class='modulButton sk-action'>",
                "<a class='btn btn-sk-primary email' ",
                   "href='mailto:%var2%?subject=Robogeddon'> ",
                   "%var1%",
                "</a>",
             "</div>"
          ],
          
       // Telefon
          "Telefon":
          [
             "<div class='modulButton sk-action'>",
                "<a class='btn btn-sk-primary telefon' ",
                   "href='tel:%var2%'> ",
                   "%var1%",
                "</a>",
             "</div>"
          ],
          
       // Youtube-Player
          "Youtube":
          [
             "<iframe ",
                "width='225' ",
                "height='127' ",
                "class='%klasse%' ",
                "src='http://www.youtube.com/embed/%inhalt%?rel=0&amp;showinfo=0' ",
                "frameborder='0' ",
                "allowfullscreen>",
             "</iframe>"
          ]
          
       }
       
    };
    