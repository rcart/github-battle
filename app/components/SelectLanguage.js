const React = require('react');
const PropTypes = require('prop-types');

function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(function(lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
            key={lang}
            onClick={props.updateLanguage.bind(null, lang)}>
            {lang}
          </li>
        );
      })}
    </ul>
  )
}
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}

module.exports = SelectLanguage
