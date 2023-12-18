import paginationReducer from "./paginationSlice"
import homeReducer from "./homeSlice"
import postReducer from "./postSlice"

const reducer = {
    pagination: paginationReducer,
    home: homeReducer,
    post: postReducer,
}

export default reducer