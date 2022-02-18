console.log("hsl js file");

const apiUrl =
  "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
const location = [(lat = 60.225528), (lon = 24.760625)]; //lat: ${location.lat}, lon: ${location.lon}
const hslModalLabel = document.querySelector('#hslModalLabel');
const hslPrint = document.querySelector("#hsl-data");


/**
 * Fetches JSON data from APIs
 *
 * @param {string} url - api endpoint url
 * @param {Object} options - request options
 * @param {string} useProxy - optional proxy server
 *
 * @returns {Object} response json data
 */
const fetchData = async (url, options = {}, useProxy) => {
  // Construct new url if proxy in use
  if (useProxy === "allorigins") {
    url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  }
  let jsonData;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    jsonData = await response.json();
    // Allorigins returns json payload in data.contents property as a string
    if (useProxy === "allorigins") {
      jsonData = JSON.parse(jsonData.contents);
    }
  } catch (error) {
    console.error("fetchData() error", error);
    jsonData = {};
  }
  return jsonData;
};

/**
 * Buss stop query
 *
 * @param {Number} id of buss stop
 * @returns
 */
const getQueryForNextRidesByStopId = (id) => {
  return `{
      stop(id: "HSL:${id}") {
        name
        code
        stoptimesWithoutPatterns {
          scheduledArrival
          realtimeArrival
          arrivalDelay
          scheduledDeparture
          realtimeDeparture
          departureDelay
          realtime
          realtimeState
          serviceDay
          headsign
          trip {
            routeShortName
            tripHeadsign
          }
        }
      }
    }`;
};

const HSLData = { apiUrl, getQueryForNextRidesByStopId };

/**
 * Get busses from selected stop
 *
 * @param {Number} stopNumber get stop number from user
 */
const getBusses = (stopNumber) => {
  fetchData(HSLData.apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/graphql" },
    body: HSLData.getQueryForNextRidesByStopId(stopNumber),
  }).then((response) => {

    console.log("hsl data", response.data.stop.stoptimesWithoutPatterns);
    const patterns = response.data.stop.stoptimesWithoutPatterns;
    const stop = response.data.stop;
    hslModalLabel.innerHTML = `
    <span id="stopName">${stop.name}</span> <p>${stop.code}</p>`;
    hslPrint.innerHTML = '<tr><th>Linja</th><th>Määränpää</th><th>Lähtee</th></tr>';
    for(let i = 0; i < patterns.length; i++){
      console.log('chechking length ', i);

      let time = new Date(
        (patterns[i].realtimeArrival +
          patterns[i].serviceDay) *
          1000
      );
      let hours = time.getHours();
      let minutes = (time.getMinutes() < 10) ?  '0' + time.getMinutes() : time.getMinutes();
      hslPrint.innerHTML += `<tr>
      <td><div id="bussNumber">${patterns[i].trip.routeShortName}</div></td>
      <td id="bussLine">${patterns[i].headsign}</td><td id="leavingTime">${hours}:${minutes}</td>
          </tr>`;
    }


  });
};
document.getElementById('karanristi').addEventListener('click', getBusses(2132207));
//getBusses(2132207);
