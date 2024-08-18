If tasks has cycled relation it create error 
```
Evaluation Error: RangeError: Maximum call stack size exceeded
    at listId (plugin:dataview:15447:16)
    at enumerateChildren (plugin:dataview:15455:21)
    at enumerateChildren (plugin:dataview:15458:9)
```

to prevent this we add fake path ending in [[list_tools.js]] funtction createElementFromPageLink 

```js
path: page.file.path + (is_cycled ? "_block":"")
```