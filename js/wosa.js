// Basic operational variables

var data_array = []; // array that will hold json data
var cell_title_array = []; // array that will hold the table cell titles
var working_array = []; // array that will change based on user input
var total_col_count; // total number of columns in working array
var last_modified; // when the data was last modified

// Pull json data and populate data_array array

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
total_col_count = data_array[0].length;
}; // end loading json data function

xhr.open('GET', 'data/wosa.json');
xhr.send();






// Sort results and output them by date

function loadByDate(sortcol) {
var sort_by = sortcol;
for (var i=0; i < data_array.length; i+=1) {
var j_var = [];
for (var j=0; j <= total_col_count; j+=1) {


if (sort_by === 9) { // If sorting by date stamp
if (j === sort_by) {
j_var.unshift(data_array[i][j]);
} else {
j_var.push(data_array[i][j]);
}
} else { // If not sorting by date stamp
j_var.push(data_array[i][j]);
}

} // end for j
working_array.push(j_var);
} // end for i
working_array.sort();
working_array.reverse();

var tableHTML = '<table class="table table-hover"><thead><tr>';

var tableHTML = '<table class="table table-hover table-bordered"><thead><tr>';
for (var i=0; i < cell_title_array.length; i+=1) {  // Populate table headers
tableHTML += '<th>' + cell_title_array[i] + '</th>';
}
tableHTML += '</tr></thead><tbody>';

for (var i=0; i < working_array.length; i+=1) { // Populate default table body
tableHTML += '<tr>';
for (var j=0; j < 10; j+=1) {

if (sort_by === 9) { // If sorting by date stamp
if (j > 0) { // excludes the time stamp from the table
tableHTML += '<td>';
tableHTML += working_array[i][j];
tableHTML += '</td>';
}
} else { // If not sorting by date stamp
tableHTML += '<td>';
tableHTML += working_array[i][j];
tableHTML += '</td>';
}


} // end for j
tableHTML += '</tr>';
}
tableHTML += '</tbody></table>';

document.getElementById('infoDiv').innerHTML = tableHTML;
document.getElementById('description_jumbotron').style.display = 'none';


} // end load by date function

