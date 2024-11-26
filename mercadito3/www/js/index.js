/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}



// Obtener productos desde Firestore
const loadProducts = async () => {
    const productsRef = firestore.collection('productos'); // Colección en Firebase donde se guardan los productos
    const snapshot = await productsRef.get();
    
    const recommendedProductsList = document.getElementById('recommended-products-list');
    const newProductsList = document.getElementById('new-products-list');
    
    // Limpiar las listas antes de agregar nuevos productos
    recommendedProductsList.innerHTML = '';
    newProductsList.innerHTML = '';

    snapshot.forEach(doc => {
        const product = doc.data();
        const productElement = createProductElement(product);
        
        // Mostrar el producto en "Productos Recomendados"
        recommendedProductsList.appendChild(productElement);
        
        // Mostrar el producto en "Nuevas Publicaciones"
        newProductsList.appendChild(productElement);
    });
};

// Función para crear el elemento de producto
const createProductElement = (product) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    
    const productImage = document.createElement('img');
    productImage.src = product.imageUrl; // Asegúrate de que cada producto tenga una propiedad "imageUrl"
    productImage.alt = product.name;
    
    const productName = document.createElement('p');
    productName.textContent = product.name;

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.textContent = 'Agregar al carrito';

    productItem.appendChild(productImage);
    productItem.appendChild(productName);
    productItem.appendChild(addToCartButton);
    
    return productItem;
};

// Llamar a la función para cargar productos al cargar la página
loadProducts();

// Si el usuario publica un nuevo producto, agregarlo a Firestore
const publishProduct = async (product) => {
    await firestore.collection('productos').add(product);  // Guardamos el producto en Firestore
    loadProducts();  // Recargamos los productos para mostrar el nuevo
};
