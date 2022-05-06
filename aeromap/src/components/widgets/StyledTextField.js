import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { filledInputClasses } from "@mui/material/FilledInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`& .${outlinedInputClasses.input}`]: {
      color: "white"
    },
    [`&:hover .${outlinedInputClasses.input}`]: {
      color: "white"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
      color: "white"
    },
    //
    [`& .${filledInputClasses.root} .${filledInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`&:hover .${filledInputClasses.root} .${filledInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`& .${filledInputClasses.root}.${filledInputClasses.focused} .${filledInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`& .${filledInputClasses.input}`]: {
      color: "white"
    },
    [`&:hover .${filledInputClasses.input}`]: {
      color: "white"
    },
    [`& .${filledInputClasses.root}.${filledInputClasses.focused} .${filledInputClasses.input}`]: {
      color: "white"
    },
    //
    [`& .${inputLabelClasses.outlined}`]: {
      color: "white"
    },
    [`&:hover .${inputLabelClasses.outlined}`]: {
      color: "white"
    },
    [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
      color: "white"
    }
});

export default StyledTextField