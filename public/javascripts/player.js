//    after the API code downloads.
export let TeamPlayer = {
  player: {},
  onTrackEnded: onTrackEnded
}
var onTrackEndedCallback;
function onTrackEnded(callback) {
  onTrackEndedCallback = callback;
}
// 3. This function creates an <iframe> (and YouTube player)

// export player;
function onYouTubeIframeAPIReady() {
  TeamPlayer.player = new YT.Player('player', {
    height: '390',
    width: '640',
    autoPlay: true,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  var state = event.data;
  if (state === YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }

  if (state === YT.PlayerState.ENDED) {
    onTrackEndedCallback();
  }
}

function stopVideo() {
  // TeamPlayer.player.stopVideo();
}

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  })
}

init();