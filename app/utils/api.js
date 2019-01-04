const axios = require('axios');

module.exports = {
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
