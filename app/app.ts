import { getMediaBtns, sendBT, debounce } from "./utils";
import { setState, getState } from "./state";
import { box } from "./data";
import { render } from "./render";

/* NOTES:
    Screen Size: 176x176
    Box Size: 59x59
    Box Numbers: 1-9
*/

// -- APP START -- //
setTimeout(() => {
    Bangle.setLCDBrightness(1);
    Bangle.setLocked(false);
    render();

    // -- Event Handlers -- //
    const debouncedRenderOnTouch = debounce(render, 230);
    Bangle.on('touch', (_btn: 1 | 2, cor: { x: n, y: n }) => {
        console.log(cor)
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
}, 0);



const tapEvHandlers = {
    1: function() {},
    2: function() {},
    4: function() {},
    5: function() {},

   // volume up
   3: () => sendBT({t:"music", n:"volumeup"}),
        
   // volume down
   6: () => sendBT({t:"music", n:"volumedown"}),
   
   // backward
   7: () => sendBT({t:"music", n:"previous"}),

   // play/pause
   8: () => sendBT({t:"music", n: getState().playPause}),

   // forward
   9: () => sendBT({t:"music", n:"next"})
};

// -- GadgetBridge -- //
(global as any).GB = (obj: { t: string, [key: string]: any}) => {
    console.log(obj);
    switch (obj.t) {
        case "musicinfo":
        case "musicstate": {
            if (obj.t === "musicstate") obj.timeOfMsg = Date.now();
            
            const musicState = {...getState().musicState || {}, ...obj as MusicState};
            console.log(musicState);
            // Object.assign(musicState, obj);
            setState({ musicState });
        }
        // case 'weather':
        // case "gps":
        // case "is_gps_active":
            
    }
}