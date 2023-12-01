import { Card, CardBody, FormGroup, Input, Button, Form } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { API, getConfig } from "../../config/api"
import Comment from "../comment"
import { useEffect, useState } from "react"

const CommentSection = (props) => {
    const navigate = useNavigate()
    const { id, setCommentCount } = props
    const [comments, setComments] = useState([])
    const [body, setBody] = useState('')

    const isLogin = localStorage.getItem('login')

    const getComments = async () => {
        try {
            const result = await API.get(`/post/${id}/comment`)
            setComments(result.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getComments()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if(!isLogin){
                navigate('/login')
                return
            }
            const config = await getConfig()
            const result = await API.post(`/post/${id}/comment`, { body }, config)
            setBody('')
            setComments([result.data.data.comment, ...comments])
            setCommentCount(result.data.data.comment_count)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card
            body
            className="mx-auto mt-5"
            style={{
                maxWidth: '1000px',
            }}
            id="comment"
        >
            <CardBody>
                <div className="fs-4 fw-bold mb-5" >
                    Comments
                </div>
                <div>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input
                                id="username"
                                name="username"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Add comment"
                                type="textarea"
                            />
                        </FormGroup>
                        <Button color="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div id="comment-list" className="mt-5">
                    {
                        comments.map(comment =>
                            <Comment
                                comment={comment}
                                getComments={getComments}
                            />
                        )
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default CommentSection