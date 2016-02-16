/**
 * Created by robertferentz on 2016-02-16.
 */
'use strict'
let youtube = require('youtube-node');
let yt = new youtube();

yt.setKey('AIzaSyC9dM7fWaqzc9wBU82XA5f61DAdTiQuric');
module.exports = {
    handleCommand: function(commandText){
        return new Promise((resolve, reject) => {
            let textSplit = commandText.split(' ');
            let command = textSplit[0];
            let arg = textSplit.slice(1).join(' ');
            switch(command){
                case 'add':
                    reject('Not handled yet');
                    break;
                case 'search':
                    yt.search(arg, 2, (err, result) => {
                        if(!err){
                            return resolve(result);
                        }
                        return reject(err);
                    });
                    break;
                case 'remove':
                    reject('Not handled yet');
                    break;
                case 'list':
                default: //list
                    reject('Not handled yet');
                    break;
            }
        });

    }
};