var searchBtn = document.querySelector("#search-btn");
var playerInput = document.querySelector("#player-input");
var player1Pic = document.querySelector("#player1-pic");
var player2Pic = document.querySelector("#player2-pic");
var player1Stats = document.querySelector("#player1-stats");
var player2Stats = document.querySelector("#player2-stats");
var mediaContent = document.querySelector(".media-content");

var getStats = function (data) {
    fetch("https://www.balldontlie.io/api/v1/season_averages?player_ids[]=27&season=2018")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.data[0].pts);
            document.querySelector("#p1-ppg-stat").textContent = (data.data[0].pts);
        });


    fetch("https://www.balldontlie.io/api/v1/players/27")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            document.querySelector("#p1-ppg-stat").textContent = (data.first_name);
        });
    

   
};


getStats();