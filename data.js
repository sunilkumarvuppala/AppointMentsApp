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
    if (dateInput == "") {
      $('#errorMessage').text("Date must be filled out");
      return false;
    } else if (timeInput == "") {
      $('#errorMessage').text("Time must be filled out");
      return false;
    }
    else if (descInput == "") {
      $('#errorMessage').text("Description must be filled out");
      return false;
    }
    $.ajax({
      type: 'POST',
      url: 'backEnd.pl',
      data: { 'dateInput': dateInput, 'timeInput': timeInput, 'descInput': descInput }
    });
  });

});


function clearAllFields() {
  console.log("inside clear");
  $('#errorMessage').text("");
}


function getAppointments() {
  var searchValue = $('#searchText').val();
  getData('searchValue=' + searchValue);
}

function getData(api) {
  $('#appointmentsTable tr:gt(0)').remove()
  $.getJSON("http://localhost/AppointmentsPerl/backperl.pl?" + api, function (result) {

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

