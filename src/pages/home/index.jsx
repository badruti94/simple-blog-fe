import { useEffect, useState } from "react"
import Layout from "../../components/layout"
import { API, getConfig } from "../../config/api"
import { SwalLoading } from '../../utils/swal-fire'
import PostListItem from "../../components/post-list-item"
import { useDispatch, useSelector } from 'react-redux'
import { updatePage, updateTotalData } from "../../config/redux/action"
import PaginationComponent from "../../components/pagination"


const Home = () => {
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const { page, perPage } = useSelector(state => state.paginationReducer)


  const getData = async () => {
    const Swal = SwalLoading()
    const result = await API.get(`/post?page=${page}&perPage=${perPage}`)
    Swal.close()
    setPosts(result.data.data)
    dispatch(updateTotalData(parseInt(result.data.total_data)))

  }

  useEffect(() => {
    dispatch(updatePage(1))
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

export default Home