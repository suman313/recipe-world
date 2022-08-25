import styled from "@emotion/styled";
import { CircularProgress, Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePost } from "../../actions/post";
import moment from "moment";

const BoxLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
const BoxSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "20px",
});

function Postdetails() {
  const { post, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOnePost(id));
  }, [id]);

  if (!post) return null;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Paper elevation={6} sx={{ m: 2 }}>
      <BoxLayout>
        <BoxSection>
          <Typography>{post.title}</Typography>
          {post.tags.map((tag) => (
            <Typography>#{tag}</Typography>
          ))}

          <Typography>{post.message}</Typography>
          <Typography>{post.name}</Typography>
          <Typography>{moment(post.createdAt).fromNow()}</Typography>
          <Divider />
          <Typography>Real Time Chat -- under development</Typography>
          <Divider />
          <Typography>Comments --- under development</Typography>
          <Divider />
        </BoxSection>
        <Box sx={{ maxWidth: "600px", m: 1 }}>
          <img
            style={{ width: "100%", height: "auto" }}
            src={post.selectedFile}
          />
        </Box>
      </BoxLayout>
    </Paper>
  );
}

export default Postdetails;
