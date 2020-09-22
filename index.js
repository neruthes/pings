#!/bin/node

const request = require('request');

const givenDomain = process.argv[2];
const givenLimit = isNaN(parseInt(process.argv[3])) ? undefined : parseInt(process.argv[3]);

if (!givenDomain.match(/^[-\w\.]+$/i)) {
    console.log(givenDomain);
    console.error(`Bad domain name. The domain name must be a domain name.`)
    process.exit(1);
};

// ------------------------------------------------------------------

const leftpad = function (str, len) {
    if (str.length === len) {
        return str;
    } else {
        return (new Array(len - str.length)).fill(' ').join('') + str;
    };
};
const rightpad = function (str, len) {
    if (str.length === len) {
        return str;
    } else {
        return str + (new Array(len - str.length)).fill(' ').join('');
    };
};

const pingHttps = function(limit) {
    let totalTimes = -1;
    const myPingData = [];
    const analyzeData = function (inputDataArr) {
        var roundTripTimeArr = inputDataArr.map(x => x.end - x.begin);
        var avgRoundTripTime = roundTripTimeArr.reduce((a, b) => a + b) / roundTripTimeArr.length;
        console.log(`Tested ${roundTripTimeArr.length} times. Average round trip time: ${(Math.round(avgRoundTripTime*10)/10)} ms.`);
    };
    const microPing = function (limit) {
        totalTimes += 1;
        var currentSeq = totalTimes + 0;
        request(`https://${givenDomain}/?t=` + Date.now(), (function (currentSeq) {
            return function () {
                myPingData[currentSeq].end = Date.now();
                console.log(`#${rightpad(currentSeq.toString(), 4)} ${leftpad((myPingData[currentSeq].end - myPingData[currentSeq].begin).toString(), 7)} ms`);
                if (totalTimes < limit - 1) {
                    setTimeout(function () {
                        microPing(limit);
                    }, 900);
                } else {
                    analyzeData(myPingData);
                };
            };
        })(currentSeq));
        myPingData[currentSeq] = {
            begin: Date.now()
        };
    };
    microPing(limit);
};

pingHttps(givenLimit || 4);
