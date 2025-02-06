interface FormData {
  name: string;

  socialmedia: string;
  image: string;
  about: string;
  firstname: string;
  lastname: string;
  card: string;
  country: string;
  month: string;
  year: string;
  CVC: string;
}

export const validateProfileNext = (form: FormData) => {
  let isValid = true;

  let newErrors = {
    firstname: "",
    lastname: "",
    country: "",
    card: "",
    socialmedia: "",
    month: "",
    year: "",
    CVC: "",
  };

  const firstnameRegex = /^[a-zA-Z]+$/;

  const lastnameRegex = /^[a-zA-Z]+$/;

  if (form.firstname.trim() === "") {
    isValid = false;
    newErrors.firstname = "Please enter name";
  } else if (!firstnameRegex.test(form.name)) {
    isValid = false;
    newErrors.firstname = "Name can only contain letters";
  }

  if (form.lastname.trim() === "") {
    isValid = false;
    newErrors.lastname = "Please enter name";
  } else if (!lastnameRegex.test(form.about)) {
    isValid = false;
    newErrors.lastname = "Last Name can only contain letters";
  }

  if (form.card.trim() === "") {
    newErrors.card = "Invalid card number";
    isValid = false;
  }

  if (form.month.trim() === "") {
    newErrors.month = "Invalid month";
    isValid = false;
  }
  if (form.year.trim() === "") {
    newErrors.year = "Invalid month";
    isValid = false;
  }
  if (form.CVC.trim() === "") {
    newErrors.CVC = "Invalid CVC";
    isValid = false;
  }
  if (form.country.trim() === "") {
    newErrors.country = "Select a country to continue";
    isValid = false;
  }
  return { isValid, newErrors };
};
