var searchBtn = document.querySelector("#search-btn");
var playerInput = document.querySelector("#player-input");
var player1Pic = document.querySelector("#player1-pic");
var player2Pic = document.querySelector("#player2-pic");
var player1Stats = document.querySelector("#player1-stats");
var player2Stats = document.querySelector("#player2-stats");
var mediaContent = document.querySelector(".media-content");
var season = document.querySelector("#season");
var names = document.querySelector("#first-names")

// Pulls player stats
var getStats = function (playerID) {
    console.log(playerID);

    var year = season.value;
    console.log(year);

    fetch("https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" + playerID + "&season=" + year)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            document.querySelector("#p1-ppg-stat").textContent = (data.data[0].pts);
            document.querySelector("#p1-ast-stat").textContent = (data.data[0].ast);
            document.querySelector("#p1-reb-stat").textContent = (data.data[0].reb);
            document.querySelector("#p1-blk-stat").textContent = (data.data[0].blk);
            document.querySelector("#p1-stl-stat").textContent = (data.data[0].stl);
            document.querySelector("#p1-fg-stat").textContent = (data.data[0].fg_pct);
            document.querySelector("#p1-fg3-stat").textContent = (data.data[0].fg3_pct);

           // document.querySelector("#p2-ppg-stat").textContent = (data.data[0].pts);
           // document.querySelector("#p2-ast-stat").textContent = (data.data[0].ast);
           // document.querySelector("#p2-reb-stat").textContent = (data.data[0].reb);
           // document.querySelector("#p2-blk-stat").textContent = (data.data[0].blk);
           // document.querySelector("#p2-stl-stat").textContent = (data.data[0].stl);
           // document.querySelector("#p2-fg-stat").textContent = (data.data[0].fg_pct);
           // document.querySelector("#p2-fg3-stat").textContent = (data.data[0].fg3_pct);
        });

    playerInput.value = "";
    season.value = "";

}


// Search bar process
var searchName = function (data) {
    var lastName = playerInput.value;

    console.log(lastName)

    fetch("https://www.balldontlie.io/api/v1/players?search=" + lastName)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Display first names
           // for (let i = 0; i < data.data.length; i++) {
           //     var playerNames = (data.data[i].first_name)
           //     console.log(playerNames);

           //     var firstName = document.createElement("a");
           //     firstName.classList = "is-size-6 has-text-white";                
           //     firstName.textContent = playerNames + " / ";

           //     names.appendChild(firstName);
                
           //     firstName.addEventListener("click", runFirstName);
           // }

           // var runFirstName = function() {

           // } 
            var playerID = (data.data[0].id)
            getStats(playerID);            
        });
        
    

    
};



searchBtn.addEventListener("click", searchName);

