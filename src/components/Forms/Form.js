import React, { useEffect, useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import { createNewPost, updatePost } from "../../actions/post";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./Style";
const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const postToUpdate = useSelector((state) =>
    state.post.posts.find((post) => post._id === currentId)
  );
  useEffect(() => {
    if (currentId) {
      setPostData(postToUpdate);
    }
  }, [currentId, postToUpdate]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      setCurrentId(null);
    } else {
      dispatch(createNewPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  if (!user) {
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="overline">
          Please Sign In to create and share your recipes
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        className={`${classes.form} ${classes.root}`}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" align="center">
          {currentId ? "Edit Recipe" : "Share New Recipe"}
        </Typography>
        <TextField
          required
          name="title"
          label="Title"
          variant="outlined"
          sx={{ m: 1 }}
          fullWidth
          placeholder="Recipe Name"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          label="message"
          variant="outlined"
          sx={{ m: 1 }}
          fullWidth
          placeholder="Detais"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          required
          name="tags"
          label="tags"
          variant="outlined"
          sx={{ m: 1 }}
          fullWidth
          placeholder="Tags"
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            })
          }
        />
        <FileBase
          className={classes.fileInput}
          type="file"
          sx={{ m: 1 }}
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          type="submit"
          color="primary"
          size="large"
          sx={{ m: 1 }}
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          onClick={clear}
          color="primary"
          size="small"
          sx={{ m: 1 }}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
