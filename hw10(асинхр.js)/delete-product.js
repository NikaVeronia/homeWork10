let currentPage = 1;
const itemsPerPage = 8; 
let products = [];
let filteredProducts = [];
let selectedCategories = [];
const modal = document.getElementById('modal');
let productIdToDelete = null;
// Функция получения продуктов
function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            products = data;
            filteredProducts = products; // Изначально все продукты
            renderProducts(); // Отобразить первую страницу
        })
        .catch(error => console.error('Error fetching products:', error));
}
// Функция для отображения продуктов
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Очистить список перед вставкой

    // Вычисляем индекс начала и конца для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

   
    // Добавляем продукты на страницу
    paginatedProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.classList.add('card-product');
        
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.style.width = '150px';
        img.style.height = '20vh';

        const title = document.createElement('h3');
        title.classList.add('h3');
        title.textContent = product.title;
        title.style.fontSize = '15pt';
        title.style.textAlign = 'center';

        const price = document.createElement('p');
        price.classList.add('p-product');
        price.textContent = `$${product.price}`;
        const button=document.createElement('button');
        button.classList.add('delete-btn');

        // Создание кнопки через DOM

        button.textContent = 'Удалить товар'; // Устанавливаем текст внутри кнопки
        button.classList.add('delete-btn'); // Добавляем класс для стилизации
        button.setAttribute('data-product-id',product.id ); // Добавляем атрибут, например, id товара
        
        productContainer.appendChild(title);
        productContainer.appendChild(img);
        productContainer.appendChild(price);
        productContainer.appendChild(button);

       
        listItem.appendChild(productContainer);
        productList.appendChild(listItem);
         // Добавляем обработчики событий для кнопок удаления
         document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                productIdToDelete = event.target.dataset.productId;
                modal.style.display = 'flex'; // Показать модальное окно
            });
        });
    });

    // Обновляем состояние кнопок пагинации
    updateButtons();
}

// Функция обновления кнопок пагинации
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * itemsPerPage >= filteredProducts.length;
}

// События для кнопок пагинации
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
});
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage * itemsPerPage < filteredProducts.length) {
        currentPage++;
        renderProducts();
    }
});

// Загружаем продукты и категории при загрузке страницы
fetchProducts();

 // Добавляем обработчики событий для кнопок удаления
 document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        productIdToDelete = event.target.dataset.productId;
        modal.style.display = 'flex'; // Показать модальное окно
    });
});

// Обработчик подтверждения удаления
document.getElementById('confirm-delete').addEventListener('click', async () => {
    const apiUrl = `https://fakestoreapi.com/products/${productIdToDelete}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.querySelector('.message').textContent = 'Товар успешно удален.';
            document.querySelector(`[data-product-id="${productIdToDelete}"]`).closest('.card-product').remove();
        } else {
            document.querySelector('.message').textContent = 'Ошибка при удалении товара.';
        }
    } catch (error) {
        document.querySelector('.message').textContent = 'Произошла ошибка при соединении с сервером.';
        console.error('Error:', error);
    }
    modal.style.display = 'none'; // Скрыть модальное окно
});

// Обработчик отмены удаления
document.getElementById('cancel-delete').addEventListener('click', () => {
    modal.style.display = 'none'; // Скрыть модальное окно
    productIdToDelete = null;
});
