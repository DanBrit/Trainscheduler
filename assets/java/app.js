
  var config = {
    apiKey: "AIzaSyBMFlmjAXgICzpVlAHpo7duWJ_DP8ClDp0",
    authDomain: "trainscheduler-d853e.firebaseapp.com",
    databaseURL: "https://trainscheduler-d853e.firebaseio.com",
    projectId: "trainscheduler-d853e",
    storageBucket: "",
    messagingSenderId: "847191380630"
  };
  firebase.initializeApp(config);

var database = firebase.database();


     
        // Capture Button Click
        $("#add-user").on("click", function(event) {
          event.preventDefault();
    
          // Takes Inputs and stores into variables
          var name = $("#name-input").val().trim();
          var dest = $("#dest-input").val().trim();
          var firstTrain = $("#firstTrain-input").val().trim();
          var freq = $("#freq-input").val().trim();


   
          // Console log to check for errors
          console.log(name);
          console.log(dest);
          console.log(firstTrain);
          console.log(freq);
      

    var newTrain = {
        name: name,
        destination: dest,
        first: firstTrain,
        frequency: freq,
  };

  // Sends train input data to the database
  database.ref().push(newTrain);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#dest-input").val("");
  $("#firstTrain-input").val("");
  $("#freq-input").val("");

    return false
    });

// function to pull info from firebase and add it to the  table

        database.ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val());
          
            // Store everything into a variable.

            var name = childSnapshot.val().name;
            var dest = childSnapshot.val().destination;
            var firstTrain = childSnapshot.val().first;
            var freq = childSnapshot.val().frequency;
            
            // train Info
            console.log(name);
            console.log(dest);
            console.log(firstTrain);
            console.log(freq);
            

  var tFrequency = freq;

  
  var firstTime = firstTrain;

  // First Time 
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minutes Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
        // Console log each of the user inputs to confirm we are receiving them
        console.log(name);
        console.log(dest);
        console.log(firstTime);
        console.log(tFrequency);
        console.log(tMinutesTillTrain);


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td class='tblName'>").text(name),
    $("<td class='tblDest'>").text(dest),
    $("<td class='tblFreq'>").text(freq),
    $("<td class='tblArrival'>").text(nextTrain),
    $("<td class='tblAway'>").text(tMinutesTillTrain)
  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});