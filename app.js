// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import {
    getDatabase,
    ref,
    push,
    set,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjdKgMeH3JLAlunxIOun3tfD7mptxSqv8",
    authDomain: "quizapp-fba39.firebaseapp.com",
    projectId: "quizapp-fba39",
    storageBucket: "quizapp-fba39.appspot.com",
    messagingSenderId: "983646402048",
    appId: "1:983646402048:web:a80f63ed68c9fd8bc34ae5",
    measurementId: "G-T3HCTEF1T7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Databs = getDatabase();
// const auth = getAuth();


var adminquestion = document.getElementById('adminquestion');
var adminoption1 = document.getElementById('adminoption1');
var adminoption2 = document.getElementById('adminoption2');
var adminoption3 = document.getElementById('adminoption3');
var adminoption4 = document.getElementById('adminoption4');
var admincorrectanswer = document.getElementById('admincorrectanswer');
window.btn = function (e) {
    e.preventDefault()
    var obj = {
        adminquestion: adminquestion.value,
        adminoptions: [adminoption1.value, adminoption2.value, adminoption3.value, adminoption4.value],
        admincorrectanswer: admincorrectanswer.value,
    };
    //   console.log(obj);

    var refrence = ref(Databs, "Quiz Questions/");
    var newpush = push(refrence);
    set(newpush, obj);
};
function getData() {
    var refrence = ref(Databs, "Quiz Questions/");

    onValue(refrence, function (data) {
        questions = Object.values(data.val())
        console.log(questions);
        StartQuiz();

    });
}
getData();
var questions;

var sawal = document.getElementById("question")
var currentQuestion = document.getElementById("currentQuestion")
var totalQuestions = document.getElementById("totalQuestions")
var answerParent = document.getElementById("answerParent")
var indexNumber = 0 ;
var Score = 0;
var DataQuestions;

function StartQuiz() {
    answerParent.innerHTML = "";
    sawal.innerHTML = questions[indexNumber].adminquestion;
    for (var i = 0; i < questions[indexNumber].adminoptions.length; i++) {

        answerParent.innerHTML += `<div class="col-md-6 py-2">
    <button onclick="checkQuestion(this,'${questions[indexNumber].admincorrectanswer}')" class="btn w-100 btn-info">${questions[indexNumber].adminoptions[i]}</button>
    </div>
    `;}
    totalQuestions.innerHTML = questions.length;
currentQuestion.innerHTML = indexNumber +1;
};


window.checkQuestion = function (elem, correctOption) {
    var userOption = elem.innerHTML;
    var correctOption = questions[indexNumber].admincorrectanswer;
    if (userOption == correctOption) {
        Score = Score + 1;
    }
    console.log(Score);
    var allOptionBtns = answerParent.getElementsByTagName("button");
    for (var i = 0; i < allOptionBtns.length; i++) {
        allOptionBtns[i].disabled = true;
        if (allOptionBtns[i].innerHTML == correctOption) {
            allOptionBtns[i].classList.add("bg-success");
        } else {
            allOptionBtns[i].classList.add("bg-danger");
        }
    }
};

window.nextQuestion = function () {

    if (indexNumber + 1 == questions.length) {
        alert("quiz completed !" + " and your score is " + Score);
    } else {
        indexNumber = indexNumber + 1;
        StartQuiz();
        
    }
};

