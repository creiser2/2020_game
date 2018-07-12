const url = "http://localhost:3000/api/v1/users"


// fetch games
function getUser(username) {
  return fetch(url).then(request => request.json()).then(json => loadUsers(json, username))
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
  return fetch(url, postConfig)
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
