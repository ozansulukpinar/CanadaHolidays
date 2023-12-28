$(document).ready(function () {
  populateDropdowns();
  $('.text').hide();
  var day, month;

  $('select').on('change', function () {
    checkingForCurrentYear();
  });
});

function populateTimeValues() {
  day = $('#days').val();
  month = $('#months').val();
}

function checkingForCurrentYear() {
  populateTimeValues();

  if (isItValidDate()) {
    $.getJSON('https://canada-holidays.ca/api/v1/holidays', function (data) {
      var result = 'NOT HOLIDAY';

      try {
        data.holidays.forEach(function (item) {
          if (item.id == 1)
            $('#year').text(item.date.substring(0, 4));

          if (item.date.substring(5) == month + '-' + day) {
            result = "HOLIDAY";
          }
        });

        $('.text').show();
      }
      catch (error) {
        result = 'NOT APPLICABLE!';
      }

      $('#result').text(result);
    });
  }
  else {
    $('.text').hide();
    $('#result').text('');
    $('#year').text('');
    setTimeout(function () {
      alert('Please select a valid date!');
    }, 100);
  }
}

function changeMode() {
  var element = document.body;
  element.classList.toggle('dark-mode');

  if ($('button').text().includes('Dark')) {
    $('button').text('Light Mode');
  } else {
    $('button').text('Dark Mode');
  }
}

function populateDropdowns() {
  for (var i = 1; i <= 31; i++) {
    var temporaryI;
    if (i < 10) { temporaryI = String(i).padStart(2, '0'); } else { temporaryI = i; }
    $('#days').append($('<option></option>').val(temporaryI).text(i));
  };

  let data = [{ 'code': '01', 'name': 'January' },
  { 'code': '02', 'name': 'February' },
  { 'code': '03', 'name': 'March' },
  { 'code': '04', 'name': 'April' },
  { 'code': '05', 'name': 'May' },
  { 'code': '06', 'name': 'June' },
  { 'code': '07', 'name': 'July' },
  { 'code': '08', 'name': 'August' },
  { 'code': '09', 'name': 'September' },
  { 'code': '10', 'name': 'October' },
  { 'code': '11', 'name': 'November' },
  { 'code': '12', 'name': 'December' }
  ];

  data.forEach(function (e, i) {
    $('#months').append($('<option></option>').val(e.code).text(e.name));
  });
}

function isItValidDate() {
  var result = true;
  var specificMonths = ['02', '04', '06', '09', '11'];

  if ((day == '30' && month == '02') || (day == '31' && specificMonths.includes(month)))
    result = false;

  return result;
}