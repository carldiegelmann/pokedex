export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

//                      hp         attack     defense   spc-attack  spc-def     speed
export const colors = ["#6cc3d5", "#f3969a", "#56cc9d", "#ff7851", "#C70039", "#ffce67"];

export const MAX_ITEMS = 900;