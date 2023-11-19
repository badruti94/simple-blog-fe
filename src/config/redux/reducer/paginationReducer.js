const initialState = {
    page: 1,
    totalData: 0,
    perPage: 4,
}

const paginationReducer = (state = initialState, action) => {
    if(action.type === 'UPDATE_PAGE'){
        return{
            ...state,
            page: action.payload
        }
    }

    if(action.type === 'UPDATE_TOTAL_DATA'){
        return {
            ...state,
            totalData: action.payload
        }
    }

    return state
}

export default paginationReducer