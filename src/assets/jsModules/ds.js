console.log("hello from ds.js");
const timebox = document.getElementById("date-time");

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
  console.log("Päiväys: ", dateAndTime);
  timebox.innerHTML = dateAndTime;
  setTimeout(getDateTime, 5000);
};

export { getDateTime };
