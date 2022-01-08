// shuffle algorithm for randomizing the questions
function createRandom(arr) {
	let myArr = [...arr]; //copy arr we pass in
	let randomizedArr = []; //gets popuated by loop

	while (myArr.length > 0) {
		var randomIndex = Math.floor(Math.random() * myArr.length); //create random number
		randomizedArr.push(myArr[randomIndex]); //add choice randomly to arr
		myArr.splice(randomIndex, 1); //cut out a piece of the array then resart loop
	}
	//when loop has finished, return random array
	return randomizedArr;
}

export default createRandom;
