import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'reactstrap'
import Layout from "../../components/layout"
import PostListItem from "../../components/post-list-item"
import PaginationComponent from "../../components/pagination"
import SearchForm from '../../components/searchForm'
import { updatePage } from "../../config/redux/slice/paginationSlice"
import { getData } from "../../config/redux/slice/homeSlice"


const Home = () => {
  const dispatch = useDispatch()
  const {posts, search} = useSelector(state => state.home)
  const { page, perPage } = useSelector(state => state.pagination)

  useEffect(() => {
    return () => {
      dispatch(updatePage(1))
    }
  }, [])

  useEffect(() => {
    try {
      dispatch(getData({page, perPage, search}))
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

        <SearchForm />
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