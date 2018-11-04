$document().ready(function(){
    //Open DB
    var request = indexedDB.open('victims', 3);
    
    //Success
    request.onsuccess = function(e){
        console.log('Success: Opened Database...');
        db = e.target.result;
        //Show Victims
        showVictims();
    }
    
    //Error
    request.onerror = function(){
        console.log('Error: Failed to open Database...');
        db = e.target.result;
        //Show Victims
        showVictims();
    }
});