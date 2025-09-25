import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserSignUpForm from "./userSignUpForm";
import UserLoginForm from "./userLoginForm";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  maxWidth: 480,
  width: "90%",
  borderRadius: 2,
};

const UserForm = ({ open, onClose, initial = "signup" }) => {
  const [formType, setFormType] = useState(initial); 

  const switchForm = (type) => {
    setFormType(type);
  };

  return (
    <Modal
      open={!!open}
      onClose={onClose}
      aria-labelledby="user-form-modal"
      closeAfterTransition
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {formType === "signup" ? (
          <UserSignUpForm switchForm={switchForm} />
        ) : (
          <UserLoginForm switchForm={switchForm} />
        )}
      </Box>
    </Modal>
  );
};

export default UserForm;
