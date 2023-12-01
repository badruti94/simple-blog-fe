import { useEffect, useState } from "react"
import { Card, CardBody, Table } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import PaginationComponent from "../../components/pagination"
import Layout from "../../components/layout"
import { SwalLoading } from "../../utils/swal-fire"
import { API, getConfig } from "../../config/api"
import { updatePage, updateTotalData } from "../../config/redux/action"
import PostListItemTable from "../../components/post-list-item-table"

const Post = () => {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const { page, perPage } = useSelector(state => state.paginationReducer)

    const getData = async () => {
        const Swal = SwalLoading()
        const config  = await getConfig()
        const result = await API.get(`/post/dashboard?page=${page}&perPage=${perPage}`, config)
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