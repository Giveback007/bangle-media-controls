// /// <reference types="@types/banglejs" />
// -- // -- // TYPES // -- // -- //
/**
 * @typedef {Object} MusicState
 * @property {string} artist - The name of the artist
 * @property {string} album - The name of the album
 * @property {string} track - The name of the track
 * @property {number} dur - The duration of the track in seconds
 * @property {"play"|"pause"} state - The state of the track (play, pause, etc.)
 * @property {number} position - The current position of the track in seconds
 * @property {number} timeOfMsg - The timestamp when the message was sent
 */

// -- // -- // LIB // -- // -- //
const log = console.log;

function decp(x) {
    return require("heatshrink").decompress(atob(x));
}

// function highlightBox(n) {
//     const bX = box[n][0];
//     const bY = box[n][1];
//     const w = 59; // width/height of box

//     g.setColor(1,1,0);
//     g.drawRect(bX, bY, bX + w, bY + w);
// }



function debounce(func, wait) {
    let timeoutId;
    return function() {
      const args = arguments;
      clearTimeout(timeoutId || 0);
      timeoutId = setTimeout(function() {
        func.apply(this, args);
      }, wait);
    };
}


function sendBT(obj) {
    Bluetooth.println(JSON.stringify(obj));
}

const formatAudioTime = (timeInSeconds) => {
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = Math.floor(timeInSeconds % 60);
  
    return `${h ? `${h}:` : ''}${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
}

function formatTime(msTime) {
    const date = new Date(msTime);
    const h = date.getHours();
    const m = date.getMinutes();
  
    return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
}


// -- // -- // DATA // -- // -- //
/** Each btn is 59x59 */
const mediaBtns = {
  frwd: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6I9//746D/n//I6Ex//F4Q6B+H/8I6D/0P/gOBHQXA/+BHQf4h/wBwI6CgA3CAQR/B4AOBHQUA/ALBHQWAh8ABwI6CgHgDQQ6BgEMBwI6DgeADQQ6BgHwCoI6Dn0Av46KgY3CHQf/YYQ6Cn/gTwJ1J4f/w51E//xWAk//wcBWBLrzAAg6HEgqmBBwuABwvgBwqtBADoA="),
  bcwd: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6J/v//Y6En/+v46D4//x46D+H/8I6D/kf/E/HQcD/waBHQXAv+AHQYCBDQI6C/kB/AaBHQUAn0AHQfAg+ADQI6B+EA8AaBD4P8gEYUwI6C4EDwA6DBwN4DQQfB4EPwA6LAQIaBHQX8g/4HQYOB/+BOpfD/+HOof8EQKwE5//z6wLdeQADHQ4kF/ykBFYoOF8AOF/EAADo"),
  mins: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6/HRSOBAAI6DwCtDBIPwAwIaBHQIVDn46C4AGBDQV//AkDHQQkCGAJ1/HX46EEgqmBBwuABwvgBwqtDADYA=="),
  play: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6Qz46F+A6F/xEDHQRTDHQX4E4Y6CRwY6CQ4IKBHQX8SwYhCwEAFAI6DVoI6EWgY6DBwQ6DAwIhCHQQVCHQgoBHRZYCHQh1FK4R1LXQY6CVYY6C87r/HRokFOQIOFwAOFTwIOEWgQAcA=="),
  plus: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6J/ggCHQYKCHQfgBQQ6C/gKDDIWAHQvwBQY6B/wKDHQXABQQvDBQYvBUoILBHQXAA4IlBHQP4AwIlBHQS8Cv46CWYLDCHQP8EgY6CEgV/HRR1zWA7ryAAY6HEgv+gAOFwAOFVoIOEYYQAcA=="),
  pause: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6IFwILCHQUABYguCBYYuCBYguCBYYuCBYgiBBYguCBYY6/HXzryAAg6HEgv+gAOFwAOF8AOF/EAADoA=="),
};

const box = {
    1: [0,0],
    2: [59,0],
    3: [117,0],
    4: [0,59],
    5: [59,59],
    6: [117,59],
    7: [0,117],
    8: [59,117],
    9: [117,117]
}

const clr = {
    wht: [1, 1, 1],
    blc: [0, 0, 0],
    red: [1, 0, 0],
    grn: [0, 1, 0],
    blu: [0, 0, 1],
    ylw: [1, 1, 0],
    mgt: [1, 0, 1],
    cyn: [0, 1, 1]
};

const theme = g.theme.dark ? {
    "fg": clr.wht, // White foreground
    "bg": clr.blc, // Black background
    "fg2": clr.blu, // Blue for secondary elements
    "bg2": clr.blc, // Black background for secondary elements
    "fgH": clr.red, // Red for highlights
    "bgH": clr.blc, // Black background for highlights
    "dark": true
} : {
    "fg": clr.blc, // Black foreground
    "bg": clr.wht, // White background
    "fg2": clr.grn, // Green for secondary elements
    "bg2": clr.wht, // White background for secondary elements
    "fgH": clr.red, // Red for highlights
    "bgH": clr.wht, // White background for highlights
    "dark": false
};

// -- // -- // APP // -- // -- //
/// --- RENDER --- ///
function getMediaBtns() {
    return {
        // Top Left 4 squares
        // g.drawImage(mediaBtns.power, 0, 0);
        // g.drawImage(mediaBtns.power, 59, 0);
        // g.drawImage(mediaBtns.power, 0, 59);
        // g.drawImage(mediaBtns.power, 59, 59);

        // Volume: [+ | -]
        3: function () {g.drawImage(mediaBtns.plus, 117, 0)}, // volUp
        6: function () {g.drawImage(mediaBtns.mins, 117, 59)}, // volDn

        // Media: [<< | > | >>]
        7: function () {g.drawImage(mediaBtns.bcwd, 0, 117)}, // back
        8: function () {g.drawImage(mediaBtns[state.playBtn], 59, 117)}, // playPause
        9: function () {g.drawImage(mediaBtns.frwd, 117, 117)}, // frwd
    }
}

function render() {
    g.clear();
    g.setColor(1,1,1);
    
    const btns = getMediaBtns();
    for (let key in btns) btns[key]();

    if (state.musicState) {
        // Display the current time
        g.drawString(formatTime(state.now), 20, 20);

        // Display the artist
        g.drawString(state.musicState.artist, 20, 40);

        // Calculate the current position in the track
        const timeSinceMsg = state.now - state.musicState.dateOfMsg;
        const currentPosition = state.musicState.position + timeSinceMsg / 1000;

        // Display track duration vs current time, example output: "09:10 / -01:38:58"
        g.drawString(`${formatAudioTime(currentPosition)} / -${formatAudioTime(state.musicState.dur - currentPosition)}`, 20, 80);
    }
}

/// --- TOUCH EVENT --- ///
const debouncedRenderOnTouch = debounce(render, 230);
Bangle.on('touch', function(btn, cor) {
    render();
    const x = cor.x;
    const y = cor.y;
    for (let i = 1; i < 10; i++) {
        if (!tapEvHandlers[i]) continue;
        const bX = box[i][0];
        const bY = box[i][1];
        if (x >= bX && x < bX + 59 && y >= bY && y < bY + 59) {
            g.setColor(0,1,0);
            getMediaBtns()[i]();
            //highlightBox(i);
            tapEvHandlers[i]();
            debouncedRenderOnTouch();
            return;
        }
    }
});

const tapEvHandlers = {
    // 1: function() {},
    // 2: function() {},
    3: function() {
        // volume up
        sendBT({t:"music", n:"volumeup"})
    },
    // 4: function() {},
    // 5: function() {},
    6: function() {
        // volume down
        sendBT({t:"music", n:"volumedown"})
    },
    7: function() {
        // backward
        sendBT({t:"music", n:"previous"})
    },
    8: function() {
        // play/pause
        sendBT({t:"music", n: state.playBtn})
    },
    9: function() {
        // forward
        sendBT({t:"music", n:"next"})
    }
};

/// --- Gadgetbridge --- //

/*
const mInfo = {
    "t": "musicinfo",
    "artist": "Trash Taste Podcast",
    "album": "Trash Taste Podcast",
    "track": "The BOIS go to HAWAII | Trash Taste #147",
    "dur": 7128
}
const mState = {
    "t": "musicstate",
    "state": "pause",
    "position": 550
    // generate timeOfMsg: Date.now()
}
*/

function GB(obj) {
    switch (obj.t) {
        case "musicinfo":
        case "musicstate": {
            if (obj.t === "musicstate") obj.timeOfMsg = Date.now();
            setState({musicState: Object.assign(state.musicState || {}, obj)});
        }
        // case 'weather':
        // case "gps":
        // case "is_gps_active":
            
    }
}

// -- // -- // STATE // -- // -- //
let state = {
    now: Date.now(),
    /** @type {MusicState|null} */
    musicState: null,
    /** @type {"play"|"pause"} */
    playBtn: "play",
}

const debouncedRenderOnState = debounce(render, 200);
function setState(stateUpdate) {
    const s = Object.assign(state, stateUpdate);
    s.playBtn =
        s.musicState && s.musicState.state === 'play' ? 'pause' : 'play';
    
    debouncedRenderOnState();
}

// -- // -- // BOOTSTRAP // -- // -- //
(function start() {
    render();
    // sendBT({t:"gps_power", status: true});
})();

// set background color black
g.setColor(0,0,0);
