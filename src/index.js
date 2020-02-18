const btn = document.querySelector("#show-hint");
const hint = document.querySelector('.hint');

btn.addEventListener('click', (event) => {
    hint.style.opacity = 1;
});


// PSEUDOCODE

// =============================================
// Grab the empty one

// Select all the td's

// Add event listener to each one of them

 // if he is one the same row and on an adjacent column
 // if he is one the same column and on an adjacent row

// Move it
// ==============================================


const allTiles = document.querySelectorAll('td'); // Grabs all the td's

const canMove = (tile) => {
  const emptyTile = document.querySelector(".empty"); // Finds the current empty Tile
  let result = false; // Assigns a default value to result

  const tileColumn = tile.cellIndex; // Finds the column of the tile received as an argument (0..3)
  const tileRow = tile.parentElement.rowIndex; // Finds the column of the tile received as an argument (0..3)

  const emptyColumn = emptyTile.cellIndex; // Finds the column of the empty tile (0..3)
  const emptyRow = emptyTile.parentElement.rowIndex;// Finds the column of the empty tile (0..3)

  if (tileColumn === emptyColumn && tileRow === emptyRow + 1 || // checks if the empty tile is below the one received as an argument
      tileColumn === emptyColumn && tileRow === emptyRow - 1 || // checks if the empty tile is above the one received as an argument
      tileColumn === emptyColumn + 1 && tileRow === emptyRow || // checks if the empty tile is on the right of the one received as an argument
      tileColumn === emptyColumn - 1 && tileRow === emptyRow) { // checks if the empty tile is on the left of the one received as an argument
    result = true; // if any of these conditions are met, assigns a new value to result,
                    // since it means the empty tile and the one received as an argument are
                     // adjacent.
  }

  return result;
}


const moveTile = (tile) => {
  const emptyTile = document.querySelector(".empty"); // grabs the current empty tile
  emptyTile.classList.remove("empty"); // removes the 'empty' css class from it

  tile.classList.add("empty"); // adds the empty class and consequently the black background-color
                                // to the clicked tile

  const tileText = tile.innerText; // saves the number (content) of the clicked tile

  tile.innerText = ''; // erases the number (content) of the clicked  tile

  emptyTile.innerText = tileText; // updates content the ex-empty tile
}



allTiles.forEach((tile) => { // iterates through all the tiles, calling each one 'tile'
  tile.addEventListener('click', (event) => { // listens to a 'click' event for each one of the  tiles
    if (canMove(tile)) { // when clicked, calls the 'canMove()' function to check if this tile is adjacent to the empty one
      moveTile(tile); // if so, calls the 'moveTile()' function to actually switch their positions
    }
  })
});




// Extra:
    // Testing the if the user won

const hasWon = (all) => {
  const tdsArray = Array.from(allTiles); // Creates an array of table data's based on the nodeList defined on line 25
  const numbersArray = tdsArray.map((tableData) => { return Number.parseInt(tableData.innerText, 10) }) // maps that array, so instead of td's, we have inside it only the numbers that represent those td's
  const userOrder = numbersArray.join(); // creates a string from that array, representing the order in which the user arranged the tiles
  return userOrder == "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN" // returns true if the user has won, false if not
}
