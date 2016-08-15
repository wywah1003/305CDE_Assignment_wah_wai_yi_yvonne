/*
Main App file 
*/

// jQuery plugin - Encode a set of form elements as a JSON object for manipulation/submission.
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


// Define the app as an object to take out of global scope
var app = {

    findAll: function() {
        console.log('DEBUG - 2. findAll() triggered');

        this.store.findAll(function(todos) {
            var l = todos.length;
            var td;

            // Create new arrays so we can order them with outstanding first
            outstanding = [];
            completed = [];
            allTodos = [];

            // Loop through todos, build up lis and push to arrays
            for (var i=0; i<l; i++) {
                td = todos[i];

                // If not completed
                if (td.status == 0) {
                    outstanding.push('<li data-row-id="' + td.id + '" class="outstanding"><a href="#view" data-transition="slide" class="view" data-view-id="' + td.id +'"><h2>' + td.title+ '</h2><p>' + td.description + '</p></a><a href="#" data-icon="check" data-iconpos="notext" class="mark-completed" data-mark-id="' + td.id +'">Mark as completed</a></li>');
                }
                // If is completed
                else {
                    completed.push('<li data-row-id="' + td.id + '" class="completed"><a href="#view" data-transition="slide" class="view" data-view-id="' + td.id +'"><h2>' + td.title+ '</h2><p>' + td.description + '</p></a><a href="#" data-icon="delete" data-iconpos="notext" class="mark-outstanding" data-mark-id="' + td.id +'">Mark as outstanding</a></li>');
                }
            }

            // Join both arrays
            allTodos = outstanding.concat(completed);

            // Remove any previously appended
            $('.todo-listview li').remove();

            // Append built up arrays to ULs here.
            $('.todo-listview').append(allTodos);            

            // Refresh JQM listview
            $('.todo-listview').listview('refresh');
        });
    },

    findById: function(id) {
        
        this.store.findById(id, function(result) {
            
            $('#title').val(result.title);
            $('#title').attr('data-id', id);
            $('#description').val(result.description);
            $('#id').val(id);
       
        });
    },

    markCompleted: function(id) {

        // Passing json as any store will be able to handle it (even if we change to localStorage etc)
        this.store.markCompleted(id, function(result) {

            // DB updates successful
            if(result) {
                console.log("DEBUG - Success, db updated and marked as completed");

                // Find original row and grab details
                var originalRow =  $('#home *[data-row-id="'+id+'"]'),
                    title = originalRow.find("h2").text(),
                    desc = originalRow.find("p").text();

                // Remove from pending row
                originalRow.remove();

                // Re-build the li rather than clone as jqm generates a lot of fluff
                var newRow = '<li data-row-id="' + id + '" class="completed"><a href="#view" data-transition="slide" class="view" data-view-id="' + id +'"><h2>' + title + '</h2><p>' + desc + '</p></a><a href="#" data-icon="delete" data-iconpos="notext" class="mark-outstanding" data-mark-id="' + id +'">Mark as outstanding</a></li>';

                // Add to completed
                $('.todo-listview').append(newRow);

                // Refresh dom
                $('.todo-listview').listview('refresh');

                // Kept for debugging use
                //console.log("id length = " + $('[data-row-id='+id+']').length);

            } else {
                alert("Error - db did not update and NOT marked as completed");
            }
        });
    },

    markOutstanding: function(id) {

        // Passing json as any store will be able to handle it (even if we change to localStorage, indexedDB etc)
        this.store.markOutstanding(id, function(result) {

            // DB updates successful
            if(result) {
                console.log("DEBUG - Success, db updated and marked as outstanding");

                // Find original row and grab details
                var originalRow =  $('*[data-row-id="'+id+'"]'),
                    title = originalRow.find("h2").text(),
                    desc = originalRow.find("p").text();

                // Remove from pending row
                originalRow.remove();

                // Re-build the li rather than clone as jqm generates a lot of fluff
                var newRow = '<li data-row-id="' + id + '" class="outstanding"><a href="#view" data-transition="slide" class="view" data-view-id="' + id +'"><h2>' + title + '</h2><p>' + desc + '</p></a><a href="#" data-icon="check" data-iconpos="notext" class="mark-completed" data-mark-id="' + id +'">Mark as completed</a></li>';

                // Add to completed
                $('.todo-listview').prepend(newRow);

                // Refresh dom
                $('.todo-listview').listview('refresh');

                // Kept for debugging use
                //console.log("id length = " + $('[data-row-id='+id+']').length);

            } else {
                alert("Error - db did not update and NOT marked as outstanding");
            }
        });
    },

    insert: function(json) {

        // Passing json as any store will be able to handle it (even if we change to localStorage etc)
        this.store.insert(json, function(result) {

            // On successful db insert
            if(result) {
                console.log("DEBUG - Success,  add returned true");

                // Redirect back to #home page, add a transition andchange the hash
                $.mobile.changePage( $("#home"), {
                    transition: "slide",
                    reverse: true,
                    changeHash: true,
                });

            } else {
                alert("Error on insert!");
            }
        });
    },

    update: function(json) {

        // Passing json as any store will be able to handle it (even if we change to localStorage etc)
        this.store.update(json, function(result) {

            // On succuessful db update
            if(result) {
                console.log("DEBUG - Success, updated returned true");
            } else {
                alert("Error on update!");
            }
        });
    },

    delete: function(json) {

        // Passing json as any store will be able to handle it (even if we change to localStorage etc)
        this.store.delete(json, function(result) {

            // On successful db delete
            if(result) {
                console.log("DEBUG - Success, delete returned true");

                // Redirect back to #home page
                $.mobile.changePage( $("#home"), {
                    transition: "slide",
                    reverse: true,
                    changeHash: true
                });

            } else {
                alert("Error on delete!");
            }
        });
    },


    initialize: function() {

        // Create a new store
         this.store = new LocalStorageDB();

        // Bind all events here when the app initializes
        $(document).on('pagebeforeshow', '#home', function(event) {
            console.log("DEBUG - 1. Home pageinit bind");
         app.findAll();
        });

        $(document).on('click', '.view', function(event) {
            console.log("DEBUG - Trying to access view");
         app.findById($(this).data('view-id'))
        });

        $(document).on('click', '.add', function(event) {
            console.log("DEBUG - Trying to insert via the add method");
         var data = JSON.stringify($('#insert').serializeObject()); 
         app.insert(data);
        });

        $(document).on('change', '.target', function(event) {
            console.log("DEBUG - Trying to update on change");
         var data = JSON.stringify($('#edit').serializeObject()); 
         app.update(data);
        });

        $(document).on('click', '.delete', function(event) {
            console.log("DEBUG - Trying to delete after delete btn press");
         var data = JSON.stringify($('#edit').serializeObject()); 
         app.delete(data);
        });

        $(document).on('click', '.mark-completed', function(event) {
            console.log("DEBUG - Mark completed pressed");
         app.markCompleted($(this).data('mark-id'));
        });

        $(document).on('click', '.mark-outstanding', function(event) {
            console.log("DEBUG - Mark outstanding pressed");
         app.markOutstanding($(this).data('mark-id'));
        });
    }


};

app.initialize();