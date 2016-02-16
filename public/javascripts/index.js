
var React = require('react')
var ReactDOM = require('react-dom');

var Playlist = require('./playlist.view');

var Player = require('./player');
require('./socket.io.client')

// var playlist = require('./youtube-medias.js');
let playlist = [];
var onPlay = (track) => {
	// Player.TeamPlayer.player.loadVideoById(track.id.videoId);
 //    Player.TeamPlayer.player.playVideo();
}
let selectedTrackId = '';

ReactDOM.render(
	<Playlist
		tracks={ playlist }
		onPlay={ onPlay }
		selected={ selectedTrackId }
		player={ Player.TeamPlayer }
	/>,
	document.querySelector('#playlist')
);
