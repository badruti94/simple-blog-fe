import { useEffect} from "react"
import { Card, CardBody, Table } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import PaginationComponent from "../../components/pagination"
import Layout from "../../components/layout"
import PostListItemTable from "../../components/post-list-item-table"
import { updatePage } from "../../config/redux/slice/paginationSlice"
import { getData } from "../../config/redux/slice/postSlice"

const Post = () => {
    const dispatch = useDispatch()
    const {posts} = useSelector(state => state.post)
    const { page, perPage } = useSelector(state => state.pagination)

    useEffect(() => {
        return () => {
            dispatch(updatePage(1))
        }
    }, [])

    useEffect(() => {
        try {
            dispatch(getData({page, perPage}))
        } catch (error) {
            console.log(error);
        }
    }, [page])

    return (
        <Layout>
            <Card
                className="mx-auto"
                style={{ maxWidth: '50rem' }}
            >
                <CardBody
                >
                    <Table
                    >
                        <thead>
                            <tr>
                                <th>
                                    Title
                                </th>
                                <th>
                                    View
                                </th>
                                <th width='120'>
                                    Date
                                </th>
                                <th className="text-center" width="200">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts
                                &&
                                posts.map(job => <PostListItemTable
                                    key={job.id}
                                    data={job}
                                    getData={getData}
                                />)
                            }
                        </tbody>
                    </Table>
                    <PaginationComponent />
                </CardBody>
            </Card>
        </Layout>
    )
}

export default Post