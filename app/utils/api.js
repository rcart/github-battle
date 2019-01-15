const axios = require('axios');

// Github's connection params
//var id = '';
//var secret = '';
//var params = '?client_id=' + id + '&client_secret=' + secret;
//
// With this functions I won't be using the id/secret params, just the public API

function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}`)
    .then(({ data }) => data ) 
    .catch(handleError)
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
}

function getStarCount(repos) {
  return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore({ followers }, repos) {
  return (followers * 3) + getStarCount(repos);
}

function handleError(error) {
  console.log(error);
  return null;
}

function getUserData(player) {
  // axios.all calls an array of functions returning promises  once resolved
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([ profile, repos ]) => ({
      profile,
      score: calculateScore(profile, repos)
    })
  )
    .catch(handleError)
}

function sortPlayers(players) {
  return players.sort((a,b) => b.score - a.score);
}

module.exports = {
  battle(players) {
    return Promise.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },

  fetchPopularRepos(language) {
    const encodeURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Respositories`);

    return axios.get(encodeURI).then((res) => res.data.items).catch(handleError)
  }
}
