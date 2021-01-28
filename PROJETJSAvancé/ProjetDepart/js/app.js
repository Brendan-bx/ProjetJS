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
        const nameChild = panier.firstChild.querySelectorAll('td')[1].textContent;
        verifCourseToRemove(nameChild);
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

// Si le client a déjà un panier on le charge via son local Storage
if (localStorage.getItem('panierStorage')) {
    updateItemsPanier();
}
// Récupère les éléments du panier stockés dans le local Storage
function updateItemsPanier() {
    panierStorage = JSON.parse(localStorage.getItem('panierStorage'));
    updatePanier();
    updateStock();
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
        // On met à jour le contenu html
        updateCoursesHtml(i, "remove");
    });
}

/**
 * Créer un élément HTML avec toutes les infos du cours qui a été ajouté au panier
 * @param {number} id représente l'index du cours à ajouter au panier
 */
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

/**
 * Créer un objet Json avec toutes les infos du cours qui a été ajouté au panier
 * @param {number} id représente l'index du cours à ajouter au panier
 */
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

//fonction de compte à rebours
function t() {
    var compteur = document.getElementById('compteur');
    s = duree;
    m = 0; h = 0;
    const prix = document.querySelector('.course__item .discount')
    prix.textContent = "Gratuit"
    if (s < 0) {
        compteur.innerHTML = "La réduction n'est plus disponible"
        prix.textContent = "9.99 €"
    }
    else {
        if (s > 59) {
            m = Math.floor(s / 60);
            s = s - m * 60
        }
        if (m > 59) {
            h = Math.floor(m / 60);
            m = m - h * 60
        }
        if (s < 10) {
            s = "0" + s
        }
        if (m < 10) {
            m = "0" + m
        }
        compteur.innerHTML = h + ":" + m + ":" + s;
    }
    duree = duree - 1;
    window.setTimeout("t();", 999);
}
duree = "20"
t();


/**
 * Met à jour la partie HTML du panier si le client a un panier dans son local storage
 */
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

/**
 * retire le cours du panier si on clique sur le bouton supprimer
 * @param {any} e evenement
 */
function deleteItem(e) {
    if (e.target.classList.contains('supprimer-item')) {
        const name = e.target.parentElement.parentElement.querySelectorAll('td')[1].textContent;

        // On supprime l'élément du localStorage et du panier
        notif(name, "supprimé du");
        deleteItemStorage(e.target);
        e.target.parentElement.parentElement.remove();

        // On vérifie quel cours correspond à l'élément supprimé
        verifCourseToRemove(name);
    }
}

/**
 * Supprime le cours du local storage
 * @param {HTML element} target cible cliqué
 */
function deleteItemStorage(target) {
    const index = target.parentElement.parentElement.rowIndex - 1;
    panierStorage.splice(index, 1);
    localStorage.setItem('panierStorage', JSON.stringify(panierStorage));
}



//fonction de notifications
/**
 * Affiche une notification si un cours a été ajouté ou supprimé du panier
 * @param {string} nom nom du cours cliqué
 * @param {string} action action réalisé (ajouté ou supprimé)
 */
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

/**
 * Met à jours les stock dispo dans l'HTML
 * @param {number} id représente l'index du cours à mettre à jour
 * @param {string} action action à réaliser (add / remove)
 */
function updateCoursesHtml(id, action) {
    const coursesContainer = document.querySelectorAll('.courses__container');
    const courseItem = coursesContainer[1].children;
    const stock = courseItem[id].querySelector('.stock');

    // On verifie si c'est une incrémentation ou une décrémentation du stock
    if (action === "add") {
        addStock(id, stock);
    }
    if (action === "remove") {
        removeStock(id, stock);
    }

    // Si le stock arrive à 0, retire le cours en question
    if (parseInt(stock.textContent) <= 0) {
        courseItem[id].style.display = "none";
    } else {
        courseItem[id].style.display = "flex";
    }
}

/**
 * Ajoute la quantité au stock du cours retiré du panier
 * @param {number} id représente l'index du cours à mettre à jour
 * @param {HTML element} stock span représentant le stock
 */
function addStock(id, stock) {
    // On ajoute un element dans le HTML
    stock.textContent = parseInt(stock.textContent) + 1;
    // On ajoute un element dans le stock du json
    Object.values(COURSES)[id].stock++;
}

/**
 * Retire la quantité au stock du cours retiré du panier
 * @param {number} id représente l'index du cours à mettre à jour
 * @param {HTML element} stock span représentant le stock
 */
function removeStock(id, stock) {
    // On ajoute un element dans le HTML
    stock.textContent = parseInt(stock.textContent) - 1;
    // On ajoute un element dans le stock du json
    Object.values(COURSES)[id].stock--;
}

/**
 * Controle sur quel cours il faut rajouter du stock après avoir supprimer le cours du panier
 * @param {string} nameTarget nom du cours sur lequel on clique
 */
function verifCourseToRemove(nameTarget, update = false) {
    for (let i = 0; i < allItems.length; i++) {
        const nomCourse = allItems[i].querySelector('.info__card > h4').textContent;
        // incrémente la quantité disponible
        if (nameTarget === nomCourse && !update) {
            updateCoursesHtml(i, "add");
            break;
        }
        if (nameTarget === nomCourse && update) {
            updateCoursesHtml(i, "remove");
            break;
        }
    }
}

/**
 * Met à jour les stock des cours si le client a des cours dans son panier
 */
function updateStock() {
    panierStorage.forEach( element => {
        verifCourseToRemove(element.nom, true);
    });
}