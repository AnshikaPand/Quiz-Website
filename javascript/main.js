//Function to toggle password visibility
function togglePassword() {
    const togglePasswordElement = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePasswordElement && passwordInput) {
        togglePasswordElement.addEventListener('click', function () {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.setAttribute('name', 'show');
            } else {
                passwordInput.type = 'password';
                this.setAttribute('name', 'hide');
            }
        });
    }
}

// Function to handle signup
function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const termsAccepted = document.getElementById('coding').checked;

    // Validation
    if (!name || !email || !password) {
        alert("All fields are required!");
        return false;
    }

    if (!termsAccepted) {
        alert("You must accept the Terms & Conditions.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isEmailUsed = existingUsers.some(user => user.email === email);

    if (isEmailUsed) {
        alert("This email is already registered. Please use a different email.");
        return false;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Signup successful!');
    window.location.href = "index.html";
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
// Function to handle login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find(user => user.email === email && user.password === password);

    if (foundUser) {
        localStorage.setItem('currentUserEmail', email); // Store current user email in localStorage
        localStorage.setItem('isLoggedIn', 'true'); // Set login status to true
        alert('Login successful!');
        speakWelcomeMessage(foundUser.name); // Call the function to speak the welcome message
        window.location.href = "quiz-loading.html";
    } else {
        alert('Invalid email or password');
    }

    return false; // Prevent form submission
}

// Function to speak a welcome message
function speakWelcomeMessage(userName) {
    const message = `Welcome, ${userName}`;
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
}
// Function to get the current user's email from localStorage
function getUserKey() {
    return localStorage.getItem('currentUserEmail');
}

// Function to display the username on the quiz-loading page
function displayName() {
    const email = getUserKey(); // Use getUserKey to retrieve the email
    const userName = email ? email.split('@')[0] : 'Guest'; // Display part of the email as username
    if (document.getElementById('userNameDisplay')) {
        document.getElementById('userNameDisplay').innerText = `Welcome, ${userName}`;
    }
}
// Add event listener to the button

// Function to start the quiz
function startQuiz() {
    window.location.href = "quizpage.html"; // Replace with the actual path to your quiz page
}



// Ensure displayName is called when the page loads
window.onload = displayName();



//  // ------QuizPage.html------//

const questions = [
    {
        question: 'A set of instructions that tells the computer how to behave, what to do, and derive a solution to a particular problem is:',
        a: "Algorithm",
        b: "Pseudocode",
        c: "Programming",
        d: "Program",
        answer: "d"
    },
    {
        question: 'A set of logically sequenced instructions that allows finding the solution to a problem is:',
        a: "Algorithm",
        b: "Pseudocode",
        c: "Programming",
        d: "Program",
        answer: "a"
    },
    {
        question: 'The six stages of program development in logical order are:',
        a: "Define, Analyze, Write, Test, Document, Debug",
        b: "Define, Analyze, Develop, Write, Test and Debug, Document",
        c: "Define, Write, Develop, Analyze, Test, Document",
        d: "Define, Develop, Write, Test, Document, Debug",
        answer: "b"
    },
    {
        question: 'The programming language used to show pupils the concept and structure of programming is called:',
        a: "Basic",
        b: "Cobol",
        c: "Pascal",
        d: "Java",
        answer: "c"
    },
    {
        question: 'Java is an example of which generation programming language:',
        a: "4GLs",
        b: "3rd",
        c: "2nd",
        d: "1st",
        answer: "b"
    },
    {
        question: 'Which of the following generations of programming language executed code faster:',
        a: "4GLs",
        b: "3rd",
        c: "2nd",
        d: "1st",
        answer: "d"
    },
    {
        question: 'Algorithms must be all of the following except:',
        a: "Logical",
        b: "Ambiguous",
        c: "Concise",
        d: "Precise",
        answer: "b"
    },
    {
        question: 'Which language had codes such as MOV, ADD, SUB:',
        a: "Java",
        b: "Binary",
        c: "Pascal",
        d: "Assembly",
        answer: "d"
    },
    {
        question: 'Which of the following executes programming codes line by line, rather than the whole program:',
        a: 'Compiler',
        b: 'Interpreter',
        c: 'Executer',
        d: 'Translator',
        answer: 'b'
    },
    {
        question: 'All the following are examples of third programming languages except:',
        a: "Pascal",
        b: "C#",
        c: "Basic",
        d: "Fortran",
        answer: 'd'
    }
];



const totalQuestions = questions.length;
let currentQuestionIndex = 0;
let score = 0;


// Store the quiz questions in localStorage
function storeQuestionsInLocalStorage() {
   let questionsList =  JSON.parse(localStorage.getItem('quizQuestions'));
   console.log(questionsList)
    if(!questionsList){
        localStorage.setItem('quizQuestions', JSON.stringify(questions));
    }
}

// Retrieve the current user's name from localStorage
function getUserName() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userEmail = localStorage.getItem('currentUserEmail');
    const user = users.find(user => user.email === userEmail);
    return user ? user.name : 'Guest';
}

// Update or add the user's score to localStorage
function updateOrAddUserScore(userEmail, score, userName, answeredQuestions) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    const existingUserIndex = scores.findIndex(user => user.email === userEmail);

    if (existingUserIndex !== -1) {
        scores[existingUserIndex].score = score;
        scores[existingUserIndex].name = userName;
        scores[existingUserIndex].answeredQuestions = answeredQuestions || [];
    } else {
        scores.push({ email: userEmail, score, name: userName, answeredQuestions: answeredQuestions });
    }
    localStorage.setItem('scores', JSON.stringify(scores)); // Save updated scores
}

