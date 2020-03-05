var creditHTML = `
  <p>First name:
  <input type="text" id="fname" name="firstname" required></p>
  <p>Last name:
  <input type="text" id="lname" name="lastname" required></p>
  <p>Address:
  <input type="text" id="address" name="address" required></p>
  <p>City:
  <input type="text" id="city" name="city" required></p>
  <p>Zip:
  <input type="text" id="zip" name="zip" required></p>
  <p>Email Address
  <input type="text" id="cardEmailAddress" name="cardEmailAddress" required></p>
  <p>Name on Card:
  <input type="text" id="cardName" name="nameOnCard" required></p>
  <p>Card Number:
  <input type="text" id="cardNumber" name="cardNumber" required></p>
  <p>[<a href="https://en.wikipedia.org/wiki/Card_security_code" target="_blank">CVV2/CVC:</a>]
  <input type="text" id="CVV2CVC" name="CVV2CVC" required></p>
  <p> State:
  <select id="stateSelection" name="states">
	<option value="default" selected>Select State</option>
	<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="CT">Connecticut</option>
	<option value="DE">Delaware</option>
	<option value="DC">District Of Columbia</option>
	<option value="FL">Florida</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="ID">Idaho</option>
	<option value="IL">Illinois</option>
	<option value="IN">Indiana</option>
	<option value="IA">Iowa</option>
	<option value="KS">Kansas</option>
	<option value="KY">Kentucky</option>
	<option value="LA">Louisiana</option>
	<option value="ME">Maine</option>
	<option value="MD">Maryland</option>
	<option value="MA">Massachusetts</option>
	<option value="MI">Michigan</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="MT">Montana</option>
	<option value="NE">Nebraska</option>
	<option value="NV">Nevada</option>
	<option value="NH">New Hampshire</option>
	<option value="NJ">New Jersey</option>
	<option value="NM">New Mexico</option>
	<option value="NY">New York</option>
	<option value="NC">North Carolina</option>
	<option value="ND">North Dakota</option>
	<option value="OH">Ohio</option>
	<option value="OK">Oklahoma</option>
	<option value="OR">Oregon</option>
	<option value="PA">Pennsylvania</option>
	<option value="RI">Rhode Island</option>
	<option value="SC">South Carolina</option>
	<option value="SD">South Dakota</option>
	<option value="TN">Tennessee</option>
	<option value="TX">Texas</option>
	<option value="UT">Utah</option>
	<option value="VT">Vermont</option>
	<option value="VA">Virginia</option>
	<option value="WA">Washington</option>
	<option value="WV">West Virginia</option>
	<option value="WI">Wisconsin</option>
	<option value="WY">Wyoming</option>
  </select></p>
  
  <p>Expiry:
  <input type="month" id="expirationDate" name="expiry" min="2017-01" max="2020-12" value="2019-4"></p>
  
`;

var payPalHTML = `
  <p>Email Address
  <input type="text" id="payPalEmailAddress" name="payPalEmailAddress" required></p> 
  <p>Password:
  <input type="text" id="payPalPassword" name="payPalPassword" required></p> 
`;


/* Card or Paypal option for changing the visible fields, returns none*/
function updateForm(control) {
	var formDisplay = document.getElementById("paymentInformation");
	if (control.id === 'creditCard') {
		formDisplay.innerHTML = creditHTML;
	}
	else if (control.id === 'payPal') {
		formDisplay.innerHTML = payPalHTML;
	}
}

/*Function to test length of the value. Boolean exactLength parameter is
received as false if the value is meant to be >= the length, or received as
true if the value is meant to match the length exactly.*/
function testLength(value, length, exactLength) {
    if (exactLength) {
        return value.length == length; //returns true if length matches
    } 
    else {
        return value.length >= length; //returns true if length is greater or equal
    }
}

/*Function returns true if value represents a number; 
otherwise returns false*/
function testNumber(value) {
		if(!isNaN(parseFloat(value)) && isFinite(value)) { /* Test passes, it is a number*/ return true; }
		else { return false; }
}

