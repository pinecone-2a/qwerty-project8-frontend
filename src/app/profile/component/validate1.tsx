interface FormData {
  name: string;
  about: string;
  socialmedia: string;
  image: string;
  firstname: string;
  lastname: string;
  card: string;
  country: string;
  month: string;
  year: string;
  CVC: string;
}

export const validateProfileFirst = (form: FormData) => {
  let isValid = true;

  let newErrors = {
    name: "",
    about: "",
    socialmedia: "",
    image: "",
  };

  const nameRegex = /^[a-zA-Z]+$/;

  if (form.name.trim() === "") {
    isValid = false;
    newErrors.name = "Please enter name";
  } else if (!nameRegex.test(form.name)) {
    isValid = false;
    newErrors.name = "Name can only contain letters";
  }

  if (form.about.trim() === "") {
    isValid = false;
    newErrors.about = "Please enter info about yourself";
  } else if (!nameRegex.test(form.about)) {
    isValid = false;
    newErrors.about = "Last Name can only contain letters";
  }

  if (form.socialmedia.trim() === "") {
    newErrors.socialmedia = "Please enter a social link";
    isValid = false;
  }

  if (form.image.trim() === "") {
    newErrors.image = "Please upload image";
    isValid = false;
  }
  return { isValid, newErrors };
};
