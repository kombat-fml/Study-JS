const sendForm = (formId) => {
  const errorMsg = "Что-то пошло не так...",
    loadMsg = `
    <div class="preload-block"></div>
    `,
    successMsg = "Сообщение отправлено! Скоро с Вами свяжемся!";

  const form = document.getElementById(formId);
  const statusMessage = document.createElement('div');

  const postData = (formData) => {
    return fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    });
  }

  statusMessage.style.cssText = 'font-size: 2rem;';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    form.appendChild(statusMessage);
    statusMessage.innerHTML = loadMsg;

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200!')
        }
        statusMessage.textContent = successMsg;
        form.reset();
        setTimeout(() => {
          statusMessage.textContent = ""
        }, 5000);
      })
      .catch(error => {
        statusMessage.textContent = errorMsg;
        console.error(error);
        setTimeout(() => {
          statusMessage.textContent = ""
        }, 5000);
      })
  })


}
export default sendForm;