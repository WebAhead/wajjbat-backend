const { getDistance } = require("geolib");

exports.calculatDestance = (userLocation, BusinessLocation) => {
  const distance = getDistance(userLocation, BusinessLocation, 1000);
  return distance;
};
