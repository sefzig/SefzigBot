
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
    