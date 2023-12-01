import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link, useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { confirmAlert } from 'react-confirm-alert';
import { API, getConfig } from "../../config/api"
import {formatDate} from '../../utils/format'

const PostListItemTable = ({ data, getData }) => {
    const navigate = useNavigate()

    const { id, title, view, createdAt, publish } = data
    const handleEdit = async () => {
        try {
            navigate('/post/edit/' + id)
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async () => {
        try {
            const deleteItem = async () => {
                const config = await getConfig()
                const result = await API.delete('/post/' + id, config)
                getData()
            }

            const options = {
                title: 'Delete Post',
                message: 'Are you sure want to delete this post?',
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

    return (
        <tr>
            <td className='fw-bold '>
                <Link
                    className='text-decoration-none'
                    to={'/post/' + id}
                >
                    {title}{!publish && '(draft)'}
                </Link>
            </td>
            <td className='text-center'>
                {view}
            </td>
            <td>
                {formatDate(createdAt)}
            </td>
            <td className="text-center" >
                <Button onClick={handleEdit} className="me-2" color="warning" >Edit</Button>
                <Button onClick={handleDelete} className="me-2" color="danger">Delete</Button>
            </td>
        </tr>
    )
}

export default PostListItemTable