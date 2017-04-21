//setTimeout(function() {  
//}, timeout);
//SetInterval
//Clear Interval
//Clear Time out



var triviaQuiz = {
    quiz: [{
            questions: "n1",
            choices: ["a", "b", "c"],
            correctAnswear: 3
        }, {
            questions: "n2",
            choices: ["e", "g", "h"],
            correctAnswear: 5
        },
        {
            questions: "n3",
            choices: ["a", "1", "f"],
            correctAnswear: 5
        }
    ],


    startQuiz: function() {
        //Get the total number of questions
        var holdQuiz = triviaQuiz.quiz;
        console.log("Questions:" + holdQuiz.length);

        //need to get first questions
        console.log("My questions: " + holdQuiz[0].questions + " Choices: " + holdQuiz[0].choices + " Correct Answear: " + holdQuiz[0].correctAnswear); // get questions

        //check if there is timeout


        var userAnswear = 5;

        holdQuiz.forEach(function(entry) {
            console.log("Q: " + entry.questions + "C: " + entry.choices + "CA: " + entry.correctAnswear);
            if (entry.correctAnswear === userAnswear) {
                console.log("correct")
            } else {
                console.log("Bad!");
            }
        })
    },

    setClock: function() {
        var seconds = 60;

        seconds--;
        console.log("0:" + (seconds < 10 ? "0" : "") + String(seconds));
        if (seconds > 0) {
            triviaQuiz.setTime();
        } else {
            console.log("Time out!!!");

        }

    },

    setTime: function() {

    }
};

triviaQuiz.startQuiz();
var time = setTimeout(triviaQuiz.setTime, 5000);