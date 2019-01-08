function addTodolist() {
  var list = {
    todo: "",
    done: false
  };
  if (document.getElementById("add_list").value.length === 0) {
    alert("不能为空");
    return;
  }
  list.todo = document.getElementById("add_list").value;
  todolist.push(list);
  saveData(todolist);
  document.getElementById("add_list").value = "";
  load();
}

function load() {
  var todo = document.getElementById("todolist");
  var done = document.getElementById("donelist");
  var todoString = "";
  var doneString = "";
  document.getElementById("add_list").focus();
  todolist = loadData();
  if (todolist != null) {
    for (var i = 0; i < todolist.length; i++) {
      if (!todolist[i].done) {
        todoString += "<li>" + "<input type='checkbox' onchange='update(" + i + ", \"done\", true)'>" + "<p id='p-" + i + "' onclick='changeType(" + i + ")'>" + todolist[i].todo + "</p>" + "<a onclick='remove(" + i + ")'>×</a>" + "</li>";
      } else {
        doneString += "<li>" + "<input type='checkbox' " + "onchange='update(" + i + ", \"done\", false)' checked>" + "<p id='p-" + i + "' onclick='changeType(" + i + ")'>" + todolist[i].todo + "</p>" + "<a onclick='remove(" + i + ")'>×</a>" + "</li>";
      }
    }
    todo.innerHTML = todoString;
    done.innerHTML = doneString;
  } else {
    todo.innerHTML = "";
    done.innerHTML = "";
  }
}

function changeType(number) {
  var p = document.getElementById('part-' + number),
    pContent = p.innerHTML,
    inputId;

  function confirm() {
    if (inputId.value.length === 0) {
      p.innerHTML = pContent;
      alert("内容不能为空");
    } else {
      update(i, "todo", inputId.value);
    }
  }

  function enter(event) {
    if (event.keyCode == 13) {
      confirm();
    }
  }
  p.innerHTML = "<input type='text' id='input-" + i + "' value='" + pContent + "'>";
  inputId = document.getElementById('input-' + i);
  inputId.focus();
  inputId.setSelectionRange(0, inputId.value.length);
  inputId.onblur = confirm;
  inputId.onkeypress = enter;
}

function update(i, field, value) {
  todolist[i][field] = value;
  saveData(todolist);
  load();
}

function remove(i) {
  todolist.splice(i, 1);
  saveData(todolist);
  load();
}

function saveData(data) {
  localStorage.setItem("mytodolist", JSON.stringify(data));
}

function loadData() {
  var history = localStorage.getItem("mytodolist");
  if (history != null) {
    return JSON.parse(history);
  } else {
    return [];
  }
}

function clear() {
  localStorage.clear();
  load();
}
window.addEventListener("load", load);
document.getElementById("clearbutton").onclick = clear;
document.getElementById("add_list").onkeypress = function(event) {
  if (event.keyCode === 13) {
    addTodolist();
  }
};