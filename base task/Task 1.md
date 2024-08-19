---
tags:
  - story
---
1. [ ] Task 1 do 1 #test 
2. [ ] Task 1 do 2 [[Task 3]] и [[Task 4]] [[some note]]
	- Task 1 do 2 note 1 [[Task32]]
		- [ ] Task 1 do 2 note 1 do 1 [[Task 6]]
			- Task 1 do 2 note 1 do 1 note 1
		- [x] Task 1 do 2 note 1 do 2 done [completion:: 2024-08-18]
	- [ ] Task 1 do 2.2
3. Task 1 note 1


```dataviewjs_test
console.log("Task 1")
console.log(dv.current().file)
dv.taskList(dv.current().file.tasks.values)
```