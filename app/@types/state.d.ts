type State = {
    now: number;
    musicState: MusicState | null;
    /** State of the play/pause button */
    playPause: "play" | "pause";
};