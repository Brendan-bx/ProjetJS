const inpNom = document.querySelector('#nom');
const inpPrenom = document.querySelector('#prenom');
const inpAdresse = document.querySelector('#adresse');
const inpMail = document.querySelector('#email');
const inpTel = document.querySelector('#telephone');
const inpCb = document.querySelector('#cb');
const allSpan = document.querySelectorAll('span');
const allImg = document.querySelectorAll('.icone-verif');
const valider = document.querySelector('#valider');


// Validation du nom
inpNom.addEventListener('input', function (e) {
    if (e.target.value.length >= 3 && e.target.value.length <= 25) {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/check.svg";
        allSpan[0].style.display = "none";
    }
    else if (e.target.value.length > 25) {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/error.svg";
        allSpan[0].style.display = "inline";
    }
})

// Validation du prénom
inpPrenom.addEventListener('input', function (e) {
    if (e.target.value.length >= 3 && e.target.value.length <= 25) {
        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/check.svg";
        allSpan[1].style.display = "none";
    }
    else if (e.target.value.length > 25) {
        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/error.svg";
        allSpan[1].style.display = "inline";
    }
})

// Validation de l'adresse
inpAdresse.addEventListener('input', function (e) {
    if (e.target.value.length >= 3 && e.target.value.length <= 50) {
        allImg[2].style.display = "inline";
        allImg[2].src = "ressources/check.svg";
        allSpan[2].style.display = "none";
    }
    else if (e.target.value.length > 50) {
        allImg[2].style.display = "inline";
        allImg[2].src = "ressources/error.svg";
        allSpan[2].style.display = "inline";
    }
})

// Validation du mail
inpMail.addEventListener('input', function (e) {
    const regexEmail = /\S+@\S+\.\S+/;

    if (e.target.value.search(regexEmail) === 0) {

        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/check.svg";
        allSpan[3].style.display = "none";

    } else if (e.target.value.search(regexEmail) === -1) {

        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
        allSpan[3].style.display = "inline";

    }

})

// Validation du tel
inpTel.addEventListener('input', function (e) {
    let regex = (/^(\+33|0|0033)[1-9][0-9]{8}/gi);

    if (e.target.value.search(regex) === 0 && (e.target.value.length === 10 || e.target.value.length === 13 || e.target.value.length === 12)) {

        allImg[4].style.display = "inline";
        allImg[4].src = "ressources/check.svg";
        allSpan[4].style.display = "none";

    } else if (e.target.value.search(regex) === -1 || e.target.value.length > 10) {

        allImg[4].style.display = "inline";
        allImg[4].src = "ressources/error.svg";
        allSpan[4].style.display = "inline";

    }

})

// Validation de la CB
inpCb.addEventListener('input', function (e) {
    let regexCb = (/[0-9]{16}/gi);
    if (e.target.value.search(regexCb) === 0 && e.target.value.length === 16) {

        allImg[5].style.display = "inline";
        allImg[5].src = "ressources/check.svg";
        allSpan[5].style.display = "none";

    } else if (e.target.value.search(regexCb) === -1 || e.target.value.length > 16) {

        allImg[5].style.display = "inline";
        allImg[5].src = "ressources/error.svg";
        allSpan[5].style.display = "inline";

    }

})

// Bouton valider
valider.addEventListener('click', function(e) {
    e.preventDefault();
})