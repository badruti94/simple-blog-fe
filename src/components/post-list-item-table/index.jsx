import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { API, getConfig } from "../../config/api"
import { confirmAlert } from 'react-confirm-alert';

const PostListItemTable = ({ data, getData }) => {
    const navigate = useNavigate()

    const { id, title} = data
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
    const handleDetail = async () => {
        try {
            navigate('/post/' + id)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr>
            <td>
                {title}
            </td>
            <td className="text-center" >
                <Button onClick={handleEdit} className="me-2" color="warning" >Edit</Button>
                <Button onClick={handleDelete} className="me-2" color="danger">Delete</Button>
                <Button onClick={handleDetail} className="me-2" color="primary">Detail</Button>
            </td>
        </tr>
    )
}

export default PostListItemTable