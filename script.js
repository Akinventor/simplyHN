var pages = {
    top: {
        url: "https://hacker-news.firebaseio.com/v0/topstories.json",
        ids: null,
    },
    new: {
        url: "https://hacker-news.firebaseio.com/v0/newstories.json",
        ids: null,
    },
    best: {
        url: "https://hacker-news.firebaseio.com/v0/beststories.json",
        ids: null,
    },
    ask: {
        url: " https://hacker-news.firebaseio.com/v0/askstories.json",
        ids: null,
    },
    show: {
        url: " https://hacker-news.firebaseio.com/v0/showstories.json",
        ids: null,
    },
    jobs: {
        url: "https://hacker-news.firebaseio.com/v0/jobstories.json",
        ids: null,
    },
};

$(function() {
    getStoryIDs("TOP");
    fetchStories(window.pages.top.ids);
});

function getStoryIDs(page) {
    var pageObj = pages[page.toLowerCase()];
    $.ajax({
        url: pageObj.url,
        success: function(ids) {
            pageObj.ids = ids;
        }
    })
}

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

// This function is for testing, so I don't make a ton of API calls.
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
    var story = "<div class=\"story_container\"><div class=\"story_data\"><div class=\"story_title\"><a class=\"story_link\" href=\"" + storyData.url + "\"><span>" + storyData.title + "</span></a> <a class=\"story_discussion\" href=\"https://news.ycombinator.com/item?id=" + storyData.id + "\"><span>(Discussion)</span></a></div><div class=\"story_meta\"><span>Points: " + storyData.score + "</span><span class=\"meta_seperator\"> | </span><span><a href=\"https://news.ycombinator.com/user?id=" + storyData.by+ "\"><span>By " + storyData.by + "</span></a></span><span class=\"meta_seperator\"> | </span><span>" + timeSince(new Date(storyData.time * 1000)) + "</span></div></div></div>"
    $("#allstories").append(story);
}

// This function, timeSince, is straight up taken from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  var aDay = 24*60*60*1000;