
// fonction de recherche
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