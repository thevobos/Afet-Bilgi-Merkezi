import * as windows1254 from 'windows-1254';
import md5 from "md5";
import dateFormat, { masks } from "dateformat";
import turkeyCities from "./Cities"
var url
var apiRoot = {}
var earthquakeArray = []

const EarthquakeTr = (country) => {

    url = "https://api.tourismerp.store/tests"


    return fetch(url)
        .then((response) => {
            return response.text();
        })
        .then(html => {
            apiRoot["source_url"] = url
            apiRoot["result"] = []
            earthquakeArray = []
            earthquakeArray = html.split(/\r?\n/)
            var preStartIndex = earthquakeArray.indexOf("<pre>");
            var preEndIndex = earthquakeArray.indexOf("</pre>");
            earthquakeArray = earthquakeArray.slice(preStartIndex + 7, preEndIndex - 1);
            earthquakeArray.forEach(element => {
                var data = {
                    "magnitude": getMagnitude(element),
                    "coordinates": {
                        "latitude": getLat(element),
                        "longitude": getLong(element)
                    },
                    "location": getLocation(element),
                    "depth": getDepth(element),
                    "unix_timestamp": getUnixTimestamp(element),
                    "datetime": dateFormat(getDateTime(element), "isoDateTime"),
                    "revised": getRevised(element),
                    "id_hash": md5(getLat(element) + "," + getLong(element)),
                    "hash": md5(getMagnitude(element) + "," + getLat(element) + "," + getLong(element) + "," + getDepth(element) + "," + getUnixTimestamp(element) + "," + getLocation(element))
                }
                apiRoot["result"].push(data)
            })

            //------
            //sadece belirli bir ile yakın depremleri almak için kod satırı
            if (country !== undefined && country !== null && country !== "") {
                var cityData = turkeyCities(country);
                if (cityData !== []) {
                    var cityData = cityData[0];
                    var earthquakes = apiRoot["result"];
                    apiRoot["result"] = [];
                    earthquakes.filter(function (earthquake) {
                        return checkIfInside([earthquake.coordinates.latitude, earthquake.coordinates.longitude], [cityData.coordinates.latitude, cityData.coordinates.longitude])
                    }).forEach(earthquake => {
                        apiRoot["result"].push(earthquake);
                    });
                }
            }
            //------

            return apiRoot
        })
        .catch()
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function checkIfInside(spotCoordinates, center) {
    var radius = 100;
    let newRadius = distanceInKmBetweenEarthCoordinates(spotCoordinates[0], spotCoordinates[1], center[0], center[1]);
    if (newRadius < radius) {
        return true;
    } else if (newRadius > radius) {
        return false;
    } else {
        return true;
    }
}

function getRandomInt(max, ...without) {
    var random;
    do {
        random = Math.floor(Math.random() * max);
    } while (without.indexOf(random) !== -1);
    return random;
}

function getUnixTimestamp(data) {
    return getDateTime(data).getTime() / 1000;
}

function getMagnitude(data) {
    var MD = data.slice(55, 58);
    var ML = data.slice(60, 63);
    var MW = data.slice(65, 68);
    if (MW == '-.-') {
        if (ML == '-.-') {
            if (MD == '-.-') {
                return parseFloat(0)
            } else {
                return parseFloat(MD)
            }
        } else {
            return parseFloat(ML)
        }
    } else {
        return parseFloat(MW)
    }
}

function getLat(data) {
    var lat = parseFloat(data.slice(21, 28));
    return lat;
}

function getLong(data) {
    var long = parseFloat(data.slice(31, 38));
    return long;
}

function getDepth(data) {
    var depth = parseFloat(data.slice(41, 49).replace(/ /gi, ''));
    return depth;
}

function getLocation(data) {
    var location = data.slice(71, 121).trim();
    return location;
}

function getDateTime(data) {
    var date = new Date(
        Date.UTC(
            data.slice(0, 4),
            data.slice(5, 7) - 1,
            data.slice(8, 10),
            data.slice(11, 13),
            data.slice(14, 16),
            data.slice(17, 19)
        )
    );
    date.setHours(date.getHours() - 3);
    return date;
}

function getRevised(data) {
    var revised = data.slice(121, data.length).trim();

    if (revised == "İlksel") {
        return null;
    } else {
        var dateData = revised.slice(12, revised.length - 1);
        var date = new Date(
            Date.UTC(
                dateData.slice(0, 4),
                dateData.slice(5, 7) - 1,
                dateData.slice(8, 10),
                dateData.slice(11, 13),
                dateData.slice(14, 16),
                dateData.slice(17, 19)
            )
        );
        date.setHours(date.getHours() - 3);

        return {
            "number": revised.slice(7, 8),
            "unix_timestamp": date.getTime() / 1000,
            "datetime": dateFormat(date, "isoDateTime"),
        };
    }
}


export default EarthquakeTr;