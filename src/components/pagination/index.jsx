import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PaginationItem, Pagination, PaginationLink } from 'reactstrap'
import { updatePage } from '../../config/redux/action'


const PaginationComponent = () => {
    const dispatch = useDispatch()
    const { page, perPage, totalData } = useSelector(state => state.paginationReducer)
    const totalPage = Math.ceil(parseInt(totalData) / parseInt(perPage))

    const handleFirst = () => {
        dispatch(updatePage(1))
    }
    const handlePrev = () => {
        dispatch(updatePage(page === 1 ? 1 : page - 1))
    }
    const handleNext = () => {
        dispatch(updatePage(page === totalPage ? totalPage : page + 1))
    }
    const handleLast = () => {
        dispatch(updatePage(parseInt(totalPage)))
    }

    return (
        <Pagination size="lg" className="d-flex justify-content-center mt-5" >
            <PaginationItem onClick={handleFirst}>
                <PaginationLink
                    first
                    href="#"
                />
            </PaginationItem>
            <PaginationItem onClick={handlePrev}>
                <PaginationLink
                    href="#"
                    previous
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    {page}/{totalPage}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem onClick={handleNext}>
                <PaginationLink
                    href="#"
                    next
                />
            </PaginationItem>
            <PaginationItem onClick={handleLast}>
                <PaginationLink
                    href="#"
                    last
                />
            </PaginationItem>
        </Pagination>
    )
}

export default PaginationComponent