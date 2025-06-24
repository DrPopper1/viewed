let data;

if (localStorage.getItem('saved')) {
    data = JSON.parse(localStorage.getItem('saved'));
} else {
    data = [];
}

function list() {
    const red = document.querySelector(".red");
    const blue = document.querySelector(".blue");
    const green = document.querySelector(".green");

    red.innerHTML = '';
    blue.innerHTML = '';
    green.innerHTML = '';

    data.forEach(function(item, i) {
        let li = document.createElement("li");
        li.innerHTML = item.value;

        li.addEventListener('click', function() {
            let question = confirm("Удалить аниме?");
            if (question === true) {
                data.splice(i, 1);
                localStorage.setItem('saved', JSON.stringify(data));
                list();
            } else {
                return;
            }
        });

        if (item.type == 2) {
            blue.append(li);
        } else if (item.type == 3) {
            green.append(li);
        } else {
            red.append(li);
        }
    });

    console.log(localStorage.getItem('saved'));
}

function add(t) {
    let answer = prompt("Как называется аниме?");
    if (answer == "" || answer == null) {
        return;
    } else {
        let newItem = {
            value: answer.trim(),
            type: t
        };
        data.push(newItem);
        localStorage.setItem('saved', JSON.stringify(data));
        list();
    }
}

const input = document.querySelector('input');

input.addEventListener('input', function() {
    let list = document.querySelectorAll('li');
    let value = this.value;
    if(value != '') {
        for(let i = 0; i < list.length; i++) {
            if (list[i].innerText.search(value) == -1) {
                list[i].classList.add('hide');
            } else {
                for(let i = 0; i < list.length; i++) {
                    list[i].classList.remove('hide');
                }
            }
            console.log(value);
        }
    } else {
        for(let i = 0; i < list.length; i++) {
            list[i].classList.remove('hide');
        }
    }
})

list();