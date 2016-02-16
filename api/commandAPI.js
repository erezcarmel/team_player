/**
 * Created by robertferentz on 2016-02-16.
 */
'use strict'
let youtube = require('youtube-node');
let yt      = new youtube();
// let playlist = [];
const videoList = require('../modules/data-model-video')
yt.setKey('AIzaSyC9dM7fWaqzc9wBU82XA5f61DAdTiQuric');
yt.addParam('type', 'video');

function parseResultItem(item) {
    return {
        title       : item.snippet.title,
        title_link  : 'http://www.youtube.com/watch?v=' + item.id.videoId,
        color       : '#663333',
        thumb_url   : item.snippet.thumbnails.default.url,
        text        : '*id*: ' + item._id,
        "mrkdwn_in" : ['text', 'pretext']
    }
}

function parseYoutubeResults(results) {
    let items = results.items;
    return {
        text        : '*Search results*:',
        attachments : items
            .filter(item => {
                return item.id.kind == 'youtube#video';
            })
            .map(parseResultItem)
    };
}

module.exports = {
    handleCommand : function (commandText) {
        return new Promise((resolve, reject) => {
            let textSplit = commandText.split(' ');
            let command   = textSplit[0];
            let arg       = textSplit.slice(1).join(' ');
            switch (command) {
                case 'add':

                    yt.search(arg, 1/*results per page*/, (err, result) => {
                        if (!err) {
                            let items = result.items.filter(item => {
                                return item.id.kind == 'youtube#video';
                            });
                            if (items && items.length) {
                                // playlist.push(items[0]);
                                return videoList.add(items[0]).then(result =>
                                    resolve({ text : items[0].snippet.title + ' added to playlist' })
                                )
                            }
                            return resolve({ text : 'No video found.' });

                        }
                        return reject(err);
                    });
                    break;
                case 'search':
                    yt.search(arg, 5/*results per page*/, (err, result) => {
                        if (!err) {
                            return resolve(parseYoutubeResults(result));
                        }
                        return reject(err);
                    });
                    break;
                case 'remove':
                    return videoList.remove(arg).then(resolve, reject);
                    break;
                case '?':
                case 'help':
                    resolve({
                        text : `*/player command options:*
_/player list:_ Show the current playlist. The list parameter is optional.
_/player add [video title]:_ Search and add the first video to the playlist.
_/player search [query]:_ Search and show the first 5 videos åto match.
_/player remove [id]:_ Remove a video from the playlist.
_/player ?|help:_ Show this helpful list.`
                    });
                    break;
                case 'list':
                default: //list
                    attachments:videoList.getAll()
                        .then(results =>
                            resolve({ text : '*The playlist*:', attachments : results.map(parseResultItem) }));
                    break;
            }
        });

    }
};
/*
 {
 "kind"
 :
 "youtube#searchListResponse", "etag"
 :
 "\"DsOZ7qVJA4mxdTxZeNzis6uE6ck/alqqFf1heRyw5sV_tODKZI8GPqs\"", "nextPageToken"
 :
 "CAIQAA", "regionCode"
 :
 "IL", "pageInfo"
 :
 {
 "totalResults"
 :
 1000000, "resultsPerPage"
 :
 2
 }
 ,
 "items"
 :
 [{
 "kind"    : "youtube#searchResult",
 "etag"    : "\"DsOZ7qVJA4mxdTxZeNzis6uE6ck/D3HfmX-Vdkdb8X_y1xdxqEu2rNY\"",
 "id"      : { "kind" : "youtube#video", "videoId" : "u9Dg-g7t2l4" },
 "snippet" : {
 "publishedAt"          : "2015-12-08T15:28:55.000Z",
 "channelId"            : "UCveWMJeHgcIUPMnFzd7Vxjg",
 "title"                : "Disturbed - The Sound Of Silence [Official Music Video]",
 "description"          : "Download the song now: http://smarturl.it/immortalized?IQid=sosvideo Directed by Matt Mahurin http://www.mattmahurin.com New Album \"Immortalized\" Out ...",
 "thumbnails"           : {
 "default" : { "url" : "https://i.ytimg.com/vi/u9Dg-g7t2l4/default.jpg", "width" : 120, "height" : 90 },
 "medium"  : { "url" : "https://i.ytimg.com/vi/u9Dg-g7t2l4/mqdefault.jpg", "width" : 320, "height" : 180 },
 "high"    : { "url" : "https://i.ytimg.com/vi/u9Dg-g7t2l4/hqdefault.jpg", "width" : 480, "height" : 360 }
 },
 "channelTitle"         : "DisturbedTV",
 "liveBroadcastContent" : "none"
 }
 }, {
 "kind"    : "youtube#searchResult",
 "etag"    : "\"DsOZ7qVJA4mxdTxZeNzis6uE6ck/tTq-HOr88A8iYVmaTRdNND_F8fg\"",
 "id"      : { "kind" : "youtube#video", "videoId" : "4zLfCnGVeL4" },
 "snippet" : {
 "publishedAt"          : "2009-12-22T17:58:21.000Z",
 "channelId"            : "UCJroIFEDtwiJOiUQZEpng0A",
 "title"                : "The Sound of Silence (Original Version from 1964)",
 "description"          : "Lyrics: Hello darkness, my old friend I've come to talk with you again Because a vision softly creeping Left its seeds while I was sleeping And the vision that was ...",
 "thumbnails"           : {
 "default" : { "url" : "https://i.ytimg.com/vi/4zLfCnGVeL4/default.jpg", "width" : 120, "height" : 90 },
 "medium"  : { "url" : "https://i.ytimg.com/vi/4zLfCnGVeL4/mqdefault.jpg", "width" : 320, "height" : 180 },
 "high"    : { "url" : "https://i.ytimg.com/vi/4zLfCnGVeL4/hqdefault.jpg", "width" : 480, "height" : 360 }
 },
 "channelTitle"         : "reptileman117",
 "liveBroadcastContent" : "none"
 }
 }]
 }
 */
