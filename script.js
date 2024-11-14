// Lista de productos para autocompletado (puedes personalizar esta lista)
const productos = [
    "Laptop Gaming ASUS",
    "Auriculares Bluetooth Sony",
    "Teclado Mecánico Razer",
    "Mouse Gamer Logitech",
    "Consola PlayStation 5",
    "Consola Xbox Series X",
    "Smartphone Samsung Galaxy",
    "Tablet iPad Pro",
    "GPU NVIDIA RTX 4090",
    "Memoria RAM Corsair 16GB",
    "Disco SSD Samsung 1TB"
];

const searchInput = document.getElementById("search-input");
const suggestions = document.getElementById("suggestions");

// Función para mostrar sugerencias
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    suggestions.innerHTML = '';

    if (query) {
        const matches = productos.filter(producto => producto.toLowerCase().includes(query));
        matches.forEach(match => {
            const li = document.createElement("li");
            li.textContent = match;
            li.addEventListener("click", () => {
                searchInput.value = match;
                suggestions.innerHTML = '';
                buscarProducto();
            });
            suggestions.appendChild(li);
        });
    }
});

// Función para buscar productos
function buscarProducto() {
    const query = searchInput.value.toLowerCase();
    if (query) {
        alert(`Buscando: ${query}`);
        // Aquí puedes redireccionar a una página de resultados o hacer una búsqueda en tu base de datos
    }
}


// Slider Script
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach(slide => (slide.style.display = 'none'));
    slides[currentSlide].style.display = 'block';
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

showSlide(currentSlide);
setInterval(() => moveSlide(1), 5000);

// Función para Filtrar Productos
function filterProducts() {
    const category = document.getElementById("category-filter").value;
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const productCategory = product.getAttribute("data-category");
        product.style.display = (category === "all" || productCategory === category) ? "block" : "none";
    });
}

// Función para Ordenar Productos
function sortProducts() {
    const sortOrder = document.getElementById("sort-order").value;
    const productList = document.getElementById("product-list");
    const products = Array.from(document.querySelectorAll(".product-card"));

    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute("data-price"));
        const priceB = parseFloat(b.getAttribute("data-price"));
        return sortOrder === "price-asc" ? priceA - priceB : priceB - priceA;
    });

    products.forEach(product => productList.appendChild(product));
}

            

// Elementos del chatbot
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbox = document.getElementById("chatbox");
const closeChat = document.getElementById("close-chat");
const sendMessageButton = document.getElementById("send-message");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

// Mostrar/Ocultar el chatbot
chatbotToggle.addEventListener("click", () => {
    chatbox.style.display = chatbox.style.display === "none" ? "block" : "none";
});

closeChat.addEventListener("click", () => {
    chatbox.style.display = "none";
});

// Función para enviar mensajes
function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === "") return;

    // Mostrar el mensaje del usuario
    const userMessage = document.createElement("div");
    userMessage.textContent = `Tú: ${userText}`;
    chatMessages.appendChild(userMessage);

    // Responder automáticamente
    const botMessage = document.createElement("div");
    botMessage.textContent = `Bot: ${getBotResponse(userText)}`;
    chatMessages.appendChild(botMessage);

    // Limpiar el input y hacer scroll al final
    userInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Manejar el botón de enviar mensaje
sendMessageButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Función para obtener respuesta del bot
function getBotResponse(userText) {
    const text = userText.toLowerCase();
    if (text.includes("envío")) {
        return "Los envíos son gratis en pedidos superiores a $50.";
    } else if (text.includes("garantía")) {
        return "Ofrecemos 12 meses de garantía en todos los productos.";
    } else if (text.includes("descuento")) {
        return "Puedes encontrar descuentos especiales en la sección de Ofertas.";
    } else {
        return "Lo siento, no entendí tu pregunta. Por favor intenta de nuevo.";
    }
}


// Función para filtrar productos por categoría
function filterProducts() {
    const category = document.getElementById("category-filter").value;
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const productCategory = product.getAttribute("data-category");
        if (category === "all" || productCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Función para ordenar productos por precio
function sortProducts() {
    const sortOrder = document.getElementById("sort-order").value;
    const productList = document.getElementById("product-list");
    const products = Array.from(document.querySelectorAll(".product-card"));

    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute("data-price"));
        const priceB = parseFloat(b.getAttribute("data-price"));

        if (sortOrder === "price-asc") {
            return priceA - priceB;
        } else if (sortOrder === "price-desc") {
            return priceB - priceA;
        } else {
            return 0;
        }
    });

    // Reordenar los productos en el DOM
    products.forEach(product => productList.appendChild(product));
}


// Agregar evento al hacer clic en el botón de producto
document.querySelectorAll('.cta-button').forEach((button) => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').innerText;
        const productPrice = parseFloat(productCard.getAttribute('data-price'));

        // Redireccionar según el producto
        if (productName.includes("Laptop")) {
            window.location.href = "./Computadores.html";
        } else if (productName.includes("PlayStation")) {
            window.location.href = "./Consolas.html";
        } else if (productName.includes("Auriculares")) {
            window.location.href = "./Perifericos.html";
        } else {
            alert("Producto no encontrado");
        }

        // Agregar al carrito
        addToCart({ name: productName, price: productPrice });
    });
});
