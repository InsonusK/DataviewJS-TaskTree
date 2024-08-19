# Expected result
- [ ] Task 1 do 1
- [ ] Task 1 do 2 [[Task 3]] и [[Task 4]]
	- Task 1 do 2 note 1 [[Task 5]]
		- [ ] Task 1 do 2 note 1 do 1 [[Task 6]]
			- Task 1 do 2 note 1 do 1 note 1
			- [N] *[[Task 6]]*
				- [ ] Task 6 do 1
		- [N] *[[Task 5]]*
			- [ ] Task 5 do 1
				- [ ] Task 5 do 1.1 [[Task 1]]
					- [~] *[[Task 1]]* 
	- [ ] Task 1 do 2.2
	- [N] *[[Task 3]]*
		- [ ] Task 3 do 1 #test
			- [ ] Task 3 do 1.1
		- [ ] Task 3 do 2 [[Task10]]
		- [ ] Task 3 do 3 [[Task 5]]
			- [N] *[[Task 5]]*
				- [ ] Task 5 do 1
					- [ ] Task 5 do 1.1 [[Task 1]]
						- [~] *[[Task 1]]* 
	- [N] [[Task 4]]
		- [ ] Task 4 do 1 [[Task 1]]
			- [ ] Task 4 do 1.2
			- [~] [[Task 1]]

# Code result
```dataviewjs
var task_tree_builder = require(app.vault.adapter.basePath + "/DataviewJS/task_tree_builder.js");

let pages = dv.pages("#story").filter(page => page.file.tasks.some(task => !task.completed));

let task_list = task_tree_builder.build(pages,dv, 80,true)
console.log("Task Test");
console.log(task_list);
dv.taskList(task_list);
```


# Notes
```dataviewjs
let pages = dv.pages("#story").filter(page => page.file.tasks.some(task => !task.completed));
//console.log("Task test note")
//console.log(pages.file[1].tasks.values[1].children[0].symbol)
```

```dataviewjs
let pages = dv.pages("#story").filter(page => page.file.tasks.some(task => !task.completed));
dv.taskList(pages.file.tasks);
```
