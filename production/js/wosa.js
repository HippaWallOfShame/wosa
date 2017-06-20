var data_array = []; // array that will hold json data
var cell_title_array = []; // array that will hold the table cell titles
var working_array = []; // array that will change based on user input
var total_col_count; // total number of columns in working array
var last_modified; // when the data was last modified
var sort_by = 9; // sorting by date for now but will be hooked up to a function parameter
var total_affected = 0;
var year_low = 0;
var year_high = 0;

// Sort results by date and output them

function loadByDate() {
for (var i=0; i < data_array.length; i+=1) {
var j_var = [];
for (var j=0; j <= total_col_count; j+=1) {
if (j === sort_by) {
j_var.unshift(data_array[i][j]);
} else {
j_var.push(data_array[i][j]);
}
} // end for j
working_array.push(j_var);
} // end for i
working_array.sort();
working_array.reverse();

var k = working_array.length - 1; // find last index in the array
year_high = working_array[0][5]; // latest date in array
year_low = working_array[k][5]; // earliest date in array

document.getElementById('infoDiv').innerHTML = '<p>JSON data last_modified:<br>' + last_modified + '</p><p>There are ' + cell_title_array.length + ' columns in the json file.</p>' + '<p>There are ' + total_col_count + ' columns after loading.</p><p>So far since ' + year_low + ' there have been ' + total_affected + ' individuals affected. </p><p>' + working_array.join() + '</p>';
} // end load by date function


// pull json dada and populate data_array array

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var parsed_data =  JSON.parse(xhr.responseText);
    cell_title_array = Object.keys(parsed_data[0]);
    for (var i=0; i < parsed_data.length; i+=1) {
     var j_var = [];
      
      for (var j=0; j < 1; j+=1) {       
       j_var.push(parsed_data[i]["Name of Covered Entity"]);
       j_var.push(parsed_data[i]["State"]);
       j_var.push(parsed_data[i]["Covered Entity Type"]);
       j_var.push(parsed_data[i]["Individuals Affected"]);
        var individuals_affected = parsed_data[i]["Individuals Affected"];
        individuals_affected = Number(individuals_affected);
        total_affected += individuals_affected;

       j_var.push(parsed_data[i]["Breach Submission Date"]);
       j_var.push(parsed_data[i]["Type of Breach"]);
       j_var.push(parsed_data[i]["Location of Breached Information"]);
       j_var.push(parsed_data[i]["Business Associate Present"]);

        var fieldName = parsed_data[i]["Web Description"];
        if (fieldName.length > 3) {
         j_var.push(parsed_data[i]["Web Description"]);
        } else {
         j_var.push('No further information available.');
        }
         
       var date_parts = parsed_data[i]["Breach Submission Date"].split('/');  // turn date into an array of its numbers
       var ordered_dates = Number(date_parts[2] + date_parts[0] + date_parts[1]); // create a string using the date_parts array numbers
       j_var.push(ordered_dates); // add a new column containing the new date string
       
      } // end for j
data_array.push(j_var);
    } // end for i
last_modified = xhr.getResponseHeader('Last-Modified');
  } // end if
//document.getElementById('infoDiv').innerHTML = data_array.join();
total_col_count = data_array[0].length;
}; // end loading json data function

xhr.open('GET', 'data/wosa.json');
xhr.send();


