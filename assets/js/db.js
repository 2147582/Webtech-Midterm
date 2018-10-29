var request = indexedDB.open('SearchRescue',1);

request.onupgradeneeded = function(e){
    var db = e.target.result;
    if(!db.objectStoreNames.contains('incidents')){
        var os = db.createObjectStore('incidents', {keyPath: 'id',
                                                  autoIncrement: true});
        os.createIndex('name', 'name', { unique: false });
        os.createIndex('age', 'age', { unique: false });
		os.createIndex('date', 'date', { unique: false });
		os.createIndex('region', 'region', { unique: false });
		os.createIndex('province', 'province', { unique: false });
		os.createIndex('address', 'address', { unique: false });
        os.createIndex('incident', 'incident', { unique: false });
		os.createIndex('description', 'description', { unique: false });
       }
}

request.onsuccess = function (e) {
    console.log("Successfully Opened");
    db = e.target.result;
    showIncidents(e);
}

request.onerror = function (e) {
    console.log("Error, Database not opened", e.target.error.name);
}

function addIncident() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var date = document.getElementById('date').value;
	var region = document.getElementById('region').value;
	var province = document.getElementById('province').value;
	var address = document.getElementById('address').value;
	var incident = document.getElementById('incident').value;
	var description = document.getElementById('description').value;
    var transaction = db.transaction(["incidents"], "readwrite");
    
    var store = transaction.objectStore("incidents");
    
    var incidents = {
        name: name,
        age: age,
		date: date,
		region: region,
		province: province,
		address: address
        incident: incident,
		description: description
    };
    
    request = store.add(incidents);
    
    request.onsuccess = function (e){
        console.log('successfully added');
        alert('Thank you for the incident report');
        window.location.href = "index.html";
    }
    
    request.onerror = function (e){
        alert('Failed to add');
        console.log('Error', e.target.error.name)
    };
}
function showIncidents(e) {
    var transaction = db.transaction(["incidents"], "readonly");
    
    var store = transaction.objectStore("incidents");
    var index = store.index('name');
    
    var output='';
    index.openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            output += "<span>";
            output += "<h2>" + cursor.value.name + "</h2><br>";
            output += "<h3>" + cursor.value.date + "</h3><br>";
			output += "<h3>" + cursor.value.address + "</h3><br>";
            output += "<p>" + cursor.value.incident + "</p><br>";
            output += "</span> <hr>";
            cursor.continue(); 
        }
            document.getElementById('incidents').innerHTML=(output);
            console.log("Displayed the results");
    };
}