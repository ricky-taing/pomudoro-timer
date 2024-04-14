// CLIENT-SIDE

const documentForm = document.querySelector('form');
documentForm.addEventListener('submit', handleSubmit);

/** @param {Event} event */
function handleSubmit(event) {
  /** @type {HTMLFormElement} */
  const form = event.currentTarget;
  const url = new URL(form.action);
  const formData = new FormData(form);
  const searchParams = new URLSearchParams(formData);

  /** @type {Parameters<fetch>[1]} */
  const fetchOptions = {
    method: form.method,
  };

  if (form.method.toLowerCase() === 'post') {
    if (form.enctype === 'multipart/form-data') {
      fetchOptions.body = formData;
    } else {
      fetchOptions.body = searchParams;
    }
  } else {
    // method is 'get', set body request to default 'application/x-www-form-urlencoded'
    url.search = searchParams;
  }

  fetch(url, fetchOptions);

  // stop browser from reloading to submit form
  // if exception thrown, won't be called, browser falls back to default behavior 
  event.preventDefault();
}