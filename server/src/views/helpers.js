function getError(prop, errors) {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
}

function nameError(prop, errors) {
  const errorMessage = prop ? getError(prop, errors) : errors;
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
