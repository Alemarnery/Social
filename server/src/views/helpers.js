function getError(errors, prop) {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
}

function nameError(prop, errors) {
  const errorMessage = getError(errors, prop);
  if (errorMessage) {
    return `<div class="ui error message">
      ${errorMessage}
    </div>`;
  }

  return "";
}

function flashError(error) {
  return `<div class="ui error message">
            ${error}
          </div>`;
}

module.exports = {
  nameError,
  flashError,
};
