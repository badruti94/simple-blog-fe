import React from 'react'
import { Button, CardBody, Col, Form, Input, Row } from 'reactstrap'

const SearchForm = () => {
    return (
        <CardBody>
            <Form>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Input
                            id="search"
                            name="search"
                            placeholder="Search....."
                            type="text"
                            style={{ width: '400px' }}
                        />
                    </Col>
                    <Col>
                        <Button>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
        </CardBody>
    )
}

export default SearchForm