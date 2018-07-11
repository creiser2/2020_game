const url = "http://localhost:3000/api/v1/games"


// fetch games
fetch(url).then(request => request.json()).then(json => loadGames(json))



function loadGames(json) {
  debugger;
}
