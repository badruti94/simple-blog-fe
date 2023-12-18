import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SwalLoading } from "../../../utils/swal-fire"
import { API } from "../../api"
import { updateTotalData } from "./paginationSlice"

export const getData = createAsyncThunk(
    'home/getData',
    async ({ page, perPage, search }, { dispatch }) => {
        const Swal = SwalLoading()
        const result = await API.get(`/post?page=${page}&perPage=${perPage}&search=${search}`)
        Swal.close()
        dispatch(updateTotalData(parseInt(result.data.total_data)))
        return result.data.data
    }

)

const initialState = {
    posts: [],
    search: '',
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.posts = action.payload
        })
    }
})

export const { setSearch } = homeSlice.actions

export default homeSlice.reducer