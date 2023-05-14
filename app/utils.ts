import { box, mediaBtns } from "./data"
import { getState } from "./state"

export const setColor = (clr: rgb) => g.setColor(clr[0], clr[1], clr[2]);

export const getMediaBtns = () => ({
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
        8: function () {g.drawImage(mediaBtns[getState().playPause], 59, 117)}, // playPause
        9: function () {g.drawImage(mediaBtns.frwd, 117, 117)}, // frwd
} as { [key in BoxNum]: () => void});


export function debounce(func: Function, wait: number) {
    let timeoutId: number;
    return function() {
      const args = arguments;
      clearTimeout(timeoutId || 0);
      timeoutId = setTimeout(function() {
        // @ts-ignore
        func.apply(this, args);
      }, wait) as any;
    };
}

export function highlightBox(n: BoxNum, w = 59) {
  const bX = box[n][0];
  const bY = box[n][1];

  g.setColor(1,1,0);
  g.drawRect(bX, bY, bX + w, bY + w);
}

export function menu() {
  E.showScroller({
      h : 40,
      c : 8,
      draw : (idx, r) => {
      g.setBgColor((idx&1)?"#666":"#999").clearRect(r.x,r.y,r.x+r.w-1,r.y+r.h-1);
      g.setFont("6x8:2").drawString("Item Number\n"+idx,r.x+10,r.y+4);
      },
      select : (idx) => console.log("You selected ", idx)
  });
}

export function sendBT(obj: any) {
  Bluetooth.println(JSON.stringify(obj));
}

export const formatAudioTime = (timeInSeconds: n) => {
  const h = Math.floor(timeInSeconds / 3600);
  const m = Math.floor((timeInSeconds % 3600) / 60);
  const s = Math.floor(timeInSeconds % 60);

  return `${h ? `${h}:` : ''}${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
}

export function formatTime(msTime: n) {
  const date = new Date(msTime);
  const h = date.getHours();
  const m = date.getMinutes();

  return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
}

export function getAudioTime(data: MusicState, isPlay: boolean) {
  const timeSinceMsg = getState().now - data.timeOfMsg;
  let currentPosition = Math.floor(data.position + (isPlay ? (timeSinceMsg / 1000) + 1 : 0));
  currentPosition = Math.floor(data.dur <= currentPosition ? data.dur : currentPosition);

  // example output: "09:10 | -01:38:58"
  return {
    pos: formatAudioTime(currentPosition),
    dur: '-' + formatAudioTime(data.dur - currentPosition)
  }
}

// export const wait = (ms: n) => new Promise(resolve => setTimeout(resolve, ms));