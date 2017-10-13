$(document).ready(function() {
  $("#main-table").append(
    '<tr id="activeStreamers"></tr>' +
      '<tr id="inactiveStreamers"></tr>' +
      '<tr id="unresponsiveStreamers"></tr>'
  );

  var streamers = [
    "wargodyasa",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "brunofin",
    "comster404"
  ];
  
  streamers.forEach(function(select) {
    var user = select;
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/" + user,
      format: "json",
      headers: {
        "Client-ID": "qpyxap0u7muu6ci4xfjdsuf3avbxr0v"
      },
      success: function(data) {
        var online = data["stream"];
        if (online === null) {
          var channelInfo = data["_links"]["channel"];
          $.ajax({
            type: "GET",
            url: channelInfo,
            headers: {
              "Client-ID": "qpyxap0u7muu6ci4xfjdsuf3avbxr0v"
            },
            success: function(data) {
              var url = data["url"];
              var user = data["display_name"];
              var logo = data["logo"];
              if (logo === null) {
                logo =
                  "https://pbs.twimg.com/profile_images/509073338191183872/fYdty6yd.png";
              }
              var status = data["updated_at"];
              $("#inactiveStreamers").append(
                '<td class="inactive"><a href="' +
                  url +
                  '" target="_blank"><img src="' +
                  logo +
                  '">The user ' +
                  user +
                  " is currently offline.</a></td>"
              );
            },
            error: function(data) {
              var user = data["responseJSON"]["message"];
              $("#unresponsiveStreamers").append(
                '<td class="unresponsive"><img src="https://pbs.twimg.com/profile_images/509073338191183872/fYdty6yd.png">' +
                  user.replace('"', "").replace('"', "") +
                  "." +
                  "</td>"
              );
            }
          });
        } else {
          var logo = data["stream"]["channel"]["logo"];
          var channel = data["stream"]["channel"]["url"];
          var user = data["stream"]["channel"]["display_name"];
          var game = data["stream"]["channel"]["game"];
          $("#activeStreamers").append(
            '<td class="active"><a href="' +
              channel +
              '" target="_blank"><img src="' +
              logo +
              '">The user ' +
              user +
              " is currently streaming the game " +
              game +
              "!</a></td>"
          );
        }
      }
    });
  });
});

$(".cell").on("click", function(event) {
  var input = this.id;

  if (input === "online") {
    $(".inactive").hide();
    $(".active").show();
    $("#online").hide();
    $("#offline").show();
    $(".unresponsive").hide();
  } else if (input === "offline") {
    $(".active").hide();
    $(".inactive").show();
    $("#online").show();
    $("#offline").hide();
    $(".unresponsive").hide();
  } else if (input === "all") {
    $(".active").show();
    $(".inactive").show();
    $(".unresponsive").show();
  }
});