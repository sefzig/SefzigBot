
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
    function blink() {
       
       window.setTimeout(function() { blinken(5); }, 1000);
       $("body").attr("data-blink", 0);
       
    }
    
    function blinken(max) {
       
       selektor = ".blink"; // , #sk-footer .input-container
    // max = max * 2;
          
       $(selektor).animate({opacity:0}, 300, "linear", function(){
          
          $("#sk-footer .input-container").animate({opacity:0.33}, 300, "linear");
          
          $(this).delay(300);
          
          $(this).animate({opacity:1}, 300, function(){
             
             menge = $("body").attr("data-blink");
             if (menge < max) { blinken(max); }
             
             $("#sk-footer .input-container").animate({opacity:1}, 300, "linear");
             
          });
       
          $(this).delay(300);
          
          menge = $("body").attr("data-blink");
          menge = menge - (-1); 
       // console.log("menge: "+menge);
          $("body").attr("data-blink", menge);
       
       });
       
       $("#sk-footer, #sk-footer *").click(function()  { $(selektor).off().slideUp(500); $("body").attr("data-blink", max); });
       $("#sk-footer, #sk-footer *").change(function() { $(selektor).off().slideUp(500); $("body").attr("data-blink", max); });
       
    }