function getInputsFormEdit() {
  const oForm = document.forms["edit-profile"];
  const oEditName = oForm.elements.name;
  const oEditDescription = oForm.elements.description;

  return { oEditName, oEditDescription };
}

function getTextFieldsProfileInfo() {
  const oProfileInfo = document.querySelector(".profile__info");
  const oInfoTitle = oProfileInfo.querySelector(".profile__title");
  const oInfoDescription = oProfileInfo.querySelector(".profile__description");

  return { oInfoTitle, oInfoDescription };
}

export { getInputsFormEdit, getTextFieldsProfileInfo };