function validateControl(control, name, length) {
	if (testLength(control, length, true) == false) {
		/* Display appropriate error*/
		alert(name + " is not of the correct length");
		return false;
	}
	else if(testNumber(control) == false) {
			/* Display appropriate error*/
			alert(name + " does not represent a number");
			return false;
		}
	else {
			return true;
		 }
}

function validateCreditCard(value) {
	var valString = value.replace(/\s/g, '');
	

  	var validValue = false;

	if (testNumber(valString) == false) {
		alert("Credit Card value does not represent a number");
		return false;
	}
	else if (testLength(valString, 15, true) != true && testLength(valString, 16, true) != true) {
		alert("The Credit Card value entered is not of a valid length");
		return false;
	}
        else if (testLength(valString, 15, true)) {
		if (valString.chatAt(0) == 3) {
			validValue = true;
		}
	}
	else if (testLength(valString, 16, true)) {
		if (valString.chatAt(0) == 6) {
			validValue = true;
		}
		else if (valString.chatAt(0) == 5) {
			validValue = true;
		}
		else if (valString.chatAt(0) == 4) {
			validValue = true;
		}
	}


        if(validValue) {
		return true;
  	} 
	else {
     		alert("Card Number is an invalid type");
  	}
}
			

function validateDate(value) {
	/*Test if value is greater than current date without using the current month*/
	
	var valueDate = new Date(value);
	var valueMonth = valueDate.getUTCMonth() +1;
	var valueYear = valueDate.getUTCFullYear();
	var todaysDate = new Date();
	var testMonth = todaysDate.getUTCMonth() +1;
	var currentYear = todaysDate.getUTCFullYear();
	/*var valueYear = valueDate.slice(0,4);
	var valueMonth = valueDate.slice(5);
	var todaysYear = todaysDate.slice(0,4);
	var todaysMonth = todaysDate.slice(5);
	*/
	/*if (valueDate > todaysDate) {
		alert("Made it to here for validateDate, valueDate is > than todaysDate");*/
	if (valueMonth > testMonth) {
			alert("Made it here - valueMonth is > than currentMonth");
			return true;
		}
		else {
			alert("valueMonth wasn't > than currentMonth");
			return false;
		}
	/*}
	else {
		alert("valueDate wasn't > than todaysDate");
		return false;
	}*/	
}

function validateEmail(value) {
	var emailRegEx = /^[^@]+@[^@]+\.[^@]+$/;
	if ((emailRegEx.test(value) == false)) {
		/* Display Invalid Email Address error message */
		alert("Invalid Email Address");
		return false;
	}
	else {
		return true;
	}
}

function validateForm() {
	var goodToGo = false;
	if (document.getElementById('creditCard').checked) {
		// Validate Card Number
		validateCreditCard(document.getElementById('cardNumber').value);
		// Validate CVV2/CVC (Length of 3 digits)
		validateControl(document.getElementById('CVV2CVC').value, "CVV2/CVC", 3);
		//Validate Expiration Date

		//validateDate('expirationDate');

		//Validate Email Address
		validateEmail(document.getElementById('cardEmailAddress').value);
		//Validate Zip (Length of 5 digits)
		validateControl(document.getElementById('zip').value, "Zip Code", 5);
		//Validate State
		validateState();
		goodToGo = true;
	}
	
	if (document.getElementById('payPal').checked) {
		//Validate Email
		validateEmail(document.getElementById('payPalEmailAddress').value);
		//Validate Password
		validatePassword('payPalPassword', 8);
		goodToGo = true;
	}
	
	if (goodToGo === true) {
		alert("Payment Submitted");
	}
	return false;
}

function validatePassword(value, minLength) {
		/* test if the string is >= the minLength value*/
		if (testLength(value, minLength, false) == true) {
			return true;
		}
		else {
			/*Display Password Require Minimum of 8 Characters */
			alert("Password requires a minimum of eight(8) characters");
			return false;
		}
}

function validateState() {
	/*Test if Select State option is currently selected. If no, display
	error message and return false. If yes, return true*/
	var stateDropDown = document.getElementById("stateSelection");
	var selectedState = stateDropDown.options[stateDropDown.selectedIndex].value;
	if (selectedState == "default") {
		alert("Please select a valid State option");
		return false;
	}
	else {
		return true;
	}
}

