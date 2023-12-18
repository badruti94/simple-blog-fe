import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    totalData: 0,
    perPage: 10,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        updatePage: (state, action) => {
            state.page = action.payload
        },
        updateTotalData: (state, action) => {
            state.totalData = action.payload
        },
    }
})

export const { updatePage, updateTotalData } = paginationSlice.actions

export default paginationSlice.reducer