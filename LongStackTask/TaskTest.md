```dataviewjs
var task_tree_builder = require(app.vault.adapter.basePath + "/DataviewJS/task_tree_builder.js");

let pages = dv.pages("#StoryLongChain").filter(page => page.file.tasks.some(task => !task.completed));

dv.taskList(task_tree_builder.build(pages,dv, 100,true));
```

```dataviewjs_OFF
var task_tree_builder = require(app.vault.adapter.basePath + "/DataviewJS/task_tree_builder.js");

let pages = dv.pages("#StoryLongSubtask").filter(page => page.file.tasks.some(task => !task.completed));

dv.taskList(task_tree_builder.build(pages,dv, 7,true));
```