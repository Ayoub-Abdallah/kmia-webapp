document.querySelector(".login-form").addEventListener('submit', handleLogin);

function handleLogin(event){
  console.log("handled... ");
  event.preventDefault();

  const formData = new FormData(event.target);
  
  const loginData = {};
  formData.forEach((value, key) => {
      loginData[key] = value;
  });

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData),
    credentials: 'include' // Include credentials to send cookies
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    window.location.href = '/admin';
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
