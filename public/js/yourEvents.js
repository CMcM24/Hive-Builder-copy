$(document).ready(function () {

    //The code here will display ONLY events that belong to the user on their account page.

    var yourEvents = $("#your_events");
    var userdata;

    $.get("/api/user_data").then(function (data) {
        userdata = data;
        return userdata;
    }).then(function(){
        getYourEvents();
    });

    

    function getYourEvents(user) {
        userId = user || "";
        if (userId) {
          userId = "/?user_id=" + userId
        }
        $.get("/api/events/" + userdata.id, function (data) {
            var events = data;
            if (!events || !events.length) {
                youHaveNoEvents(user);
            }
            else {
                populateYourEvents(events);
            };
        })
    };

    function youHaveNoEvents(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for user #" + id;
        };
        yourEvents.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("You haven't created any events yet!" + partial + ", navigate <a href='/create" + query +

            "'>here</a> in order to get started.");
        yourEvents.append(messageH2);
    };

    function populateYourEvents(data) {
        var eventData = data;
        for (let i = 0; i < eventData.length; i++) {
            let newCardData = eventData[i]
            createNewCard(newCardData)
        };
    };

    function createNewCard(x) {
    
        var altTestCard = '<div class="card main"><img src="https://ak8.picdn.net/shutterstock/videos/3635288/thumb/1.jpg" class="card-img-top" alt="#"><div class="card-body"><h5 class="card-title event-title">' + x.title + '</h5><br><p class="card-text event-desc">'+x.description+'</p><br><p class="card-text event-deets"><p class="card-text event-deets">Location: '+x.location+'</p>Category: '+x.category+'</p><p class="card-text event-deets">Created by: '+x.User.username+'</p><p class="card-text event-deets">Date: '+x.date+'</p><p class="card-text event-deets">Time: '+x.time+'</p></div></div>';
    
        yourEvents.append(altTestCard);
      };

});