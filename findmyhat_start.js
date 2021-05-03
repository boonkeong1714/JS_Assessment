const prompt = require("prompt-sync")({sigint: true});
const clear = require("clear-screen")

const hat = "^";
const hole = "O";
const fieldCharacter = "█";
const pathCharacter = "*";

//create a class controller for the game
class Field {
    //initialise the variables in the class
    constructor(field) {
        this.field = field;

        //this.start is the default for char "*"
        this.start = {
            x: 0,
            y: 0
        };

        //this.hatPos is the default for hat "^"
        this.hatPos = {
            x: 0,
            y: 0
        };

        this.locationX = 0;
        this.locationY = 0;
    } //end of constructor

    static generateField(fieldH, fieldW, percentage = 0.1) {
        const field = new Array(fieldH)
                      .fill(0)
                      .map(element => new Array(fieldW));

       
        for(let y = 0; y < fieldH; y++) {
          for(let x = 0; x < fieldW; x++) {
              const prob = Math.random(); //return a value in between 0 and 1              
              field[y][x] = prob > percentage ? fieldCharacter : hole
            }
        }
        // console.log(field);

        return field;
    } //end of generateField method


    //other methods in the class
    runGame() {
        this.setStart();    //set the random position of my char "*"
        this.setHat();      //set the random position of the hat "^"
      
        this.print();       //print out the rows and columns
        this.getInput();    //get input from the user
    }

    setStart() {
        this.start = this.setPos(); //setPos method returns a random x and y
        this.locationX = this.start.x;  
        this.locationY = this.start.y;
        this.field[this.locationX][this.locationY] = pathCharacter; //*
    }

    setHat() {
        this.hatPos = this.setPos(this.start)
        this.field[this.hatPos.y][this.hatPos.x] = hat; //^
    }

    print() {
        clear();
        this.field.forEach(element => console.log(element.join('')));
    }

    getInput() {
        const input = prompt('Which way? ').toUpperCase();
    }

    setPos() {
        const pos = {
          x: 0,
          y: 0
        }
        pos.x = Math.floor(Math.random() * this.field[0].length);   //x = 10
        pos.y = Math.floor(Math.random() * this.field[1].length);   //y = 10
      
        console.log(pos.x);
        console.log(pos.y);
        return pos;
    }

} //end of Field class

//create an instance of Field class and call generateField directly from class name
const myField = new Field(Field.generateField(10,10,0.2));
myField.runGame();




// myField.start = {x: 1, y: 1};
// myField.print();

// console.log(myField.field[0][0]);
// console.log(myField.field[0][1]);
// console.log(myField.field[0][2]);
// console.log(myField.field[1][0]);
// console.log(myField.field[1][1]);
// console.log(myField.start);
// console.log(myField.hatPos);


