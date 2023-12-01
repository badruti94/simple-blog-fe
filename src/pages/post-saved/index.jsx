import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../../components/layout"
import { API, getConfig } from "../../config/api"
import { SwalLoading } from '../../utils/swal-fire'
import PostListItem from "../../components/post-list-item"
import { updatePage, updateTotalData } from "../../config/redux/action"
import PaginationComponent from "../../components/pagination"

const PostSaved = () => {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const { page, perPage } = useSelector(state => state.paginationReducer)

    const getData = async () => {
        const Swal = SwalLoading()
        const config = await getConfig()
        const result = await API.get(`/post/save?page=${page}&perPage=${perPage}`, config)
        Swal.close()
        setPosts(result.data.data)
        dispatch(updateTotalData(parseInt(result.data.total_data)))
    }

    useEffect(() => {
        return () => {
            dispatch(updatePage(1))
        }
    }, [])

    useEffect(() => {
        try {
            getData()
        } catch (error) {
            console.log(error);
        }
    }, [page])
    return (
        <Layout>
            {
                posts
                &&
                posts.map(order =>
                    <PostListItem
                        key={order.id}
                        data={order}
                    />)
            }
            <PaginationComponent />
        </Layout>
    )
}

export default PostSaved