fetch('https://fakestoreapi.com/products?limit=4')
.then(res => res.json())
.then(json => {
  const productList = document.getElementById('productList');
  json.forEach(product => {
    // Создание элемента списка (li)
    const listItem = document.createElement('li');
    listItem.className = 'card-home';

    // Создание изображения
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    img.style.width = '230px'; // Пример размера изображения
    img.style.height = '20vh';
    
    // Создание элемента с текстом
    const title = document.createElement('p');
    title.classList.add('product-title');
    title.innerText = product.title;
    title.style.fontSize = '25pt';
    title.style.textAlign = 'center';

    // Добавление изображения и текста в элемент списка
    listItem.appendChild(img);
    listItem.appendChild(title);

    // Добавление элемента списка в ul
    productList.appendChild(listItem);
  });
})
.catch(error => console.error('Ошибка при загрузке данных:', error));

// Переменные для управления страницами
let currentPage = 1;
const itemsPerPage = 4;
let categories = [];

// Получение всех категорий с API
function fetchCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => {
            categories = data; // Сохраняем категории
            console.log('Categories fetched:', categories);
            renderCategories(); // Отображаем первую страницу категорий
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}

// Функция для отображения категорий на текущей странице
function renderCategories() {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = ''; // Очищаем список перед вставкой новых элементов

    // Вычисляем индекс начала и конца для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCategories = categories.slice(startIndex, endIndex);

    // Добавляем категории на страницу
    paginatedCategories.forEach(category => {
        // Создаем элемент списка
        const listItem = document.createElement('li');
        listItem.classList.add('card-home');
        
        // Создаем контейнер для изображения и названия категории
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
    

        // Создаем элемент для названия категории
        const categoryTitle = document.createElement('p');
        categoryTitle.innerText = category;
        categoryTitle.style.top = '285px';
        categoryTitle.style.fontSize = '25pt';
        categoryTitle.style.textAlign = 'center';
        
        // Создаем элемент для изображения
        const categoryImage = document.createElement('img');
        categoryImage.classList.add('category-image');
        categoryImage.src = 'placeholder.jpg'; // Плейсхолдер, пока не загружено изображение
        categoryImage.style.width = '200px'; // Пример размера изображения
        categoryImage.style.height = '20vh';
        // Делаем запрос для получения изображения товара из категории
        fetch(`https://fakestoreapi.com/products/category/${category}?limit=1`)
            .then(res => res.json())
            .then(products => {
                if (products.length > 0) {
                    categoryImage.src = products[0].image; // Устанавливаем изображение товара
                }
            })
            .catch(error => {
                console.error('Error fetching product image:', error);
            });

        // Добавляем изображение и название в контейнер
        categoryContainer.appendChild(categoryImage);
        categoryContainer.appendChild(categoryTitle);

        // Добавляем контейнер категории в элемент списка
        listItem.appendChild(categoryContainer);
        categoryList.appendChild(listItem);
    });

}

// Загружаем категории при загрузке страницы
fetchCategories();
