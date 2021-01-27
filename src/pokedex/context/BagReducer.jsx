const Storage = (bagItems) => {
    localStorage.setItem('bag', JSON.stringify(bagItems.length > 0 ? bagItems : []));
}

export const sumItems = bagItems => {
    Storage(bagItems);
    let itemCount = bagItems.reduce((total, pokemon) => total + pokemon.quantity, 0);
    return {itemCount}
}

export const BagReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (!state.bagItems.find(item => item.id === action.payload.id)) {
                state.bagItems.push({
                    ...action.payload,
                    quantity: 1
                })
            }

            return {
                ...state,
                ...sumItems(state.bagItems),
                bagItems: [...state.bagItems]
            }
        case "REMOVE_ITEM":
            return {
                ...state,
                ...sumItems(state.bagItems.filter(item => item.id !== action.payload.id)),
                bagItems: [...state.bagItems.filter(item => item.id !== action.payload.id)]
            }
        case "CLEAR":
            return {
                bagItems: [],
                ...sumItems([]),
            }
        default:
            return state

    }
}