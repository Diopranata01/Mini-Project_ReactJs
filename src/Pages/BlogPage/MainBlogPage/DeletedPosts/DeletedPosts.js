import React from "react";
import {
    useQuery
} from "@apollo/client";
import { Loading } from '../../../../Component'
import { BlogPost } from './Post/index'
import { DISPLAY_SOFTDELETED_POST } from "../../../../Database/queries";

export const DeletedPosts = (newInput) => {
    const { loading, error, data } = useQuery(DISPLAY_SOFTDELETED_POST);
    if (loading) return <Loading/>;
    if (error) return <p>Error: {JSON.stringify(error)}</p>;

    const newInputValue = newInput;

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
    }
}
