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

module.exports = {
  battle: function(players) {

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
