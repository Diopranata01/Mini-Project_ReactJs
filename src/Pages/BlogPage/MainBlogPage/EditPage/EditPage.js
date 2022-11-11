import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  BLOG_POSTS,
  UPDATE_BLOG_POST,
  GET_POST_BY_ID,
  UPDATE_POST_NEW,
} from "../../../../Database/queries";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IconButton from "@mui/material/IconButton";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export const EditPage = (blogPost) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const id = blogPost.data;

  // console.log(blogPost.data);

  const { data, error, loading } = useQuery(GET_POST_BY_ID, {
    variables: { id: id },
  });

  // console.log(data.user_post[0].title);


  const [editPost] = useMutation(UPDATE_POST_NEW);

  const [state, setState] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    async function cek() {
      setState({
        title: data?.user_post[0].title,
        content: data?.user_post[0].content,
      });
    }
    cek();
  }, [data]);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(id)
  // console.log(state.title)
  // console.log(state.content)

  const handleSubmit = (e) => {
    if (
      state.id === "" ||
      state.title === "" ||
      state.content === "" 
    ) {
      e.preventDefault();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan isi dengan benar!!",
      });
    } else {
      editPost({
        variables: {
          id: id,
          title: state.title,
          content: state.content,
        },
      });
    }
  };

  return (
    <>
      <IconButton variant="info" onClick={handleShow} color="info">
        <DriveFileRenameOutlineIcon />
      </IconButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>
            <h3 className=" h2-text text-center mt-3">Edit Post</h3>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row container">
            <div className="col-md-12 m-3">
              <div className="row">
                <div className="col-md-12 m-3 text-center">
                </div>
                <div className="mx-auto col-md-6">
                  {/* <form onSubmit={handleSubmit}> */}
                  <form>
                    <div className="form-group">
                      <label>Title: </label>
                      <span></span>
                      <input
                        className="form-control mb-3 mt-2"
                        type="text"
                        name="title"
                        value={state.title}
                        onChange={onChange}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Content : </label>
                      <textarea
                        className="form-control mb-3 mt-2"
                        id="content"
                        name="content"
                        rows="5"
                        value={state.content}
                        onChange={onChange}
                      ></textarea>
                    </div>
                    <br />
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    // <form
    //     style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "stretch"
    //     }}
    //     onSubmit={ e => {
    //         e.preventDefault()
    //         insertPost({
    //             variables: {
    //                 title: titleInput.value,
    //                 content: contentInput.value
    //             },
    //             refetchQueries: [{
    //                 query: BLOG_POSTS
    //             }]
    //         })
    //         titleInput.value = ''
    //         contentInput.value = ''
    //     }}
    //     className="mt-3"
    // >
    //     <h2>Create a new post</h2>

    //     <input
    //         style={{
    //             fontSize: "16px",
    //             padding: "8px",
    //             marginBottom: "8px"
    //         }}
    //         type="text"
    //         placeholder="Enter your title"
    //         ref={i => titleInput = i}
    //     ></input>

    //     <textarea
    //         style={{
    //             fontFamily: "sans-serif",
    //             padding: "8px",
    //             marginBottom: "8px"
    //         }}
    //         placeholder="Write your post here..."
    //         ref={i => contentInput = i}
    //     ></textarea>

    //     <button
    //         style={{
    //             height: "32px"
    //         }}
    //         type="submit" className="border border-1 btn-primary"
    //     >Submit</button>
    // </form>
  );
};
