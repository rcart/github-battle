var axios = require('axios');

// Github's connection params
//var id = '';
//var secret = '';
//var params = '?client_id=' + id + '&client_secret=' + secret;
//
// With this functions I won't be using the id/secret params, just the public API

function getProfile(username) {
  return axios.get('https://api.github.com/users/' + username)
    .then(function(user) {
      return user.data;
    })
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos?per_page=100');
}

function getStarCount(repos) {
  return repos.data.reduce(function(count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.log(error);
  return null;
}

function getUserData(player) {
  // axios.all calls an array of functions returning promises  once resolved
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function(data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers(players) {
  return players.sort(function(a,b) {
    return b.score - a.score;
  });
}

module.exports = {
  battle: function(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },

  fetchPopularRepos: function(language) {
    const encodeURI = window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' + language + 
      '&sort=stars&order=desc&type=Respositories');

    return axios.get(encodeURI)
      .then(function(res) {
        return res.data.items;
      })
  }
}
