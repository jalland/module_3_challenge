// Assignment code here
// lists if characters
listSpecialCharacters = ["!","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","]","^","_","`","{","|","}","~"]
listNumeric = ["1","2","3","4","5","6","7","8","9"]
listLowercaseLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
listUppercaseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

//Puts one special character at the end of a password string
function getSpecialCharacters(password){
  var index = Math.floor(Math.random() * listSpecialCharacters.length);
  var valueAdded = listSpecialCharacters[index];
  password = password+valueAdded
  return password
}

//Puts one number at the end of a password string
function getNumeric(password){
  var index = Math.floor(Math.random() * listNumeric.length);
  var valueAdded = listNumeric[index];
  password = password+valueAdded
  return password
}

//Puts one lowercase number at the end of a password string
function getLowercaseLetters(password){
  var index = Math.floor(Math.random() * listLowercaseLetters.length);
  var valueAdded = listLowercaseLetters[index];
  password = password+valueAdded
  return password
}

//Puts one uppercase number at the end of a password string
function getUppercaseLetters(password){
  var index = Math.floor(Math.random() * listUppercaseLetters.length);
  var valueAdded = listUppercaseLetters[index];
  password = password+valueAdded
  return password
}




function generatePassword(userChoicePasswordLength,useNumericCharacters,useSpecialCharacters,useLowercaseLetters,useUppercaseLetters) {
  password = ""

  //Find how many different character types there are
  characterTypes=[useSpecialCharacters,useNumericCharacters,useLowercaseLetters,useUppercaseLetters]
  console.log(characterTypes)
  numberCharacterTypes=0; //This variable is the number of character types
  for(i=0;i<4;i++){
    if(characterTypes[i]===true){
      numberCharacterTypes=numberCharacterTypes+1;
    }
  }

  //Determine number of times to run each character type to build the password (in this case, the number is split equally among the difference character types)
  numberTimesToRunEachCharacterType = Math.floor(userChoicePasswordLength/numberCharacterTypes)
  var arrayNumberTimesToRunEachCharacterType = new Array(4).fill(0); //Format is [number of special characters, number of  numbers, number of lowercase, number of uppercase]

  if(useSpecialCharacters){
    arrayNumberTimesToRunEachCharacterType[0]=numberTimesToRunEachCharacterType
  }
  if(useNumericCharacters){
    arrayNumberTimesToRunEachCharacterType[1]=numberTimesToRunEachCharacterType
  }
  if(useLowercaseLetters){
    arrayNumberTimesToRunEachCharacterType[2]=numberTimesToRunEachCharacterType
  }
  if(useUppercaseLetters){
    arrayNumberTimesToRunEachCharacterType[3]=numberTimesToRunEachCharacterType
  }

  //Check to make sure the user number of characters equals the total number of characters in the array.
  //Add difference between user character count and a non-divisible character count so that the total number of characters equals the user count.
  var totalCharacters=0
  for(i=0;i<arrayNumberTimesToRunEachCharacterType.length;i++){
    totalCharacters=totalCharacters+arrayNumberTimesToRunEachCharacterType[i]
  }
  difference=0;
  if(totalCharacters!=userChoicePasswordLength){
    difference = userChoicePasswordLength-totalCharacters
  }
  if(useSpecialCharacters){
    arrayNumberTimesToRunEachCharacterType[0]=numberTimesToRunEachCharacterType+difference//Add difference between user character count and a non-divisible character count so that the total number of characters equals the user count. 
  }
  else if(useNumericCharacters){
    arrayNumberTimesToRunEachCharacterType[1]=numberTimesToRunEachCharacterType+difference//Add difference between user character count and a non-divisible character count so that the total number of characters equals the user count. 
  }
  else if(useLowercaseLetters){
    arrayNumberTimesToRunEachCharacterType[2]=numberTimesToRunEachCharacterType+difference//Add difference between user character count and a non-divisible character count so that the total number of characters equals the user count. 
  }
  else if(useUppercaseLetters){
    arrayNumberTimesToRunEachCharacterType[3]=numberTimesToRunEachCharacterType//Add difference between user character count and a non-divisible character count so that the total number of characters equals the user count. 
  }
  //Special characters added to the password
  for(i=0;i<arrayNumberTimesToRunEachCharacterType[0];i++){
    password=getSpecialCharacters(password);
  }
  //Numeric characters added to the password
  for(i=0;i<arrayNumberTimesToRunEachCharacterType[1];i++){
    password=getNumeric(password);
  }
  //Lowercase letters added to the password
  for(i=0;i<arrayNumberTimesToRunEachCharacterType[2];i++){
    password=getLowercaseLetters(password);
  }
  //Uppercase letters added to the password
  for(i=0;i<arrayNumberTimesToRunEachCharacterType[3];i++){
    password=getUppercaseLetters(password);
  }

  //Shuffle the values of the password. Note that I got this code from ChatGPT (i.e., shuffle a string). 
  //My description: This variable splits the password string into an array, sorts each value from a random value for each array element, and then joins the array elements into one string. 
  var shuffledPassword = password.split('').sort(function(){return 0.5-Math.random()}).join('');
  return shuffledPassword
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var userChoicePasswordLength = window.prompt("How many characters do you want (needs to be number between 10 and 128)");
  // If user pressed Cancel, immediately end function
  if (!userChoicePasswordLength) {
    return;
  }

  if (userChoicePasswordLength<8 || userChoicePasswordLength>128) {
    window.alert("Password must be at least 8 and at maximum 128 characters.")
    return;
  }

  var useSpecialCharacters = window.confirm("Click okay to use special characters.");
  console.log(useSpecialCharacters)

  var useNumericCharacters = window.confirm("Click okay to use numeric letters.");
  console.log(useNumericCharacters)

  var useLowercaseLetters = window.confirm("Click okay to use lowercase letters.");
  console.log(useLowercaseLetters)

  var useUppercaseLetters = window.confirm("Click okay to use uppercase letters.");
  console.log(useUppercaseLetters)

  if(!useSpecialCharacters && !useNumericCharacters && !useLowercaseLetters && !useUppercaseLetters){
    window.alert("You need to have either numbers, lowercase letters, uppercase letters, and/or special characters.");
    return;
  }

  var password = generatePassword(userChoicePasswordLength,useNumericCharacters,useSpecialCharacters,useLowercaseLetters,useUppercaseLetters);
  console.log(password)
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
