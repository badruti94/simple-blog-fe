import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import Layout from "../../components/layout"
import { useState } from "react"
import { API } from "../../config/api"
import { SwalFire, SwalLoading } from "../../utils/swal-fire"

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        phone_number: '',
        address: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        const Swal = SwalLoading()
        try {
            e.preventDefault()
            const result = await API.post('/auth/register', formData)
            Swal.close()
            SwalFire('success', result.data.message)

        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
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
                    >Register</p>
                    <Form onSubmit={handleSubmit} >
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
                            <Label for="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                type="email"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone_number">
                                Phone Number
                            </Label>
                            <Input
                                id="phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">
                                Address
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                type="textarea"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                type="password"
                            />
                        </FormGroup>
                        <Button color="primary">
                            Register
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default Register