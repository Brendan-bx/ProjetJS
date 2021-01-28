const inpMail = document.querySelector('.form-groupe:nth-child(4) input');
const inpTel = document.querySelector('.form-groupe:nth-child(5) input');
const inpCb = document.querySelector('.form-groupe:nth-child(7) input');
const allSpan = document.querySelectorAll('span');
const allImg = document.querySelectorAll('.icone-verif');

inpMail.addEventListener('input', function(e){
    const regexEmail= /\S+@\S+\.\S+/;

    if(e.target.value.search(regexEmail) === 0){

        allSpan[1].style.display = "none";

    } else if(e.target.value.search(regexEmail) === -1) {

        allSpan[1].style.display = "inline";

    }

})

inpTel.addEventListener('input', function(e)
{
  let regex = (/^(06|07)[0-9]{8}/gi);
  if(e.target.value.search(regex) === 0){

    allSpan[2].style.display = "none";

} else if(e.target.value.search(regex) === -1) {

    allSpan[2].style.display = "inline";

}

})

inpCb.addEventListener('input', function(e)
{
  let regexCb = (/^(06|07)[0-9]{8}/gi);
  if(e.target.value.search(regexCb) === 0){

    allSpan[3].style.display = "none";

} else if(e.target.value.search(regexCb) === -1) {

    allSpan[3].style.display = "inline";

}

})
    
    








