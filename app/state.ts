import { render } from "./render";

let state: State = {
    now: Date.now(),
    musicState: null,
    playPause: "play",
};

export let setState: (stateUpdate: Partial<State>) => void;
export const getState = () => state;

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

const debouncedRenderOnState = debounce(render, 200);
// const debLogState = debounce(() => console.log({state}), 200);
setState = (stateUpdate: Partial<State>) => {
    const s = {...state, ...stateUpdate};
    s.playPause =
        s.musicState && s.musicState.state === 'play' ? 'pause' : 'play';
    
    state = s;
    debouncedRenderOnState();
    // debLogState();
}