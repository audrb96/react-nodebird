import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from "@ant-design/icons";
import { Avatar, Button, Card,Popover,List,Comment} from "antd";
import { useSelector } from "react-redux";
import PostImages from "./PostImages";
import PropTypes from 'prop-types';
import { useCallback, useState } from "react";
import CommentForm from "./CommentForm";

const PostCard = ({post}) => {
    const [liked, setliked] = useState(false);
    const [commentFormOpened,setCommentFormOpened] = useState(false)
    const {me} = useSelector((state)=> state.user);
    const id = me?.id;
    
    const onToggleLike = useCallback(()=>{
        // prev는 이전 데이터가 들어있음 toggle때 많이 사용
        setliked((prev)=> !prev);
    },[])

    const onToggleComment = useCallback(()=>{
        setCommentFormOpened((prev)=> !prev);
    },[])

    return (
        <div style={{marginBottom:20}}>
            <Card cover={post.Images[0] && <PostImages images={post.Images} />}
            actions={
                [
                    <RetweetOutlined key="retweet"/>,
                    liked ? <HeartTwoTone twoToneColor='#eb2f96' key="heart" onClick={onToggleLike}/> : <HeartOutlined key="heart" onClick={onToggleLike}/>,
                    <MessageOutlined key="comment" onClick={onToggleComment}/>,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ? (
                            <>
                            <Button>수정</Button>
                            <Button type="danger">삭제</Button>
                            </>
                            ) : <Button>신고</Button>}
                        </Button.Group>
                        )}>
                        <EllipsisOutlined/>
                    </Popover>,
                ]
            }
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post}/>
                    <List header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item)=> (
                            <li>
                                <Comment 
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
                )}
            {/* <CommentForm/> */}
            {/* <Comment/> */}
        </div>        
    )
}

PostCard.propsTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User:PropTypes.object,
        content:PropTypes.string,
        createdAt: PropTypes.object,
        Comments:PropTypes.arrayOf(PropTypes.object)
    }).isRequired
}

export default PostCard;