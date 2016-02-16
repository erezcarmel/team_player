/**
 * Created by robertferentz on 2016-02-16.
 */
'use strict'
let youtube = require('youtube-node');
let yt = new youtube();

yt.setKey('AIzaSyBCioglxSBU3MAgu0XXHT7BLMDcNBMSjqw');
module.exports = {
    parse: function(commandText, callback){
        let textSplit = commandText.split(' ');
        let command = textSplit[0];
        let arg = textSplit[1];
        switch(command){
            case 'add':
                break;
            case 'search':
                yt.search(arg, (err, result) => {
                    if(!err){
                        return callback(null, result);
                    }
                    return callback(err);
                });
                break;
            case 'remove':
                break;
            case 'list':
            default: //list
                break;
        }
    }
};