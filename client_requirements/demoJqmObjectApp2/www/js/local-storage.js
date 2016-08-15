var LocalStorageDB = function(successCallback, errorCallback) {
	// Used to simulate async calls. This is done to provide a consistent interface with storage methods like WebSQL and serverside ajax calls
    var callDelay = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            }, 100);
        }
    }

 // Allows us to sort an array of object - Use array.sort(sortByProperty('firstName'));
    var sortByProperty = function(property) {
        'use strict';
        return function (a, b) {
            var sortStatus = 0;
            if (a[property] < b[property]) {
                sortStatus = -1;
            } else if (a[property] > b[property]) {
                sortStatus = 1;
            }
     
            return sortStatus;
        };
    }
 
	// Sample Data (An array of objects)
    var todos = [
        {"id": 1, "title": "Go to the shop", "description": "Get milk and bread", "status": 0},
        {"id": 2, "title": "Post office", "description": "Collect mail", "status": 0},
        {"id": 3, "title": "Email Dad", "description": "About birthday", "status": 0},
        {"id": 4, "title": "Haircut", "description": "Well overdue", "status": 1}
    ];

    // Add the sample data to localStorage
    window.localStorage.setItem("todos", JSON.stringify(todos));

    this.findAll = function(callback) {
    	// Parse a string as json 
    	var todos = JSON.parse(window.localStorage.getItem("todos"));
        callDelay(callback, todos); 
    }

    this.findById = function(id, callback) {
        var todos = JSON.parse(window.localStorage.getItem("todos")),
        	todo = null,
        	len = todos.length,
            i = 0;
        
        for (; i < len; i++) {

            if (todos[i].id === id) {
                todo = todos[i];
                break;
            }
        }

        callDelay(callback, todo);
    }

    this.markCompleted = function(id, callback) {

        // Get all todos
        var todos = JSON.parse(window.localStorage.getItem("todos")),
            todo = null,
            len = todos.length,
            i = 0;
        
        // Loop through them and update the value
        $.each(todos, function(i, v) {
            if ( v.id === id ) {
                v.status = 1;
                return false;
            }
        });

        // Save the JSON back to localStorage
        if (window.localStorage.setItem("todos", JSON.stringify(todos))) {
            callDelay(callback, "true");
        } else {
            callDelay(callback, "false");
        }
    }

    this.markOutstanding = function(id, callback) {

        // Get all todos
        var todos = JSON.parse(window.localStorage.getItem("todos")),
            todo = null,
            len = todos.length,
            i = 0;
        
        // Loop through them and update the value
        $.each(todos, function(i, v) {
            if ( v.id === id ) {
                v.status = 0;
                return false;
            }
        });

        // Save the JSON back to localStorage
        if (window.localStorage.setItem("todos", JSON.stringify(todos))) {
            callDelay(callback, "true");
        } else {
            callDelay(callback, "false");
        }
    }

    this.insert = function(json, callback) {

        // Converts a JavaScript Object Notation (JSON) string into an object.
        var passedJson = JSON.parse(json),
            status = 0;
        
        // Get all todos
        var todos = JSON.parse(window.localStorage.getItem("todos")),
            todo = null,
            len = todos.length,
            i = 0;
        
        // Sort the json by ID (default is ASC)
        todos.sort(sortByProperty('id'));

        // Generate a new ID, pop the last obj in the array and grab the ID
        var lastTodo = todos.pop(),
            newID = lastTodo.id + 1;

        // Create the new Todo
        var newTodo = {"id": newID, "title": passedJson.title, "description": passedJson.description, "status": 0}

        // Add it to the existing todos        
        todos.push(lastTodo); // Add the popped one back in
        todos.push(newTodo);

        // Save the JSON back to localStorage
        if (window.localStorage.setItem("todos", JSON.stringify(todos))) {
            callDelay(callback, "true");
        } else {
            callDelay(callback, "false");
        }
    }

    this.update = function(json, callback) {

        // Converts a JavaScript Object Notation (JSON) string into an object.
        var passedJson = JSON.parse(json);

        // Get all todos
        var todos = JSON.parse(window.localStorage.getItem("todos")),
            todo = null,
            len = todos.length,
            i = 0;
        
        // Loop through them and update the value
        $.each(todos, function(i, v) {

            if ( v.id == passedJson.id ) {                
                v.title = passedJson.title;
                v.description = passedJson.description;
                return false;
            }
        });

        // Save the JSON back to localStorage
        if (window.localStorage.setItem("todos", JSON.stringify(todos))) {
            callDelay(callback, "true");
        } else {
            callDelay(callback, "false");
        }
    }

    this.delete = function(json, callback) {

        // Converts a JavaScript Object Notation (JSON) string into an object.
        var passedJson = JSON.parse(json);

        // Get all todos
        var todos = JSON.parse(window.localStorage.getItem("todos")),
            todo = null,
            len = todos.length,
            i = 0;

        // Loop through existing todos and remove one to be deleted
        for(var i=0; i<todos.length; i++){
            if(todos[i].id == passedJson.id){
                todos.splice(i, 1);  //removes 1 element at position i 
                break;
            }
        }

        // Save the JSON back to localStorage
        if (window.localStorage.setItem("todos", JSON.stringify(todos))) {
            callDelay(callback, "true");
        } else {
            callDelay(callback, "false");
        }
    }    

    callDelay(successCallback);
}