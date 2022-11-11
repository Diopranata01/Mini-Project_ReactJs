import { useMutation } from "@apollo/client";
import { height } from "@material-ui/system";
import { useState } from "react";
import { BLOG_POSTS, INSERT_BLOG_POST } from "../../../../Database/queries";

export const CreatePost = () => {

    let titleInput, contentInput
    const [insertPost] = useMutation(INSERT_BLOG_POST);

    return (
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "stretch"
            }}
            onSubmit={ e => {
                e.preventDefault()
                insertPost({
                    variables: {
                        title: titleInput.value,
                        content: contentInput.value
                    },
                    refetchQueries: [{
                        query: BLOG_POSTS
                    }]
                })
                titleInput.value = ''
                contentInput.value = ''
            }}
            className="mt-3"
        >
            <h2>Create a new post</h2>
            
            <input
                style={{
                    fontSize: "16px",
                    padding: "8px",
                    marginBottom: "8px"
                }}
                type="text"
                placeholder="Enter your title"
                ref={i => titleInput = i}
            ></input>

            <textarea
                style={{
                    fontFamily: "sans-serif",
                    padding: "8px",
                    marginBottom: "8px"
                }}
                placeholder="Write your post here..."
                ref={i => contentInput = i}
            ></textarea>
        
            <button
                style={{
                    height: "32px"
                }}
                type="submit" className="border border-1 btn-primary"
            >Submit</button>
        </form>
    )
}
