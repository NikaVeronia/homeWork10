document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Останавливаем перезагрузку страницы

    // Получаем значения из формы
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const category = document.getElementById('category').value;
    const modal = document.getElementById('modal');

   
    // Подготовка данных для отправки
    const productData = {
        title: title,
        price: parseFloat(price),
        description: description,
        image: image,
        category: category
    };

    // Отправляем запрос POST на сервер для добавления товара
    fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
        .then(res => res.json())
        .then(json => {
            // Выводим ответ сервера в блок с id "response"
            document.getElementById('response').innerText = `Product added successfully! ID: ${json.id}`;
            console.log(json);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('response').innerText = 'Error adding product';
        });
       
        
});
// Получаем элементы
const openModalBtn = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const form = document.getElementById("addProductForm");
const messageDiv = document.querySelector(".message");

// Открытие модального окна
openModalBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

// Закрытие модального окна
closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Закрытие модального окна при клике вне его
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Обработка отправки формы
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Отмена стандартного поведения формы

    // Получение данных из формы
    const formData = new FormData(form);
    const productData = {};
    formData.forEach((value, key) => {
        productData[key] = value;
    });

    // Имитация отправки данных на сервер
    setTimeout(function() {
        // Сообщение об успешной отправке
        messageDiv.textContent = "Add Product!";
        
        // Очистка формы и закрытие модального окна
        form.reset();
        modal.style.display = "none";
    }, 1000);
});
