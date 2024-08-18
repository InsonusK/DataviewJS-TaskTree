var list_tool = require(app.vault.adapter.basePath + "/DataviewJs/list_tools.js");

function filterTask(task, context) {
	// Filter task by context config
	return (!task.completed || context.show_completed)
}

function processOutlink(outlinkPage, level, stack, context) {
	// process outlink, convert it into task
	const is_cycled = stack.includes(outlinkPage.file.path)
	let outlink_task = list_tool.createElementFromPageLink(outlinkPage, is_cycled)
	if (!is_cycled && level < context.max_level) {
		let outlink_subtasks = processPage(outlinkPage, level, stack, context)
		outlink_task.children.push(...outlink_subtasks)
	}
	return outlink_task
}

function processElement(task, level, stack, context) {
	// process element, convert it into fake task
	let ret_task = list_tool.cloneElement(task);

	// process sub element of task
	for (let child of task.children.filter(t => filterTask(t, context))) {
		let child_task = processElement(child, level + 1, stack, context)
		ret_task.children.push(child_task)
	}

	// precess outlinks in element
	if (task.outlinks && task.outlinks.length > 0) {
		for (let outlinkPage of task.outlinks
			.map(o => context.dv.page(o.path))
			.filter(l => l)) {
			let outlink_task = processOutlink(outlinkPage, level + 1, stack, context)
			ret_task.children.push(outlink_task)
		}
	}
	return ret_task
}

function processPage(page, level, stack, context) {
	// process note, convert it into array of elements
	let ret_tasks = []
	let new_stack = [...stack, page.file.path]
	for (let task of page.file.tasks
		.where(t => filterTask(t, context) && t.parent == null)) {
		//При переборе page.file.tasks перебираются все task включая подтаски
		let ret_task = processElement(task, level + 1, new_stack, context)
		ret_tasks.push(ret_task);
	}
	return ret_tasks
}

function build(pages, dv, max_level = 9, show_completed = false) {
	// Build task tree from dataview page list
	const context = {
		max_level: max_level, // max level of sub note tasks
		show_completed: show_completed, // show completed tasks
		dv: dv // link to dataview class
	}
	let allTasks = [];
	for (let page of pages) {
		allTasks.push(...processPage(page, 0, [], context))
	}
	return allTasks;
}
exports.build = build;