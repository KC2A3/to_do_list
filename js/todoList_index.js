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