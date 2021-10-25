const input = document.getElementById("input");

let count = 0;
let ID = 0;
let FOR = 0;
document.addEventListener("keydown",function(event){
    if (event.keyCode === 13){
        const todo = input.value;
        if (todo){
            document.querySelector(".todo-app__list").innerHTML += `
            <li class="todo-app__item">
                <div class="todo-app__checkbox" id="box" onclick="click()">
                    <input id="${ID}" type="checkbox"/>
                    <label for="${FOR}"></label>
                </div>
                <h1 class="todo-app__item-detail linethrough">${todo}</h1>
                <img class="todo-app__item-x" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjP2j_jtsuLU9ojNG6Oen_duYe28dh7XBB7w&usqp=CAU">
            </li>`
            ID++;
            FOR++;
            count++;
            let current = document.querySelectorAll(".todo-app__item-x");
            for (let i = 0; i < current.length; i++){
                current[i].onclick = function(){
                    this.parentNode.remove();
                    count--;
                    document.querySelector(".todo-app__total").innerHTML = count + ` tasks`;
                }
            }
            document.querySelector(".todo-app__total").innerHTML = count + ` tasks`;
            //let check = document.querySelector(".todo-app__checkbox");
            
        }
        else{
            alert("enter sth !");
        }
        input.value = "";
    }
});

