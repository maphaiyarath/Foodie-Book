$(document).ready(() => {
    var rantContainer = $(".rants");
    var theRants;

    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
    }

    $.get("/api/user/" + userId).then(data => {
        console.log(data);
        theRants = data;
        initializeRows();
    });

    $.get("/api/user_data/" + userId).then(data => {
        console.log(data);
        $(".username").text(data.username.toUpperCase());
    });

    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
        rantContainer.empty();
        var rantsToAdd = [];
        for (var i = 0; i < theRants.length; i++) {
            rantsToAdd.push(createNewRow(theRants[i]));
        }
        rantContainer.append(rantsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(rant) {
        var formattedDate = new Date(rant.createdAt).toLocaleDateString();
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostAuthor = $("<h5>");
        var newRating = $("<h2>");
        newRating.addClass("rating")
        if (rant.rating<4) {
            newRating.addClass("rating-low");
        } else if (rant.rating<8) {
            newRating.addClass("rating-medium");
        } else {
            newRating.addClass("rating-high");
        }
        newRating.text("Rating: " + rant.rating);
        newRating.text("Rating: " + rant.rating);
        newRating.css({
            "margin-top": "-10px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(rant.restaurant_name + " ");
        newPostBody.text(rant.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostAuthor);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCardHeading.append(newRating);
        newPostCard.append(newPostCardBody);
        newPostCard.data("rant", rant);
        return newPostCard;
    }
});