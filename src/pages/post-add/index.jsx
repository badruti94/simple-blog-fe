import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import Layout from "../../components/layout"
import { useEffect, useState } from "react"
import { API, getConfig } from "../../config/api"
import { useNavigate, useParams } from "react-router-dom"
import { SwalLoading, SwalFire } from '../../utils/swal-fire'

const PostAdd = () => {
    const navigate = useNavigate()

    
    const [post, setPost] = useState({
        title: '',
        body: '',
    })
    const [isEdit, setIsEdit] = useState(false)
    const params = useParams()

    useEffect(() => {
        const getData = async () => {
            const Swal = SwalLoading()

            const result = await API.get('/post/' + id)
            Swal.close()

            setPost(result.data.data)
        }
        const { id } = params
        if (id) {
            setIsEdit(true)
            getData()
        }
    }, [])

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        const Swal = SwalLoading()
        try {
            e.preventDefault()

            const formData = new FormData()
            formData.append('title', post.title)
            formData.append('body', post.body)

            const config = await getConfig()

            let result;
            if (isEdit) {
                result = await API.put('/post/' + params.id, formData, config)
            } else {
                result = await API.post('/post', formData, config)
            }
            Swal.close()
            navigate('/post')

        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
            console.log(error);
        }
    }

    return (
        <Layout>
            <Card
                className="mx-auto"
                style={{ width: '50rem' }}
            >
                <CardBody
                >
                    <p className="text-center pb-4 fs-3 fw-bold"
                    >{isEdit ? 'Edit' : 'Create'} Post</p>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                value={post.title}
                                onChange={handleChange}
                                placeholder="Title"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                id="body"
                                name="body"
                                value={post.body}
                                onChange={handleChange}
                                placeholder="Body"
                                type="textarea"
                                style={{height: 300}}
                            />
                        </FormGroup>
                        <Button color="primary">
                            Submit
                        </Button>
                    </Form>
                </CardBody>
            </Card>

        </Layout>
    )
}

export default PostAdd