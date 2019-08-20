/*Navigation*/

function myFnc(e)
e.classList.toggle("show");
var elem=document.getElementById("navID");
Style=window.getComputedStyle(elem),
right=Style.getPropertyValue("right");

if(right=="0px"){
    elem.style.right= "-260";
}else{
elem.style.right="0px";
}

$.getJSON("https://acuityscheduling.com/api/v1/appointments", function(appointment)
{console.log(appointment)}

//Scheduling API
var Acuity = require('acuityscheduling')

var acuity = Acuity.basic({
  userId: 18126160,
  apiKey: 'b3673f692b01472ad1b761588bdeef09 '
});

// Create appontment options:
var options = {
  method: 'POST',
  body: {
    appointmentTypeID : 1,
    datetime          : '2016-04-01T09:00',
    firstName         : 'Bob',
    lastName          : 'McTest',
    email             : 'bob.mctest@example.com'
  }
};

// Make the create appointment request:
acuity.request('/appointments', options, function (err, res, appointment) {
  if (err) return console.error(err);
  console.log(appointment);
});
