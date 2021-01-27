// On récupère tous nos boutons "Ajouter au panier"
const allAddPanier = document.querySelectorAll('.add-to-cart');
// On récupère notre panier
const panier = document.querySelector('#cart-table > tbody');
// On récupère tous nos items
const allItems = document.querySelectorAll('.course__item');

// On ajoute un évênement d'écoute sur tous les boutons "Ajouter au panier"
for (let i = 0; i < allAddPanier.length; i++) {

    allAddPanier[i].addEventListener('click', () => {

        const carte = document.createElement('tr');

        const img = document.createElement('td');
        const test = allItems[i].querySelector('.course_img > img').src;
        img.innerHTML += `<img src=${test}>`;
        carte.appendChild(img);

        const nom = document.createElement('td');
        nom.innerHTML = allItems[i].querySelector('.info__card > h4').textContent;
        carte.appendChild(nom);

        const prix = document.createElement('td');
        prix.innerHTML = allItems[i].querySelector('.info__card > p > .discount').textContent;
        carte.appendChild(prix);

        const quantite = document.createElement('td');
        quantite.innerHTML = '1';
        carte.appendChild(quantite);

        const supprimer = document.createElement('td');
        supprimer.innerHTML = `<a href="#" class="supprimer-item">X</a>`;
        carte.appendChild(supprimer);

        panier.appendChild(carte);
    });
}