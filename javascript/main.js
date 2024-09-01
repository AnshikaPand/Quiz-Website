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
    window.location.href = "login.html";
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
        window.location.href = "Quiz-loading.html";
    } else {
        alert('Invalid email or password');
    }

    return false; // Prevent form submission
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


function storeQuestionsInLocalStorage() {

    localStorage.setItem('quizQuestions', JSON.stringify(questions));
}

// Function to get the current user's name from localStorage
function getUserName() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userEmail = localStorage.getItem('currentUserEmail');
    const user = users.find(user => user.email === userEmail);
    return user ? user.name : 'Guest';
}

// Function to calculate and store the user's score and details
function calculateAndStoreScore() {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const userEmail = localStorage.getItem('currentUserEmail');
    const userName = getUserName(); // Retrieve user name from local storage

    if (!userEmail || !userName) {
        console.error('User email or name is missing.');
        return;
    }

    let score = 0; // Reset score to recalculate

    userAnswers.forEach(answer => {
        const correctAnswer = questions[answer.questionIndex].answer;
        if (answer.selectedAnswer === correctAnswer) {
            score += 10; // Increment score based on correct answers
        }
    });

    // Retrieve existing scores from local storage
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const existingUserIndex = scores.findIndex(record => record.email === userEmail);

    if (existingUserIndex !== -1) {
        // Update score and name if user already exists
        scores[existingUserIndex].score = score;
        scores[existingUserIndex].name = userName;
    } else {
        // Add new user score
        scores.push({ email: userEmail, score, name: userName });
    }

    localStorage.setItem('scores', JSON.stringify(scores)); // Save updated scores list
    localStorage.setItem('quizScore', score); // Store the updated score in local storage
}

                       // Function to store user answers in local storage
function storeUserAnswer(questionIndex, selectedAnswer) {
    let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];

    let currentAnswer = userAnswers.find(answer => answer.questionIndex === questionIndex);

    if (currentAnswer) {
        currentAnswer.selectedAnswer = selectedAnswer; 
    } else {
        userAnswers.push({ questionIndex, selectedAnswer }); // Store the new answer
    }

    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

    calculateAndStoreScore(); // Calculate and store the score after each answer
}

                                 // Function to display the current question
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
        optionItem.style.width = '150px'; 
        optionItem.style.borderRadius = '10px';
        optionItem.innerHTML = `
            <input type="radio" id="option${option}" name="answer" value="${option}">
            <label for="option${option}">${questionData[option]}</label>
        `;

        optionItem.querySelector('input').addEventListener('change', function () {
            storeUserAnswer(index, this.value);
            
            document.querySelectorAll('#options-list li').forEach(li => {
                li.style.backgroundColor = ''; 
            });

            optionItem.style.backgroundColor = 'gray';
        });

        optionItem.addEventListener('mouseover', function() {
            if (this.style.backgroundColor !== 'gray') {
                this.style.backgroundColor = '#d3d3d3'; // Light gray for hover
            }
        });

        optionItem.addEventListener('mouseout', function() {
            if (this.style.backgroundColor !== 'gray') {
                this.style.backgroundColor = ''; // Reset background color on mouse out
            }
        });

        optionsList.appendChild(optionItem);
    });

    updateTimeline(); 
}

                           // Function to handle form submission and quiz progress
function submitAndContinue() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const userEmail = localStorage.getItem('currentUserEmail') || 'Guest'; // Retrieve user email from local storage

    if (!selectedAnswer) {
        alert('Please select an answer before continuing.');
        return;
    }




    const currentQuestion = questions[currentQuestionIndex];
    storeUserAnswer(currentQuestionIndex, selectedAnswer.value);
    
    currentQuestionIndex++;





    if (currentQuestionIndex < totalQuestions) {
        displayQuestion(currentQuestionIndex);
    } else {


        calculateAndStoreScore(); 
        alert('Quiz completed! Your score has been saved.');
        window.location.href = "Rank Page.html"; 
    }
}


function updateTimeline() {
    const timeline = document.getElementById('timeline');


    if (timeline) {
         
        timeline.innerHTML = '';
        questions.forEach((_, index) => {
            const step = document.createElement('div');
            step.classList.add('timeline-step');
            if (index <= currentQuestionIndex) {
                step.classList.add('completed');
            }
            timeline.appendChild(step);
        });
    }
}

// Function to handle the next button click
function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('Please select an answer before continuing.');
        return;
    }

    storeUserAnswer(currentQuestionIndex, selectedAnswer.value);

    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        displayQuestion(currentQuestionIndex);
    } else {
        calculateAndStoreScore();
        
        alert('Quiz completed! Your score has been saved.');
        window.location.href = "rank.html"; 
    }
}

// Function to handle the previous button click
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
}

// Initialize the quiz page
document.addEventListener('DOMContentLoaded', () => {
    storeQuestionsInLocalStorage(); 
    displayQuestion(currentQuestionIndex);
    setupLogout(); 
});

 const nextQueston = document.getElementById('next-btn')
 if(nextQueston){
    next-btn.addEventListener('click', nextQuestion);
 }
const previous = document.getElementById('previous-btn')
if(previous){
    previous-btn .addEventListener('click', previousQuestion);
}



function setupLogout() {
    const userImg = document.getElementById('userimg');
    if (userImg) {
        userImg.addEventListener('click', handleLogout);
    }
}


function handleLogout() {
    const confirmation = confirm('Are you sure you want to log out?');
    if (confirmation) {
        localStorage.removeItem('userAnswers');
        localStorage.removeItem('quizScore');
        localStorage.removeItem('finalScore');
        localStorage.removeItem('userGmail');
        localStorage.removeItem('userName');
        window.location.href = 'login.html'; 
    }
}





// -------Student information page--------//


// Function to display user signup information on the page
function displayUserInfo() {
    const userInfoDiv = document.getElementById('Information');
    const currentUserEmail = localStorage.getItem('currentUserEmail'); 

    if (!userInfoDiv || !currentUserEmail) return; // Return if the div or email is not available

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


window.onload = function() {
    displayName(); // Existing function to display name
    displayUserInfo(); // New function to display user information
};



