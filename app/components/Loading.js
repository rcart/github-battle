const React =  require('react');
const PropTypes = require('prop-types');

const styles = {
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
    const { speed } = this.props;
    let { text } = this.state;
    let stopper = `${text}...`;
    // Interval is a property created so we can remove it once the component unmounts
    this.interval = window.setInterval(() => {
      // Update text in order to reach the ${text}... stopper point and restart the dots.
      text = this.state.text;
      if (text === stopper) {
        // Here I'm using ES6 just because =)
        this.setState({ text: this.props.text });
      } else {
        // After 6 months I now understand how to return an object from an arrow function thanks to React docs O.o!
        this.setState( prevState => ({ text: prevState.text + '.' }));
      }
    }, speed);
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
