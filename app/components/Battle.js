var React = require('react');
var PlayerInput = require('./PlayerInput');

class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, username) {
    this.setState({
      // Again mixing ES6 in ES5 to make it work without function expresion in setState
      [id + 'Name']: username,
      [id + 'Image']: 'https://github.com/' + username + '.png?size=200'
    });
  }

  render() {
    const { playerOneName, playerTwoName } = this.state;
    return (
      <div className="row">
        {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

        {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}
      </div>
    );
  }
}

module.exports = Battle;
