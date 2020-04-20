$(function() {
    var allstories;
    $.ajax({
        url: "https://hacker-news.firebaseio.com/v0/topstories.json",
        success: function(data) {
            allstories = data;
            console.log(allstories);
            fetchStories(allstories);
        }
    });
});

function fetchStories(stories) {
    stories.forEach(element => {
        var storyURL = "https://hacker-news.firebaseio.com/v0/item/" + element + ".json";
        console.log(storyURL);
        $.ajax({
            dataType: "json",
            url: storyURL,
            success: function(result) {
                renderStory(result);
            }
        });
    });
}

function renderStory(storyData) {
    var story = "<h3><a href=\""+ storyData.url + "\">" + storyData.title + "</a></h3>";
    $("#stories").append(story);
}