// Store the user's selected answer for each question
function storeUserAnswer(questionIndex, selectedAnswer) {
    let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const existingAnswerIndex = userAnswers.findIndex(answer => answer.questionIndex === questionIndex);

    if (existingAnswerIndex !== -1) {
        userAnswers[existingAnswerIndex].selectedAnswer = selectedAnswer;
    } else {
        userAnswers.push({ questionIndex, selectedAnswer });
    }

    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

function resetUserAnswers() {
    localStorage.removeItem('userAnswers');
}

// Call this after submitting the quiz
resetUserAnswers();


let startTime = null;

// Initialize the quiz and set start time
document.addEventListener('DOMContentLoaded', () => {
    startTime = new Date(); 
    loadCurrentQuestionIndex();
    displayQuestion(currentQuestionIndex);
    updateTimeline();
});

// Calculate the time spent on the test in minutes
function getTimeSpent() {
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000; // Time difference in seconds
    const timeDiffInMinutes = timeDiff / 60; // Convert seconds to minutes
    return timeDiffInMinutes.toFixed(2); // Round to 2 decimal places
}


console.log( getTimeSpent())


// Calculate the user's score based on their answers and store it
function calculateAndStoreScore() {
    try {
        console.log('Starting score calculation...');

        // Retrieve and parse user answers from localStorage
        const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
        const userEmail = localStorage.getItem('currentUserEmail');
        const userName = getUserName();

        console.log('User Email:', userEmail);
        console.log('User Name:', userName);
        console.log('User Answers:', userAnswers);

        if (!userEmail || !userName) {
            console.error('User email or name is missing.');
            return;
        }

        let score = 0;
        const answeredQuestions = userAnswers.map(answer => {
            if (typeof answer.questionIndex !== 'number' || answer.questionIndex < 0 || answer.questionIndex >= questions.length) {
                console.warn(`Invalid question index: ${answer.questionIndex}`);
                return null;
            }

            const questionData = questions[answer.questionIndex];
            const isCorrect = answer.selectedAnswer === questionData.answer;

            if (isCorrect) {
                score += 10;
            }

            return {
                question: questionData.question,
                selectedAnswer: answer.selectedAnswer,
                correctAnswer: questionData.answer,
                isCorrect: isCorrect,
                options: {
                    a: questionData.a,
                    b: questionData.b,
                    c: questionData.c,
                    d: questionData.d
                }
            };
        }).filter(q => q !== null);

        console.log('Answered Questions:', answeredQuestions);
        console.log('Final Score:', score);

        // Calculate time spent on the test in minutes
        const timeSpent = getTimeSpent(); // This now returns time in minutes, rounded
        console.log('Time Spent (minutes):', timeSpent);

        // Store the test attempt in localStorage
        storeTestAttempt(userEmail, userName, score, answeredQuestions, timeSpent);

        // Update or add the user score
        updateOrAddUserScore(userEmail, score, userName, answeredQuestions);

        localStorage.setItem('quizScore', score);
        console.log('Score calculation and storage completed successfully.');
    } catch (error) {
        console.error('An error occurred while calculating and storing the score:', error);
    }
}


// Store the test attempt in localStorage
function storeTestAttempt(userEmail, userName, score, answeredQuestions, timeSpent) {
    let testAttempts = JSON.parse(localStorage.getItem('testAttempts')) || [];
    
    const newAttempt = {
        userEmail,
        userName,
        score,
        timeSpent,
        timestamp: new Date().toISOString().split('T')[0], // Store only the date in YYYY-MM-DD format
        answeredQuestions: answeredQuestions.map(q => ({
            question: q.question,
            selectedAnswer: q.selectedAnswer,
            correctAnswer: q.correctAnswer,
            isCorrect: q.isCorrect,
            options: {
                a: questions.find(question => question.question === q.question).a,
                b: questions.find(question => question.question === q.question).b,
                c: questions.find(question => question.question === q.question).c,
                d: questions.find(question => question.question === q.question).d
            }
        }))
    };

    testAttempts.push(newAttempt);
    localStorage.setItem('testAttempts', JSON.stringify(testAttempts));
}




function displayTestAttempts() {
    const testAttempts = JSON.parse(localStorage.getItem('testAttempts')) || [];
    const userEmail = localStorage.getItem('currentUserEmail');
    
    const userAttempts = testAttempts.filter(attempt => attempt.userEmail === userEmail);

    if (userAttempts.length === 0) {
        console.log('No test attempts found for this user.');
        return;
    }

    userAttempts.forEach((attempt, index) => {
        console.log(`Test Attempt ${index + 1}`);
        console.log('Score:', attempt.score);
        console.log('Time Spent (seconds):', attempt.timeSpent);
        console.log('Answered Questions:', attempt.answeredQuestions);
        console.log('Timestamp:', attempt.timestamp);  // This is the missing part
    });
}


// Display the current question
function displayQuestion(index) {
    const questionContainer = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const questionNumber = document.getElementById('question-number');

    if (!questionContainer || !optionsList || !questionNumber) {
        console.error('One or more DOM elements not found');
        return;
    }

    if (index >= questions.length || index < 0) return;

    const questionData = questions[index];

    questionContainer.textContent = questionData.question;
    questionNumber.textContent = `Question ${index + 1} of ${questions.length}`;
    optionsList.innerHTML = '';

    ['a', 'b', 'c', 'd'].forEach(option => {
        const optionItem = document.createElement('li');
        optionItem.style.marginLeft = `45px`;
        optionItem.style.marginTop = `20px`;
        optionItem.style.display = 'flex';
        optionItem.style.alignItems = 'center';
        optionItem.style.cursor = 'pointer';
        optionItem.style.height = '50px';
        optionItem.style.width = '350px';
        optionItem.style.borderRadius = '10px';
    
        optionItem.innerHTML = `
            <input type="radio" id="option${option}" name="answer" value="${option}" style="display: none;">
            <label for="option${option}">${questionData[option]}</label>
        `;
    
        // Add click event to the entire list item
        optionItem.addEventListener('click', function () {
            const radioButton = optionItem.querySelector('input[type="radio"]');
            radioButton.checked = true; // Check the radio button
            storeUserAnswer(index, radioButton.value); // Store the answer
            document.querySelectorAll('#options-list li').forEach(label => label.style.backgroundColor = '');
            optionItem.style.backgroundColor = 'gray'; // Highlight the selected option
        });
    
        optionsList.appendChild(optionItem);
    });
    
       
}

// Submit the answer and move to the next question
function submitAndContinue() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (!selectedAnswer) {
        alert('Please select an answer before continuing.');
        return;
    }

    storeUserAnswer(currentQuestionIndex, selectedAnswer.value);
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        displayQuestion(currentQuestionIndex);
        updateTimeline();
        if (currentQuestionIndex === totalQuestions - 1) {
            document.getElementById('submit-btn').textContent = 'Submit';
        }
    } else {
        calculateAndStoreScore();
        alert('Quiz completed! Your score has been saved.');
        window.location.href = "Rank Page.html";
    }
}

