const prompt = require("prompt-sync")({sigint: true});
const clear = require("clear-screen");

const hat = "\x1b[42m╨\x1b[0m"; //^╨
const hole = "\x1b[41m*\x1b[0m"; //O
const fieldCharacter = "\x1b[2m█\x1b[0m"; //░█
const pathCharacter = "\x1b[44mO\x1b[0m";

//create a class controller for the game
class Field {
  //initialise the variables in the class
  constructor(field) {
    this.field = field;
    
    this.start = {x: 0, y: 0};           //this.start is the default for char "*"
    this.hatPos = {x: 0, y: 0};          //this.hatPos is the default for hat "^"
    this.locationX = 0;
    this.locationY = 0;
  } //end of constructor
  
  static generateField(fieldW, fieldH, percentage=0.1) {
    const field = new Array(fieldH).fill().map(element => new Array(fieldW));

    for(let y = 0; y < fieldH; y++) {
      for(let x = 0; x < fieldW; x++) {
        const prob = Math.random(); //return a value in between 0 and 1 
        field[y][x] = prob > percentage ? fieldCharacter: hole
      }
    }

    // console.log(field);
    return field;
  } // end of generateField method

  // other methods in the class
  runGame() {
    this.setStart();          // set the random position of my char "*"
    this.setHat();            // set the random position of the hat "^"
    
    let playing = true;
    while (playing) {
      this.printMap();       // print out map from array, removed comma
      this.printRules();     // print out rules
      this.getInput();       // get input from the user
    
      // if (!this.isInBounds()) {
      if (this.locationY < 0 || this.locationX < 0 || 
        this.locationY > this.field.length ||this.locationX > this.field[0].length-1) {
        console.log("Game over, you crossed the boundry.");
        playing = false;
        break;
      } else if (this.field[this.locationY][this.locationX] === hole) {
        console.log("Game over, you fell into a trap.");
        playing = false;
        break;
      } else if (this.field[this.locationY][this.locationX] === hat) {
        console.log("You found my hat!");
        playing = false;
        break;
      }
          
      // refresh the path
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  setStart() {
    this.start = this.setPos();    //setPos method returns a random x and y
    this.locationX = this.start.x;
    this.locationY = this.start.y;
    this.field[this.start.y][this.start.x] = pathCharacter;
  }
  
  setHat() {
    this.hatPos = this.setPos(this.start)   // Set the hat location
    this.field[this.hatPos.y][this.hatPos.x] = hat;
  }
  
  printMap() {
    clear();
    console.log("=====Welcome to Find My Hat JS Assessment=====\n");
    this.field.forEach(element => console.log(element.join('')));
  }
  
  printRules() {
    console.log("")
    console.log("┏━━ Rules ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓")
    console.log("┃ \"O\" is your location, \"^\" is my hat, \"*\" is trap.       ┃");
    console.log("┃ Use \"WASD\" keys to navigate and find my hat.            ┃");
    console.log("┃ (W: UP, A: LEFT, S: DOWN, D: RIGHT)                     ┃")
    console.log("┃ Avoid to fall into trap or get out of the boundry.      ┃");
    console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛")
  }

  getInput() {
    const input = prompt(" Start now =>").toUpperCase();
    switch (input) {
      case "W":   // up
        this.locationY -= 1;
        break;
      case "S":   // down
        this.locationY += 1;
        break;
      case "A":   // left
        this.locationX -= 1;
        break;
      case "D":   // right
        this.locationX += 1;
        break;
      default:
        console.log("Enter W, A, S or D.");
        this.getInput();
        break;
    }
  }
    
  setPos() {
    const pos = {x: 0, y: 0};

    pos.x = Math.floor(Math.random() * this.field[0].length);
    pos.y = Math.floor(Math.random() * this.field.length);

    return pos;
  }
} //end of Field class


//create an instance of Field class and call generateField directly from class name
const myField = new Field(Field.generateField(40,10,0.15));
myField.runGame();



// console.log(myField.field);
// myField.printMap();
// console.log(myField.setStart());
// console.log(myField.hatPos);


// myField.start = {x: 1, y: 1};
// console.log(myField.field[0][0]);
// console.log(myField.field[0][1]);
// console.log(myField.field[0][2]);
// console.log(myField.field[1][0]);
// console.log(myField.field[1][1]);

