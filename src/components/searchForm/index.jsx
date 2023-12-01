import { useDispatch } from 'react-redux'
import { Button, CardBody, Form, Input } from 'reactstrap'
import { updatePage } from '../../config/redux/action'

const SearchForm = (props) => {
    const { search, setSearch, getData } = props
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePage(1))
        getData()
    }

    return (
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <div className="d-flex gap-3 justify-content-between align-items-center">
                    <Input
                        id="search"
                        name="search"
                        placeholder="Search....."
                        type="text"
                        
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type='submit'>
                        Search
                    </Button>
                </div>
            </Form>
        </CardBody>
    )
}

export default SearchForm