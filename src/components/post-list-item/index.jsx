import { useNavigate } from "react-router-dom"
import { Card, CardBody} from "reactstrap"
import { formatDate } from "../../utils/format"

const PostListItem = ({ data }) => {
    const { id, title, user, createdAt } = data
    const navigate = useNavigate()

    return (
        <Card
            className="mx-auto mb-2"
            style={{ maxWidth: '800px' }}>
            <CardBody className="text-muted fs-6">
                <div className="text-muted fs-6">
                    <div className="fw-bold">{user.name}</div>
                    <div>{formatDate(createdAt)}</div>
                </div>
                <div
                    className="text-warning fs-4 fw-bold mt-1"
                    style={{ 'cursor': 'pointer' }}
                    onClick={() => navigate('/post/' + id)}
                >
                    {title}
                </div>
            </CardBody>
        </Card>
    )
}

export default PostListItem