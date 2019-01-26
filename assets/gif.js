$(document).ready(function() {
    
    //Array for searched topics to be added
    // var topics = ["happy", "sad", "anxious", "indifferent", "whimsical"];
    var topics = [];


    function displayInfo() {

        var feel = $(this).data("search");
        console.log(feel);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + feel + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .done(function (response) {
                var results = response.data;
                console.log(response);
                console.log(results);

                for (var i = 0; i < results.length; i++) {

                     // Only taking action if the photo has an appropriate rating
        // if (topics[i].rating !== "r" && topics[i].rating !== "pg-13") {

                    var rating = results[i].rating.toUpperCase();
                    var gifDiv = $("<div class='col-md-4'>");

                    var defaultSrc = results[i].images.fixed_height.url;
                    var staticSrc = results[i].images.fixed_height_still.url;
                    var feelingImage = $("<img>");
                    var p = $("<p>").text("Feeling: " + feel + " |" + "  Rating: " + rating);

                    feelingImage.attr("src", staticSrc);
                    feelingImage.attr("data-still", staticSrc);
                    feelingImage.attr("data-animate", defaultSrc);
                    feelingImage.attr("data-state", "still");
                    feelingImage.addClass("feelingGiphy");
                   
                    gifDiv.append(p);
                    gifDiv.append(feelingImage);
                    $("#gifArea").prepend(gifDiv);

                // }
                }
            });
    }

    //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
    $("#addFeel").on("click", function (event) {
        event.preventDefault();
        var newFeeling = $("#feelingInput").val().trim();
        topics.push(newFeeling);
        console.log(topics);
        $("#feelingInput").val('');
        displayButtons();
    });

    //Function iterates through topics array to display button with array values in "myButtons" section of HTML
    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.addClass("newButton");
            a.attr("id", "feel");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();

    //Click event on button #feel executes displayInfo function
    $(document).on("click", "#feel", displayInfo);

    //Click event on gifs with class of "feelinGiphy" executes pausePlayGifs function
    $(document).on("click", ".feelingGiphy", pausePlayGifs);

    //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});