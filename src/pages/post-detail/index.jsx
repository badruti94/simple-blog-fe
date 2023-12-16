import './style.css'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Markdown from 'react-markdown'
import { Card, CardBody } from "reactstrap"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Layout from "../../components/layout"
import { API, getConfig } from '../../config/api'
import { SwalFire, SwalLoading } from '../../utils/swal-fire'
import { formatDate } from '../../utils/format'
import CommentSection from "../../components/commentSection"

const PostDetail = () => {

    const navigate = useNavigate()
    const [post, setPost] = useState({ user: {} })
    const [likeCount, setLikeCount] = useState(0)
    const [commentCount, setCommentCount] = useState(0)

    const [isLike, setIsLike] = useState(false)
    const [isSave, setIsSave] = useState(false)
    const params = useParams()
    const { id } = params
    const likeUrl = `/post/${id}/like`
    const saveUrl = `/post/${id}/save`

    const isLogin = localStorage.getItem('login')

    useEffect(() => {
        const getData = async () => {
            const Swal = SwalLoading()
            try {
                const result = await API.get('/post/' + id)
                Swal.close()
                setPost(result.data.data)
                setLikeCount(result.data.data.like)
                setCommentCount(result.data.data.comment)
            } catch (error) {
                Swal.close()
                SwalFire('error', error.response.data.message)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const incrementView = async () => {
            try {
                API.patch(`/post/${id}/view`, {})
            } catch (error) {
                console.log(error);
            }
        }

        incrementView()
    }, [])

    useEffect(() => {
        if (isLogin) {
            getDataIsLike()
            getDataIsSave()
        }
    }, [])

    const getDataIsLike = async () => {
        try {
            const config = await getConfig()
            const result = await API.get(likeUrl, config)
            setIsLike(result.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getDataIsSave = async () => {
        try {
            const config = await getConfig()
            const result = await API.get(saveUrl, config)
            setIsSave(result.data.data)
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
            const result = await API.post(likeUrl, {}, config)
            getDataIsLike()
            setLikeCount(result.data.data.like_count)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async () => {
        try {
            if (!isLogin) {
                navigate('/login')
                return
            }
            const config = await getConfig()
            if (!isSave) {
                await API.post(saveUrl, {}, config)
            } else {
                await API.delete(saveUrl, config)
            }
            getDataIsSave()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <Card
                className="post-side-menu-wrapper"
            >
                <CardBody className="post-side-menu d-flex align-items-center">
                    <div className="post-side-menu-list  justify-content-center gap-4">
                        <div className="text-center">
                            <div className="text-danger" onClick={handleLike} style={{ cursor: 'pointer' }}>
                                <i className={(isLike ? 'fas' : 'far') + ' fa-heart fa-2x'} ></i>
                            </div>
                            <div>{likeCount}</div>
                        </div>
                        <div className="text-center">
                            <div style={{ cursor: 'pointer' }}>
                                <a className="text-muted" href="#comment"><i className="far fa-comment fa-2x" ></i></a>
                            </div>
                            <div>{commentCount}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-primary" onClick={handleSave} style={{ cursor: 'pointer' }}>
                                <i className={(isSave ? 'fas' : 'far') + ' fa-bookmark fa-2x'} ></i>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card
                body
                className="mx-auto"
                style={{
                    maxWidth: '1000px',
                }}
            >
                <CardBody className="py-1 ">
                    <div>
                        <div className="fw-bold fs-6">{post.user.name}</div>
                        <div className="small">Posted on {formatDate(post.createdAt)}</div>
                    </div>
                    <div className="my-4">
                        <div className="fs-2 fw-bold">
                            {post.title}
                        </div>
                    </div>
                    <div className="fs-5">
                        <Markdown
                            children={post.body}
                            components={{
                                code(props) {
                                    const { children, className, node, ...rest } = props
                                    const match = /language-(\w+)/.exec(className || '')
                                    return match ? (
                                        <SyntaxHighlighter
                                            {...rest}
                                            PreTag="div"
                                            children={String(children).replace(/\n$/, '')}
                                            language={match[1]}
                                            style={agate}
                                        />
                                    ) : (
                                        <code {...rest} className={className}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        />
                    </div>
                </CardBody>
            </Card>
            <CommentSection
                id={id}
                setCommentCount={setCommentCount}
            />
        </Layout>
    )
}


export default PostDetail