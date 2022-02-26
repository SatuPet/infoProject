import { useApiData } from "./ApiHooks";

const hslModalLabel = document.querySelector("#hslModalLabel");
const hslPrint = document.querySelector("#hsl-data");
const dsHslPrint = document.querySelector("#ds-hsl-karanristi-all-data");

/**
 * Fetches JSON data from APIs
 *
 * @param {string} url api endpoint url
 * @param {Object} options request options
 *
 * @returns {Object} response json data
 */
/*
const fetchData = async (url, options = {}) => {
  console.log('fechin data');
  let jsonData;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    jsonData = await response.json();
  } catch (error) {
    console.error('fetchData() error', error);
    jsonData = {};
  }
  return jsonData;
};
*/
/**
 * Buss stop query
 *
 * @param {Number} id of buss stop
 * @returns next 5 busses
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

/**
 * query to get busses of selected area
 * TODO: not hard coded coordinates (Karaportti 2)
 *
 * @returns busses
 */
const getQueryByRadius = () => {
  return `
  {
    stopsByRadius(lat:60.2241077, lon:24.7565312, radius:600) {
      edges {
        node {
          stop {
            gtfsId
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
          distance
        }
      }
    }
  }`;
};

const HSLData = { getQueryForNextRidesByStopId };
const DsHslData = { getQueryByRadius };

/**
 * Get busses from selected area and print to page
 */
let hslDsArray = [];
const getDsBusses = () => {
  useApiData()
    .getHslDataByRadius(getQueryByRadius())
    .then((response) => {
      dsHslPrint.innerHTML =
        "<tr><th>Linja</th><th>Määränpää</th><th>Pysäkki</th><th>Lähtee</th></tr>";
      const nodes = response.data.stopsByRadius.edges;
      //console.log("radius hsl nodes", nodes);

      for (let u = 0; u < nodes.length; u++) {
        let patterns = nodes[u].node.stop.stoptimesWithoutPatterns;
        //console.log("inside of pattern ", patterns);
        const stop = nodes[u].node.stop;

        for (let i = 0; i < patterns.length; i++) {
          let time = new Date(
            (patterns[i].realtimeArrival + patterns[i].serviceDay) * 1000
          );
          let hours = time.getHours();
          let minutes =
            time.getMinutes() < 10
              ? "0" + time.getMinutes()
              : time.getMinutes();

          hslDsArray.push({
            sorttime: `${patterns[i].realtimeArrival}`,
            oneLine: `<tr>
        <td><div id="bussNumber">${patterns[i].trip.routeShortName}</div></td>
        <td id="bussDestination">${patterns[i].headsign}</td>
        <td id="stopName">${stop.name}</td>
        <td id="leavingTime">${hours}:${minutes}</td>
            </tr>`,
          }); // <td><div id="stopCode">${stop.code}</div></td>
        }
      }
      //sorting busses
      hslDsArray.sort(function (a, b) {
        return a.sorttime - b.sorttime;
      });
      let maxPrintValue = 8; // max lines print in screen
      for (const line of hslDsArray) {
        if (maxPrintValue === 0) {
          break;
        }
        dsHslPrint.innerHTML += line.oneLine;
        maxPrintValue--;
      }
    });

};
const hslTimer = () => {
  dsHslPrint.innerHTML = '';
  hslDsArray = [];
  getDsBusses();
};
setInterval(hslTimer, 30000);
getDsBusses();

/**
 * Get busses from selected stop and print in modal
 *
 * @param {Number} stopNumber get stop number from user
 */

const getBusses = (stopNumber) => {
  hslModalLabel.innerHTML = "";
  hslPrint.innerHTML = "";
  console.log("get busses clicked", stopNumber);

  useApiData()
    .getHslDataByStop(HSLData.getQueryForNextRidesByStopId(stopNumber))
    .then((response) => {
      //console.log("hsl data", response.data.stop.stoptimesWithoutPatterns);
      const patterns = response.data.stop.stoptimesWithoutPatterns;
      const stop = response.data.stop;
      hslModalLabel.innerHTML = `
    <span id="stopName">${stop.name}</span> <p>${stop.code}</p>`;
      hslPrint.innerHTML =
        "<tr><th>Linja</th><th>Määränpää</th><th>Lähtee</th></tr>";
      for (let i = 0; i < patterns.length; i++) {
        let time = new Date(
          (patterns[i].realtimeArrival + patterns[i].serviceDay) * 1000
        );
        let hours = time.getHours();
        let minutes =
          time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        hslPrint.innerHTML += `<tr>
      <td><div id="bussNumber">${patterns[i].trip.routeShortName}</div></td>
      <td id="bussLine">${patterns[i].headsign}</td><td id="leavingTime">${hours}:${minutes}</td>
          </tr>`;
      }
    });
};

export { getBusses, getQueryByRadius, getQueryForNextRidesByStopId };
