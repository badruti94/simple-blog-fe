import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import Layout from "../../components/layout"
import { useState } from "react"
import { API } from '../../config/api'
import { useNavigate } from "react-router-dom"
import { SwalLoading, SwalFire } from '../../utils/swal-fire'

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        const Swal = SwalLoading()
        try {
            e.preventDefault()

            const result = await API.post('/auth/login', formData)
            const { data, token } = result.data

            localStorage.setItem('login', true)
            localStorage.setItem('token', token)
            localStorage.setItem('user_id', data.user_id)
            localStorage.setItem('role', data.role)

            Swal.close()
            navigate('/')

        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)

            console.log(error);
        }
    }

    return (
        <Layout>
            <Card
                body
                className="mx-auto"
                style={{ width: '35rem' }}
            >
                <CardBody>
                    <p className="text-center pb-4 fs-3 fw-bold"
                    >Login</p>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">
                                Password
                            </Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                type="password"
                            />
                        </FormGroup>
                        <Button color="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default Login