import { makeStyles } from "@mui/styles";

export default makeStyles({
  root: {
    "& .MuiTextField-root": {
      m: 12,
      p: 1,
    },
  },
  paper: {
    p: 2,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
});
