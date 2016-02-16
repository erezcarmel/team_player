var React = require('react');
var request = require('request');

let Playlist = React.createClass({
	getInitialState: function() {
	    return {
	    	selected: this.props.selected,
	    	tracks: []
	    };
	},

	selectTrack(track) {
		this.setState({
			selected: track.id.videoId
		});
		setTimeout(() => {
			this.playVideo(track.id.videoId);
		}, 2000);
	},

	componentDidMount() {
		this.props.player.onTrackEnded(() => {
			const selectedId = this.state.selected;
			const currentIndex = this.state.tracks.findIndex((el, index) => {
				return el.id.videoId === selectedId;
			});
			const nextIndex = currentIndex + 1;
			const nextId = nextIndex === this.state.tracks.length ?
				this.state.tracks[0].id.videoId :
				this.state.tracks[nextIndex].id.videoId;
			this.setState({ selected: nextId });
			this.playVideo(nextId)
		});
		const interval = 10 * 1000;
		setInterval(this.poll, interval);
		this.poll();
	},

	playVideo(videoId) {
		if (!this.props.player || !this.props.player.player.loadVideoById) {
			return;
		}
		this.props.player.player.loadVideoById(videoId);
		this.props.player.player.playVideo();
	},

	poll() {
		request(location.origin + '/videos', (error, response, body) => {
		  if (!error && response.statusCode == 200) {
		    var tracks = JSON.parse(body);
		    this.setState({
		    	tracks: tracks
		   	})
		   	let isPlaying = this.props.player.player.getCurrentTime();
		   	let track = this.state.tracks[0];
		   	let currentPlaying = this.props.player.player.getVideoData();
			if (!currentPlaying || !currentPlaying.video_id && this.state.tracks.length){
				this.selectTrack(track);
			}
		  }
		})
	},

	render() {
		let selected = this.state.selected;
		var tracks = this.state.tracks.map((track, index) => {
			const trackId = track.id.videoId;
			const isActive = trackId === selected;
			const style = 'track' + ( isActive ? ' active' : '');
			return (
				<div key={ track.etag } className={ style } onClick={ this.selectTrack.bind(this, track) }>
					{ index + 1 }.
					<img src={ track.snippet.thumbnails.default.url } />
					{ track.snippet.title }
				</div>
			);
		});
		// setTimeout(() => {
		// 	this.playVideo(selected);
		// }, 2000);
		// setTimeout(() => {
		// 	let isPlaying = this.props.player.player.getCurrentTime();
		// 	if (isPlaying){
		// 		this.playVideo()
		// 	}
		// }, 2000);

		return (
			<div>{ tracks }</div>
		);
	}

})

module.exports = Playlist;