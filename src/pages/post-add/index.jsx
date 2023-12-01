import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import Layout from "../../components/layout"
import { API, getConfig } from "../../config/api"
import { SwalLoading, SwalFire } from '../../utils/swal-fire'

const PostAdd = () => {
    const navigate = useNavigate()


    const [post, setPost] = useState({
        title: '',
        body: '',
        publish: true,
    })
    const [saveDraftButtonDisplay, setSaveDraftButtonDisplay] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const params = useParams()

    useEffect(() => {
        const getData = async () => {
            const Swal = SwalLoading()

            const result = await API.get(`/post/${id}/edit`)
            Swal.close()

            setPost(result.data.data)
            if (result.data.data.publish) {
                setSaveDraftButtonDisplay('d-none')
            }
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

    const handlePublish = async (e) => {
        e.preventDefault()

        handleSubmit({ ...post, publish: true })
    }
    const handleSaveDraft = async (e) => {
        e.preventDefault()

        handleSubmit({ ...post, publish: false })
    }

    const handleSubmit = async (post) => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()

            let result;
            if (isEdit) {
                result = await API.put('/post/' + params.id, post, config)
            } else {
                result = await API.post('/post', post, config)
            }
            Swal.close()
            navigate('/post')

        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
            console.log(error);
        }
    }

    const handleTool = (type = '') => {
        let textToAdd = ''
        switch (type) {
            case 'link':
                textToAdd = '[](url)'
                break;
            case 'code':
                textToAdd = '``'
                break;
            case 'code-block':
                textToAdd = '\n\n```js\n\n```\n'
                break;
            default:
                break;
        }
        setPost({ ...post, body: post.body + textToAdd })
    }

    const handleChangeFile = async (e) => {
        const Swal = SwalLoading('Uploading the image...')
        try {
            const file = e.target.files[0]
            console.log(file);
            const formData = new FormData()
            formData.append('image', file)

            const result = await API.post('/post/image', formData)
            Swal.close()
            const imgUrl = result.data.data
            const textToAdd = `![Image description](${imgUrl})`
            setPost({ ...post, body: post.body + textToAdd })
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    return (
        <Layout>
            <p className="text-center pb-4 fs-3 fw-bold"
            >{isEdit ? 'Edit' : 'Create'} Post</p>
            <Form onSubmit={handlePublish}>
                <Card className="mx-auto mb-3" style={{ width: '50rem' }} >
                    <CardBody>
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
                    </CardBody>
                </Card>
                <Card className="mx-auto" style={{ width: '50rem' }} >
                    <CardBody>
                        <Input
                            id="add-image"
                            name="image"
                            onChange={handleChangeFile}
                            type="file"
                            className="d-none"
                        />
                        <div className="py-2 d-flex align-items-center gap-4">
                            <label htmlFor="add-image" className="d-flex align-items-center gap-2" title="Add image">
                                <i className="fas fa-image fa-lg" ></i>
                            </label>
                            <i
                                className="fas fa-link fa-lg"
                                title="Add link"
                                onClick={() => { handleTool('link') }}>
                            </i>
                            <i
                                className="fas fa-code fa-lg"
                                title="Add Code"
                                onClick={() => { handleTool('code') }}>
                            </i>
                            <span
                                class="fa-stack fa-lg"
                                title="Add Code Block"
                                onClick={() => { handleTool('code-block') }}>
                                <i class="fas fa-square fa-stack-2x"></i>
                                <i class="fas fa-code fa-stack-1x fa-inverse"></i>
                            </span>
                        </div>
                        <FormGroup>
                            <Input
                                id="body"
                                name="body"
                                value={post.body}
                                onChange={handleChange}
                                placeholder="Write your content here with markdown format"
                                type="textarea"
                                style={{ height: 400 }}
                            />
                        </FormGroup>

                    </CardBody>
                </Card>
                <div className="mx-auto mt-3 d-flex gap-3" style={{ width: '50rem' }}>
                    <Button color="primary" type="submit">
                        Publish
                    </Button>
                    <Button
                        color="primary"
                        outline
                        type="button"
                        onClick={handleSaveDraft}
                        className={saveDraftButtonDisplay}
                    >
                        Save draft
                    </Button>
                </div>
            </Form>
        </Layout>
    )
}

export default PostAdd