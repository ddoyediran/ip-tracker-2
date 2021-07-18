// const https = require('https');

// const userToken = document.getElementById("amount").addEventListener("change", () => {
//     const tokenAmount = document.getElementById("amount").value;
//     console.log(parseFloat(tokenAmount));
//     return parseFloat(tokenAmount);
// })

// const userIp = document.getElementById("search-input").addEventListener("change", () => {
//     const ipTyped = document.getElementById("search-input").value;
//     console.log(ipTyped.toString());
//     return ipTyped.toString();
// })


// const getIp = document.getElementById("search-input").value;
// console.log(getIp);


// user type value

// user pressed search button: 
    // send the value type to iå


// let ip = userIp ? userIp : '13.251.106.90';
// console.log(ip);
// //let ip = '8.8.8.8';
// let api_key = 'at_FcrR0IwG8AF8xVLbqHw2t30ih6fs2';
// let api_url = 'https://geo.ipify.org/api/v1?';

// let url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;

// https.get(url, function(response) {
//     let str = '';
//     response.on('data', function(chunk) {str += chunk; });
//     response.on('end', function() {
//         console.log(str);
//     })
// }).end();


async function getIPData() {

    // if (mymap != undefined) 
    // { 
    //     mymap.remove(); 
    // }

    let ip2Used = '';
    ip2Used += document.getElementById("search-input").value;
    let ipAdd = ip2Used ? ip2Used : '';
    let api_key = 'at_FcrR0IwG8AF8xVLbqHw2t30ih6fs2';
    let api_url = 'https://geo.ipify.org/api/v1?';

    const url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ipAdd;


    const response = await fetch(url);
    const data = await response.json();

    const {ip, location, isp} = data;

    // pass the IP address to the IP element
    document.getElementById("ip-add-txt").textContent = ip;

    // pass the location to the location element
    const locAdd = location.region + ", " + location.postalCode;
    console.log(locAdd);
    document.getElementById("loc-name").textContent = locAdd;

    // get the timezone 
    const timeZone = location.timezone;
    document.getElementById("time-format").textContent = "UTC " + timeZone;

    // Set the isp
    document.getElementById("isp-format").textContent = isp;

    // get the latitude and longitude
    const lat = location.lat;
    const long = location.lng;

    console.log(lat, long);

    console.log(data);

    

    // Leaflet map start here
    const mymap = L.map('google-map').setView([lat, long], 13);

    // set attribution
    const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

    // tile url using openstreetmap
    const tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    // add the tileUrl and attributuon to the tiles
    const tiles = L.tileLayer(tileUrl, { attribution });

    // add the tiles to map
    tiles.addTo(mymap);

    // to add marker or pin to the map
    // L.marker([lat, long]).addTo(mymap);
    L.marker([lat, long]).addTo(mymap).bindPopup('This is');

    //mymap.invalidateSize();
    mymap._onResize()

    
}

//getIPData()