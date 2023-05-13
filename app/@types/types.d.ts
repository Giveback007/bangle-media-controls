type n = number;
type s = string;
type n_s = n | s;

type rgb = [n_s, n_s, n_s];

type BoxNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type MusicState = {
    t: "musicstate" | "musicinfo";
    artist: string;
    album: string;
    track: string;
    dur: number;
    c: number;
    n: number;
    state: "play" | "pause";
    position: number;
    timeOfMsg: number;
}
