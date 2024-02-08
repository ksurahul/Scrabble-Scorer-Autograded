// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = ""; 
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }

	}

	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");

   //grabs the word user enters
   let word = input.question('Enter a word to score: '); 

   return word 
};

let simpleScorer = function(word) {
   return word.length;  
};

let vowelBonusScorer = function(word) {
   word = word.toLowerCase();
   let points = 0;

   //iterates through word length
   for(i = 0; i < word.length; i++) {

      //checks to see if the letter in the word is a vowel starting with first letter
      if(word[i] === 'a' || word[i] === 'e' || word[i] === 'i' || word[i] === 'o' || word[i] === 'u') {
         points = points + 3;
      } else {
         points = points + 1;
      }

   }
   return points;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase(); //lowercase the word passed in
   let points = 0; 

   //iterate through every letter in the word
   for (let i = 0; i < word.length; i++) {

      //adds value of letter to points
      if(word[i] in newPointStructure) {
         points = points + newPointStructure[word[i]]
     }
   }
   
   return points
};

const scoringAlgorithms = [
   {
      name: "Simple Scorer",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let response = input.question(`Which scoring system would you like to use? \n
   Press 0 for ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description} \n
   Press 1 for ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description} \n
   Press 2 for ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description} \n`);
   
   //returns reference to scoring function to use
   return scoringAlgorithms[response].scorerFunction
}

function transform(pointStructure) {
   let transformedObj = {};

   for (let point in pointStructure) { //iterate through every point in the object

      //iterate through the array in each key
      for(i = 0; i < pointStructure[point].length; i++){ 
         const letter = pointStructure[point][i].toLowerCase() //make this easiser to read and makes the letter lower case
         transformedObj[letter] = parseInt(point); //parseInt() uses a string argument and returns an integer we need to reference values in the obj easily
      }
   }

   return transformedObj
};

let newPointStructure = transform(oldPointStructure);


function runProgram() {
   //no logic in here
   const word = initialPrompt();
   const algorithmFn = scorerPrompt();
   const score = algorithmFn(word);

   console.log(`You scored ${score} points with your word: ${word}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
