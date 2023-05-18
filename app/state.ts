let state: State = {
    now: Date.now(),
    musicState: null,
    playPause: "pause",
};

let setState: (stateUpdate: Partial<State>) => void;
const getState = () => state;

const debouncedRenderOnState = debounce(render, 200);
// const debLogState = debounce(() => console.log({state}), 200);
setState = (stateUpdate: Partial<State>) => {
    const s = {...state, ...stateUpdate};

    const mS = stateUpdate.musicState;
    if (mS) s.playPause = mS.state === 'play' ? 'pause' : 'play';
    
    state = s;
    debouncedRenderOnState();
    // debLogState();
}
