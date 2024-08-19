function cloneElement(element) {
    let status_of_element = element.task ? element.status : "-"
    let text = element.text
    if (element.symbol && element.symbol !== "-") {
        text = `**${element.symbol}**${text}`;
    }
	return {
	    //annotated: task.annotated,
	    //section: task.section
	    header: element.header,
	    symbol: element.symbol,
	    tags: element.tags,
        text: text,       
        status: status_of_element,   	// Element status, filling [ ] for task element
        task: true,       	// Flag that list element is task
        real: false,           		// Flag that element is fake, but it doesn't effect to anything
        link: element.link,       	// Link to source where element was found
        children: [],          		// List of children element. Make it empty because we will it fill manually
        subtasks: [],          		// List of children subtasks. Make it empty because we will fill children elements and this list will to effect to anything
        path: element.path,       	// Path to note where element exist
        annotated: element.annotated || false,
        line: element.line,       	// Line in note where element exist
        lineCount: element.lineCount, // Amount of lines in element
        //list: element.list,
        //outlinks: task.outlinks || [], 
        parent: element.parent || null,  // Parent element id 
        position: element.position || {}, // Elemnent position in source note
    };
}
exports.cloneElement = cloneElement;

function createElementFromPageLink(page,is_cycled) {
	    return {
	        text: "*"+page.file.link+"*",   // Form fake task name as link in italics style
	        status: is_cycled ? "~" : "N",  // Fake status depend on kind of task
	        task: true,                     // Flag that element will be task
	        real: false,                    // flag that element is fake
	        children: [],                   // List of children element. Make it empty because we will it fill manually
	        subtasks: [],                   // List of children subtasks. Make it empty because we will fill children elements and this list will to effect to anything
	        path: page.file.path + (is_cycled ? "_block":"") // Path to note, if it cycled make fake path. To prevent stack overflow (read Docs/Stackoverflow error.md)
	    };
	}
exports.createElementFromPageLink = createElementFromPageLink;
