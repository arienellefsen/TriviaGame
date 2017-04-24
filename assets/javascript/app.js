//setTimeout(function() {  
//}, timeout);
//SetInterval
//Clear Interval
//Clear Time out

// 1- Get Dom Elements
var question = $("#question");
var inputChoices = $("#choices-input");
var correctAnswear = $("#answear");
var timer = $("#timer");
var seconds =10;
var score =0;
var rightAnswear=0;
var wrongAnswear=0;
var i=0;
var num =0;
var isRight = 1;
 var count= 0;




var triviaQuiz = {
    quiz: [{
            questions: "Question 1",
            choices: ["a", "b", "c"],
            correctAnswear: "c",
        }, {
            questions: "Question 2",
            choices: ["d", "e", "f"],
            correctAnswear: "d",
        },
        {
            questions: "Question 3",
            choices: ["1", "2", "3"],
            correctAnswear: "1"
        }
    ],


    startQuiz: function(i, num, isRight, count) {


        //Get the total number of questions
        var holdQuiz = triviaQuiz.quiz;
        console.log("Questions:" + holdQuiz.length);

        //need to get first questions
        question.html("<p>" +holdQuiz[i].questions  +"</p>")

        //create node for choices
        //Loop trough choices
       

        ;
        //create choices


        for( ;i< 3; i++){

            triviaQuiz.createAnswear(i, holdQuiz, num, isRight, count);       

            }  

         },

         createAnswear: function(i, holdQuiz,num, isRight, count){

        debugger;

       
            //create radio button
                var inputRadio = document.createElement("input");
                inputRadio.setAttribute("type", "radio");
                inputRadio.setAttribute("name", "choices");
                inputRadio.setAttribute("value", holdQuiz[count].choices[i]);
                inputRadio.setAttribute("id","myid");
          
                var inputLabel = document.createElement("label");
                inputLabel.innerHTML = holdQuiz[count].choices[i];
               
                var element = document.getElementById("form-choices");


                element.appendChild(inputLabel);
                element.appendChild(inputRadio);

                //display answear
                correctAnswear.html("Answear: "+holdQuiz[num].correctAnswear);
                console.log("My questions: " + holdQuiz[num].questions + " Choices: " + holdQuiz[num].choices + " Correct Answear: " + holdQuiz[num].correctAnswear); // get questions
                var myAnswear = holdQuiz[num].correctAnswear;
                console.log("correct answear2 : " + myAnswear);
                triviaQuiz.getAnswear(myAnswear, num, element);

                //check if there is timeout

         },

            //Check if answear is correct

            getAnswear: function(myAnswear, num, element){
            $('#form-choices input[type=radio]').change(function() {       
               
                var userAnswear = this.value;

                console.log("User Answear: " + this.value);
                console.log("Game Answear: ");


                if(myAnswear === userAnswear){
                    console.log('Correct Answear');
                    isRight === true;
                    rightAnswear += rightAnswear +1;
                    console.log("Right Answear score" + rightAnswear);
                    triviaQuiz.nextQuestion(i, num, isRight, count);
                }

                else{
                    rightAnswear = false;
                    wrongAnswear +1;
                    console.log("Wrong Answear score" + wrongAnswear);

                    console.log("Nope");
                }

                console.log(userAnswear);
            });
            },

            nextQuestion: function(i, num,isRight, count){
        
        count=0;
                i = i+1;
                num = num +1;



                triviaQuiz.startQuiz(i, num, isRight, count);
                //move to next question
                console.log("next question: " +i);

            },

            setTime: function() {
            seconds --;
            timer.html(seconds + " seconds");

            if (seconds === 0){
            
                clearTimeout(myVar);

                console.log("game over");


            }
            else{
                console.log("Playing!!");
            }

            },

        };

triviaQuiz.startQuiz(i, num, isRight, count);
var time = setTimeout(triviaQuiz.setTime, 5000);
//triviaQuiz.setTime();
var myVar = setInterval(triviaQuiz.setTime, 1000);
