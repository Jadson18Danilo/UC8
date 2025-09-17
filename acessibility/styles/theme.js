

export const light = {
    background: "#fff",
    text: "#1a1a1a",
    primary: "#0A84FF",
    card: "#dde3ea",
    border:"#CCC",
    danger: "#ff0000",
    
}

export const highContrast = {
    background: "#ff4f00",
    text: "#1a1a1a",
    primary: "#0AFF",
    card: "#dde35a",
    border:"#C44",
    danger: "#ff0"
    
}

/**
 * @param {boolean} isHigh
 * @returns {object}
 */

export const makeTheme = (isHigh) => (isHigh ? highContrast : light)