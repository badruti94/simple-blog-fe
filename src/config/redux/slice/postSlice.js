import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SwalLoading } from "../../../utils/swal-fire"
import { API, getConfig } from "../../api"
import { updateTotalData } from "./paginationSlice"

export const getData = createAsyncThunk(
    'post/getData',
    async ({ page, perPage }, { dispatch }) => {
        const Swal = SwalLoading()
        const config = await getConfig()
        const result = await API.get(`/post/dashboard?page=${page}&perPage=${perPage}`, config)
        Swal.close()
        dispatch(updateTotalData(parseInt(result.data.total_data)))
        return result.data.data
    }
)

const initialState = {
    posts: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.posts = action.payload
        })
    }
})

export default postSlice.reducer