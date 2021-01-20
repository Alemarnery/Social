function getError(errors, prop) {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
}

function nameError(input_name, errors) {
  if (getError(errors, input_name)) {
    return `<div class="ui error message">
      ${getError(errors, input_name)}
    </div>`;
  } else {
    return "";
  }
}

module.exports = {
  nameError,
};
