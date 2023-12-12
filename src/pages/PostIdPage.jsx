import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState({})
    const [fetchPostById, isPostLoading, postError] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isCommentLoading, commentError] = useFetching(async (id) => {
        const response = await PostService.getCommentByPostId(id)
        console.log(response.data);
        setComments(response.data)
    })

    useEffect(() => {
        if (params.id) {
            fetchPostById(params.id)
            fetchComments(params.id)
        }
    }, [])
    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isPostLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isCommentLoading
                ? <Loader/>
                : <div>
                    {comments.length && comments.map(comment =>
                        <div style={{marginTop: 15}}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;