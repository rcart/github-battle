var React =  require('react');
var PropTypes = require('prop-types');

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    }
  }

  componentDidMount() {
    var stopper = this.state.text + '...';
    // Interval is a property create so we can remove it once the component unmounts
    this.interval = window.setInterval(function() {
      if (this.state.text === stopper) {
        // Here I'm using ES6 just because =)
        this.setState({ text: this.props.text });
      } else {
        // After 6 months I now understand how to return an object from an arrow function thanks to React docs O.o!
        this.setState( prevState => ({ text: prevState.text + '.' }));
      }
    }.bind(this), this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

module.exports = Loading;
