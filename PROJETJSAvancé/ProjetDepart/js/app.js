// On récupère tous nos boutons "Ajouter au panier"
const allAddPanier = document.querySelectorAll('.add-to-cart');
// On récupère notre panier
const panier = document.querySelector('#cart-table > tbody');
// On récupère tous nos items
const allItems = document.querySelectorAll('.course__item');
// On récupère le bouton "vider le panier"
const resetPanier = document.getElementById('empty-cart');
// On vide le panier si le bouton est cliqué
resetPanier.addEventListener('click', () => {
    while (panier.firstChild) {
        panier.removeChild(panier.firstChild);
    }
});
// On récupère la barre de recherche
const SearchInput = document.querySelector('.search-form input');
// Container notifications
const body= document.querySelector('body');
const notification = document.createElement('ul');
notification.setAttribute('id','notification_container');
body.appendChild(notification);

let panierStorage = [];
let recupStringPanierStorage2 = localStorage.getItem('panierStorage');
let recupPanierStorage2 = JSON.parse(recupStringPanierStorage2)  
if (recupPanierStorage2 != null) {
    panierStorage = recupPanierStorage2;
}

// On ajoute un évênement d'écoute sur tous les boutons "Ajouter au panier"
for (let i = 0; i < allAddPanier.length; i++) {

    allAddPanier[i].addEventListener('click', () => {
        // On affiche la notification d'ajout
        notif(allItems[i].querySelector('.info__card > h4').textContent, "ajouté au");
        // On créé notre carte pour le panier
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
        supprimer.addEventListener('click', deleteItem);
        carte.appendChild(supprimer);

        panier.appendChild(carte);

        
        let carteStorage = {}
        carteStorage.img = allItems[i].querySelector('.course_img > img').src;
        carteStorage.nom = allItems[i].querySelector('.info__card > h4').textContent;
        carteStorage.prix = allItems[i].querySelector('.info__card > p > .discount').textContent;
        carteStorage.quantite = '1';
        carteStorage.supprimer = `<a href="#" class="supprimer-item">X</a>`;

        // console.log("carte storage = ", carteStorage)

        
        panierStorage.push(carteStorage);
        let stringPanierStorage = JSON.stringify(panierStorage);
        // console.log("string panier = ", stringPanierStorage)
      
        localStorage.setItem('panierStorage', stringPanierStorage);
      
        let recupStringPanierStorage = localStorage.getItem('panierStorage');
        let recupPanierStorage = JSON.parse(recupStringPanierStorage);  
        // console.log("recup panier = ", recupPanierStorage)
    });
}

function deleteItem(e) {
    if (e.target.classList.contains('supprimer-item')) {
        const name = e.target.parentElement.parentElement.querySelectorAll('td')[1].textContent;
        notif(name, "supprimé du");
        e.target.parentElement.parentElement.remove();
    }
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

function notif(nom, action){

    const notifContent = document.createElement('li');
    notifContent.setAttribute('class','content');

    const notifImg = document.createElement('img');
    notifImg.setAttribute('src','img/info.png')
    notifContent.appendChild(notifImg);

    const notifTexte = document.createElement('p')
    notifTexte.innerHTML = `${nom} a été ${action} panier`;
    notifContent.appendChild(notifTexte);

    notification.appendChild(notifContent);

    setTimeout(() => {
        notification.removeChild(notification.firstChild);
    }, 3000);
}