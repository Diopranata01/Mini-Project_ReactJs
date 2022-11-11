import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import moment from "moment";
import {
  BLOG_POSTS,
  SET_BLOG_POST_PUBLISHED,
  SOFT_DELETE_BLOG_POST,
} from "../../../../../Database/queries";
import "../../../../../index.css";
import { EditPage } from "../../EditPage/EditPage";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardMedia from "@mui/material/CardMedia";
import Swal from "sweetalert2";

export const BlogPost = ({ blogPost }) => {
  // set post published
  const [setBlogPostPublished] = useMutation(SET_BLOG_POST_PUBLISHED);
  const [setSoftDeletedPost] = useMutation(SOFT_DELETE_BLOG_POST);
  const [setActive, setNewActive] = useState({ active: true });
  const [setDelete, setNewDelete] = useState({ active: false });
  const [setLike, setNewLike] = useState({ active: false });

  const onSetPublish = async (e, data) => {
    e.preventDefault();
    await setBlogPostPublished({
      variables: {
        id: blogPost.id,
        published: data,
      },
    });

    setNewActive({
      ...setActive,
      active: false,
    });

  };

  const onSetDelete = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    setSoftDeletedPost({
      variables: {
        id: blogPost.id,
      },
    });

    setNewDelete({
      ...setDelete,
      active: true,
    });
  };

  const onSetLike = async (e) => {
    e.preventDefault();

    setNewLike({
      ...setLike,
      active: true,
    });
  };

  const today = moment(new Date());

  // console.log(blogPost)

  let postedBy = "";
  if (blogPost.user?.name) postedBy = "by " + blogPost.user?.name;
  else if (blogPost.user_id) postedBy = "by " + blogPost.user_id;

  return (
    <Card
      className="my-3 shadow h-100 rounded-5"
      style={{
        borderRadius: "5px",
      }}
    >
      <CardHeader
        sx={{ p: 2 }}
        avatar={<Avatar sx={{ bgcolor: red[700] }}> R </Avatar>}
        action={
          <IconButton sx={{ marginRight: 1, marginTop: 1 }}>
            {" "}
            <MoreVertIcon />{" "}
          </IconButton>
        }
        title={<h5>{blogPost.title}</h5>}
        subheader={blogPost.activities.map((a) => (
          <div key={a.id} className="header-card">
            <p>{moment(a.date).format("dddd, MMM Do YYYY")}</p>
            <p>{moment(a.date).fromNow()}</p>
          </div>
        ))}
      ></CardHeader>
      <CardMedia
        component="img"
        height="194"
        alt="picture"
        image={
          // "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
          "https://images.unsplash.com/photo-1663547944086-c92df8108618?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        }
      />
      {/* <img src="./road.jpg"></img> */}
      <CardContent>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <p>{blogPost.content}</p>
        </Typography>
        {/* {blogPost.activities.map((b)=>(
            <div key={b.id} className='acivitiesTime'>
              <p>{moment(b.date).fromNow()}</p>
            </div>
          ))} */}
      </CardContent>
      <CardActions disableSpacing>
        {blogPost.is_published || blogPost.activities.type==='deleted'? (
          <div>
            {setActive.active ? (
              <div>
                {setDelete.active ? (
                  <div>
                    <LoadingButton
                      loading
                      variant="contained"
                      className="btn btn-primary border border-0 rounded-2"
                    >
                      AfterDelete
                    </LoadingButton>
                  </div>
                ) : (
                  <div>
                    <IconButton
                      aria-label="add to favorites"
                      className="ms-1"
                      onClick={(e) => onSetLike(e)}
                    >
                      <FavoriteIcon color={setLike.active ? "error" : ""} />
                    </IconButton>
                    <IconButton color="error" onClick={(e) => onSetDelete(e)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <LoadingButton
                  loading
                  variant="contained"
                  className="btn btn-primary border border-0 rounded-2"
                >
                  Submit
                </LoadingButton>
              </div>
            )}
          </div>
        ) : (
          <div>
            {setActive.active ? (
              <div className="col-12 d-flex">
                <Button
                  className={
                    setActive ? "btn rounded-2 load loading active-loading" : ""
                  }
                  variant="outlined"
                  color="info"
                  style={{ marginLeft: "5px", marginRight: "4px" }}
                  onClick={(e) => onSetPublish(e, true)}
                >
                  Published
                </Button>
                <IconButton aria-label="add to favorites" className="ms-1">
                  <FavoriteIcon color="error" />
                </IconButton>
                <IconButton
                  className="ms-1"
                  variant="outlined"
                  color="error"
                  onClick={(e) => onSetDelete(e)}
                >
                  <DeleteIcon />
                </IconButton>
                <div className="editButton">
                  <EditPage data={blogPost.id} />
                </div>
              </div>
            ) : (
              <div>
                <LoadingButton loading variant="outlined">
                  Submit
                </LoadingButton>
              </div>
            )}
          </div>
        )}
        <IconButton aria-label="add to favorites" color="info">
          <ShareIcon />
        </IconButton>
        <ExpandMore>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};
