var request = indexedDB.open('victims',1);
    //Success
request.onsuccess = function(e){
    console.log('Success: Opened Database...');
    db = e.target.result;
    //Show Victims
    showIncidents();
}
    
    //Error
request.onerror = function(){
    console.log('Error: Failed to open Database...');
    db = e.target.result;
}

request.onupgradeneeded = function(e){
    var db = e.target.result;
    if(!db.objectStoreNames.contains('incidents')){
        var os = db.createObjectStore('incidents', {keyPath: 'id',
                                                  autoIncrement: true});
        os.createIndex('name', 'name', { unique: false });
        os.createIndex('age', 'age', { unique: false });
        os.createIndex('gender', 'gender', { unique: false });
		os.createIndex('date', 'date', { unique: false });
		os.createIndex('region', 'region', { unique: false });
		os.createIndex('address', 'address', { unique: false });
        os.createIndex('incident', 'incident', { unique: false });
       }
}


function addIncident() {
    var name = document.getElementById('fname' + 'lname').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var date = document.getElementById('date-missing').value;
	var address = document.getElementById('province').value;
	var incident = document.getElementById('incicase').value;
    var transaction = db.transaction(["incidents"], "readwrite");
    
    var store = transaction.objectStore("incidents");
    
    var incidents = {
        name: fname + lname,
        age: age,
        gender: gender,
		date: date,
		province: province,
		address: province,
        incident: incicase,
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
    index.openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
            output += "<tr>";
            output += "<td>" + cursor.value.name + "</td>";
            output += "<td>" + cursor.value.age + "</td>";
            output += "<td>" + cursor.value.gender + "</td>";
            output += "<td>" + cursor.value.date + "</td>";
			output += "<td>" + cursor.value.address + "</td>";
            output += "<td>" + cursor.value.incident + "</td>";
            output += "</tr>";
            cursor.continue(); 
        }
    document.getElementById('dbcontent').innerHTML(output);
    console.log("Displayed the results");
    };
}