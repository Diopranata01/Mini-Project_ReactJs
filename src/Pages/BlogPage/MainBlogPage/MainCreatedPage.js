import React, { useState } from "react";
import { UserPosts } from "./PostedPage/UserPosts";
// import { UnPosts } from "./UnPosts/UnPosts";
import { CreatePost } from "./CreatePost";
import { DeletedPosts } from "./DeletedPosts/DeletedPosts";
import { EditPage } from "./EditPage/EditPage";
import { UnPosts } from "./UnPosts/UnPosts";
import { BLOG_POSTS, GET_BLOG_POSTS_BY } from "../../../Database/queries";
import { AuthStatus } from "../../../Auth/AuthStatus";
import { IniNavbar, Loading, NavChild } from "../../../Component";
import { useLazyQuery } from "@apollo/client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Nav from "react-bootstrap/Nav";
import { color } from "@mui/system";
import { Link } from "react-router-dom";

export const MainCreatedPage = () => {
  // search by id (masih ada bug karna search by overall id)
  const [search, { loading, error, data }] = useLazyQuery(GET_BLOG_POSTS_BY);
  const [focuseValue, setFocuseValue] = useState(false);
  const [inputVal, setInputVal] = useState({
    title: "",
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  const onPublish = (e) => {
    e.preventDefault();

    search({
      variables: {
        title: `%${inputVal.title}%`,
      },
    });
  };

  const onChange = (e) => {
    setInputVal({
      ...inputVal,
      [e.target.name]: e.target.value,
    });
    setFocuseValue(true);
  };

  // console.log(data);

  return (
    <>
      <div style={{ margin: "0px" }} className="row d-flex">
        <AuthStatus />
        <IniNavbar />
        <div className="container pt-3 justify-content-center">
          <div className="row justify-content-center py-3 row-cols-md-4">
            <div className="col-md-3 ms-5" style={{ paddingLeft: "70px" }}>
              <NavChild/>
            </div>
            <div className="col-md-3 offset-md-3 d-flex col col-sm-5">
              <TextField
                id="outlined search"
                color="primary"
                focused={focuseValue.data}
                label="search"
                size="small"
                name="title"
                value={inputVal.title}
                onChange={onChange}
              />
              <Button
                className="mx-3 mb-2"
                variant="contained"
                size="small"
                color="primary"
                onClick={onPublish}
              >
                Cari
              </Button>
            </div>
          </div>
          <div className="container pt-3 justify-content-center">
            {/* <UserPosts newInput={data ? data.user_post : ""} /> */}
            {/* <DeletedPosts newInput={data ? data.user_post : ""}/> */}
            <UnPosts newInput={data ? data.user_post : ""} />
          </div>
          <div className="container py-5">
            <CreatePost />
          </div>
        </div>
      </div>
    </>
  );
};
