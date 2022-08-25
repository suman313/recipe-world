import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { getPost } from "../actions/post";
import { useDispatch, useSelector } from "react-redux";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    if (page) dispatch(getPost(page));
  }, [page]);
  return (
    <Stack spacing={2}>
      <Pagination
        count={numberOfPages}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            component={Link}
            to={`/posts/?page=${item.page}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default Paginate;
