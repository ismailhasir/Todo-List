const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

// //Add Function
// const generateTemplate = (todo) => {
//   const html = `<li class="
//     list-group-item
//     d-flex
//     justify-content-between
//     align-items-center
//   "
// >
//   <span>${todo}</span>
//   <i class="far fa-trash-alt delete"></i>
// </li>`;

//   list.innerHTML += html;
// };

const generateRows = (model) => {
  let list = "";

  if (model.length === 0) {
    list = `<li
    class="
      list-group-item
      d-flex
      justify-content-between
      align-items-center
    "
  >
    <span>Şuan ekli bir item yok</span>
  </li>`;
  } else {
    model.forEach((row) => {
      list += `<li
      class="
        list-group-item
        d-flex
        justify-content-between
        align-items-center
      "
      data-id="${row.id}"
    >
      <span>${row.title}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>`;
    });
  }

  const listElement = document.getElementById("list");
  listElement.innerHTML = list;
};

console.log("achviement");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  const model = JSON.parse(localStorage.getItem("obj") || "[]");
  const id = model.length === 0 ? 0 : model[model.length - 1].id;
  model.push({ id: id + 1, title: todo });
  localStorage.setItem("obj", JSON.stringify(model));

  // generateTemplate(todo);

  generateRows(model);
  addForm.reset();
});

const remove = (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    const model = JSON.parse(localStorage.getItem("obj"));
    const newModel = model.filter((row) => row.id != id);

    localStorage.setItem("obj", JSON.stringify(newModel));
    e.target.parentElement.remove();
  }
};

//Delete Function
list.addEventListener("click", (e) => {
  remove(e);
});

//filter function
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

//keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  const modelStr = localStorage.getItem("obj") || "[]";
  const modelArr = JSON.parse(modelStr);

  const newModel = modelArr.filter((row) =>
    row.title.trim().toLowerCase().includes(term)
  );

  generateRows(newModel);

  // filterTodos(term);
});

document.addEventListener("DOMContentLoaded", () => {
  const modelStr = localStorage.getItem("obj") || "[]";
  const modelArr = JSON.parse(modelStr);
  generateRows(modelArr);
});
