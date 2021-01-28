// On récupère tous nos boutons "Ajouter au panier"
const allAddPanier = document.querySelectorAll('.add-to-cart');
// On récupère notre panier
const panier = document.querySelector('#cart-table > tbody');
// On récupère toutes nos formations
const allItems = document.querySelectorAll('.course__item');
// On récupère le bouton "vider le panier"
const resetPanier = document.getElementById('empty-cart');
// On vide le panier si le bouton est cliqué
resetPanier.addEventListener('click', () => {
    while (panier.firstChild) {
        panier.removeChild(panier.firstChild);
    }
    panierStorage = [];
    localStorage.setItem('panierStorage', JSON.stringify(panierStorage));
});
// On récupère la barre de recherche
const SearchInput = document.querySelector('.search-form input');
// Container notifications
const body = document.querySelector('body');
const notification = document.createElement('ul');
notification.setAttribute('id', 'notification_container');
body.appendChild(notification);

let panierStorage = [];

if (localStorage.getItem('panierStorage')) {
    updateItems();
}

function updateItems() {
    panierStorage = JSON.parse( localStorage.getItem('panierStorage') );
    updatePanier();
}

// On ajoute un évênement d'écoute sur tous les boutons "Ajouter au panier"
for (let i = 0; i < allAddPanier.length; i++) {

    allAddPanier[i].addEventListener('click', () => {
        // On affiche la notification d'ajout
        notif(allItems[i].querySelector('.info__card > h4').textContent, "ajouté au");
        // On créé les cartes à afficher dans le panier
        createCarte(i);
        // On créé nos cartes en JSON pour les stocker dans le localStorage
        createObjetJson(i);
    });
}

function createCarte(id) {
    // On créé notre carte pour le panier
    const carte = document.createElement('tr');
    // On créé une colonne pour ajouter l'image
    const img = document.createElement('td');
    const test = allItems[id].querySelector('.course_img > img').src;
    img.innerHTML += `<img src=${test}>`;
    carte.appendChild(img);
    // On créé une colonne pour ajouter le nom de la formation
    const nom = document.createElement('td');
    nom.innerHTML = allItems[id].querySelector('.info__card > h4').textContent;
    carte.appendChild(nom);
    // On créé une colonne pour ajouter le prix
    const prix = document.createElement('td');
    prix.innerHTML = allItems[id].querySelector('.info__card > p > .discount').textContent;
    carte.appendChild(prix);
    // On créé une colonne pour ajouter la quantité
    const quantite = document.createElement('td');
    quantite.innerHTML = '1';
    carte.appendChild(quantite);
    // On créé une colonne pour ajouter le bouton supprimer
    const supprimer = document.createElement('td');
    supprimer.innerHTML = `<a href="#" class="supprimer-item">X</a>`;
    supprimer.addEventListener('click', deleteItem);
    carte.appendChild(supprimer);
    // On ajoute la carte à notre panier
    panier.appendChild(carte);
}

function createObjetJson(id) {
    let carteStorage = {}
    carteStorage.img = allItems[id].querySelector('.course_img > img').src;
    carteStorage.nom = allItems[id].querySelector('.info__card > h4').textContent;
    carteStorage.prix = allItems[id].querySelector('.info__card > p > .discount').textContent;
    carteStorage.quantite = '1';
    carteStorage.supprimer = `<a href="#" class="supprimer-item">X</a>`;

    panierStorage.push(carteStorage);
    localStorage.setItem('panierStorage', JSON.stringify(panierStorage));
}

function updatePanier() {
    for (let i = 0; i < panierStorage.length; i++) {

        const carte = document.createElement('tr');
        let carteStorage = panierStorage[i];

        const img = document.createElement('td');
        const test = carteStorage.img;
        img.innerHTML += `<img src=${test}>`;
        carte.appendChild(img);

        const nom = document.createElement('td');
        nom.innerHTML = carteStorage.nom;
        carte.appendChild(nom);

        const prix = document.createElement('td');
        prix.innerHTML = carteStorage.prix;
        carte.appendChild(prix);

        const quantite = document.createElement('td');
        quantite.innerHTML = carteStorage.quantite;
        carte.appendChild(quantite);

        const supprimer = document.createElement('td');
        supprimer.innerHTML = carteStorage.supprimer;
        supprimer.addEventListener('click', deleteItem);
        carte.appendChild(supprimer);

        panier.appendChild(carte);
    }
}

function deleteItem(e) {
    if (e.target.classList.contains('supprimer-item')) {
        const name = e.target.parentElement.parentElement.querySelectorAll('td')[1].textContent;
        notif(name, "supprimé du");
        deleteItemStorage(e.target);
        e.target.parentElement.parentElement.remove();
    }
}

function deleteItemStorage(target) {
    const index = target.parentElement.parentElement.rowIndex - 1;
    panierStorage.splice(index, 1);
    localStorage.setItem('panierStorage', JSON.stringify(panierStorage));
}

SearchInput.addEventListener('keyup', recherche);

function recherche() {
    let filter, allTitles, titleValue, rien;
    filter = SearchInput.value.toUpperCase();
    allTitles = document.querySelectorAll('h4');
    rien = document.querySelector('.hidden');
    result = 0;

    for (i = 0; i < allItems.length; i++) {

        titleValue = allTitles[i].innerText;

        if (titleValue.toUpperCase().indexOf(filter) > -1) {
            allItems[i].style.display = "flex";
            result++;
            rien.style.display = "none";
        } else {
            allItems[i].style.display = "none";
        }
        if (result === 0) {
            rien.style.display = "block";
        }
    }
}

function notif(nom, action) {

    const notifContent = document.createElement('li');
    notifContent.setAttribute('class', 'content');

    const notifImg = document.createElement('img');
    notifImg.setAttribute('src', 'img/info.png')
    notifContent.appendChild(notifImg);

    const notifTexte = document.createElement('p')
    notifTexte.innerHTML = `${nom} a été ${action} panier`;
    notifContent.appendChild(notifTexte);

    notification.appendChild(notifContent);

    setTimeout(() => {
        notification.removeChild(notification.firstChild);
    }, 3000);
}