// defining the questions list 
    var questions = [
    {
        title: "Commonly used data type DO NOT include:",
        choices:["1.strings","2.booleans","3.alerts","4.numbers"],
        answer: "3.alerts"
    },
    {
        title: "To see if two variables are equal in an if / else statement you would use ____.",
        choices: ["1.=", "2.==", "3.'equals'", "4.!="],
        answer: "2.=="
    },
    {
        title: "The condition in an if /else statement is enclosed within ________.",
        choices:["1.quotes","2.curlybrackets","3.parentheses","4.square brackets"],
        answer:"3.parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store __________.",
        choices:[ "1.numbers and strings", "2.other arrays", "3.booleans", "4.all of the above"],
        answer:"2.other arrays"
    },
    {
        title: "Which method would you use to find an ID element?",
        choices: ["1.getElementsById()", "2.getElementByID()", "3.getElementbyId()", "4.getElementsById()"],
        answer: "3.getElementbyId()"
      },
    {
        title:"String values must be enclosed within ______ when being assigned to variables.",
        choices:["1.commas","2.curly brackets","3.quotes","4.parenthese"],
        answer: "1.commas"
    },
    {
        title: "Math.random() returns ____.",
        choices: ["1.a number between 1 and 9", "2.a number between 0 and 9", "3.a number between 0 and 1", "4.a number between 0 and 99"],
        answer: "3.a number between 0 and 1"
      }, 
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices:["1.JavaScript", "2.terminal /bash", "3.for lenghts", "4.console.log"],
        answer:"4.console.log"
    },
    {
      title: "The appendChild() method places a node as the ____ child.",
      choices: ["1.first", "2.last place you left off", "3.random", "4.last"],
      answer: "4.last"
    },
  ];

  // Variables of Document elements on the page
  var choicesContent = document.querySelector("#choices-menu");
  var startMenu = document.getElementById('start-menu');
  var questionHeading = document.getElementById('heading1');
  var quizClock = document.getElementById('game-clock');
  var enterInitialsMenu = document.getElementById('enter-initials-menu');
  var enterInitialsBtn = document.getElementById('submit-intials-btn');
  var scoresMenu = document.getElementById('scores-menu');
  var backToStartLink = document.getElementById('back-to-start-link');
  var viewHighScoresLink = document.getElementById('high-scores-link');

  // Default numbers for the game to start 
  var questionNumber = 0;

  // Variable containing question array data referred to in the functions
  var numberOfQuestions = questions.length;
  var questionChoices = questions[questionNumber].choices;

  // 15 seconds for each question to determine total game time
  var quizTimer = numberOfQuestions * 15;
  var finalScore;
  var highScores = [];

  // Check to see if there is an existing array of high scores in the localStorage
  renderHighScores()

  function renderHighScores() {
      var savedHighScores = localStorage.getItem("high scores");
      
      if (savedHighScores === null) {
          return;
      }
      var objectScores = JSON.parse(savedHighScores);
      highScores = objectScores;
      
  }
  
 
  // Function for when user clicks the start button
  function beginQuiz () {

      // Hide the default start menu
      startMenu.setAttribute("style", "display: none;");
      scoresMenu.setAttribute("style", "display: none;");
      choicesContent.setAttribute("style", "display: block");
      enterInitialsMenu.setAttribute("style", "display: none;");
      choicesContent.innerHTML = " ";
      viewHighScoresLink.setAttribute("style", "display: none;");


      // Start countdown clock
      countdownClock();

      // Place first question in h1 and create buttons of the multiple choice answers below
      questionHeading.textContent = questions[questionNumber].title;
      listChoices();

  }

  function listChoices() {
      // Loop through the available choices in the given question array index
      for (var i = 0; i < questionChoices.length; i++) {
          
        // Create, build, and place the available choices
          var choiceBtn = document.createElement("button");
          choiceBtn.setAttribute("class", "btn btn-primary btn-sm d-block my-2 choice-btn");
          choiceBtn.setAttribute("id", "choice-" + i );
          choiceBtn.textContent = questions[questionNumber].choices[i];
          choicesContent.appendChild(choiceBtn);

      }
  }

  // Notify user that they got the answer right
  function correctAnswer() {
      var correctNotify = document.createElement("div");
      correctNotify.setAttribute("class", "border-top mt-3 pt-3")
      correctNotify.setAttribute("style", "font-size: 12px; color: green; font-weight: bold;");
      correctNotify.textContent = "You got the answer right!";
      choicesContent.appendChild(correctNotify);
  }

  // Notify user that they got the answer wrong
  function incorrectAnswer() {
      var incorrectNotify = document.createElement("div");
      incorrectNotify.setAttribute("class", "border-top mt-3 pt-3");
      incorrectNotify.setAttribute("style", "font-size: 12px; color: red; font-weight: bold;");
      incorrectNotify.textContent = "You got the answer wrong!";
      choicesContent.appendChild(incorrectNotify);
  }

  // The timer that counts down when the game is started
  function countdownClock() {
      var timerInterval = setInterval(function() {
          // Display time and decrease by second
          quizClock.textContent = quizTimer;
          quizTimer--;


          // Once the timer hits zero, game is ended
          if (quizTimer <= 0) {
              clearInterval(timerInterval);
              quizClock.textContent = "0";
              choicesContent.innerHTML = " ";
              questionNumber = 0;
              choicesContent.setAttribute("display", "none");
              startMenu.setAttribute("style", "display: block;");
              questionHeading.textContent = "Your score is: " +  quizTimer;
              quizTimer = numberOfQuestions * 15;
          } 
          // Freeze clock if user runs through all the questions and end game
          else if (questionNumber === 10) {
              clearInterval(timerInterval);


              // Reset stats so user can start a new game
              questionNumber = 0;
              quizTimer = numberOfQuestions * 15;
          }

      }, 1000);
  } 

  

  // Add event to the button choices and see if whether the user clicks matches the answer in the questions array
  document.addEventListener("click", function(event) {
      if (event.target.matches('.choice-btn')) {
          event.stopPropagation();
          event.preventDefault();
          // Condition if user selects correct answer
          if (event.target.textContent === questions[questionNumber].answer) {
              
              

              // Move on to the next question
              questionNumber = questionNumber + 1;
              // Add 5 seconds to the clock
              quizTimer += 5;


              if (questionNumber <= (numberOfQuestions - 1)) {
                  questionHeading.textContent = questions[questionNumber].title;
                      // Run function to clear buttons and list new choices
                  choicesContent.innerHTML = " ";
                  listChoices();
                  // Inform user that they got the right answer
                  correctAnswer();
                
              } else {
                  // End of game so clear any trace of choices
                  choicesContent.innerHTML = " ";
                  // Inform user that they got the right answer
                  correctAnswer();
                  // Bring up input for user to enter in their high score
                  enterInitialsMenu.setAttribute("style", "display: block;");
                  // Allow user to restart quiz
                  startMenu.setAttribute("style", "display: block;");
                  viewHighScoresLink.setAttribute("style", "display: inline;");
                  // Display the user's final score
                  questionHeading.textContent = "Your score is: " +  quizTimer;
                  // User's final score is equal to the time left in the game
                  finalScore = quizTimer;
              }

              
          } 
          // Condition if user selects wrong answer
          else if (event.target.textContent !== questions[questionNumber].answer) {
              
              // Move on to the next question
              questionNumber = questionNumber + 1;
              // Remove 10 seconds time from the clock
              quizTimer -= 10;

              if (questionNumber <= (numberOfQuestions - 1)) {
                  questionHeading.textContent = questions[questionNumber].title;
                      // Run function to clear buttons and list new choices
                  choicesContent.innerHTML = " ";
                  listChoices();
                  // Inform user that they got the wrong answer
                  incorrectAnswer();
              } else {
                  // End of game so clear any trace of choices
                  choicesContent.innerHTML = " ";
                  // Inform user that they got the wrong answer
                  incorrectAnswer();
                  // Bring up input for user to enter in their high score
                  enterInitialsMenu.setAttribute("style", "display: block;");
                  // Allow user to restart quiz
                  startMenu.setAttribute("style", "display: block;");
                  viewHighScoresLink.setAttribute("style", "display: inline;");
                  // Display the user's final score
                  questionHeading.textContent = "Your score is: " +  quizTimer;
                  // User's final score is equal to the time left in the game
                  finalScore = quizTimer;
              }
              
              
          }
      }
  });


  function enterInitials(event) {
      event.preventDefault();
      // Take the value the user enters into the input after game ends
      var userInitials = document.getElementById('initials-input').value;
      
      // Object containing the user initials and final score
      var userScores = {
          initials: userInitials,
          score: finalScore
      };

      // Push the above object into the high scores array
      highScores.push(userScores);

      // Convert the object into a string
      var highScoresString = JSON.stringify(highScores);

      // Store the string into the user's local storage
      window.localStorage.setItem("high scores", highScoresString);

      // Inform user their score is now entered
      questionHeading.textContent = "You have entered your score. Play again?";
      enterInitialsMenu.setAttribute("style", "display: none;");
      choicesContent.innerHTML = " ";

  }

  // Go back to start Menu
  function goBackToStart() {
      backToStartLink.setAttribute("style", "display: none;")
      viewHighScoresLink.setAttribute("style", "display: inline;")
      startMenu.setAttribute("style", "display: block;");
      scoresMenu.setAttribute("style", "display: none;");
      choicesContent.setAttribute("style", "display: none");
      enterInitialsMenu.setAttribute("style", "display: none;");
      questionHeading.textContent = "Coding Quiz Challenge";
  }

  // When user clicks submit, enter their score and their initials to their local Storage
  enterInitialsBtn.addEventListener("click", enterInitials);

  function viewHighScores() {
      // Show the score menu with title
      scoresMenu.innerHTML = " ";
      startMenu.setAttribute("style", "display: none;");
      scoresMenu.setAttribute("style", "display: block;");
      choicesContent.setAttribute("style", "display: none");
      enterInitialsMenu.setAttribute("style", "display: none;");
      questionHeading.textContent = "View High Scores";
      backToStartLink.setAttribute("style", "display: inline;");
      viewHighScoresLink.setAttribute("style", "display: none;");


      // Grab the high scores from user's local storage
      var highScoreList = window.localStorage.getItem("high scores");
      
      // Convert the high scores from strings to an array of objects
      var highScoreObject = JSON.parse(highScoreList);

      // Sort the objects from highest scores to lowest
      highScoreObject.sort(highestToLowest);

      // Cycle through the array and list each initial with corresponding score as an element
      for (var i=0;i <= highScores.length - 1;i++){
          var highScoreEntry = document.createElement("div");
          highScoreEntry.setAttribute("class", "alert alert-info");
          highScoreEntry.innerHTML = "<span style='font-weight: bold;''>" +  highScoreObject[i].initials + ":</span> " + highScoreObject[i].score;
          scoresMenu.appendChild(highScoreEntry);

      }
  }

// Function to sort the objects in the array by highest score to lowest
function highestToLowest(x,y) {
  var scoreX = x.score;
  var scoreY = y.score;

  var comparison = 0;
  if (scoreX > scoreY) {
      comparison = 1;
  } else if (scoreX < scoreY) {
      comparison = -1;
  }
  return comparison * -1;
}