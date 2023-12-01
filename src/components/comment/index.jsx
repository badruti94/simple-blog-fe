import { Card, CardBody, FormGroup, Button, Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from "react-confirm-alert"
import Reply from "../reply"
import { formatDate } from "../../utils/format"
import { API, getConfig } from "../../config/api"


const Comment = (props) => {
    const navigate = useNavigate()
    const { comment } = props
    const [replies, setReplies] = useState(comment.replies)
    const [likeCount, setLikeCount] = useState(comment.like)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [formDisplay, setFormDisplay] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [dropdownVisible, setdropdownVisible] = useState(false)
    const [body, setBody] = useState('')
    const inputRef = useRef(null)

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const userId = localStorage.getItem('user_id')
    const isLogin = localStorage.getItem('login')

    const handleDelete = async () => {
        try {
            const deleteItem = async () => {
                const config = await getConfig()
                await API.delete(`/post/comment/${comment.id}`, config)
                setIsDelete(true)
            }

            const options = {
                title: 'Delete Comment',
                message: 'Are you sure want to delete this comment?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: deleteItem
                    },
                    {
                        label: 'No',
                        onClick: () => { }
                    }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
                keyCodeForClose: [8, 32],
                overlayClassName: "overlay-custom-class-name"
            };

            confirmAlert(options);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLike = async () => {
        try {
            if (!isLogin) {
                navigate('/login')
                return
            }
            const config = await getConfig()
            const result = await API.post(`/comment/${comment.id}/like`, {}, config)
            setLikeCount(result.data.data.like_count)
        } catch (error) {
            console.log(error);
        }
    }

    const handleReply = async (username = '') => {
        if (!isLogin) {
            navigate('/login')
            return
        }
        setBody(username)
        setFormDisplay(true)
        setTimeout(() => {
            inputRef.current.focus()
        }, 200);
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const config = await getConfig()
            const url = `/comment/${comment.id}/reply`
            await API.post(url, { body }, config)
            const result = await API.get(url)
            console.log('replies : ', result.data.data);
            setReplies(result.data.data)
            setBody('')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (parseInt(userId) === comment.user.id) setdropdownVisible(true)
    }, [])


    return (
        !isDelete &&
        <div className="mb-3">
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between">
                        <div>
                            <span className="fw-bold" >{comment.user.username}</span> | {formatDate(comment.createdAt)}
                        </div>
                        {dropdownVisible && <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down'>
                            <DropdownToggle caret size="sm" color="dark">
                                . . .
                            </DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem
                                    onClick={() => navigate(`/comment/${comment.id}/edit`)}
                                >
                                    Edit
                                </DropdownItem>
                                <DropdownItem onClick={handleDelete} >Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>}
                    </div>
                    <div>
                        {comment.body}
                    </div>
                    <div className="d-flex gap-3 mt-2">
                        <span >
                            <i
                                style={{ cursor: 'pointer' }}
                                className="fas fa-heart fa-lg"
                                onClick={handleLike}
                            >
                            </i> {likeCount} like
                        </span>
                        <span
                            className="text-decoration-none text-dark"
                            style={{ cursor: 'pointer' }}
                            onClick={() => { handleReply() }}>
                            <i className="fas fa-comment fa-lg"></i> Reply
                        </span>
                    </div>
                </CardBody>
            </Card>
            <div className="ps-4 pt-2">
                {replies && replies.map(reply =>
                    <Reply reply={reply} handleReply={handleReply} />
                )}
                <div className="mb-4">
                    <Form className={formDisplay ? '' : 'd-none'} onSubmit={handleSubmit}>
                        <FormGroup>
                            <textarea
                                name="reply"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                ref={inputRef}
                                placeholder="Add reply"
                                className="form-control"
                            >
                            </textarea>
                        </FormGroup>
                        <div className="mx-auto mt-3 d-flex gap-3">
                            <Button color="primary" type="submit">
                                Submit
                            </Button>
                            <Button
                                color="primary"
                                outline
                                type="button"
                                onClick={() => setFormDisplay(false)}
                            >
                                Dismiss
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>)
}

export default Comment