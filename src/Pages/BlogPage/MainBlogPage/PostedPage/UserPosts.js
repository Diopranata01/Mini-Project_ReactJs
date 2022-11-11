import React from "react";
import {
    useQuery
} from "@apollo/client";
import { BlogPost } from './Post'
import { BLOG_POSTS} from "../../../../Database/queries";
import { Loading } from '../../../../Component'
import Card from '@mui/material/Card';

export const UserPosts = (newInput) => {

    // display user post published
    const { loading, error, data } = useQuery(BLOG_POSTS);
    if (loading) return <Loading/>;
    if (error) return <p>Error: {JSON.stringify(error)}</p>;

    const newInputValue = newInput;

    // console.log(newInputValue.newInput);

    if (error!==true){

    return (
        <div className="row row-cols-md-3 row-cols-auto g-5 justify-content-center">
            {
            newInputValue.newInput ?

            newInputValue.newInput.map((blogPost) => (
                <div className="col col-sm-3">
                    <BlogPost
                        key={blogPost.id}
                        blogPost={blogPost}
                    />
                </div>
            ))
            : 
            data.user_post.map(blogPost => (
                <div className="col col-sm-10">
                    <BlogPost
                        key={blogPost.id}
                        blogPost={blogPost}
                    />
                </div>
                ))}
        </div>
    )
}}
