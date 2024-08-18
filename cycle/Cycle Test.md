
```dataviewjs
let task_tree_builder = require(app.vault.adapter.basePath + "/DataviewJS/task_tree_builder.js");

let pages = dv.pages("#task_cycled").filter(page => page.file.tasks.some(task => !task.completed));

let task_tree = task_tree_builder.build(pages,dv, 40,true)
console.log(task_tree);
dv.taskList(task_tree);
```
