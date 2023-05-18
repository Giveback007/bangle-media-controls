import "./data.ts";
import "./utils.ts";
import "./render.ts";
import "./state.ts";

/* NOTES:
    Screen Size: 176x176
    Box Size: 59x59
    Box Numbers: 1-9
*/

// console.log('stuff')

// -- APP START -- //
setTimeout(() => {
    Bangle.setLCDBrightness(1);
    Bangle.setLocked(false);
    render();

    // -- Event Handlers -- //
    const debouncedRenderOnTouch = debounce(render, 230);
    Bangle.on('touch', (_btn: 1 | 2, cor: { x: n, y: n }) => {
        render();
        const x = cor.x;
        const y = cor.y;
        for (let i = 1; i < 10; i++) {
            const bN = i as BoxNum;
            if (!(tapEvHandlers as any)[i]) continue;
            const bX = (box as any)[bN][0];
            const bY = (box as any)[bN][1];
            if (x >= bX && x < bX + 59 && y >= bY && y < bY + 59) {
                g.setColor(0,1,0);
                getMediaBtns()[bN]();
                //highlightBox(i);
                tapEvHandlers[bN]();
                debouncedRenderOnTouch();
                return;
            }
        }
    });

    function timer() {
        setState({ now: Date.now() })
        setTimeout(timer, 1000);
    };

    timer();
}, 0);


/**
 * I don't understand why but the console.log's have to
 * be in this order for the app to send the message consistently.
 */
const tapEvHandlers = {
    1: function() {},
    2: function() {},
    4: function() {},
    5: function() {},

    // volume up
    3: () => {
        console.log('volume up');
        sendBT({t:"music", n:"volumeup"})
    },
            
    // volume down
    6: () => {
        console.log('volume down');
        sendBT({t:"music", n:"volumedown"})
    },
    
    // backward
    7: () => {
        console.log('previous');
        sendBT({t:"music", n:"previous"})
        tigerMusicStateMsg();
    },

    // play/pause
    8: (playPause = getState().playPause) => {
        console.log('play/pause');
        sendBT({t:"music", n: playPause});
    },

    // forward
    9: () => {
        console.log('next');
        sendBT({t:"music", n:"next"});
        tigerMusicStateMsg();
    },
};

// GadgetBride does not always send the musicstate message
// to the app. This function toggle play/pause twice to
// trigger the musicstate message.
function tigerMusicStateMsg() {
    const try1 = getState().playPause;
    const try2 = try1 === "play" ? "pause" : "play";

    setTimeout(() => tapEvHandlers[8](try1), 0);
    setTimeout(() => tapEvHandlers[8](try2), 100);
}

// -- GadgetBridge -- //
(global as any).GB = (obj: { t: string, [key: string]: any}) => {
    // if (obj.t === "musicinfo" || obj.t === 'musicstate') console.log(obj);
    switch (obj.t) {
        case "musicinfo":
        case "musicstate": {
            if (obj.t === "musicstate") obj.timeOfMsg = Date.now();
            console.log(obj);
            
            const musicState = {...getState().musicState || {}, ...obj as MusicState};
            setState({ musicState });
        }
        // case 'weather':
        // case "gps":
        // case "is_gps_active":
            
    }
}

