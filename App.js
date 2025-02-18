const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");

let questionContainer = 0;
let currentQuestion;
let availableQuestions = [];
let availableoptions = [];

function setAvailableQuestions()
{
   const totalQuestion = CPP.length;
   for(let i=0; i<totalQuestion; i++)
   {
       availableQuestions.push(CPP[i]);
   }
}

function getNewQuestion()
{
    questionNumber.innerHTML = "Question " + (questionContainer + 1) + " of " + CPP.length;
    const questionIndex = availableQuestions[Math.floor(Math.random()  * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    const optionLen = currentQuestion.options.length
    for(let i=0;i<optionLen; i++)
    {
        availableoptions.push(i)
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    for(let i=0; i<optionLen; i++)
    {
        const optionIndex = availableoptions[Math.floor(Math.random() * availableoptions.length)];
        const index2 = availableoptions.indexOf(optionIndex);
        availableoptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    questionContainer++
}

function getResult(element)
{
    const id = parseInt(element.id);
    if(id === currentQuestion.answer)
    {
        element.classList.add("correct");
        updateAnswerIndicator("correct");
    }
    else
    {
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++)
        {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer)
            {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    unclickableOptions();
}

function unclickableOptions()
{
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++)
    {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator()
{
    const  totalQuestion = CPP.length;
    for(let i=0; i<totalQuestion; i++)
    {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType)
{
    answersIndicatorContainer.children[questionContainer-1].classList.add(markType)
}

function next ()
{
    if(questionContainer === CPP.length)
    {
        console.log("Quiz Over");
    }
    else
    {
        getNewQuestion();
    }
}

window.onload = function()
{
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}