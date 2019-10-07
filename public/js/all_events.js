//JS that handles the display of stored events on the "all events" page of the app. If there are no events stored, then then some text will display saying so, and it will prompt the visitor to another page to create an account or create an event if they are signed in already.

$(document).ready(function () {


  var allEvents = $("#all_events");
  var userId;

  if (window.location.search.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getEvents(userId);
  } else {
    getEvents();
  };



  function getEvents(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId
    }
    $.get("/api/events" + userId, function (data) {
      console.log("Events", data);
      var events = data;
      if (!events || !events.length) {
        noEvents(user);
      }
      else {
        populateEvents(events);
      };
    });
  };

  function noEvents(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for user #" + id;
    };
    allEvents.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No events yet" + partial + ", navigate <a href='/create" + query +

      "'>here</a> in order to get started.");
    allEvents.append(messageH2);
  };


  function populateEvents(data) {
      var eventData = data;
      for (let i = 0; i < eventData.length; i++) {
        let newCardData = eventData[i]
        createNewCard(newCardData)
      };
  };


  function createNewCard(x) {

    const mainContainer = $("#all_events");

    var altTestCard = '<div class="card main"><img src="https://ak8.picdn.net/shutterstock/videos/3635288/thumb/1.jpg" class="card-img-top" alt="#"><div class="card-body"><h5 class="card-title event-title">' + x.title + '</h5><br><p class="card-text event-desc">'+x.description+'</p><br><p class="card-text event-deets"><p class="card-text event-deets">Location: '+x.location+'</p>Category: '+x.category+'</p><p class="card-text event-deets">Created by: '+x.User.name+'</p><p class="card-text event-deets">Date: '+x.date+'</p><p class="card-text event-deets">Time: '+x.time+'</p></div></div>';

    mainContainer.append(altTestCard);
  };



});