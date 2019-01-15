const React = require('react');
const PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
     }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    const { username } = this.state;
    const { label } = this.props;
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="usernamee">
          {label}
        </label>
        <input
          id="username"
          type="text"
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

module.exports = PlayerInput;
