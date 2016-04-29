
 /* Helper: URL-Parameter lesen
  * 
  * Beschreibung
  */
    function getParameters(name) {
       
    /* Titel
     * 
     * Beschreibung
     */
       if (name == "hash")
       {
       /* Titel
        * 
        * Beschreibung
        */
          var hashUrl = window.location.hash;
          
       /* Titel
        * 
        * Beschreibung
        */
          var hashUrl = hashUrl.replace("#","");
          return hashUrl;
       }
       else
       {
       /* Titel
        * 
        * Beschreibung
        */
          name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
          
       /* Titel
        * 
        * Beschreibung
        */
          var regexS = "[\\?&]"+name+"=([^&#]*)";
          
       /* Titel
        * 
        * Beschreibung
        */
          var regex = new RegExp( regexS );
          
       /* Titel
        * 
        * Beschreibung
        */
          var results = regex.exec( window.location.href );
          
       /* Titel
        * 
        * Beschreibung
        */
          if (results == null)
          {
            return "";
          }
          else
          {
            return results[1];
          }
       }
    }
  
 /* Eingabe blinken lassen
  * 
  * Beschreibung
  */
    function blinken(selektor) {
       
       $(selektor).not(".stopped").animate({opacity:0}, 300, "linear", function(){
          
          menge = $(selektor).attr("data-menge");
          if ((!menge) || (menge == "")) { menge = 1; }
             
          $(this).delay(300);
          
          $(this).animate({opacity:1}, 300, function(){
             
             menge = $(selektor).attr("data-menge");
             if (menge <= 5) { blinken(selektor); }
             
          });
       
          $(this).delay(300);
          menge = menge - (-1);
          $(selektor).attr("data-menge", menge);
       
       });
       
       $("#sk-footer").click(function()  { $(selektor).off().attr("data-menge", 5); });
       $("#sk-footer").change(function() { $(selektor).off().attr("data-menge", 5); });
        
    /*
       $("#sk-footer > *").fadeIn(500);
       var status = $("body").attr("data-blink", count);
       
       window.setInterval(function() {
          
          var stand = $("body").attr("data-blink");
          if (stand > 0) {
          
             $("#sk-footer > *").fadeOut(500).delay(500).fadeIn(500);
             $("#sk-footer .message-input").focus();
             $("body").attr("data-blink", stand - 1);
             console.log("> Blink: "+stand);
             
          }
          $("#sk-footer .message-input").focus();
          
       }, 1000);
       
       $("#sk-footer").click(function()  { $("body").attr("data-blink", "0"); $("#sk-footer > *").stop( true, true ).css("display", "inline-block").find(".message-input").focus(); });
       $("#sk-footer").change(function() { $("body").attr("data-blink", "0"); $("#sk-footer > *").stop( true, true ).css("display", "inline-block").find(".message-input").focus(); });
     */
    }