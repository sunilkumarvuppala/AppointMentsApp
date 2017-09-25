$(document).ready(function () {
  $("appointmentsTable").find("tr:gt(0)").remove();
  getData('');
  $("#showAddForm").hide();

  $("#newButton").click(function () {
    $("#newDiv").hide();
    $("#showAddForm").show();

  });

  $("#cancelButton").click(function () {
    $("#showAddForm").hide();
    $("#newDiv").show();
  });
  $("#searchButton").click(function () {
    $.ajax({
      dataType: 'json',
      type: 'GET',
      url: 'backperl.pl',
      success: function (data) {
        console.log(data);

      }
    });
  });

  $("form#addForm").submit(function (e) {
   // e.preventDefault();
    console.log("Inside subkmit");
    var dateInput = $('#dateHtml').val();
    var timeInput = $('#timeHtml').val();
    var descInput = $('#descHtml').val();
   // dateInput = dateFormat(dateInput);
   // timeInput = dateInput + convertTime12to24(timeInput);
    console.log(dateInput+' '+timeInput);
    $.ajax({
      type: 'POST',
      url: 'backEnd.pl',
      data: { 'dateInput': dateInput, 'timeInput':timeInput, 'descInput':descInput }
    });
  });

});



function getAppointments(){
 
  var searchValue = $('#searchText').val();
   getData('searchValue='+searchValue);
}

function dateFormat(dateValue){
  var myDate=dateValue;
myDate=myDate.split("\/");
var newDate=myDate[0];
console.log(newDate);
  return newDate;
}

function convertTime12to24(time12h) {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  console.log(hours + ':' + minutes+ ':00');
  return hours + ':' + minutes+ ':00';
}

function getData(api){
  $('#appointmentsTable tr:gt(0)').remove()
    $.getJSON("http://localhost/apex/backperl.pl?"+api, function (result) {
      
    var appointment_data = '';
    $.each(result, function (key, value) {
      appointment_data += '<tr>';
      appointment_data += '<td>' + value.date + '</td>';
      appointment_data += '<td>' + value.time + '</td>';
      appointment_data += '<td>' + value.desc + '</td>';
    });
    $('#appointmentsTable').append(appointment_data);
  });
  
}

