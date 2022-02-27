import {getDsBusses} from './hsl';

console.log("hello from ds.js");
const timebox = document.getElementById("date-time");

let nameOfCampus = document.getElementById('campus-name');

const getDateTime = () => {
  const dateTime = new Date();
  let date = dateTime.getDate();
  let month = dateTime.getMonth();
  let year = dateTime.getFullYear();
  let hours = dateTime.getHours();
  let minutes =
    dateTime.getMinutes() < 10
      ? "0" + dateTime.getMinutes()
      : dateTime.getMinutes();
  //let dateAndTime = date + "." + month + ". " + year + ' ' + hours + ":" + minutes;
  //let dateAndTime = '<i class="bi-clock" style="font-size: 4rem; color: #ff5000;"></i> ' + ' ' + hours + ":" + minutes;
  let dateAndTime = hours + ":" + minutes;
  //console.log("Päiväys: ", dateAndTime);
  timebox.innerHTML = dateAndTime;
  setTimeout(getDateTime, 5000);
};


document.getElementById("arabia-campus").addEventListener("click", () => {
  console.log("name clicked");
  nameOfCampus.innerHTML = 'Arabia';
  getDsBusses(60.2094084, 24.9809358, 500);
});
document.getElementById("karamalmi-campus").addEventListener("click", () => {
  console.log("name clicked");
  nameOfCampus.innerHTML = 'Karamalmi';
  getDsBusses(60.2241077, 24.7565312, 600);
});
document.getElementById("myllypuro-campus").addEventListener("click", () => {
  console.log("name clicked");
  nameOfCampus.innerHTML = 'Myllypuro';
  getDsBusses(60.2234938, 25.0757339, 400);
});
document.getElementById("myyrmaki-campus").addEventListener("click", () => {
  console.log("name clicked");
  nameOfCampus.innerHTML = 'Myyrmäki';
  getDsBusses(60.2588793, 24.8488313, 520);
});

export { getDateTime };
