const Storage = (bagItems) => {
    localStorage.setItem('bag', JSON.stringify(bagItems.length > 0 ? bagItems : []));
}

export const sumItems = bagItems => {
    Storage(bagItems);
    let itemCount = bagItems.reduce((total, product) => total + product.quantity, 0);
    const reducer = (total, product) => total + product.price * product.quantity
    let total = bagItems.reduce(reducer, 0).toFixed(2);
    return {itemCount, total}
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