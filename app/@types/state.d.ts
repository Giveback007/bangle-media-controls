type State = {
    now: number;
    musicState: MusicState | null;
    playPause: "play" | "pause";
};