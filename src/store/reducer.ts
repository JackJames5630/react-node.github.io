import { SET_THEME_MODE } from "./action"
const initialState: any = {
    themeMode: 0 // darkMode
}

const reducer = (state=initialState, action:any) => {
    switch (action.type) {
        case SET_THEME_MODE: {
            return {
                ...state,
                themeMode: action.payload
            }
        }
        default:
        return state
    }

}

export default reducer