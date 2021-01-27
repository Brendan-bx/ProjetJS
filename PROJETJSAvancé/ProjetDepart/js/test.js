// On récupère tous nos boutons "Ajouter au panier"
const allAddPanier = document.querySelectorAll('.add-to-cart');
// On récupère notre panier
const panier = document.querySelector('#cart-table > tbody');
// On récupère tous nos items
const allItems = document.querySelectorAll('.course__item');

console.log(localStorage)
//localStorage.clear();

let recupStringPanierStorage2 = localStorage.getItem('panierStorage');
let recupPanierStorage2 = JSON.parse(recupStringPanierStorage2)   
let panierStorage = recupPanierStorage2;


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
        supprimer.addEventListener('click', deleteItem);
        carte.appendChild(supprimer);

        panier.appendChild(carte);

        let carteStorage = {}
        carteStorage.img = allItems[i].querySelector('.course_img > img').src;
        carteStorage.nom = allItems[i].querySelector('.info__card > h4').textContent;
        carteStorage.prix = allItems[i].querySelector('.info__card > p > .discount').textContent;
        carteStorage.quantite = '1';
        carteStorage.supprimer = `<a href="#" class="supprimer-item">X</a>`;

        console.log(carteStorage)

        
        panierStorage.push(carteStorage)
        let stringPanierStorage = JSON.stringify(panierStorage)
        console.log(stringPanierStorage)
      
        localStorage.setItem('panierStorage', stringPanierStorage);
      
        let recupStringPanierStorage = localStorage.getItem('panierStorage');
        let recupPanierStorage = JSON.parse(recupStringPanierStorage)   
        console.log(recupPanierStorage)

    });
}

function deleteItem(e) {
    console.log(e.target);
    if (e.target.classList.contains('supprimer-item')) {
        e.target.parentElement.parentElement.remove();
    }
}
