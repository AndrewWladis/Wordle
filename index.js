const marvel = ['bucky', 'groot', 'lokis', 'abyss', 'angel', 'beast', 'blade', 'cloak', 'miles', 'rhino', 'marvel', 'hulks', 'cable', 'venom', 'toxin', 'corps', 'goose', 'speed', 'death', 'druig', 'shuri', 'okoye', 'forge', 'ghost', 'havok', 'hippo', 'baron', 'wanda', 'kazar', 'knull', 'hydra', 'widow', 'witch', 'flash', 'modok', 'magus', 'maker', 'mimic', 'morph', 'nakia', 'omega', 'sword', 'rogue', 'ronan', 'gwens', 'kaine', 'kangs', 'karma', 'stark', 'rambo', 'clint', 'mojos', 'namor', 'furys', 'novas', 'nukes', 'odins', 'pyros', 'quake', 'skull', 'wasps', 'steve', 'tonys', 'ronin', 'sersi', 'shaws', 'storm', 'thors', 'thing', 'toads', 'xorns', 'xmans', 'ymirs', 'yondu', 'zemos', 'zero', 'zorn', 'peter']

//function randomWord() {
    //let num = get a random number 0 through marvel.length -1
    //let marvel = movies[num];
    //check if term is at least 5 characters, if not re do
    //make all caps
    //split movie into an array (i.e. 'SPEED' => ['S', 'P', 'E', 'E', 'D'])
    //return movie;
//}

let board = {
    firstrow: [],
    secondrow: [],
    thirdrow: [],
    fourthrow: [],
    fifthrow: []
}

const date = new Date();
let month = date.getMonth()
let day = date.getDate()
let word;

if (month >= 6) {
    word = marvel[day];
} else if (month < 6) {
    word = marvel[day + 28].toUpperCase().split("");
}

console.log(word)



//const word = randomWord();
let isGameGoin = true;
const submitButtton = document.getElementById('submit');
let currentrow = board.firstrow;
let rowCount = 1;

function setNextRow() {
    if (rowCount == 1) {
        currentrow = board.secondrow;
        console.log(rowCount)
    } else if (rowCount == 2) {
        currentrow = board.thirdrow
        console.log(rowCount)
    } else if (rowCount == 3) {
        currentrow = board.fourthrow
        console.log(rowCount)
    } else if (rowCount == 4) {
        currentrow = board.fifthrow
        console.log(rowCount)
    } else if (rowCount == 5) {
        document.getElementById('alert').innerText = 'You Lost. Come Back Tomorrow';
        document.getElementById('alert').style.color = 'white';
        document.getElementById('black-container').style.backgroundColor = 'black'
        isGameGoin = false;
        //stop game because of loss
    }
    rowCount++
    console.log(rowCount)
}

function addToBoard(e) {
    if (isGameGoin) {
        console.log('bye', rowCount, currentrow, e.keyCode)
        var keynum;
        if (window.event) { // IE                  
            keynum = e.keyCode;
        }
        //gets keycode

        if (keynum != 8) {
            let newstring = String.fromCharCode(keynum);
            currentrow.push(newstring)
            //adding the key that was pressed to the row array
        } else if (keynum == 8) {
            keynum = 8;
            currentrow.pop()//delete the last part of the string
            document.getElementById(`${currentrow.length}-${rowCount}`).innerText = ' ';
            console.log('backspace else if works', rowCount, currentrow)
            document.getElementById(`${currentrow.length}-${rowCount}`).style.color = 'black';
            document.getElementById(`b${currentrow.length}-${rowCount}`).style.backgroundColor = 'white';
        }
        //check if row is full

        for (let i = 0; i != currentrow.length; i++) {
            document.getElementById(`${i}-${rowCount}`).innerText = currentrow[i];

        }
        //add text to html
        console.log(word === currentrow)
        if (word === currentrow) {
            console.log('game stop if works')
            isGameGoin = false;
            //stop game from win 
        }

        if (currentrow.length == 5) {
            let result = currentrow.join('').toLowerCase();
            if (marvel.includes(result)) {
                let greenCount = 0;
                for (let i = 0; i != currentrow.length; i++) {
                    let includes = word.includes(currentrow[i]);
                    let wordlocation = word[i];
                    document.getElementById(`${i}-${rowCount}`).style.color = 'white';
                    console.log(currentrow, word)

                    if (includes && (currentrow[i] != wordlocation)) {
                        document.getElementById(`b${i}-${rowCount}`).style.backgroundColor = '#e6e600';
                        console.log('yellow works', currentrow[i]);
                    } else if (includes && (currentrow[i] == wordlocation)) {
                        document.getElementById(`b${i}-${rowCount}`).style.backgroundColor = 'green';
                        console.log('green works');
                        greenCount++
                    } else {
                        document.getElementById(`b${i}-${rowCount}`).style.backgroundColor = 'grey';
                        console.log('grey works');
                    }
                    console.log(currentrow[i])
                    //change color
                    console.log(greenCount == 5, greenCount)
                    if (greenCount == 5) {
                        for (let i = 0; i != currentrow.length; i++) {
                            document.getElementById(`b${i}-${rowCount}`).style.animation = 'correct 1s';
                        }
                        document.getElementById('alert').style.color = 'green';
                        document.getElementById('alert').innerText = 'You Win! Come Back Tomorrow';
                        isGameGoin = false
                        //stop game from win 
                    }
                }
                setNextRow()
            } else if (result == 'tobey') {
                greenCount = 5;
                for (let i = 0; i != currentrow.length; i++) {
                    document.getElementById(`${i}-${rowCount}`).style.color = 'white';
                    document.getElementById(`b${i}-${rowCount}`).style.backgroundColor = '#e6e600';
                    document.getElementById(`b${i}-${rowCount}`).style.backgroundColor = 'green'
                    document.getElementById(`b${i}-${rowCount}`).style.animation = 'correct 1s';
                }
                document.getElementById('alert').style.color = 'green';
                document.getElementById('alert').innerText = 'You Win! Come Back Tomorrow';
            } else {
                //make this last 3.5 seconds
                document.getElementById('alert').innerText = 'Word is not on the list'
                for (let i = 0; i != currentrow.length; i++) {
                    document.getElementById(`${i}-${rowCount}`).style.color = 'white';
                    document.getElementById(`b${i}-${rowCount}`).style.backgroundColor = '#b02b21';
                    document.getElementById(`b${i}-${rowCount}`).style.animation = 'wrong 1s';
                }
                setTimeout(() => {
                    document.getElementById('alert').innerText = ' '
                }, 3500);
                //if word is not on the list
            }

        }
    } else {
        console.log('the game is not goin')
    }
}
document.addEventListener('keydown', addToBoard)