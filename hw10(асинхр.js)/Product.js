let currentPage = 1;
const itemsPerPage = 8; 
let products = [];
let filteredProducts = [];
let selectedCategories = [];

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

// Функция получения категорий и их отображения в фильтрах
function fetchCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            const categoryFilters = document.getElementById('categoryFilters');
            
            categories.forEach(category => {
                const checkboxWrapper = document.createElement('div');
                checkboxWrapper.classList.add('form-input-checkbox');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = category;
                checkbox.value = category;
                checkbox.addEventListener('change', handleCategoryFilter);

                const label = document.createElement('label');
                label.htmlFor = category;
                label.textContent = category.charAt(0).toUpperCase() + category.slice(1);

                checkboxWrapper.appendChild(checkbox);
                checkboxWrapper.appendChild(label);
                categoryFilters.appendChild(checkboxWrapper);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

// Обработка фильтрации по категориям
function handleCategoryFilter(event) {
    const category = event.target.value;

    if (event.target.checked) {
        selectedCategories.push(category); // Добавить выбранную категорию
    } else {
        selectedCategories = selectedCategories.filter(cat => cat !== category); // Удалить категорию
    }

    filterProducts();
}

// Функция для фильтрации продуктов по категориям
function filterProducts() {
    if (selectedCategories.length > 0) {
        filteredProducts = products.filter(product => selectedCategories.includes(product.category));
    } else {
        filteredProducts = products; // Если нет выбранных категорий, показать все продукты
    }

    // Перезапуск пагинации на первой странице
    currentPage = 1;
    renderProducts();
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
        
        productContainer.appendChild(title);
        productContainer.appendChild(img);
        productContainer.appendChild(price);

        listItem.appendChild(productContainer);
        productList.appendChild(listItem);
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
fetchCategories();