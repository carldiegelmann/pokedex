export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const colors = ["#A3E4D7", "#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F"];

export const MAX_ITEMS = 900;