function render() {
    const s = getState();
    const { fg } = theme;
    g.clear();
    setColor(fg);
    
    const btns = getMediaBtns();
    for (let key in btns) (btns as any)[key]();

    if (s.musicState?.timeOfMsg) {
        const { pos, dur } = getAudioTime(s.musicState, s.musicState?.state === 'play');
        
        g.setFont("6x8", 2);
        const startPosDur = (120 - g.stringWidth(dur)) / 2;
        g.drawString(dur, startPosDur, 98);

        const startPosPos = (120 - g.stringWidth(pos)) / 2;
        g.drawString(pos, startPosPos, 78);

        // g.setFont("6x8", 1.5);
        g.setFont("Vector", 15);
        const { artist, track } = s.musicState;

        const maxWidth = g.getWidth() * 2 / 3; // Two thirds of the screen width
    
        let trackLines = g.wrapString(track, maxWidth);
        let artistLines = g.wrapString(artist, maxWidth);
    
        // If the track name is too long, cut it off and add an ellipsis
        if (trackLines.length > 2) {
          trackLines = [trackLines[0], trackLines[1] + '...'];
        }
    
        // If the artist name is too long, cut it off and add an ellipsis
        if (artistLines.length > 2) {
          artistLines = [artistLines[0] + '...'];
        }
    
        const lines = trackLines.concat([''], artistLines);
    
        let y = 0;
        for (let line of lines) {
            g.drawString(line, 0, y);
            y += g.getFontHeight();
        }
    }
    g.flip();
}