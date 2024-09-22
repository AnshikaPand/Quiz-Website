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
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
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
                isCorrect: isCorrect
            };
        }).filter(q => q !== null);

        console.log('Answered Questions:', answeredQuestions);
        console.log('Final Score:', score);

        // Update or add the user score
        updateOrAddUserScore(userEmail, score, userName, answeredQuestions);

        localStorage.setItem('quizScore', score);
        console.log('Score calculation and storage completed successfully.');
    } catch (error) {
        console.error('An error occurred while calculating and storing the score:', error);
    }
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
document.addEventListener('DOMContentLoaded', () => {
    storeQuestionsInLocalStorage();
    loadUserImage();
    setupImageUpload();
});

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

// function updateTimeline() {
//     const progressBar = document.getElementById('time-line-overlap');
//     console.log('Updating progress bar...'); // Debugging line
//     console.log('Current Question Index:', currentQuestionIndex); // Debugging line

//     if (!progressBar) {
//         console.error('Progress bar element not found.');
//         return;
//     }

//     if (typeof currentQuestionIndex === 'undefined' || currentQuestionIndex < 0) {
//         console.error('Invalid question index.');
//         return;
//     }

//     const totalQuestions = questions.length;
// const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

//     console.log(`Progress Percentage: ${progressPercentage}`); // Debugging line

//     progressBar.style.width = `${progressPercentage}%`;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed'); // Check if this logs
//     storeQuestionsInLocalStorage();
//     displayQuestion(currentQuestionIndex);
//     updateTimeline();


//     // Add event listeners for buttons after the DOM is loaded
//     const nextQueston = document.getElementById('next-btn');
//     if (nextQueston) {
//         nextQueston.addEventListener('click', nextQuestion);
//     }

//     const previous = document.getElementById('Previous-btn');
//     if (previous) {
//         previous.addEventListener('click', previousQuestion);
//     }
// });

// function updateButtonState() {
//     document.getElementById('Previous-btn').disabled = (currentQuestionIndex === 0);
//     document.getElementById('next-btn').disabled = (currentQuestionIndex === totalQuestions - 1);
// }


// // Function to handle logout with confirmation
// function handleLogout()
//  {
//     console.log('handleLogout function called'); // Debugging line
//     const confirmation = confirm('Are you sure you want to log out?');
//     if (confirmation) 
//         {
//         // Clear all relevant localStorage items
//         localStorage.removeItem('userAnswers');
//         localStorage.removeItem('quizScore');

//         localStorage.removeItem('finalScore');

//         localStorage.removeItem('userGmail');
//         localStorage.removeItem('userName');

//         window.location.href = 'login.html'; 
//     }
// }
// // Function to setup image upload functionality
// function setupImageUpload() 
// {
//     const userImgDiv = document.getElementById('userimg');


//     const imageUploadInput = document.getElementById('imageUpload');

//     if (!userImgDiv || !imageUploadInput) {

//         console.error('Element not found: userimg or imageUpload');

//         return;
//     }

//     // Handle click on user image container to trigger file input
//     userImgDiv.addEventListener('click', function() {

//         imageUploadInput.click(); 
//     });

//     // Handle image upload
//     imageUploadInput.addEventListener('change', function(event) {
//         const file = event.target.files[0];
//         if (file) {

//             const reader = new FileReader();
//             reader.onload = function(e)
//              {
//                 const imgData = e.target.result; // Image data URL

//                 localStorage.setItem('userImage', imgData);

//                 // Display the image
//                 displayImage(imgData);
//             };
//             reader.readAsDataURL(file);
//         }
//     });

//     // Function to display the image
//     function displayImage(imgData)
//      {
//         const imgElement = document.createElement('img');
//         imgElement.src = imgData;
//         imgElement.alt = 'User Image';

//         imgElement.style.width = '60px'
//         ; 
//         imgElement.style.height = '60px';

//         imgElement.style.borderRadius = '50%'; 

//         // Clear previous content and append new image
//         userImgDiv.innerHTML = '';
//         userImgDiv.appendChild(imgElement);


//         imgElement.style.position = 'relative';
//         imgElement.style.top = '-25px'; 
//         imgElement.style.marginLeft = '-2px'; 
//     }

//     // Load image from local storage on page load
//     const savedImage = localStorage.getItem('userImage');
//     if (savedImage) {
//         displayImage(savedImage);
//     }

//     // Prevent the context menu from appearing on right-click
//     userImgDiv.addEventListener('contextmenu', function(event) {
//         event.preventDefault(); // Prevent the default context menu
//     });
// }


// // Ensure setupImageUpload is called when the page loads
// document.addEventListener('DOMContentLoaded', setupImageUpload);


// document.addEventListener('DOMContentLoaded', () => {
//     const userEmail = localStorage.getItem('currentUserEmail');
//     if (!userEmail) {
//         alert('Please log in to start the quiz.');
//         window.location.href = "login.html"; // Redirect to login page
//         return;
//     }

//     storeQuestionsInLocalStorage();
//     displayQuestion(currentQuestionIndex);
//     updateTimeline();

// });








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



