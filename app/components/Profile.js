var React = require('react');
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview');

function Profile(props) {
  var info = props.info;
  console.log(info);
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className="space-list-items">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

module.exports = Profile;
