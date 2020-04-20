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

// function fetchStories(stories) {
//     stories.forEach(element => {
//         var storyURL = "https://hacker-news.firebaseio.com/v0/item/" + element + ".json";
//         console.log(storyURL);
//         $.ajax({
//             dataType: "json",
//             url: storyURL,
//             success: function(result) {
//                 renderStory(result, storyURL);
//             }
//         });
//     });
// }

function fetchStories(stories) {
    var storyURL = "https://hacker-news.firebaseio.com/v0/item/" + stories[0] + ".json";
    console.log(storyURL);
    $.ajax({
        dataType: "json",
        url: storyURL,
        success: function(result) {
            renderStory(result);
        }
    });
}

function renderStory(storyData) {
    var story = "<div id=\"story_container\"><div class=\"story_data\"><div class=\"story_title\"><a class=\"story_link\" href=\"" + storyData.url + "\"><span>" + storyData.title + "</span></a><a class=\"story_discussion\" href=\"https://news.ycombinator.com/item?id=" + storyData.id + "\"><span>(Discussion)</span></a></div><div class=\"story_meta\"><span>" + storyData.score + "</span><span class=\"meta_seperator\">|</span><span><a href=\"https://news.ycombinator.com/user?id=" + storyData.by+ "\"><span>" + storyData.by + "</span></a></span><span class=\"meta_seperator\">|</span><span>" + storyData.time + "</span></div></div></div>"
    $("#allstories").append(story);
}