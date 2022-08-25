import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  margin: theme.spacing(2),
}));
