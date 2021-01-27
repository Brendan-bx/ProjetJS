
let recupStringPanierStorage = localStorage.getItem('panierStorage');
let recupPanierStorage = JSON.parse(recupStringPanierStorage)   
console.log(recupPanierStorage)

for (let i = 0; i < recupPanierStorage.length; i++) {

        const carte = document.createElement('tr');
        let carteStorage = recupPanierStorage[i];
        console.log(carteStorage)


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


