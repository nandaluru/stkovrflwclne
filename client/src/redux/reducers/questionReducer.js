
const questionReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case "ASK_QUESTION":
            return action.payload
        case "POST_ANSWER":
            return {...state}
        case "GET_ALL_QUESTION":
            return { ...state, data: action.payload }
        default:
            return state;
    }
}
export default questionReducer