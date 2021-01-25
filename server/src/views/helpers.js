function getError(prop, errors) {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
}

function nameError(prop, errors, className = "error") {
  const message = prop ? getError(prop, errors) : errors;
  if (message) {
    return `<div class="ui ${className} message">
      ${message}
    </div>`;
  }
  return "";
}

module.exports = {
  nameError,
};
