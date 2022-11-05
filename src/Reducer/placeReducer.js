function placeReducer(state, action) {
    switch (action.type) {
        case "add":
            return [...state, action.place]

        case "remove":
            return state.filter(place => place.id !== action.id)

        case "edit":
            return state.map(place => {
                if (place.id === action.id) {
                    return action.editedPlace
                } else {
                    return place
                }
            })

        default:
            return state
    }
}

export default placeReducer

//add -- action.place
//remove -- action.id
//edit -- actiond.id && action.editedPlace