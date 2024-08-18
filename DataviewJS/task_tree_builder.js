var task_tool = require(app.vault.adapter.basePath + "/DataviewJs/task_tools.js");

function filterTask(task, context){
	    return (!task.completed || context.show_completed)
	}
	
function processOutlink(outlinkPage,level,stack, context){
	const is_cycled = stack.includes(outlinkPage.file.path)
	let outlink_task = task_tool.createTaskFromPageLink(outlinkPage,is_cycled)
	if (!is_cycled && level < context.max_level){
		let outlink_subtasks = processPage(outlinkPage, level,stack,context)
		outlink_task.children.push(...outlink_subtasks)
	}
	return outlink_task
}
	
function processTask(task, level,stack, context) {
	// Обрабатываем задачу, проверяем, что в ней есть ссылки на другие заметки
	// если в задаче есть ссылки на другие заметки формируем из задач заметки список подзадач
	let ret_task = task_tool.cloneTask(task);
	
	for (let child of task.subtasks.filter(t=> filterTask(t,context))) {
		let child_task = processTask(child,level+1,stack, context)
		ret_task.children.push(child_task)
	}
	
	if (task.outlinks && task.outlinks.length > 0) {
		for (let outlinkPage of task.outlinks
										.map(o=>context.dv.page(o.path))
										.filter(l=>l)){
			let outlink_task = processOutlink(outlinkPage, level+1,stack,context)
			ret_task.children.push(outlink_task)
		}
	}
	return ret_task
}
	
function processPage(page, level, stack, context){
	// Обрабатываем заметку с задачами формируя дерево задач заметки
	let ret_tasks = []
	let new_stack = [...stack, page.file.path]
	for (let task of page.file.tasks
								.where(t => filterTask(t,context) && t.parent == null)) {
		//При переборе page.file.tasks перебираются все task включая подтаски
		let ret_task = processTask(task, level+1, new_stack,context)
		ret_tasks.push(ret_task);
	}
	return ret_tasks
}
	
function build(pages,dv,max_level = 9, show_completed = false){
	const context = {
		max_level:max_level,
		show_completed:show_completed,
		dv:dv
	}
	let allTasks = [];
	for (let page of pages) {
		allTasks.push(...processPage(page, 0, [],context))
	}
	return allTasks;
}
exports.build = build;