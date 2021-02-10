export const validateEmail = (userEmail) => {
  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (userEmail.match(mailFormat)) {
    //setEmailError("")
    return "";
  } else {
    return "Email je ve špatném formátu.";
  }
};

export const validatePassword = (password) => {
  const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

  if (password.match(passwordFormat)) return "";
  else
    return "Heslo musí mít alspoň 6 znaků, jedno malé a velké písmeno a číslo.";
};
