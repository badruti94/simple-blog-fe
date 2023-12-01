import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'reactstrap'
import Layout from "../../components/layout"
import { API } from "../../config/api"
import { SwalLoading } from '../../utils/swal-fire'
import PostListItem from "../../components/post-list-item"
import { updatePage, updateTotalData } from "../../config/redux/action"
import PaginationComponent from "../../components/pagination"
import SearchForm from '../../components/searchForm'


const Home = () => {
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const { page, perPage } = useSelector(state => state.paginationReducer)

  const getData = async () => {
    const Swal = SwalLoading()
    const result = await API.get(`/post?page=${page}&perPage=${perPage}&search=${search}`)
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
      <Card
        className="mx-auto mb-5"
        style={{ maxWidth: '800px' }}
      >

        <SearchForm
          search={search}
          setSearch={setSearch}
          getData={getData}
        />
      </Card>

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