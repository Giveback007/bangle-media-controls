export function decp(x: string) {
    return require("heatshrink").decompress(atob(x));
}

/** Each btn is 59x59 */
export const mediaBtns = {
    frwd: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6I9//746D/n//I6Ex//F4Q6B+H/8I6D/0P/gOBHQXA/+BHQf4h/wBwI6CgA3CAQR/B4AOBHQUA/ALBHQWAh8ABwI6CgHgDQQ6BgEMBwI6DgeADQQ6BgHwCoI6Dn0Av46KgY3CHQf/YYQ6Cn/gTwJ1J4f/w51E//xWAk//wcBWBLrzAAg6HEgqmBBwuABwvgBwqtBADoA="),
    bcwd: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6J/v//Y6En/+v46D4//x46D+H/8I6D/kf/E/HQcD/waBHQXAv+AHQYCBDQI6C/kB/AaBHQUAn0AHQfAg+ADQI6B+EA8AaBD4P8gEYUwI6C4EDwA6DBwN4DQQfB4EPwA6LAQIaBHQX8g/4HQYOB/+BOpfD/+HOof8EQKwE5//z6wLdeQADHQ4kF/ykBFYoOF8AOF/EAADo"),
    mins: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6/HRSOBAAI6DwCtDBIPwAwIaBHQIVDn46C4AGBDQV//AkDHQQkCGAJ1/HX46EEgqmBBwuABwvgBwqtDADYA=="),
    play: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6Qz46F+A6F/xEDHQRTDHQX4E4Y6CRwY6CQ4IKBHQX8SwYhCwEAFAI6DVoI6EWgY6DBwQ6DAwIhCHQQVCHQgoBHRZYCHQh1FK4R1LXQY6CVYY6C87r/HRokFOQIOFwAOFTwIOEWgQAcA=="),
    plus: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6J/ggCHQYKCHQfgBQQ6C/gKDDIWAHQvwBQY6B/wKDHQXABQQvDBQYvBUoILBHQXAA4IlBHQP4AwIlBHQS8Cv46CWYLDCHQP8EgY6CEgV/HRR1zWA7ryAAY6HEgv+gAOFwAOFVoIOEYYQAcA=="),
    pause: decp("nc7gIgdh//AAX+gEDAwf/8EAAwgOBn4OFDggOBgIGE//ACov4g4OFFYokBj4GE/hBF/+Av4GE+A6IFwILCHQUABYguCBYYuCBYguCBYYuCBYgiBBYguCBYY6/HXzryAAg6HEgv+gAOFwAOF8AOF/EAADoA=="),
};

export const box = {
    1: [0,0],
    2: [59,0],
    3: [117,0],
    4: [0,59],
    5: [59,59],
    6: [117,59],
    7: [0,117],
    8: [59,117],
    9: [117,117]
}

export const clr = {
    wht: [1, 1, 1] as rgb,
    blc: [0, 0, 0] as rgb,
    red: [1, 0, 0] as rgb,
    grn: [0, 1, 0] as rgb,
    blu: [0, 0, 1] as rgb,
    ylw: [1, 1, 0] as rgb,
    mgt: [1, 0, 1] as rgb,
    cyn: [0, 1, 1] as rgb,
};

export const theme = g.theme.dark ? {
    "dark": true,

    "bg": clr.blc, // Black background
    "fg": clr.wht, // White foreground
    "fg2": clr.grn, // Blue for secondary elements

    // "bg2": clr.blc, // Black background for secondary elements
    // "fgH": clr.red, // Red for highlights
    // "bgH": clr.blc, // Black background for highlights
    
} : {
    "dark": false,

    "bg": clr.wht, // White background
    "fg": clr.blc, // Black foreground
    "fg2": clr.red, // Green for secondary elements

    // "bg2": clr.wht, // White background for secondary elements
    // "fgH": clr.red, // Red for highlights
    // "bgH": clr.wht, // White background for highlights
};