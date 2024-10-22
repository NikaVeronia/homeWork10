document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Получение данных формы
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Отправляем запрос на сервер для авторизации
    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        // Проверка успешности авторизации
        if (data.token) {
            // Сохраняем токен в localStorage для дальнейших запросов
            localStorage.setItem('authToken', data.token);
            document.getElementById('loginResponse').innerText = 'Login successful!';
            
            // Перенаправляем или выполняем другие действия
            // Например, перенаправление на страницу добавления товара:
            // window.location.href = '/add-product.html';
            window.location.href ='/add-product.html'
        } else {
            document.getElementById('loginResponse').innerText = 'Login failed. Please check your credentials.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loginResponse').innerText = 'Error during login. Please try again.';
    });
});