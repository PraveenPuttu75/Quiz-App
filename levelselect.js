 
      let currentQuestionIndex = 0;
      let score = 0;
      let timer;
      let timeRemaining = 300;  

      const questionText = document.getElementById("questionText");
      const optionsList = document.getElementById("optionsList");
      const feedback = document.getElementById("feedback");
      const scoreTextDisplay = document.getElementById("scoreText");
      const progressCircle = document.querySelector(".progress");
      const quizButton = document.getElementById("quizButton");

      function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
      }

      function startQuiz() {
          currentQuestionIndex = 0;
          score = 0;
          timeRemaining = 300;

          shuffleArray(questions);

          document.getElementById("quiz").style.display = "block";
          quizButton.textContent = "Quit";
          quizButton.setAttribute("onclick", "quitQuiz()");
          
          updateScoreDisplay();
          startTimer();
          displayQuestion();
      }

      function quitQuiz() {
          clearInterval(timer);
          questionText.textContent = "Quiz Quitted!";
          optionsList.innerHTML = "";
          feedback.textContent = "";
          quizButton.textContent = "Start Quiz";
          quizButton.setAttribute("onclick", "startQuiz()");
          updateScoreDisplay();
          document.getElementById("quiz").style.display = "none";
      }

      function startTimer() {
          updateTimerDisplay();
          timer = setInterval(() => {
              timeRemaining--;
              if (timeRemaining <= 0) {
                  clearInterval(timer);
                  endQuiz();
              }
              updateTimerDisplay();
          }, 1000);
      }

      function updateTimerDisplay() {
          const minutes = Math.floor(timeRemaining / 60);
          const seconds = timeRemaining % 60;
          document.getElementById("timeRemaining").textContent = 
              `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }

      function displayQuestion() {
          const currentQuestion = questions[currentQuestionIndex];
          questionText.textContent = currentQuestion.question;
          optionsList.innerHTML = "";

          currentQuestion.options.forEach((option, index) => {
              const li = document.createElement("li");
              li.classList.add("option-item");
              li.innerHTML = `<button class="btn option-btn" onclick="checkAnswer(${index}, this)">${option}</button>`;
              optionsList.appendChild(li);
          });
          feedback.textContent = "";
      }

      function checkAnswer(selectedOptionIndex, button) {
          const correctAnswerIndex = questions[currentQuestionIndex].answer;
          const buttons = optionsList.getElementsByTagName("button");
          for (const btn of buttons) btn.disabled = true;

          if (selectedOptionIndex === correctAnswerIndex) {
              button.classList.add("correct");
              feedback.style.color = "green";
              score++;
          } else {
              button.classList.add("incorrect");
              feedback.style.color = "red";
              buttons[correctAnswerIndex].classList.add("correct");
          }

          updateScoreDisplay();

          setTimeout(() => {
              currentQuestionIndex++;
              if (currentQuestionIndex < questions.length) {
                  displayQuestion();
              } else {
                  endQuiz();
              }
          }, 1000);
      }

      function endQuiz() {
          clearInterval(timer);
          questionText.textContent = "Quiz Complete!";
          optionsList.innerHTML = "";
          feedback.textContent = "";
          quizButton.textContent = "Play Again";
          quizButton.setAttribute("onclick", "startQuiz()");
      }

      function updateScoreDisplay() {
          scoreTextDisplay.textContent = `${score} / ${questions.length}`;
          const totalCircumference = 2 * Math.PI * 45;
          const percentageScore = (score / questions.length) * 100;
          const offset = totalCircumference - (percentageScore / 100) * totalCircumference;
          progressCircle.style.strokeDashoffset = offset;
      }
