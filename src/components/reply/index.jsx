import { useEffect, useState } from "react"
import { Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from "react-confirm-alert"
import { formatDate } from "../../utils/format"
import { API, getConfig } from "../../config/api"

const Reply = (props) => {
    const { reply, handleReply } = props
    const navigate = useNavigate()
    const [likeCount, setLikeCount] = useState(reply.like)
    const [isDelete, setIsDelete] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownVisible, setdropdownVisible] = useState(false)

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const userId = localStorage.getItem('user_id')
    const isLogin = localStorage.getItem('login')

    const handleDelete = async () => {
        try {
            const deleteItem = async () => {
                const config = await getConfig()
                await API.delete(`/comment/reply/${reply.id}`, config)
                setIsDelete(true)
            }

            const options = {
                title: 'Delete Reply',
                message: 'Are you sure want to delete this reply?',
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
            if(!isLogin){
                navigate('/login')
                return
            }
            const config = await getConfig()
            const result = await API.post(`/reply/${reply.id}/like`, {}, config)
            setLikeCount(result.data.data.like_count)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(parseInt(userId) === reply.user.id) setdropdownVisible(true)
    }, [])


    return (
        !isDelete &&
        <Card className="mb-2">
            <CardBody>
                <div className="d-flex justify-content-between">
                    <div>
                        <span className="fw-bold" >{reply.user.username}</span> | {formatDate(reply.createdAt)}
                    </div>
                    {dropdownVisible && <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down'>
                        <DropdownToggle caret size="sm" color="dark">
                            . . .
                        </DropdownToggle>
                        <DropdownMenu >
                            <DropdownItem
                                onClick={() => navigate(`/reply/${reply.id}/edit`)}
                            >
                                Edit
                            </DropdownItem>
                            <DropdownItem onClick={handleDelete} >Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>}
                </div>
                <div>
                    {reply.body}
                </div>
                <div className="d-flex gap-3 mt-2">
                    <span>
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
                        onClick={() => { handleReply(`@${reply.user.username} `) }}>
                        <i className="fas fa-comment fa-lg"></i> Reply
                    </span>
                </div>
            </CardBody>
        </Card>
    )
}

export default Reply