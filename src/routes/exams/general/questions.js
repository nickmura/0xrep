let question_list = [
	{
        question: "What statement describes cryptocurrency?",
        answers: [
            "A digital, trustless financial asset secured by cryptography", 
            "A way to get rich", 
            "Illegal coins used by hackers and black market activity ", 
            "Scam"],
        correctAnswer: "A digital, trustless financial asset secured by cryptography",
        selectedAnswer: '',
        dropdown: 'See an in-depth explanation for cryptocurrency.',
        explanation: `<a href='https://ethereum.org/en/developers/docs/nodes-and-clients/' target='_blank'>(Ethereum.org, Nodes and Clients)</a>  
        <i>"'Node' refers to a running piece of client software. A client is an implementation of Ethereum that verifies all transactions 
        in each block, keeping the network secure and the data accurate."</i>`,
        category: ['Security']
	}, 
  {
    question: "Crypto transactions are irreverisble, and cannot be charged-back or refunded if incorrectly sent. ",
    answers: [
        "True", 
        "False"],
    correctAnswer: 'True',
    selectedAnswer: '',
    dropdown: "See why transactions are irreverisble.",
    explanation: `If not all blockchains / cryptocurrencies rely on irreverisible transaction finality. Even if an exchange allows you to cancel a transaction a certain duration upon initiating a withdrawal, all transactions should be
    treated as final and irreverisible. ALL recipients of transaction should be trusted entities, with no ambiguity. `,
    category: ['Security']
  },
  {
    question: "Cryptocurrency outcomes can be predicted with market analysis & insider information",
    answers: [
        "True", 
        "False",
        ],
    correctAnswer: 'False',
    selectedAnswer: '',
    dropdown: "See why crypto is highly speculative.",
    explanation: `Cryptocurrency is one of the most volatile asset classes in the world. Nobody knows if it's going up one day or going down. DYOR`,
    category: ['Security']
  },
  {
    question: "When investing in cryptocurrency assets",
    answers: [
        "Only invest what you can afford to lose", 
        "Rely on advice from high profile social media influencers and or 'experts'",
        "Buy or sell depending on the price fluctations of the day"],
    correctAnswer: 'Only invest what you can afford to lose',
    selectedAnswer: '',
    dropdown: "See why investing is high risk",
    explanation: `There is no evidence anyone can predict the outcomes of market.`,
    category: ['Security']
  },

  {
    question: "A good way to make sure the platform you are using is legitimate is by starting with a trial run using a small amount of money. If the trial run is successful, you know it’s safe to make a larger investment.",
    answers: [
        "True", 
        "False",
        ""],
    correctAnswer: 'Only invest what you can afford to lose',
    selectedAnswer: '',
    dropdown: "See why investing is high risk",
    explanation: `There is no evidence anyone can predict the outcomes of market. Just because an outcome occured once does not guarantee it will occur again.`,
    category: ['Security']
  },



]
export let questions = []

// Try to make a component specifically for this.
function getRandQuestions(arr, count, cb) {
	let ques = [...arr];
  for (let i = 0; i < count; i++) {
  	if (!ques.length) ques = [...arr];
    const questionIndex = Math.floor(Math.random() * ques.length); // grabs a random object via index
    const randQuestion = ques.splice(questionIndex, 1)[0]; // actually is the random object
    cb(randQuestion);
	}
}

getRandQuestions(question_list, 5, question => { // arr is the array object of questions, count is how many questions it's going to grab
  if (question.answers.length > 2) {
    question.answers.sort( () => .5 - Math.random() )
    }
	questions.push(question);
});




const count = {};

 // make questionList name camelcase
question_list.forEach(question => {

  // make categories property name plural
  question.category.forEach(category => {
    count[category] = (count[category] ?? 0) + 1;
  });
});
console.log(count)
// run `node questions.js`
export default { questions }
