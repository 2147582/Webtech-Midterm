/*
    This file contains all the necessary functions 
*/

function validateForm() {
    var fname = document.forms["myForm"]["fname"].value;
    var lname = document.forms["myForm"]["lname"].value;
    var age = document.forms["myFrom"]["age"].value;
    var gender = document.forms["myFrom"]["gender"].value;
    
    if (fname == "") {
        alert("First name must be filled out.");
        return false;
    }
    
    if (lname == "") {
        alert("Last name must be filled out.");
        return false;
    }
    
    if (age == "") {
        alert("Indicate at least the age range.");
        return false;
    }
    
    if (gender == "") {
        alert("Please indicate the gender of the person.");
        return false;
    }
}