JS script for Obsidian [Dataview JS](https://blacksmithgu.github.io/obsidian-dataview/api/intro/)

# How to use
1. copy DataviewJS into your vault
2. copy .obsidian/snippets/check-box.css enable snippets in settings->apperance->snippets
3. Call method with annotation dataviewjs 
```
var task_tree_builder = require(app.vault.adapter.basePath + "/DataviewJS/task_tree_builder.js");

let pages = dv.pages("#story").filter(page => page.file.tasks.some(task => !task.completed));

let task_list = task_tree_builder.build(pages,dv, 10,true)
dv.taskList(task_list);
```