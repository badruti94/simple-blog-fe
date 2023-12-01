import { Card, CardBody,  FormGroup, Input, Button, Form } from "reactstrap"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { API, getConfig } from "../../config/api"
import { SwalLoading } from "../../utils/swal-fire"


const ReplyEdit = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params
    const [body, setBody] = useState('')

    useEffect(() => {
        const getData = async () => {
            const Swal = SwalLoading()

            const result = await API.get(`reply/${id}`)
            Swal.close()

            setBody(result.data.data.body)
        }
        getData()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const config = await getConfig()
            await API.put(`/comment/reply/${id}`, { body }, config)
            navigate(-1)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card
            body
            className="mx-auto mt-5"
            style={{
                width: '1000px',
            }}
            id="reply"
        >
            <CardBody>
                <div className="fs-4 fw-bold mb-5" >
                    Edit Reply
                </div>
                <div>
                    <Form onSubmit={handleSubmit} >
                        <FormGroup>
                            <Input
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Edit Reply"
                                type="textarea"
                            />
                        </FormGroup>
                        <div className="mx-auto mt-3 d-flex gap-3">
                            <Button color="primary" type="submit">
                                Submit
                            </Button>
                            <Button
                                color="primary"
                                outline
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                Dismiss
                            </Button>
                        </div>
                    </Form>
                </div>
            </CardBody>
        </Card>
    )
}

export default ReplyEdit