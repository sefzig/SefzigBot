
 // Anwendung starten
    $(document).ready(function(){
       
    // Konto füllen
       var vorname =  Cookies.get('SefzigbotVorname');  if ((vorname)  && (vorname != ""))  { $("#vorname").val(vorname);   } else { vorname  = "Vorname";        } $("#vorname").change(function(){  Cookies.set('SefzigbotVorname',  $(this).val()); });
       var nachname = Cookies.get('SefzigbotNachname'); if ((nachname) && (nachname != "")) { $("#nachname").val(nachname); } else { nachname = "Nachname";       } $("#nachname").change(function(){ Cookies.set('SefzigbotNachname', $(this).val()); });
       var email =    Cookies.get('SefzigbotEmail');    if ((email)    && (email != ""))    { $("#email").val(email);       } else { email    = "E-Mail-Adresse"; } $("#email").change(function(){    Cookies.set('SefzigbotEmail',    $(this).val()); });
       
    // Chat starten
       var starten = "chat";
       var ansicht = getParameters("v");
       if (ansicht == "chat") { starten = "chat"; }
       if (ansicht == "data") { starten = "daten"; }
       window.setTimeout(function() { start(starten); }, 100);
       
    // Benutzeroberfläche
       $("[data-start]").click(function(e) {
          
       // Elemente
          var starten = $(this).attr("data-start");
          
       // Navigation
          start(starten); 
          
       // Klick verhindern
          e.preventDefault();
          
       });
       
    });
    
 // Chat starten
    function start(methode) {
       
    // Ansichten anpassen
       $("#seite > div").fadeOut();
       
    // Chat starten
       if (methode == "chat") {
          
       // Konsole beginnen
       // console.log('Neues Gespräch');
          
       // Umgebungs-Parameter einsammeln
          var vorname =  Cookies.get('SefzigbotVorname');  if ((!vorname)  || (vorname  == "") || (vorname  == texte["daten"]["vorname"]))  { vorname  = texte["daten"]["vorname_default"];  }
          var nachname = Cookies.get('SefzigbotNachname'); if ((!nachname) || (nachname == "") || (nachname == texte["daten"]["nachname"])) { nachname = texte["daten"]["nachname_default"]; }
          var email =    Cookies.get('SefzigbotEmail');    if ((!email)    || (email    == "") || (email    == texte["daten"]["email"]))    { email    = texte["daten"]["email_default"];    }
          
       // Smooch Js
       // https://github.com/smooch/smooch-js
          var skPromise = Smooch.init({ 
             appToken: config["smooch"]["appToken"],
             embedded: true,
             customText: {
                headerText:                    texte["chat"]["headerText"],
                inputPlaceholder:              texte["chat"]["inputPlaceholder"],
                sendButtonText:                texte["chat"]["sendButtonText"],
                introText:                     texte["chat"]["introText"],
                settingsText:                  texte["chat"]["settingsText"],
                settingsReadOnlyText:          texte["chat"]["settingsReadOnlyText"],
                settingsInputPlaceholder:      texte["chat"]["settingsInputPlaceholder"],
                settingsSaveButtonText:        texte["chat"]["settingsSaveButtonText"],
                settingsHeaderText:            texte["chat"]["settingsHeaderText"],
                settingsNotificationText:      texte["chat"]["settingsNotificationText"],
                actionPaymentError:            texte["chat"]["actionPaymentError"],
                actionPaymentCompleted:        texte["chat"]["actionPaymentCompleted"],
                messageError:                  texte["chat"]["messageError"],
                invalidFileError:              texte["chat"]["invalidFileError"],
                messageIndicatorTitleSingular: texte["chat"]["messageIndicatorTitleSingular"],
                messageIndicatorTitlePlural:   texte["chat"]["messageIndicatorTitlePlural"]
             }
          })
          .then(function () { window.setTimeout(function() { 
             
             anpassen();
             
             var sagen = getParameters("m");
             if ((sagen) && (sagen != "")) { 
             
                window.setTimeout(function() { 
                   
                   Smooch.sendMessage(texte["chat"]["weiterleiten"]);
                   window.setTimeout(function() { 
                      
                      Smooch.sendMessage(sagen);
                      
                   }, 1000);
                   
                }, 1000);
                
             }
       
          }, 100); }); 
          
       // Smooch.open();
          Smooch.render(document.getElementById('chat'));
          Smooch.on('message:sent', function(message) {
             
          // console.log('- Nutzer hat eine Nachricht gesendet');
          // $(".sk-messages").append('<img src="img/ui/Schreiben.gif" class="typing" />');
             
          });
          Smooch.on('message:received', function(message) {
             
          // $(".typing").remove();
             window.setTimeout(function() { anpassen(); }, 1);
             
          // console.log('- Nutzer hat eine Nachricht erhalten');
             
          });
          
       // Fokus auf Eingabe
          $("#sk-footer .message-input").focus();
          
       }
       
       anpassen();
       
       $("#seite #"+methode).fadeIn();
    // window.setTimeout(function() { blink(); }, 2000);
       $(".message-input").focus();
       
    }
    
    function template() {
       
       
       
    }
    
 // Texte anpassen
    function inhalt(methode, text_string, var1, var2, var3) {
       
       text_string = " "+text_string+" ";
       var inhalte = text_string;
       
       if (methode == "befehl") {
       
       // Befehle anpassen
          inhalte = inhalte.split("--");
          for (i = 1; i < inhalte.length; i++) {
             
          // Befehl freistellen
             var inhalt = inhalte[i].split(/,|;|:|\.|\<|!|\?| /)[0];
             console.log("\ninhalt: "+inhalt);
             
          // Template laden und anpassen
             var befehl_button = templates["anpassen"]["befehlButton"];
             console.log("befehl_button alt: "+befehl_button);
             
             if ($.isArray(befehl_button)) { befehl_button = befehl_button.join("a-f-z"); }
             befehl_button = befehl_button.replace(/a-f-z/g, "");
             befehl_button = befehl_button.replace(/%inhalt%/g, inhalt);
             
             text_string = text_string.replace(config["syntax"]["befehlPrefix"]+"%inhalt%", befehl_button);
             text_string = text_string.replace(config["syntax"]["befehlPrefix"]+"%inhalt%", befehl_button);
             text_string = text_string.replace(config["syntax"]["befehlPrefix"]+"%inhalt%", befehl_button); // ..?
             
          // Debuggen
             console.log("text_string: "+text_string);
             
          // Zurücksetzen
             inhalt = "";
             befehl_button = "";
             
          }
          
       }
       
       if ((methode == "modul") && (var1) && (var1 != "")) {
          
       // Funktions-Parameter
          var modul = var1;
          
       // Modulnamen kamelisieren
          modul = modul.charAt(0).toUpperCase() + modul.slice(1);
          
       // Klasse in Kleinbuchstaben
          var klasse = var1;
          klasse = klasse.toLowerCase();
          
       // Cta-Text von URL trennen
          if ((modul == "Button") || (modul == "Text") || (modul == "Linkliste"))  { 
          // console.log("> Button Var: "+var1);
             var buttons = text_string.split("["+modul+":");
             if (buttons[1]) { 
                var buttons2 = buttons[1].split("]");
                if (buttons2[1]) { 
                   var buttons3 = buttons2[0].split(",");
                   if (buttons3[1]) { 
                      var button_text = buttons3[0];
                      var button_url = buttons3[1];
                   }
                   else { var button_text = "Link öffnen"; var button_url = ""+buttons2[0]; }
                }
             }
             else {       var button_text = "Link öffnen"; var button_url = ""+var1; }
          // console.log("> Button Text: "+button_text);
          // console.log("> Button Url: "+button_url);
          }
          
       // Template laden und anpassen
          var template = templates["modul"][modul];
          if ($.isArray(template)) { template = template.join(); }
          template = template.replace("%button_text%", button_text);
          template = template.replace("%button_url%",  button_url);
          
       // Modul anpassen
          inhalte = inhalte.split("["+modul+":");
          for (i = 1; i < inhalte.length; i++) {
             
          // Inhalt freistellen
             var inhalt = inhalte[i].split("]")[0];
             
          // Template anpassen
             template = template.replace(/%klasse%/g, klasse);
             template = template.replace(/%inhalt%/g, inhalt);
          // template = template.replace(/%cta%/g, cta);
             
          // Neuen Text anpassen
             text_string = text_string.replace("["+modul+":"+inhalt+"]", template);
             
          // Debuggen
          // console.log("- "+modul+" angepasst: "+inhalt);
             
          // Zurücksetzen
             var inhalt = "";
             
          }
          
       }
       
       if ((methode == "javascript") && (var1) && (var1 != "") && (var2) && (var2 != "")) {
          
       // Funktions-Parameter
          var funktionen = var1;
          var meldung = var2;
             
       // Javascript ausführen
          inhalte = inhalte.split("[Javascript:");
          for (i = 1; i < inhalte.length; i++) {
             
          // Funktions-Namen freistellen
             var skript = inhalte[i].split("]")[0];
             
          // Neuen Text anpassen
             text_string = text_string.replace("[Javascript:"+skript+"]", meldung);
             
          // Bekannte Funktionen ausführen
             funktionen[skript]();
             
          // Debuggen
          // console.log("- Javascript ausgeführt: "+skript);
             
          // Zurücksetzen
             var skript = "";
             
          }
          
       }
       
       if ((methode == "bot") && (var1) && (var1 != "") && (var2) && (var2 != "") && (var3) && (var3 != "")) {
          
       // Funktions-Parameter
          var kurzel = var1;
          var name = var2;
          var zufall = var3;
             
       // Wenn Text den Botnamen enthält
          bot_alt = inhalte; bot_neu = inhalte.replace("["+var1+"] ","");
          if (bot_neu != bot_alt) {
             
          // Konfiguration
             var pfad = "http://sefzig.net/text/seiten/SefzigBot/dateien/Displaybild_"+kurzel+".png";
             
          // Bot-Inhalte anpassen
             $(".sk-from.bot"+zufall).html(name);
             $(".sk-msg-avatar.bot"+zufall).attr("src", pfad);
             
          // Neuen Text anpassen
             text_string = text_string.replace("["+kurzel+"] ","");
             
          // Debuggen
          // console.log("- Bot angepasst: "+name);
             
          }
          
       }
       
       window.setTimeout(function() { 
       $(".sk-from").each(function() {
          
          var dieser =    $(this).html();
          var vorganger = $(this).parent().parent().prev().find(".sk-from").html();
       // console.log("- "+vorganger+" = "+dieser+"?");
       
       // Bei folgendem Absender
          if (vorganger == dieser) {
             
          // Namen hier verbergen
             $(this).css("display","none");
             $(this).parent().parent().css("padding-top","10px");
             
          // Avatar davor verbergen
             $(this).parent().parent().prev().children().filter("img.sk-msg-avatar").attr("src", "img/bots/Displaybild_LeerBot.png");
             
          // Pfeilchen davor verbergen
             $(this).parent().parent().prev().find(".sk-msg").addClass("frei");
             $('head').append("<style>.sk-msg.frei::after{ border: none !important }</style>");
             
          }
          else {
             
          // console.log("> Anderer Vorganger: "+vorganger+" != "+name+"");
             
          }
          vorganger = "";
          dieser = "";
          
       });
       }, 333);
       
       return text_string; 
       
    }
    
 // Inhalte anpassen
    function anpassen() {
       
    // Noch nicht angepasste anpassen
       var selektor = ".sk-msg > span > span > span:not([data-angepasst])";
       $(selektor).each(function() {
          
       // Inhalte lesen
          var text_alt = $(this).html();
          
       // Neuen Inhalt beginnen // String wird von allen folgenden Funktionen angepasst
          var text_neu = text_alt;
          
       // 1 Zufallszahl für jede Nachricht
          var zufall = Math.floor(Math.random()*999999);
          
       // Zugelassene Javascript-Funktionen
          var funktionen = {
             test_alert:   function () { alert('Hallo Welt!'); },
             test_console: function () { console.log('> Hallo Welt!'); },
             blinken:      function () { blink(); }
          };
          
       // Bot-Inhalte markieren :/
          $(this).parent().parent().parent().parent().children().filter(".sk-from").addClass("bot"+zufall);
          $(this).parent().parent().parent().parent().parent().children().filter("img").addClass("bot"+zufall);
             
       // Inhalte anpassen
          text_neu = inhalt("befehl", text_neu);
          text_neu = inhalt("modul", text_neu, "Text");
          text_neu = inhalt("modul", text_neu, "Bild");
          text_neu = inhalt("modul", text_neu, "Qr");
          text_neu = inhalt("modul", text_neu, "Button");
          text_neu = inhalt("modul", text_neu, "Iframe");
          text_neu = inhalt("modul", text_neu, "Audio");
          text_neu = inhalt("modul", text_neu, "Youtube");
          text_neu = inhalt("modul", text_neu, "Linkliste"); 
          text_neu = inhalt("javascript", text_neu, funktionen, " ");
          
       // Bots anpassen
          var text_merken = text_neu;
          text_neu = inhalt("bot", text_neu, "SefzigBot",     "Andreas Sefzigs Bot", zufall);
          
          text_neu = inhalt("bot", text_neu, "LinkBot",       "Link Bot",            zufall);
          text_neu = inhalt("bot", text_neu, "TextBot",       "Text Bot",            zufall);
          text_neu = inhalt("bot", text_neu, "SlackBot",      "Slack Bot",           zufall);
          text_neu = inhalt("bot", text_neu, "AndreasSefzig", "Andreas Sefzig",      zufall);
          
          text_neu = inhalt("bot", text_neu, "EmpfangsBot",   "Empfangs-Bot",        zufall);
          text_neu = inhalt("bot", text_neu, "KreationsBot",  "Kreations-Bot",       zufall);
          text_neu = inhalt("bot", text_neu, "BeratungsBot",  "Beratungs-Bot",       zufall);
          text_neu = inhalt("bot", text_neu, "TechnikBot",    "Technik-Bot",         zufall);
          
       // Default-Bot
          if (text_neu == text_merken) { text_neu = "[AndreasSefzig] "+text_neu; }
          text_neu = inhalt("bot", text_neu, "AndreasSefzig", "Andreas Sefzig", zufall);
          
       // Angepasste Inhalte schreiben
          $(this).html(text_neu);
          
       // Als angepasst markieren
          $(this).attr("data-angepasst", "true");
          
       });
       
    }
    
 // Klicks auf Befehle
    function befehlen(befehl) {
       
    // $("#sk-footer form input.message-input").val(befehl);
    // $("#sk-footer form input.message-input").change();
    // $("#sk-footer form input.message-input").focus();
    // $("#sk-footer form .send").trigger("click");
       
       window.Smooch.sendMessage(befehl);
       
    }
    
 // Text in Ebene öffnen
    function fenster(methode, kurzel) {
       
    // URL errechnen
       if (methode == "linkliste") { var url = "http://sefzig.net/link/liste/"+kurzel+"/"; }
       if (methode == "text")      { var url = "http://sefzig.net/text/"+kurzel+"/"; }
       
    // Iframe laden
       $("#fenster > iframe").attr("src", url);
          
    // Ebene öffnen
       $("#fenster").fadeIn(500);
          
       return false;
       
    }
    