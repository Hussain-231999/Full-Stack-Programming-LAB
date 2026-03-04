let add_btn = document.getElementById("add_btn");
let item_input = document.getElementById("item_input");
let item_list = document.getElementById("item_list");

add_btn.addEventListener("click", function () {

    let value = item_input.value.trim();

    if (value === "") {
        alert("Enter something first!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = value;

    let delete_btn = document.createElement("button");
    delete_btn.textContent = "Delete";
    delete_btn.className = "delete_btn";

    delete_btn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(delete_btn);
    item_list.appendChild(li);

    item_input.value = "";
});