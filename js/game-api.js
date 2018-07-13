const url = "https://tentenbackend.herokuapp.com/api/v1/users"


// fetch games
function getUser(username) {
  return fetch(url).then(request => request.json()).then(json => loadUsers(json, username))
}

function getUsers() {
  return fetch(url).then(request => request.json()).then(json => displayTopTenUsers(json))
}

function displayTopTenUsers(json) {
  json.sort(function(a,b) {
    var keyA = a.high_score
    var keyB = b.high_score
    if(keyA < keyB) {
      return -1
    }
    else if(keyA > keyB) {
      return 1
    } else {
      return 0
    }
  }).reverse()
  return json.slice(0,10)
}

function loadUsers(json, username) {
  let user = json.find(user => {
    return user.username === username
  })
  if(user === undefined) {
    user = addUser(username)
  }
  return user
}

// add user
function addUser(newUser) {
  let highScore = 0

  let bodyInfo = {
    "username": `${newUser}`,
    "high_score": `${highScore}`
  }

  const postConfig = {
    Accept: "application/json",
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(bodyInfo)
  }
  return fetch(url, postConfig).then(json => getUser(newUser))
}


//update high score
function updateScore(username, score, userid) {
  let bodyInfo = {
    "username": `${username}`,
    "high_score": `${score}`
  }

  const patchConfig = {
    Accept: "application/json",
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(bodyInfo)
  }
  return fetch(`${url}/${userid}`, patchConfig)
}
