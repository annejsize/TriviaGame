//Global variables
$(document).ready(function() {
  // ------------- GLOBAL VARIABLES ----------------
  // ===============================================
  // Arrays and variables for holding data
  // Build an object with the questions and answers, and all other characterstics of said question;
  var question = [{
    question: "What is the name of the deaf woman who won an Academy Award for Best Actress in 1986?",
    answers: ["Marlee Matlin", "Molly Ringwald", "Mia Sara", "Annabeth Gish"],
    corranswer: "Marlee Matlin",
    imageURL: "assets/images/marlee.jpg"
  }, {
    question: "One of the founding 'fathers' of the internet is hard of hearing. What is his name?",
    answers: ["Al Gore", " Tim Berners-Lee", "Vinton Gray Cerf", "Bob Kahn"],
    corranswer: "Vinton Gray Cerf",
    imageURL: "assets/images/vint.jpg"
  }, {
    question: "Juliette Gordon Low was a hard-of-hearing American woman born in 1860. She found which popular organisation?",
    answers: [" Readers' Digest", "Young Men's Christian Association", "The Gideon Society", "Girl Scouts of the United States of America"],
    corranswer: "Girl Scouts of the United States of America",
    imageURL: "assets/images/juliette.jpg"
  }];

  //timeLeft VARIABLES
  var timeLeft = 28;
  //score VARIABLES
  var rightAns = 0;
  var incorrectAns = 0;
  var unAns = 0;
  // answer VARIABLES
  var theCorrectAns;
  var imageLink;
  var counter = 0;
  var i;


  // ------------- FUNCTIONS ---------------
  // ===============================================
  //
  // Time Related FUNCTIONS

  function timer() {
    $(".timer").html("<b>" + timeLeft + " seconds left</b>");

    function timeout() {
      if (timeLeft == 0) {
        ranOutOfTime();
        showCurrentScore();
        setTimeout(setQuestion, 3000);
        clearTimeout(tid);
      } else {
        timeLeft--;
        $(".timer").html("<b>" + timeLeft + " seconds left</b>");
      }
    }
    tid = setInterval(timeout, 1000);
  }


  function setQuestion() {
    //Clearout the html
    $("#start").hide();
    $("#timer-caption").hide();
    $(".ans-button").hide();
    $(".score1").hide();
    $(".score2").hide();
    $(".score3").hide();
    $(".question-area").hide();
    $(".answer").hide();
    $("#imgDiv").hide();
    $(".timer").show();

    if (counter < 3) {
      i = counter;
      // alert(counter);
      var thequestion = $("<h3 class='question-area'>" + question[i].question + "</h3>");
      $(".questions").append(thequestion);
      $(".questions").show();
      corrAnswer = question[i].corranswer;
      imageLink = question[i].imageURL;

      var ans1 = $('<input type="button" class="btn btn-default btn-block ans-button" id="button1" value="' + question[i].answers[0] + '"/>');
      $(".buttons").append(ans1);
      var ans2 = $('<input type="button" class="btn btn-default btn-block ans-button" id="button2" value="' + question[i].answers[1] + '"/>');
      $(".buttons").append(ans2);
      var ans3 = $('<input type="button" class="btn btn-default btn-block ans-button" id="button3" value="' + question[i].answers[2] + '"/>');
      $(".buttons").append(ans3);
      var ans4 = $('<input type="button" class="btn btn-default btn-block ans-button" id="button4" value="' + question[i].answers[3] + '"/>');
      $(".buttons").append(ans4);

      counter++;
    } else {
      finalPage();
    }
  }


  function correctAnswer() {
    var add = $('<h3> The correct answer is ' + corranswer + '.');
    $(".buttons").append(add);
  }

  function showCurrentScore() {
    $("#timer-caption").hide();
    $(".timer").hide();
    $(".questions").hide();
    $(".ans-button").hide();
    $(".score1").html("<div><h2>Correct Guesses: " + rightAns + "</h2></div>");
    $(".score2").html("<div><h2>Incorrect Guesses: " + incorrectAns + "</h2></div>");
    $(".score3").html("<div><h2>Unaswered Questions: " + unAns + "</h2></div>");
  }

  function correctAnswerPage() {
    $(".buttons").html("<div><h3 class='answer'>'Yes! The correct answer is: '" + corrAnswer + " '!'</h3></div>");
    $(".buttons").append("<img id='imgDiv' style='height: 200px; width: auto' src='" + imageLink + " '/>");
  }

  function wrongAnswerPage() {
    $(".buttons").html("<div><h3 class='answer'>'Nope. The correct answer is: '" + corrAnswer + " '!'</h3></div>");
    $(".buttons").append("<img id='imgDiv' style='height: 200px; width: auto' src='" + imageLink + " '/>");
  }

  function ranOutOfTime() {
    $(".timer").html("<b>0 Seconds left</b>");
    $(".buttons").html("<div><h3 class='answer'>You ran out of time. The correct answer is: '" + corrAnswer + " !</h3></div>");
    $(".buttons").append("<img id='imgDiv' style='height: 200px; width: auto' src='" + imageLink + " '/>");
    unAns++;
  }

  function finalPage() {
    showCurrentScore();
    $(".score1").show();
    $(".score2").show();
    $(".score3").show();
    var restart = $('<input type="button" id="restart" value="Restart Game!"/>');
    $(".buttons").append(restart);
  }


  // ------------- MAIN PROCESSES ---------------//
  // ===============================================
  //

  $("#start").click(function() {
    setQuestion();
    timer();
  });

  $(document).on("click", ".ans-button", function() {
    var userSelection = $(this).attr('value');
    if (userSelection === corrAnswer) {
      rightAns++;
      showCurrentScore();
      correctAnswerPage();
      setTimeout(setQuestion, 3000);
    } else {
      incorrectAns++;
      showCurrentScore();
      wrongAnswerPage();
      setTimeout(setQuestion, 3000);
    }
  });

  $(document).on("click", "#restart", function() {
    counter = 0;
    setQuestion();
    $("#restart").hide();
    timer();
  });
});