// Store the current question index
function storeCurrentQuestionIndex() {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
}

// Load the current question index from localStorage
function loadCurrentQuestionIndex() {
    const storedIndex = localStorage.getItem('currentQuestionIndex');
    if (storedIndex !== null) {
        currentQuestionIndex = parseInt(storedIndex, 10);
    }
}

// Initialize the quiz
document.addEventListener('DOMContentLoaded', () => {
    loadCurrentQuestionIndex();
    displayQuestion(currentQuestionIndex);
    updateTimeline();
});

// Function to move to the next question
function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('Please select an answer before continuing.');
        return;
    }

    storeUserAnswer(currentQuestionIndex, selectedAnswer.value);
    currentQuestionIndex++;
    storeCurrentQuestionIndex();

    if (currentQuestionIndex < totalQuestions) {
        displayQuestion(currentQuestionIndex);
        updateTimeline();
    } else {
        calculateAndStoreScore();
        alert('Quiz completed! Your score has been saved.');
        window.location.href = "Rank Page.html";
    }
}

// Function to move to the previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        storeCurrentQuestionIndex();
        displayQuestion(currentQuestionIndex);
        updateTimeline();
    }

    document.getElementById('next-btn').disabled = false;

    if (currentQuestionIndex === 0) {
        document.getElementById('Previous-btn').disabled = true;
    }
}


