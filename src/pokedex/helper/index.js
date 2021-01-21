export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const colors = ["#fe4a49", "#8ECB9B", "#fe4a49", "#fe4a49", "#fe4a49", "#fe4a49"];

export const MAX_ITEMS = 900;