var React = require('react');

let Playlist = React.createClass({
	getInitialState: function() {
	    return { selected: this.props.selected };
	},

	selectTrack(track) {
		this.setState({ selected: track.id.videoId });
		this.props.onPlay(track);
	},

	componentDidMount() {
		this.props.player.onTrackEnded(() => {
			const selectedId = this.state.selected;
			const currentIndex = this.props.tracks.findIndex((el, index) => {
				return el.id.videoId === selectedId;
			});
			const nextIndex = currentIndex + 1;
			const nextId = nextIndex === this.props.tracks.length ?
				this.props.tracks[0].id.videoId :
				this.props.tracks[nextIndex].id.videoId;
			this.setState({ selected: nextId });
			this.playVideo(nextId)
		})
	},

	playVideo(videoId) {
		if (!this.props.player || !this.props.player.player.loadVideoById) {
			return;
		}
		this.props.player.player.loadVideoById(videoId);
		this.props.player.player.playVideo();
	},

	render() {
		let selected = this.state.selected;
		var tracks = this.props.tracks.map((track, index) => {
			const trackId = track.id.videoId;
			const isActive = trackId === selected;
			const style = 'track' + ( isActive ? ' active' : '');
			return (
				<div className={ style } onClick={ this.selectTrack.bind(this, track) }>
					{ index + 1 }.
					<img src={ track.snippet.thumbnails.default.url } />
					{ track.snippet.title }
				</div>
			);
		});
		setTimeout(() => {
			this.playVideo(selected);
		}, 2000);

		return (
			<div>{ tracks }</div>
		);
	}

})

module.exports = Playlist;