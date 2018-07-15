$(document).ready(function() {

    //Array of book
    var booksArray = ["fiction", "kids", "hardcover", "selfhelp",];

    // Fucntion for displaying the books data
    function renderBtn() {
        //Deleting the book prior to adding new books    
        $("#buttons-view").empty();
        //Looping the array of books
        for (var i = 0; i < carsArray.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            //Adding a class of the book-btn to our button
            a.addClass("book-btn");
            //Adding data attribute
            a.attr("data-name", booksArray[i]);
            //Adding the text button text
            a.text(booksArray[i]);
            //Adding the button to the button view div
            $("#buttons-view").append(a);
        }
    }
    //Function handles events where a books button is clicked
    $('#add-books').on("click", function(event) {
        event.preventDefault();
        //Line grabs the input from the textbox and takes out spaces from the outside
        var gif = $("#books-input").val().trim();
        if (gif == "") {
            alert("You must enter a category!");
        } else {
            //Adds books from the textbox to the array
            booksArray.push(gif);
            // clear input box
            $("#books-input").val("");
            console.log(carsArray);
        }
        //Recalling the renderBtn function to display the inital buttons
        renderBtn();
    });
    // grabs the class of gif and returns the user input with the correct gif //
    $(document).on("click", ".books-btn", function() {
        // remove prior gifs //
        $('#books-view').empty();
        var books = $(this).attr("data-name");
        // var bookss = $('#cars-input').val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + books + "&api_key=C93K78HQ2rcQ97dNx87OnVuAYjvvpJtb&limit=10&offset=0&rating=PG&lang=en";
        //Creating an AJax call for the specific book button being click
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(cookie) {
            var results = cookie.data;
            //Displaying the rating
            var p = $("<p>").text("Rating: " + rating);
            // loop through our results //
            for (var i = 0; i < results.length; i++) {
                // assign variable to gif url //
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                //Storing the rating data
                var rating = results[i].rating;
                console.log("Rating: " + rating);
                // create image //
                var gifImage = $("<img>");
                gifImage.addClass("giphys");
                gifImage.attr('src', still);
                gifImage.attr('data-still', still);
                gifImage.attr('data-animated', animated);
                gifImage.attr('data-state', "still");
                //Retrieving the URL for the image
                var imgURL = results[i].images.fixed_height.url;
                console.log("URL: " + imgURL);
                //Displaying the rating
                var p = $("<p>").text("Rating: " + rating);
                //Creating element to hold the image
                var image = $("<img>").attr("src", imgURL);
                //Appending the image
                $('#cars-view').append(gifImage);
                $('#cars-view').append(p);

            }
        });

    });
    //Adding click listener to all elements with a class "car-btn"
    $(document).on("click", ".giphys", function() {
        var state = $(this).attr('data-state');
        console.log(this);
        if (state == "still") {
            $(this).attr('src', $(this).attr('data-animated'));
            $(this).attr('data-state', "animated");
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', "still");
        }
    });
    // Calling the renderButtons function to display the intial buttons
    renderBtn();

}); //end of document ready