function updateTimeline() {

    const progressBar = document.getElementById('Progressbar');
    if (progressBar) {
        const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    } else {
        console.error('Progress bar element not found.');
    }
}





// Handle logout functionality
function handleLogout() {
    const confirmation = confirm('Are you sure you want to log out?');
    if (confirmation) {
        localStorage.removeItem('userAnswers');
        localStorage.removeItem('quizScore');
        localStorage.removeItem('finalScore');
        localStorage.removeItem('userGmail');
        localStorage.removeItem('userName');
        window.location.href = 'index.html';  // Redirect to login page
    }
}


// Set up image upload functionality
function setupImageUpload() {
    const userImgDiv = document.getElementById('userimg');
    const imageUploadInput = document.getElementById('imageUpload');

    if (!userImgDiv || !imageUploadInput) {
        console.error('Element not found: userimg or imageUpload');
        return;
    }

    userImgDiv.addEventListener('click', function () {
        imageUploadInput.click();
    });

    imageUploadInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgData = e.target.result;
                localStorage.setItem('userImage', imgData); // Save image data to localStorage
                userImgDiv.style.backgroundImage = `url(${imgData})`; // Update the div with the image
            };
            reader.readAsDataURL(file);
        }
    });
}

// Load and display user image on page load
function loadUserImage() {
    const userImgDiv = document.getElementById('userimg');
    const storedImage = localStorage.getItem('userImage');

    if (storedImage && userImgDiv) {
        userImgDiv.style.backgroundImage = `url(${storedImage})`;
    }
}

// Initialize the page
// document.addEventListener('DOMContentLoaded', () => {
    storeQuestionsInLocalStorage();
    loadUserImage();
    setupImageUpload();
// });

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        storeCurrentQuestionIndex(); // Store updated index
        displayQuestion(currentQuestionIndex);
        updateTimeline(); // Update progress bar
    }

    // Enable next button
    document.getElementById('next-btn').disabled = false;

    // Disable previous button if at the first question
    if (currentQuestionIndex === 0) {
        document.getElementById('Previous-btn').disabled = true;
    }
}





// -------Student information page--------//


// Function to display user signup information on the page
function displayUserInfo() {
    const userInfoDiv = document.getElementById('Information');

    const currentUserEmail = localStorage.getItem('currentUserEmail');

    if (!userInfoDiv || !currentUserEmail) return;

    const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve all users
    const currentUser = users.find(user => user.email === currentUserEmail); // Find the current user

    if (currentUser) {

        userInfoDiv.innerHTML = `
            <h3>User Information</h3>
            <p><strong>Name:</strong> ${currentUser.name}</p>

            <p><strong>Email:</strong> ${currentUser.email}</p>
        `;
    } else {


        userInfoDiv.innerHTML = `<p>User information not found.</p>`;
    }
}


window.onload = function () {
    displayName();
    displayUserInfo();
};



