console.log("hsl js file");
const cors = "https://users.metropolia.fi/~ilkkamtk/proxy.php/?ur=";
const apiUrl =
  "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
const location = [(lat = 60.225528), (lon = 24.760625)]; //lat: ${location.lat}, lon: ${location.lon}
const hslPrint = document.querySelector("#hsl-data");

/*  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: search}), // GraphQL search add to query
  };
  fetch(apiTransit, fetchOptions).then(function (answer) {
    console.log('hsl json', answer);
    return answer.json();

  }).then(function (result) {;
  }).catch(function (e) {
    console.error(e.message);
  }); */

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
    // TODO: loop results
    console.log("hsl data", response.data.stop.stoptimesWithoutPatterns);
    const stop = response.data.stop;
    let time = new Date(
      (stop.stoptimesWithoutPatterns[0].realtimeArrival +
        stop.stoptimesWithoutPatterns[0].serviceDay) *
        1000
    );
    hslPrint.innerHTML = `<p>
    <span id="stopName">${stop.name}</span> ${stop.code}
        </p>`;
    hslPrint.innerHTML += `<p>
    <span id="bussNumber">${stop.stoptimesWithoutPatterns[0].trip.routeShortName}</span>
    ${stop.stoptimesWithoutPatterns[0].headsign} saapuu ${time.getHours()}:${time.getMinutes()}
        </p>`;
  });
};
getBusses(2132207);
