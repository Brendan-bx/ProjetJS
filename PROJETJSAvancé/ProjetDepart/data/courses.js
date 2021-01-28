const COURSES = {
  1: {id: 1, img: 'ux_ui.jpg', title: 'UX/UI', initial_price: 200, price: 9.99, mark: 4, stock: 10},
  2: {id: 2, img: 'php_8.png', title: 'PHP 8', initial_price: 200, price: 9.99, mark: 3, stock: 10},
  3: {id: 3, img: 'react_js.png', title: 'React JS', initial_price: 200, price: 9.99, mark: 2, stock: 5},
  4: {id: 4, img: 'node_js.jpg', title: 'Node JS', initial_price: 200, price: 9.99, mark: 5, stock: 3},
  5: {id: 5, img: 'my_sql.png', title: 'MySQL', initial_price: 200, price: 9.99, mark: 4, stock: 2}
}

createContainerItem();

function createContainerItem() {
  const container = document.querySelectorAll('.courses__container')[1];
  const courses = Object.values(COURSES);
  console.log(courses);

  courses.forEach(course => {
    let divItem = document.createElement('div');
    divItem.classList.add('course__item');
    divItem.innerHTML += `

    <figure class="course_img">
        <img src="img/courses/${course.img}">
    </figure>
    <div class="info__card">
      <h4>${course.title}</h4>
      <figure class="mark m_4">
        <img src="img/rates.png">
      </figure>
      <p>
        <span class="price">${course.initial_price} €</span>
        <span class="discount">${course.price} €</span>
      </p>
      <p>
        Disponible: <span class="stock">${course.stock}</span>
      </p>
      <a href="#" class="add-to-cart" data-id="1"><i class="fa fa-cart-plus"></i>Ajouter au panier</a>
    </div>`

    container.appendChild(divItem);
  });
}