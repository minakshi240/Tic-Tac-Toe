const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGamebtn = document.querySelector('.btn');

 let CurrentPlayer;
 let gameGrid;

 const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];

 //let's create a function to initialize the game

 function initGame() {
    CurrentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //To empty in UI
    boxes.forEach ((box, index) => {
      box.innerText = "";
      boxes[index].style.pointerEvents = "all";
      //one more thing is missing
    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${CurrentPlayer}`;
 }

 initGame();

 function swapTurn(){
   if(CurrentPlayer === "X") {
      CurrentPlayer = "O";
   } else {
      CurrentPlayer = "X"
   }

   //UI update
   gameInfo.innerText = `Current Player - ${CurrentPlayer}`;
 }

 function checkGameOver(){
  let answer = "";

  winningPositions.forEach((position) => {
      // All 3 boxes should be empty and exactly same in value
      if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
      (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

         if(gameGrid[position[0]] === "X") {
            answer = "X";
         } else {
            answer = "O";
         }

         //disable pointer events
         boxes.forEach((box) => {
            box.style.pointerEvents = "none"; 
         });

         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");
      }
   });

   if(answer!= "") {
      gameInfo.innerText = `Winner Player - ${answer}`;
      newGamebtn.classList.add("active");
      return;
   }
 } 

 function handleClick(index) {
   if(gameGrid[index] === "") {
      boxes[index].innerText = CurrentPlayer;
      gameGrid[index] = CurrentPlayer;
      boxes[index].style.pointerEvents = "none";
      //swap
      swapTurn();
      checkGameOver();
   }
 }

 boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
 });

 newGamebtn.addEventListener('click', initGame);
