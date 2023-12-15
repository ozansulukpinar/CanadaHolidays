var month = 1;
var day = 1;
var year = new Date().getFullYear();

const d = new Date('"' + year + "-" + month + "-" + day + '"');

var start = new Date(d.getFullYear(), 0, 0);
var diff = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);

var status = false;

//ramadan 21/22/23 april
//sacrifice 28/29/30 june/1 july

//2023
const ramadan = [111, 112, 113];
const sacrifice = [179, 180, 181, 182];

//365-366
//354-355

//11 days back

checkingForCurrentYear();

function getNewDays() {

  year++;

  ramadan.forEach((element, index) => {
    if (element > 11) {
      ramadan[index] = element - 11;
    }
    else { // if(element < 11)
      if (year-- % 4 == 0) {
        element += 366;
      }
      else {
        element += 365;
      }

      ramadan[index] = element - 11;
    }
  });

  sacrifice.forEach((element, index) => {

    if (element > 11) {
      sacrifice[index] = element - 11;
    }
    else { // if(element < 11
      if (year-- % 4 == 0) {
        element += 366;
      }
      else {
        element += 365;
      }

      sacrifice[index] = element - 11;
    }
  });
}

function checkingForCurrentYear() {
  do {
    if (ramadan.includes(day) || sacrifice.includes(day)) {
      status = true;
    }
    else {
      getNewDays();
    }
  }
  while (!status)
}

function changeMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  if ($("button").text().includes("Dark")) {
    $("button").text("Light Mode");
  } else {
    $("button").text("Dark Mode");
  }
}
