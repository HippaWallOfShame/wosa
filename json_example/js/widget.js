var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var employees =  JSON.parse(xhr.responseText);
    var statusHTML = '<ul class="bulleted">';
    for (var i=0; i < employees.length; i+=1) {
      if (employees[i].inoffice === true) {
        statusHTML += '<li class="in">';
      } else {
        statusHTML += '<li class="out">';
      }
      statusHTML += employees[i].name;
      statusHTML += '</li>';         
    }
    statusHTML += '</ul>';
    document.getElementById('employeeList').innerHTML = statusHTML;
  }
};

xhr.open('GET', 'data/employees.json');
xhr.send();


var room_xhr = new XMLHttpRequest();
room_xhr.onreadystatechange = function () {
  if(room_xhr.readyState === 4 && room_xhr.status === 200) {
    var rooms = JSON.parse(room_xhr.responseText);
    var statusHTML = '<ul class="rooms">';
    for (var i=0; i<rooms.length; i += 1) {
      if (rooms[i].available === true) {
        statusHTML += '<li class="full">';
      } else {
        statusHTML += '<li class="empty">';
      }
      statusHTML += rooms[i].room;
      statusHTML += '</li>';
    }
    statusHTML += '</ul>';
    document.getElementById('roomList').innerHTML = statusHTML;
  }
};
room_xhr.open('GET', 'data/rooms.json');
room_xhr.send();