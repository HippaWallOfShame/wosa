var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var breach_list =  JSON.parse(xhr.responseText);
    var statusHTML = 'blee';
    for (var i=0; i < breach_list.length; i+=1) {
statusHTML += breach_list[i].State;
    document.getElementById('employeeList').innerHTML = statusHTML;

    }
  }
};

xhr.open('GET', 'wosa.json');
xhr.send();