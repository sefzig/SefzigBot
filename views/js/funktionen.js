
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
    
    function blinken(count) {
       
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
       
       $("#sk-footer").click(function() { $("body").attr("data-blink", "0"); $("#sk-footer > *").stop( true, true ).css("display", "inline-block").find(".message-input").focus(); });
             
    }