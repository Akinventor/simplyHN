var pages = {
    // This variables sets the first page, then is changed to whatever the current page is.
    currentPage: "TOP",
    // This tracks where the JS is in the array of stories.
    pageCount: 0,
    // This is how many stories show up on the first page.
    storyInterval: 30,
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
    // This gets and renders stories.
    getStoryIDs(pages.currentPage);

    // This function loads more stories.
    $("#load_more").click(function() {
        fetchStories(pages[pages.currentPage.toLowerCase()].ids);
    });

    // Menu
    $("#logo").click(function() {
        changePages("TOP")
    });
    $("#new_link").click(function() {
        changePages("NEW");
    });
    $("#ask_link").click(function() {
        changePages("ASK");
    });
    $("#show_link").click(function() {
        changePages("SHOW")
    });
    $("#jobs_link").click(function() {
        changePages("JOBS")
    });

    $(".story_discussion").click(function() {
        console.log(this.id);
    })
});

function changePages(newPage)
{
    pages.currentPage = newPage;
    pages.pageCount = 0;
    $("#allstories").empty();
    getStoryIDs(pages.currentPage);
}

function loadDiscussion(ids) {
    ids.foreach(commentID => {
        var commentURL = "https://hacker-news.firebaseio.com/v0/item/" + commentID + ".json";
        $.ajax({
            dataType: "json",
            url: commentURL,
            success: function(result) {
                console.log(result.text);
            }
        });
    });
}

function getStoryIDs(page) {
    var pageObj = pages[page.toLowerCase()];
    $.ajax({
        url: pageObj.url,
        success: function(data) {
            pageObj.ids = data;
            fetchStories(pageObj.ids);
        }
    })
}

function fetchStories(stories) {
    stories.slice(pages.storyInterval * pages.pageCount, pages.storyInterval * (pages.pageCount + 1)).forEach(storyID => {
        var storyURL = "https://hacker-news.firebaseio.com/v0/item/" + storyID + ".json";
        $.ajax({
            dataType: "json",
            url: storyURL,
            success: function(result) {
                renderStory(result);
            }
        });
    });
    pages.pageCount += 1;
}

function renderStory(storyData) {
    var storyURL;
    if (storyData.url != null)
    {
        storyURL = "https://outline.com/" + storyData.url;
    }
    else
    {
        storyURL = "https://news.ycombinator.com/item?id=" + storyData.id;
    }
    var story = "<div class=\"story_container\" id=" + storyData.id + "><div class=\"story_data\"><div class=\"story_title\"><a class=\"story_link\" href=\"" + storyURL + "\"><span>" + storyData.title + "</span></a> <a class=\"story_discussion\" href=\"https://news.ycombinator.com/item?id=" + storyData.id + "\"><span>(Discussion)</span></a></div><div class=\"story_meta\"><span>Points: " + storyData.score + "</span><span class=\"meta_seperator\"> | </span><span><a href=\"https://news.ycombinator.com/user?id=" + storyData.by+ "\"><span>By " + storyData.by + "</span></a></span><span class=\"meta_seperator\"> | </span><span>" + timeSince(new Date(storyData.time * 1000)) + "</span></div></div></div>"
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