$(document).ready(function() {
    loadAllBooks();
    $("#back").on("click", function() {
        window.location = window.location.href.split("?")[0];
    });
});

function loadAllBooks() {
    $("#singlebook").hide();
    $.ajax({
        url: "bestreads.php/?mode=books",
        type: "GET",

        success: function(stuff) {
            //called when successful
            var xmlDoc = jQuery.parseXML(stuff);
            var books = $(xmlDoc);
            books.find("book").each(function() {
                var book = $(this);
                var title = book.children("title").html();
                var folder = book.children("folder").html();
                var div = document.createElement("div");
                var id = folder.split("/")[1]
                div.id = id;
                div.innerHTML = "<img src=" + folder + "/cover.jpg>" + "<p>" + title + "</p>";
                $("#allbooks").append(div);
                $("#" + id).click(function() {
                    singleBook(id);
                });
            });
        },

        error: function(e) {
            //called when there is an error
            console.log(e.message);
        }
    });

}

function singleBook(some) {
    window.history.pushState({},"BestReads","bestreads.html?mode=books");
    $("#allbooks").empty();
    $("#singlebook").show();

    $.ajax({
        url: 'bestreads.php',
        type: 'GET',
        data: {
            title: some,
            mode: "info"
        },
        success: function(stuff) {
            //called when successful
            var info = jQuery.parseJSON(stuff);
            $("#title").append(info.title);
            $("#author").append(info.author);
            $("#stars").append(info.stars);
            $("#cover").attr("src", "/books/" + some + "/cover.jpg");
        },

        error: function(e) {
            //called when there is an error
            console.log(e.message);
        }
    });

    $.ajax({
        url: 'bestreads.php',
        type: 'GET',
        data: {
            title: some,
            mode: "description"
        },

        success: function(stuff) {
            //called when successful
            $("#description").append(stuff);
        },

        error: function(e) {
            //called when there is an error
            console.log(e.message);
        }
    });

    $.ajax({
        url: 'bestreads.php',
        type: 'GET',
        data: {
            title: some,
            mode: "reviews"
        },

        success: function(stuff) {
            //called when successful
            $("#reviews").append(stuff);
        },

        error: function(e) {
            //called when there is an error
            console.log(e.message);
        }
    });
}