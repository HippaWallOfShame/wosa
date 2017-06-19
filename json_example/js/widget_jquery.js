$(document).ready(function() { 
  var url = 'data/employees.json';
    $.getJSON(url, function(response) { // pass the json array response into an anonymous function
      var statusHTML = '<ul class="bulleted">';
      $.each(response, function(index, employee) { // loop through the json array via an another anonymous function

      }); // end each loop function

    }); // end getJSON
 

}); // end ready