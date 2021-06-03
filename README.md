## Techniques Used 

- Using VSCode to commit files to github 
- Using Postman to test code
- Exporting modules
- Non-web server Node.js JavaScript code
    - Lambda expressions
    - Object destructuring
    - for loops
    - try...catch operater
    - Throwing errors
    - .push() method
    - .splice() method
    - if...else statments
    - template literals
    - deep cloning
- Web server Node.js JavaScript code
  - Installing fastify
  - Initializing as a node.js file
  - Using http "GET" "POST" "PUT" and "DELETE" verbs
  - Utilizing the html MIME type
  - Returning a status code
  - Responding to client requests and handling query parameters
  - Parsing JSON and converting information to JSON using .stringify()

## Objectives


### Export data array.
```
// Question and answer data array
const data = [
  {
    question: "Q1",
    answer: "A1",
  },
  {
    question: "Q2",
    answer: "A2",
  },
  {
    question: "Q3",
    answer: "A3",
  },
];

// Export statement must be below data declaration - no hoisting with const
module.exports = {
  data,
};
```
### Create a module file containing functions which return, add, or delete information from the data array. Return an error if the the arguments passed are invalid.  

```
const {data} = require('./p4-data'); 

const getQuestions = () => {
  let qs = [];
    for(i=0; i < data.length; i++) {
        qs.push(data[i].question);
    }
    return qs;
};

const getAnswers = () => {
  let as = [];
  for(i=0; i < data.length; i++) {
      as.push(data[i].answer);
  }
  return as
};

const getQuestionsAnswers = () => {return data.slice()};

const getQuestion = (number = "") => {
  const q = {
    error: "",
    number: "",
    question: ""
  }
  try {
    if(Number.isInteger(number) == false) throw "Question number must be an integer";
    if(number < 1 ) throw "Question number must be >= 1";
    if(number > data.length ) throw `Question number must be less than the number of questions (${data.length})`;
    
  } catch (err) {
    q.error = err;
  } finally {
    if(q.error === "" ) {
      q.question = data[number - 1].question;
      q.number = number;
    }
    return q;
  }
};

const getAnswer = (number = "") => {
  const a = {
    error: "",
    number: "",
    answer: ""
  }
  try {
    if(Number.isInteger(number) == false) throw "Answer number must be an integer";
    if(number < 1 ) throw "Answer number must be >= 1";
    if(number > data.length ) throw `Answer number must be less than the number of answers (${data.length})`;
    
  } catch (err) {
    a.error = err;
  } finally {
    if(a.error === "" ) {
      a.answer = data[number - 1].answer;
      a.number = number;
    }
    return a;
  }
};

const getQuestionAnswer = (number = "") => {
  const qa = {
    error: "",
    number: "",
    question: "",
    answer: ""
  }
  try {
    if(Number.isInteger(number) == false) throw "Question number must be an integer";
    if(number < 1 ) throw "Question number must be >= 1";
    if(number > data.length ) throw `Question number must be less than the number of questions (${data.length})`;
    
  } catch (err) {
    qa.error = err;
  } finally {
    if(qa.error === "" ) {
      qa.question = data[number - 1].question;
      qa.answer = data[number - 1].answer;
      qa.number = number;
    }
    return qa;
  }
};

const addQuestionAnswer = (info = {}) => {
  const qa = {
    error: "",
    number: "",
    question: "",
    answer: ""
  }
  try {
    if(info.question === undefined) throw "Object question property required";
    if(info.answer === undefined) throw "Object answer property required";
  } catch (err) {
    qa.error = err;
    qa.number = -1;
  } finally {
    if(qa.error === "" ) {
      qa.question = info.question;
      qa.answer = info.answer;
      qa.number = data.length + 1;
      data.push(info);
    }
    return qa;
  }
};

const updateQuestionAnswer = (info = {}) => {
  const qa = {
    error: "",
    message: "",
    number: ""
  }

  try {
    if(info.answer === undefined && info.question === undefined) throw "Object question property or answer property required";
    if(Number.isInteger(info.number) === false || info.number < 1 || info.number > data.length) throw "Object number property must be a valid integer";  
  } catch (err) {
    qa.error = err;
  } finally {
    if(qa.error === "" ) {
      qa.message = `Question ${info.number} updated`;
      qa.number = info.number;
      if(info.question != undefined){
      data[(info.number - 1)].question = info.question;}
      if(info.answer != undefined){
      data[(info.number - 1)].answer = info.answer;}
    }
    return qa;
  }
};

const deleteQuestionAnswer = (info = {}) => {
  const qa = {
    error: "",
    message: "",
    number: ""
  }

  try {
    if(Number.isInteger(info) === false) throw "Question/answer number must be an integer";
    if(info < 1 ) throw "Question/answer number must be >= 1";
    if(info > data.length ) throw `Question/answer number must be less than the number of questions (${data.length})`;
  } catch (err) {
    qa.error = err;
  } finally {
    if(qa.error === "" ) {
      qa.message = `Question ${info} delted`;
      qa.number = info;
      data.splice((info -1), 1);
    }
    return qa;
  }
}

module.exports = {
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer
};
```


