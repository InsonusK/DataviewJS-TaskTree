function cloneTask(task) {
	
	//const new_status = !task.task ? "-" : task.status;
    return {
	    //annotated: task.annotated,
	    //section: task.section
	    header: task.header,
	    symbol: task.symbol,
	    tags: task.tags,
        text: task.text,       // Текст задачи
        status: task.status,   // Статус задачи (выполнена или нет)
        task: task.task,            // Флаг, что это задача
        real: false,           // Флаг, что это искусственная задача
        link: task.link,       // Ссылка на оригинальную задачу
        children: [],          // Пустой массив детей (не наследует подзадачи)
        subtasks: [],          // Пустой массив подзадач
        path: task.path,       // Путь к файлу задачи
        annotated: task.annotated || false, // Свойство аннотации
        line: task.line,       // Строка в оригинальном файле
        lineCount: task.lineCount, // Количество строк задачи
        //list: task.list,
        //outlinks: task.outlinks || [], // Ссылки на внешние объекты
        parent: task.parent || null,  // Родительская задача (если есть)
        position: task.position || {}, // Позиция задачи в документе
    };
}
exports.cloneTask = cloneTask;

function createTaskFromPageLink(page,is_cycled) {
	    return {
	        text: "*"+page.file.link+"*",           // Название страницы как текст задачи
	        status: is_cycled ? "~" : "N",                    // Статус задачи (например, "N" для новой)
	        task: true,//is_cycled,                     // Флаг, что это задача
	        real: false,                    // Флаг, что это искусственная задача
	        //link: page.file.link,           // Ссылка на заметку
	        children: [],                   // Пустой массив детей
	        subtasks: [],                   // Пустой массив подзадач
	        path: page.file.path + (is_cycled ? "_block":"")            // Путь к файлу страницы
	    };
	}
exports.createTaskFromPageLink = createTaskFromPageLink;
