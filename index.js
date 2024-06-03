let form = document.forms.namedItem('todo');
let container = document.querySelector(".container");
let input = document.querySelector("input");

let todos = [];
reload(todos, container);

form.onsubmit = (e) => {
    e.preventDefault();
    const fm = new FormData(form);

    const task = {
        id: crypto.randomUUID(),
        task: fm.get('title'),
        time: new Date().toTimeString().split(' ')[0],
        isDone: false
    };

    todos.push(task);
    reload(todos, container);
};

function reload(arr, place) {
    place.innerHTML = "";

    for (let item of arr) {
        const divItem = document.createElement('div');
        divItem.classList.add('item');
        divItem.dataset.id = item.id;

        const divTopSide = document.createElement('div');
        divTopSide.classList.add('top-side');

        const spanTitle = document.createElement('span');
        spanTitle.textContent = item.task;
        if (item.isDone) {
            spanTitle.style.textDecoration = 'line-through';
        }

        const buttonClose = document.createElement('button');
        buttonClose.textContent = 'x';

        const spanTime = document.createElement('span');
        spanTime.classList.add('time');
        spanTime.textContent = item.time;

        divTopSide.appendChild(spanTitle);
        divTopSide.appendChild(buttonClose);

        divItem.appendChild(divTopSide);
        divItem.appendChild(spanTime);

        place.append(divItem);

        buttonClose.onclick = () => {
            todos = todos.filter(todo => todo.id !== item.id);
            reload(todos, place);
        };

        spanTitle.onclick = () => {
            item.isDone = !item.isDone;
            reload(todos, place);
        };
    }
}

console.log(todos);
