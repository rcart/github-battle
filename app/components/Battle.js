var React = require('react');
var PlayerInput = require('./PlayerInput');
var PlayerPreview = require('./PlayerPreview');

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
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState({
      // Again mixing ES6 in ES5 to make it work without function expresion in setState
      [id + 'Name']: username,
      [id + 'Image']: 'https://github.com/' + username + '.png?size=200'
    });
  }

  handleReset(id) {
    this.setState({
      [id + 'Name']: '',
      [id + 'Image']: null
    });
  }

  render() {
    // Destructuring. I can't avoid using ES6 in some places where it is sexier than ES5
    const {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage
    } = this.state;
    return (
      <div className="row">
        {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}
        {playerOneImage !== null &&
          <PlayerPreview
            avatar={playerOneImage}
            username={playerOneName}
            onReset={this.handleReset}
            id='playerOne'
          />}

        {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}
        {playerTwoImage !== null &&
          <PlayerPreview
            avatar={playerTwoImage}
            username={playerTwoName}
            onReset={this.handleReset}
            id='playerTwo'
          />}
      </div>
    );
  }
}

module.exports = Battle;
