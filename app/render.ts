import { theme } from "./data";
import { getMediaBtns, setColor } from "./utils";

export function render() {
    const { fg } = theme;
    g.clear();
    setColor(fg);
    
    const btns = getMediaBtns();
    for (let key in btns) (btns as any)[key]();

    // if (state.musicState) {
    //     // Display the current time
    //     g.drawString(formatTime(state.now), 20, 20);

    //     // Display the artist
    //     g.drawString(state.musicState.artist, 20, 40);

    //     // Calculate the current position in the track
    //     const timeSinceMsg = state.now - state.musicState.dateOfMsg;
    //     const currentPosition = state.musicState.position + timeSinceMsg / 1000;

    //     // Display track duration vs current time, example output: "09:10 / -01:38:58"
    //     g.drawString(`${formatAudioTime(currentPosition)} / -${formatAudioTime(state.musicState.dur - currentPosition)}`, 20, 80);
    // }
}