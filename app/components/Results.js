var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var Player = require('./Player');
var Loading = require('./Loading');

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    var players = queryString.parse(this.props.location.search)
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ])
      .then(function(results) {
        if(results === null) {
          return this.setState({
            loading: false,
            error: 'Someting went wrong while retrieving the players.'
          });
        }
        this.setState({
          error: null,
          loading: false,
          winner: results[0],
          loser: results[1]
        });
      }.bind(this))
  }

  render() {
    var { error, winner, loser, loading } = this.state;

    if(loading) return <Loading />;
    if(error) {
      <div>
        <p>Error</p>
        <Link to="/battle">Reset</Link>
      </div>
    }
    return (
      <div className="row">
        <Player
          label="Winner"
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label="Loser"
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );
  }
}

module.exports = Results;
