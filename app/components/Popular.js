const React = require('react');
const SelectLanguage = require('./SelectLanguage');
const RepoGrid = require('./RepoGrid');
const Loading = require('./Loading');
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

    // No need to catch the errors since api takes care of it.
    api.fetchPopularRepos(lang)
      .then(res => this.setState({ repos: res }))
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
            : <Loading />
        }
      </div>
    );
  }
}

module.exports = Popular;
