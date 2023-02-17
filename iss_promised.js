const requestPromise = require('request-promise-native');

const fetchMyIP = () => {
  return requestPromise('https://api.ipify.org/?format=json');
};



const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return requestPromise(`http://ipwho.is/${ip}`);
};



const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return requestPromise(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,  nextISSTimesForMyLocation };
