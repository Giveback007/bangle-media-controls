
let musicData = {
    "t": "musicinfo",
    "artist": "Trash Taste Podcast",
    "album": "Trash Taste Podcast",
    "track": "The BOIS go to HAWAII | Trash Taste #147",
    "dur": 7128, "c": -1, "n": -1,
    "state": "pause",
    "position": 550, "shuffle": 1, "repeat": 1,
    "dateOfMsg": Date.now()
}
  
const formatAudioTime = (timeInSeconds) => {
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = Math.floor(timeInSeconds % 60);

    return `${h ? `${h}:` : ''}${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
}
  
let i = 0;
function test() {
    const timeSinceMsg = Date.now()- musicData.dateOfMsg;
    const currentPosition = musicData.position + timeSinceMsg / 1000;
    
    const output = `${formatAudioTime(currentPosition)} / -${formatAudioTime(musicData.dur - currentPosition)}`;
    console.log(i++, output); // example output: "00:09:10 | -01:38:58"
}

test();
setInterval(test, 1000);
  