const React = require('react');
const SelectLanguage = require('./SelectLanguage');
const RepoGrid = require('./RepoGrid');
const api = require('../utils/api');

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repos: null
    });

    // It's very hard to try to use ES5 mixed with ES6. Here I must use an arrow function to avoid using a regular function expresion on setState to work around the correct context (this)
    api.fetchPopularRepos(lang)
      .then(res => {
        this.setState({ repos: res });
      })
  }

  render() {

    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {this.state.repos
            ? <RepoGrid
              repos={this.state.repos}
            />
            : <p>Loading...</p>
        }
      </div>
    );
  }
}

module.exports = Popular;
