const questions = [
    {
        question: "Which is largest animal in the world?",
        answers:[
            {text:"Shark", correct:false},
            {text:"Blue whale", correct:true},
            {text:"Elephant", correct:false},
            {text:"Giraffe", correct:false},
        ]
    },
    {
        question: "Which is smallest country in the world?",
        answers:[
            {text:"Vatican City", correct:true},
            {text:"Bhutan", correct:false},
            {text:"Nepal", correct:false},
            {text:"Shri Lanka", correct:false},
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers:[
            {text:"Kalahari", correct:false},
            {text:"Gobi", correct:false},
            {text:"Sahara", correct:false},
            {text:"Antarctica", correct:true},
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers:[
            {text:"Australia", correct:true},
            {text:"Asia", correct:false},
            {text:"Arctic", correct:false},
            {text:"Africa", correct:false},
        ]
    } 
];

const questionElement = document.getElementById("question");
const answerbtn = document.getElementById("answer-buttons");
const nextbtn = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startquiz()
{
    currentquestionindex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showquestion();
}

function showquestion()
{
    resetstate();
    let currentquestion = questions[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionElement.innerHTML = questionno + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbtn.appendChild(button); 
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    })
}

function resetstate()
{
    nextbtn.style.display = "none";
    while(answerbtn.firstChild)
    {
        answerbtn.removeChild(answerbtn.firstChild);
    }
}
function selectanswer(e)
{
    const selectbtn = e.target;
    const iscorrect = selectbtn.dataset.correct === "true";
    if(iscorrect)
    {
        selectbtn.classList.add("correct");
        score++;
    }
    else
    {
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerbtn.children).forEach(button =>
        {
            if(button.dataset.correct === "true")
            {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextbtn.style.display = "block";
}

function showscore()
{
    resetstate();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
}

function handlenextbutton()
{
    currentquestionindex++;
    if(currentquestionindex<questions.length)
    {
        showquestion();
    }
    else
    {
        showscore();
    }
}



nextbtn.addEventListener("click", ()=>
    {
        if(currentquestionindex < questions.length)
        {
            handlenextbutton();
        }
        else
        {
            startquiz();
        }
    })
startquiz();