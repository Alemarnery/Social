function getError(errors, prop) {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
}

function nameError(prop, errors) {
  console.log(errors);
  const errorMessage = getError(errors, prop);
  console.log(errorMessage);
  if (errorMessage) {
    return `<div class="ui error message">
      ${errorMessage}
    </div>`;
  }

  return "";
}

module.exports = {
  nameError,
};
