import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography, Button, ButtonBase } from "@mui/material";
// import ButtonBase from "@mui/material/ButtonBase";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const [opColor, setOpColor] = useState("white");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const LinkStyle = {
    textDecoration: "none",
    color: "black",
    backgroundColor: `${opColor}`,
  };
  const postDetail = () => navigate(`/posts/${post._id}`);
  if (!post) return null;

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} />
      <div className={classes.overlay}>
        <Typography
          variant="subtitle1"
          sx={{ wordWrap: "break-word" }}
          align="center"
        >
          {post.name}
        </Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.sub === post.creator ||
        user?.result?._id === post.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon />
          </Button>
        </div>
      )}
      {/* <Link
        to={`http://localhost:3000/posts/${post._id}`}
        style={LinkStyle}
        onMouseEnter={() => setOpColor("#665D5C")}
        onMouseLeave={() => setOpColor("white")}
      > */}
      <ButtonBase
        sx={{ display: "block", textAlign: "initial" }}
        onClick={postDetail}
      >
        <div className={classes.details}>
          <Typography variant="h6">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
        {/* </Link> */}
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <ThumbUpIcon />
          &nbsp;&nbsp;
          {post.likes.length}
        </Button>
        {(user?.result?.sub === post.creator ||
          user?.result?._id === post.creator) && (
          <Button
            size="small"
            color="error"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
