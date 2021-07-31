var searchBtn = document.querySelector("#search-btn");
var searchBtn2 = document.querySelector("#search-btn-2");
var saveBtn = document.querySelector("#save-button");
var playerInput = document.querySelector("#player-input");
var player2Input = document.querySelector("#player-input-2");
var player1Pic = document.getElementById("player1-pic");
var player2Pic = document.querySelector("#player2-pic");
var player1Stats = document.querySelector("#player1-stats");
var player2Stats = document.querySelector("#player2-stats");
var mediaContent = document.querySelector(".media-content");
var season = document.querySelector("#season");
var season2 = document.querySelector("#season-2");
var names = document.querySelector("#first-names")
var counter = 0;
var player1Name = "";
var player2Name = "";
var players = {
    playerOne: "",
    playerTwo: ""
}
var pastPlayerHistory = [];

var createStatList = function(playerObj) {

    // creating the p elements of the div displaying Player Stats
$("<p>").text("Name:" + player1Name);
    var ppgItem = $("<p>").text("Ppg: " + playerObj.ppg);
    var astItem = $("<p>").text("Ast: " + playerObj.ast);
    var rebItem = $("<p>").text("Reb: " + playerObj.reb);
    var blkItem = $("<p>").text("Blk: " + playerObj.blk);
    var stlItem = $("<p>").text("Stl: " + playerObj.stl);
    var fgItem = $("<p>").text("Fg %: " + playerObj.fg);
    var fg3Item = $("<p>").text("Fg3 %: " + playerObj.fg3);

    if (counter === 0) {
    $("#player1-stats").empty();
    $("#player1-stats").append($("<p class='mb-2'>").text("Name: " + player1Name))
        .append(ppgItem)
        .append(astItem)
        .append(rebItem)
        .append(blkItem)
        .append(stlItem)
        .append(fgItem)
        .append(fg3Item);

        counter++;
    } else {
        $("#player2-stats").empty();
        $("#player2-stats").append($("<p class='mb-2'>").text("Name: " + player2Name))
        .append(ppgItem)
        .append(astItem)
        .append(rebItem)
        .append(blkItem)
        .append(stlItem)
        .append(fgItem)
        .append(fg3Item);    
        
        counter = 0;
    }
}            
// Pulls player stats
var getStats = function (playerID) {
    // set Player Object
    var player = {
    Name: "",
    ppg: 0,
    ast: 0,
    reb: 0,
    blk: 0,
    stl: 0,
    fg: 0,
    fg3: 0
    }
    // check counter to see which search bar
    if (counter === 0) {
        var year = season.value;
    } else {
        var year = season2.value;
    }
    
    console.log(year);

    fetch("https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" + playerID + "&season=" + year)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // assigning Player Object properties
            $(player).attr("ppg", data.data[0].pts);
            $(player).attr("ast", data.data[0].ast);
            $(player).attr("reb" ,data.data[0].reb);
            $(player).attr("blk" ,data.data[0].blk);
            $(player).attr("stl" ,data.data[0].stl);
            $(player).attr("fg" ,data.data[0].fg_pct);
            $(player).attr("fg3" ,data.data[0].fg3_pct);

            createStatList(player);
        });

    playerInput.value = "";
    season.value = "";

}

// Search bar process
var searchName = function (data) {

    if (counter === 0) {
        var lastName = playerInput.value;
    }else {
        var lastName = player2Input.value;
    }

    console.log(lastName)

    fetch("https://www.balldontlie.io/api/v1/players?search=" + lastName)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var first = (data.data[0].first_name)
            var last = (data.data[0].last_name)        
            var playerID = (data.data[0].id)

            if(counter === 0) {
                players.playerOne = data.data[0].first_name + " " + data.data[0].last_name;
            } else {
                players.playerTwo = data.data[0].first_name + " " + data.data[0].last_name;
            }

            console.log(players);
            getStats(playerID);
            viewImage(first, last);            
        });    
};

var viewImage = function(first, last) {

    if (counter === 0) {
        player1Pic.src = "https://nba-players.herokuapp.com/players/" + last + "/" + first;
    } else {
        player2Pic.src = "https://nba-players.herokuapp.com/players/" + last + "/" + first;

    }
    //fetch("https://nba-players.herokuapp.com/players/" + last + "/" + first)
   // .then(function (response) {
   //     return response.json();
   // })
  //  .then(function (data) {
   //     console.log(data);
   // });
};

var inputCheck = function () {
    if (counter === 0) {
        var input = playerInput.value;
    } else {
        var input = player2Input.value;
    }
    
    if (input === null || input === "") {
        return;
    } else {searchName(); }
}

var printPlayers = function(players) {

        var playersItem = $("<div class='box mb-1 mt-1'>");
        var playerBox = $("#past-players");
        var pastPlayerText = players.playerOne + " VS. "  + players.playerTwo;
        playersItem.text(pastPlayerText);
        playerBox.append(playersItem);

}

var savePlayers = function() {

    pastPlayerHistory.push(players);
    localStorage.setItem("players", JSON.stringify(pastPlayerHistory));
    var pastPlayersItem = $("<div class='box mb-1 mt-1'>");
    var pastPlayerBox = $("#past-players");
    var pastPlayerText = players.playerOne + " VS. "  + players.playerTwo;
    pastPlayersItem.text(pastPlayerText);
    pastPlayerBox.append(pastPlayersItem);
  };

var loadPastPlayers = function() {
    storedPlayers = JSON.parse(localStorage.getItem("players"));
    if (!storedPlayers) {
        return;
    }
    storedPlayers.forEach(function(items) {
        pastPlayerHistory.push(items);
    })
    for (let i = 0; i < pastPlayerHistory.length; i++) {
        printPlayers(pastPlayerHistory[i]);
    }
    
    console.log(pastPlayerHistory);

}

debugger;
searchBtn.addEventListener("click", function () {inputCheck();});
searchBtn2.addEventListener("click", function () {inputCheck();});
saveBtn.addEventListener("click", function () {savePlayers();});

// searchBtn.addEventListener("click", searchName);
// searchBtn2.addEventListener("click", searchName);

loadPastPlayers();

// maybe add a true/false eventlistener for verifying which player 1 or 2 is being run
