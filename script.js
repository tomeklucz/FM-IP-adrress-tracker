"use strict";

const textField = document.querySelector(".ip-input");
const submitBtn = document.querySelector(".submit-btn");
let lat, lng;

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(textField.value);
});

const renderMap = function () {
  var map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var marker = L.marker([51.5, -0.09]).addTo(map);
};

renderMap();

fetch(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_DYzpeHXraFDPNp77xjsqTaNsxAPFS"
)
  .then((response) => response.json())
  .then((data) => console.log(data));
