import { useDispatch, useSelector } from 'react-redux'
import { Button, CardBody, Form, Input } from 'reactstrap'
import { updatePage } from '../../config/redux/slice/paginationSlice'
import { getData, setSearch } from '../../config/redux/slice/homeSlice'

const SearchForm = () => {
    const { search } = useSelector(state => state.home)
    const { page, perPage } = useSelector(state => state.pagination)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePage(1))
        dispatch(getData({ page, perPage, search }))
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
                        onChange={(e) => dispatch(setSearch(e.target.value))}
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