### Create a REST API which replies to client requests with JSON. Account for unmatched routes and use requests from the client or add or delete questions. 

```

const fastify = require("fastify")();
const {getQuestion, getAnswer, getQuestionAnswer, getQuestions, getAnswers, getQuestionsAnswers, addQuestionAnswer, updateQuestionAnswer, deleteQuestionAnswer} = require('./p4-module'); 


fastify.get("/cit/question", (req, res) => {

    const allQs = {
        error: "",
        statusCode: 200,
        questions: getQuestions()
    }
    
     res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(allQs));
});

fastify.get("/cit/answer", (req, res) => {

    const allAs = {
        error: "",
        statusCode: 200,
        answers: getAnswers()
    }
    
     res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(allAs));
});

fastify.get("/cit/questionanswer", (req, res) => {

    const allQAs = {
        error: "",
        statusCode: 200,
        questions_answers: getQuestionsAnswers()
    }
    
     res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(allQAs));
});

fastify.get("/cit/question/:number", (req, res) => {
    let numberFromClient = req.params.number;
    let toClient = getQuestion(Number(numberFromClient))

    const Qs = {
        error: toClient.error,
        statusCode: 200,
        question: toClient.question,
        number: toClient.number
    }
    
     res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(Qs));
});

fastify.get("/cit/answer/:number", (req, res) => {
    let numberFromClient = req.params.number;
    let toClient = getAnswer(Number(numberFromClient));


    const As = {
        error: toClient.error,
        statusCode: 200,
        answer: toClient.answer,
        number: toClient.number
    }
    
     res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(As));
});

fastify.get("/cit/questionanswer/:number", (req, res) => {
    let numberFromClient = req.params.number;
    let toClient = getQuestionAnswer(Number(numberFromClient));

    const QAs = {
        error: toClient.error,
        statusCode: 200,
        question: toClient.question,
        answer: toClient.answer,
        number: toClient.number
    }
    
     res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(QAs));
});

fastify.get("*", (req, res) => {

    const unmatched = {
        error: "Route not found",
        statusCode: 404,
    }
    
     res
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(unmatched));
});

fastify.post("/cit/question", (req, res) => {
    let fromClient = JSON.parse(req.body);
    let toClient = addQuestionAnswer();
    if(fromClient != null){
        toClient = addQuestionAnswer(fromClient);
    }
    
    

    const QAsAdd = {
        error: toClient.error,
        statusCode: 201,
        number: toClient.number
    }
    
     res
        .code(201)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(QAsAdd));
});


fastify.put("/cit/question", (req, res) => {
    let fromClient = JSON.parse(req.body);
    let toClient = updateQuestionAnswer();
    if(fromClient != null){
        toClient = updateQuestionAnswer(fromClient);
    }
    
    

    const QAUpdate = {
        error: toClient.error,
        statusCode: 200,
        number: toClient.number
    }
    
     res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(QAUpdate));
});

fastify.delete("/cit/question/:number", (req, res) => {
    let numberFromClient = req.params.number;
    let toClient = deleteQuestionAnswer(Number(numberFromClient));

    const deleteQ = {
        error: toClient.error,
        statusCode: 200,
        number: toClient.number
    }
    
     res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(JSON.stringify(deleteQ));
});

const hostname = 'localhost';
const port = 8080;
fastify.listen(port, hostname, () => {
    console.log(`server running @ http://${hostname}:${port}/`)
});
```

Node.js configuration file:

[package.json](https://lizz02.github.io/cit281-p4/package.json)
