
```dataviewjs
function cloneTask(task) {
    //const new_status = !task.task ? "-" : task.status;
    return {
        //annotated: task.annotated,
        //section: task.section
        header: task.header,
        symbol: task.symbol,
        tags: task.tags,
        text: task.text,       // Текст задачи
        status: task.status,   // Статус задачи (выполнена или нет)
        task: task.task,            // Флаг, что это задача
        real: false,           // Флаг, что это искусственная задача
        link: task.link,       // Ссылка на оригинальную задачу
        children: [],          // Пустой массив детей (не наследует подзадачи)
        subtasks: [],          // Пустой массив подзадач
        path: task.path,       // Путь к файлу задачи
        annotated: task.annotated || false, // Свойство аннотации
        line: task.line,       // Строка в оригинальном файле
        lineCount: task.lineCount, // Количество строк задачи
        //list: task.list,
        //outlinks: task.outlinks || [], // Ссылки на внешние объекты
        parent: task.parent || null,  // Родительская задача (если есть)
        position: task.position || {}, // Позиция задачи в документе
    };
}

function createTaskFromPageLink(page,is_cycled) {
        return {
            text: "*"+page.file.link+"*",           // Название страницы как текст задачи
            status: is_cycled ? "~" : "N",                    // Статус задачи (например, "N" для новой)
            task: true,//is_cycled,                     // Флаг, что это задача
            real: false,                    // Флаг, что это искусственная задача
            link: page.file.link,           // Ссылка на заметку
            children: [],                   // Пустой массив детей
            subtasks: [],                   // Пустой массив подзадач
            path: page.file.path + (is_cycled ? "_block":"")            // Путь к файлу страницы
        };
    }

function filterTask(task, context){
        return (!task.completed || context.show_completed)
    }

function processOutlink(outlinkPage,level,stack, context){
    const is_cycled = stack.includes(outlinkPage.file.path)
    let outlink_task = createTaskFromPageLink(outlinkPage,is_cycled)
    if (!is_cycled && level < context.max_level){
        let outlink_subtasks = processPage(outlinkPage, level,stack,context)
        outlink_task.children.push(...outlink_subtasks)
    }
    return outlink_task
}

function processTask(task, level,stack, context) {
    // Обрабатываем задачу, проверяем, что в ней есть ссылки на другие заметки
    // если в задаче есть ссылки на другие заметки формируем из задач заметки список подзадач
    let ret_task = cloneTask(task);
    
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

let pages = dv.pages("#task_cycled").filter(page => page.file.tasks.some(task => !task.completed));

let task_tree = build(pages,dv, 40,true)
console.log(task_tree);
dv.taskList(task_tree);
```
