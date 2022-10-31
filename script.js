"use strict";

/* VARIABLES */
const textField = document.querySelector(".ip-input");
const submitBtn = document.querySelector(".submit-btn");
const resultsContainer = document.querySelector(".results-container");

const ipTrackerApp = function () {
  let lat, lng, map;
  let ipAddress = "";
  const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;

  /* EVENT LISTENERS */
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    ipAddress = textField.value;
    if (!validateIP(ipAddress)) return;
    console.log(ipAddress);
    fetchData(ipAddress);
  });

  /* FUNCTIONS */
  const renderMap = function (lat, lng) {
    if (map) {
      map.off();
      map.remove();
    }
    map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    var marker = L.marker([lat, lng]).addTo(map);
  };

  const renderResults = function (data) {
    resultsContainer.innerHTML = "";
    textField.value = "";
    const html = `
          <div class="single-result">
            <h2>ip address</h2>
            <p>${data.ip}</p>
          </div>
          <div class="single-result">
            <h2>location</h2>
            <p>${data.location.city}, ${data.location.country}</p>
          </div>
          <div class="single-result">
            <h2>timezone</h2>
            <p>${data.location.timezone}</p>
          </div>
          <div class="single-result">
            <h2>isp</h2>
            <p>${data.isp}</p>
          </div>`;
    resultsContainer.insertAdjacentHTML("beforeend", html);
  };

  const validateIP = function (ipAddress) {
    if (ipRegex.test(ipAddress)) return true;
    alert("You have entered an invalid IP address!");
    textField.value = "";
    return false;
  };

  const fetchData = function (ipAddress) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_DYzpeHXraFDPNp77xjsqTaNsxAPFS&ipAddress=${ipAddress}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        lat = data.location.lat;
        lng = data.location.lng;
        renderMap(lat, lng);
        renderResults(data);
      });
  };
  fetchData(ipAddress);
};
ipTrackerApp();
