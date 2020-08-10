export class PasswordGenerator {
	randomFunc = {
		lower: this.getRandomLower,
		upper: this.getRandomUpper,
		number: this.getRandomNumber,
		symbol: this.getRandomSymbol
	}
	
	//Function to generate password
	generate() {
		const length = 10;
		const hasLower = true;
		const hasUpper = true;
		const hasNumber = true;
		const hasSymbol = true;
		
		return this.generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
	}
	
	//Function to formulate password
	 generatePassword(lower, upper, number, symbol, length) {
		let generatedPassword = '';
		const typesCount = lower + upper + number + symbol;
		const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
		
		// Doesn't have a selected type
		if(typesCount === 0) {
			return '';
		}
		
		// create a loop
		for(let i=0; i<length; i+=typesCount) {
			typesArr.forEach(type => {
				const funcName = Object.keys(type)[0];
				generatedPassword += this.randomFunc[funcName]();
			});
		}
		
		//Generated Password final
		const finalPassword = generatedPassword.slice(0, length);
		
		//Returning the Final Password
		return finalPassword;
	}
	
	//Generating random lower Alphabet
	private getRandomLower() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}
	
	//Generating random Upper Alphabet
	private getRandomUpper() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
	}
	
	//Generating random Number
	private getRandomNumber() {
		return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
	}
	
	//generating random Symbol
	private getRandomSymbol() {
		const symbols = '!@#$%^&*(){}[]=<>/_.'
		return symbols[Math.floor(Math.random() * symbols.length)];
	}

}