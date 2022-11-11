import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import moment from 'moment';
import {
  SET_BLOG_POST_PUBLISHED,
  DELETE_BLOG_POST,
} from "../../../../../Database/queries";
import "../../../../../index.css";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardMedia from '@mui/material/CardMedia';

export const BlogPost = ({ blogPost }) => {

  // set post published
  const [setSoftDeletedPost] = useMutation(DELETE_BLOG_POST);
  const [setDelete, setNewDelete] = useState({ active: false });

  const onSetDelete = async (e) => {
    e.preventDefault();

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

  const today = moment(new Date)
  
  console.log(blogPost.id)

  let postedBy = "";
  if (blogPost.user?.name) postedBy = "by " + blogPost.user?.name;
  else if (blogPost.user_id) postedBy = "by " + blogPost.user_id;

  return (
    <Card
      className="my-3 shadow h-100 rounded-5"
      style={{
        borderRadius: "5px"
      }}
    >
      <CardHeader 
      sx={{ p: 2 }}
      avatar={<Avatar sx={{ bgcolor: red[700]}}> R </Avatar>}
      action={<IconButton sx={{ marginRight: 1, marginTop: 1 }}> <MoreVertIcon/> </IconButton>}
      title={<h5>{blogPost.title}</h5>}
      subheader={blogPost.activities.map((a) => (
          <div key={a.id} className="header-card">
            <p>{ moment(a.date).format('dddd, MMM Do YYYY')}</p>
            <p>{moment(a.date).fromNow()}</p>
          </div>
        ))}
      >
      </CardHeader>
      <CardMedia
        component="img"
        height="194"
        alt="picture"
        image={'https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg'
      }
      />  
      {/* <img src="./road.jpg"></img> */}
      <CardContent>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <p>{blogPost.content}</p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing >
        {blogPost.is_published ? (
          <div>
            {setDelete.active ? (
              <div>
              <LoadingButton loading variant="contained" className="btn btn-primary border border-0 rounded-2">
                Submit
              </LoadingButton>
            </div>
            ) : (
              <div>
                <IconButton
                  color="error"
                  onClick={(e) => onSetDelete(e)}
                >
                  <DeleteIcon/>
                </IconButton>
              </div>
            )}
          </div>
        ) : (
          <div>
              ""
          </div>
        )}
      </CardActions>
      

      {/* <div>
        {blogPost.is_published ? (
          <div>
            {setActive.active ? (
              <IconButton
                color="error"
                onClick={(e) => onSetDelete(e)}
              >
                <DeleteIcon/>
              </IconButton>
            ) : (
              <div>
                <LoadingButton loading variant="contained" className="btn btn-primary border border-0 rounded-2">
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
                    setActive
                      ? "btn rounded-2 load loading active-loading"
                      : "" 
                  }
                  variant="outlined"
                  color="error"
                  onClick={(e) => onSetPublish(e, true)}
                >
                  Published
                </Button>
                <IconButton
                  className="ms-2"
                  variant="outlined"
                  color="error"
                  onClick={(e) => onSetDelete(e)}
                >
                  <DeleteIcon/>
                </IconButton>
                <div className="ms-1">
                  <EditPage data={blogPost.id}/>
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
      </div> */}
    </Card>
  );
};
