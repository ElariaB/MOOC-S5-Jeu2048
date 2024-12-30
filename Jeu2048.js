document.addEventListener("keydown", function(event) {
  keyTester(event);
  gameOver();
});

var x = 0;

function score() {
  updateScore();
}

function checkWin() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (getValue(i, j) === '2048') {
        document.getElementById('MJ').textContent = 'YOU WIN!';
        return true;
      }
    }
  }
  return false;
}

function updateScore() {
  document.getElementById('scoreid').textContent = 'Score = ' + x;
}

function keyTester (event){
  if (event.key === "ArrowUp") {
    rajout2()
    haut();
    upall();
    updateCellColors();
    score();
    checkWin(); 

  }
  if (event.key === "s" || event.key === "S" ) {
    console.log("score : "+ x);
    document.getElementById('score').textContent = "Score = "+ x;
  }
  if (event.key === "ArrowDown") {
    bas();
    rajout2();
    downall();
    updateCellColors();
    score();
    checkWin(); 

  }
  if (event.key === "ArrowLeft") {
    gauche();
    rajout2();
    leftall();
    updateCellColors();
    score();
    checkWin();

  }
  if (event.key === "ArrowRight") {
    droite();
    rajout2();
    rightall();
    updateCellColors();
    score();
    checkWin();

  }
  if (event.key === "t" || event.key === "T") {

    init();
    newGame();
    score();
  }
  if (event.key === "y" || event.key === "Y") {
    testinit();
  }
  if (event.key === "a" || event.key === "A") {
    testGetRandomInt();
  }
  if (event.key === "r" || event.key === "R") {
    testGetRandom2or4();
  }
  if (event.key === "n" || event.key === "N") {
    newGame();
  }
  if (event.key === "e" || event.key === "E") {
    testIsEmpty();
  }
  if (event.key === "v" || event.key === "V") {
    testHasEmpty ();


  }

}
function haut() {
  console.log("haut");
}

function bas() {
  console.log("bas");
}

function gauche() {
  console.log("gauche");
}

function droite() {
  console.log("droite");
}

function changeTitre() {
  document.getElementById('MJ').textContent = 'GAME OVER ';
}

function getTable() {
  var table = document.querySelector("table");
  return table;
}

function testGetTable() {
  var Table = getTable();
  console.log(Table);
}


function getCell(i, j) {
  const table = getTable()
  return table.rows[i].cells[j]
}

function testgetCell() {
  var first = getCell(1,1)
  var second = getCell(2,2)
  var third = getCell(3,3)
  console.log('Exemple de valeurs incrémentées')
  console.log(parseInt(first.innerHTML)+ 1)
  console.log(parseInt(second.innerHTML)+ 1)
  console.log(parseInt(third.innerHTML)+ 1)
}

function getValue(i,j) {
  var cellule = getCell(i, j);

  if (cellule !== null) {
    return cellule.innerHTML;
  }

  return null;
}




function testgetValue() {
  var fi = getValue(0,0)
  var se = getValue(1,1)
  var th = getValue(2,2)
  var fo = getValue(3,3)
  console.log('Les valeurs diagonales sont')
  console.log(fi)
  console.log(se)
  console.log(th)
  console.log(fo)
}

function setValue(i,j,val) {
  var c = getCell(i,j);
  c.innerHTML = val
}

function testsetValue() {
  setValue(1, 1, 2);
  setValue(2, 2, 3);
  setValue(3, 3, 4);
}

function showRow(i) {
  var j = 0;
  for (; j < 4; j++) {
    var x =  getValue(i,j);
    console.log(x);
  }
}


function setRow(i,a,b,c,d) {
  setValue(i, 0, a);
  setValue(i, 1, b);
  setValue(i, 2, c);
  setValue(i, 3, d);
}

function testSetRow() {
  setRow(0,1,2,3,4)
  setRow(1,5,6,7,8)
  setRow(2,9,10,11,12)
  setRow(3,13,14,15,16)
}

function setCol(j,a,b,c,d) {
  setValue(0, j, a);
  setValue(1, j, b);
  setValue(2, j, c);
  setValue(3, j, d);
}

function testSetCol() {
  setCol(0,1,2,3,4)
  setCol(1,5,6,7,8)
  setCol(2,9,10,11,12)
  setCol(3,13,14,15,16)
}


function init(){
  var tab = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ];

  for(let i=0;i<=3;i++){
    for(let j=0;j<=3;j++){
      setValue(i,j,tab[i][j]);
    }
  }
}



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function testGetRandomInt () {
  var i = getRandomInt(0,3)
  var j = getRandomInt(0,3)
  setValue(i, j, '@')
}

function getRandom2or4(percent) {
  var a = getRandomInt(0,100)
  if (a < percent) {
    return 2
  }
  else {
    return 4
  }
}

function testGetRandom2or4() {
  for (i =0; i < 100; i++) {
    getRandom2or4(80)
    console.log(getRandom2or4(80))
  }
}

function newGame()  {
  while ((i1 == i2) && (j1 == j2)) {
    var i1 = getRandomInt(0,3)
    var j1 = getRandomInt(0,3)
    setValue(i1, j1, getRandom2or4(85))
    var i2 = getRandomInt(0,3)
    var j2 = getRandomInt(0,3)
    setValue(i2, j2, getRandom2or4(85))
  }
}

function  isEmpty (i,j) {
  var x = getValue(i,j)
  if (x =='') {
    return true;
  } else {
    return false;
  }
}

function testIsEmpty(){
  init();
  newGame();
  for(let i=0;i<=3;i++){
    for(let j=0;j<=3;j++){
      if(isEmpty (i,j)){
        console.log("La case [" + i + "][" + j + "] est vide");
      }else {
        console.log("La case [" + i + "][" + j + "] n'est pas vide");
      }
    }
  }
}

function moveRight(i) {
  var hasMoved = 0;
  for (let x = 0; x < 3; x++) {
    for (let j = 3; j > 0; j--) {
      if (getValue(i, j) === '') {
        if (getValue(i, j - 1) !== '') {
          let y = getValue(i, j - 1);
          setValue(i, j - 1, '');
          setValue(i, j, y);
          hasMoved = 1;
        }
      }
    }
  }
  console.log('mouvement=',hasMoved)
  return hasMoved;
}


function testMoveRight(){
  init()
  setRow(0,'2','','2','');
  moveRight(0);
}
window.onload = (event) => {
  console.log('La page est  chargée');


}
function moveLeft(i){
  for(k=0;k<3;k++){
    for (j=0;j<3;j++){
      if(getValue(i,j)==''){
        if(getValue(i,j+1)!=''){
          v=getValue(i,j+1)
          setValue(i,j,v)
          setValue(i,j+1,'')
        }
      }
    }
  }
}

function testMoveLeft(){
  init()
  setRow(1,'','','4','4')
  moveLeft(1);
}

function moveUp(j){
  for(k=0;k<3;k++){
    for (i=2;i>=0;i--){
      if(getValue(i,j)==''){
        if(getValue(i+1,j)!=''){
          v=getValue(i+1,j)
          setValue(i,j,v)
          setValue(i+1,j,'')
        }
      }
    }
  }
}

function testMoveUp(){
  init();
  setCol(0,'','','4','4');
  moveUp(0);
}

function moveDown(j){
  for(k=0;k<3;k++){
    for (i=3;i>0;i--){
      if(getValue(i,j)==''){
        if(getValue(i-1,j)!=''){
          v=getValue(i-1,j)
          setValue(i,j,v)
          setValue(i-1,j,'')
        }
      }
    }
  }
}

function testMoveDown(){
  init();
  setCol(1,'4','4','','');
  moveDown(1);
}

function fusionRight(i){
  for (j=3;j>0;j--){
    if(getValue(i,j)!=''){
      if(getValue(i,j-1)== getValue(i,j)){
        var result=Number(getValue(i,j-1))+Number(getValue(i,j));
        setValue(i,j,result)
        setValue(i,j-1,'')
        x += result;
      }
    }
  }
}

function testFusionRight(){
  init();
  setRow(0,'8','8','4','4');
  fusionRight(0)
}

function fusionLeft(i){
  for (j=0;j<3;j++){
    if(getValue(i,j)!=''){
      if(getValue(i,j+1)== getValue(i,j)){
        var result=Number(getValue(i,j+1))+Number(getValue(i,j));
        setValue(i,j,result)
        setValue(i,j+1,'')
        x += result;
      }
    }
  }
}

function testFusionLeft(){
  init();
  setRow(1,'8','8','4','4');
  fusionLeft(1)
}

function fusionUp(j){
  for (i=2;i>=0;i--){
    if(getValue(i,j)!=''){
      if(getValue(i+1,j)== getValue(i,j)){
        var result=Number(getValue(i+1,j))+Number(getValue(i,j));
        setValue(i,j,result)
        setValue(i+1,j,'')
        x += result;
      }
    }
  }
}

function testFusionUp(){
  init();
  setCol(0,'2','2','2','2');
  fusionUp(0);
}

function fusionDown(j){
  for (i=3;i>0;i--){
    if(getValue(i,j)!=''){
      if(getValue(i-1,j)== getValue(i,j)){
        var result=Number(getValue(i-1,j))+Number(getValue(i,j));
        setValue(i,j,result)
        setValue(i-1,j,'')
        x += result;
      }
    }
  }
}

function testFusionDown(){
  init();
  setCol(1,'4','4','2','2');
  fusionDown(1);
}

function testFusionDown(){
  init();
  setCol(1,"","2","2","");
  fusionDown(1);
}

function right(i){
  var hasChanged = 0;
  hasChanged = moveRight(i) + fusionRight(i) + moveRight(i);
  if(hasChanged != 0) hasChanged = 1
  return hasChanged;
}

function rightall(){
  var hasChanged = 0;
  for(let i=0;i<=3;i++){
    hasChanged = hasChanged + right(i);
  }
  if(hasChanged != 0) hasChanged = 1
  else {
    console.log("Pas de mouvement et pas de fusion");
  }
  return hasChanged;
}

function left(i){
  var hasChanged = 0;
  hasChanged = moveLeft(i) + fusionLeft(i) + moveLeft(i);
  if(hasChanged != 0) hasChanged = 1
  return hasChanged;
}

function leftall(){
  var hasChanged = 0;
  for(let i=0;i<=3;i++){
    hasChanged = hasChanged + left(i);
  }
  if(hasChanged != 0) hasChanged = 1
  else {
    console.log("Pas de mouvement et pas de fusion");
  }
  return hasChanged;
}


function up(j){
  var hasChanged = 0;
  hasChanged = moveUp(j) + fusionUp(j) + moveUp(j);
  if(hasChanged != 0) hasChanged = 1
  return hasChanged;
}

function upall(){
  var hasChanged = 0;
  for(let j=0;j<=3;j++){
    hasChanged = hasChanged + up(j);
  }
  if(hasChanged != 0) hasChanged = 1
  else {
    console.log("Pas de mouvement et pas de fusion");
  }
  return hasChanged;
}

function down(j){
  var hasChanged = 0;
  hasChanged = moveDown(j) + fusionDown(j) + moveDown(j);
  if(hasChanged != 0) hasChanged = 1
  return hasChanged
}

function downall(){
  var hasChanged = 0;
  for(let j=0;j<=3;j++){
    hasChanged = hasChanged + down(j);
  }
  if(hasChanged != 0) hasChanged = 1
  else {
    console.log("Pas de mouvement et pas de fusion");
  }
  return hasChanged;{
  }
}

function TestHasMovedFusion() {
  for(let i=0;i<=3;i++){
    console.log("Move Right:", moveRight(i));
    console.log("Move Left:", moveLeft(i));
    console.log("Fusion Right:",fusionRight(i));
    console.log("Fusion Left:",fusionLeft(i));
  }

  for(let j=0;j<=3;j++){
    console.log("Move Up:", moveUp(j));
    console.log("Move Down:", moveDown(j));
    console.log("Fusion Up:",fusionUp(j));
    console.log("Fusion Down:",fusionDown(j));
  }
}

function hasEmpty() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (isEmpty(i, j)) {
        return 1;
      }
    }
  }
  return 0;
}


function testHasEmpty () {
  console.log([['1', '2', '3', '4'],
    ['5', '6', '7', '8'],
    ['9', '10', '11', '12'],
    ['13', '14', '15', '16']]);
  init2();
  console.log("Aucune des cases n'est vide :", hasEmpty());

  console.log([['1', '2', '3', '4'],
    ['5', '6', '', '8'],
    ['9', '10', '11', '12'],
    ['13', '14', '15', '16']]);
  init1vide()
  console.log("Une case est vide :", hasEmpty());
}

function getEmpty(){
  if (hasEmpty()){
    while (!isEmpty(i, j)) {
      i = getRandomInt();
      j = getRandomInt();
    }
    return [i,j]
  }
}

function testgetEmpty() {
  var coord = getEmpty();
  if (coord) {
    var i = coord[0];
    var j = coord[1];
    console.log("Coordonnées de la case vide:", i, j);
  } else {
    console.log("Aucune case vide.");
  }
}
function rajout2() {

  if (hasEmpty()) {
    var i3, j3;
    do {
      i3 = getRandomInt(0, 3);
      j3 = getRandomInt(0, 3);
    } while (!isEmpty(i3, j3));

   
    setValue(i3, j3, getRandom2or4(85));
  }
}

function updateCellColors() {
  var cells = document.querySelectorAll('td');
  cells.forEach(function(cell) {
    var value = parseInt(cell.textContent);
    if (!isNaN(value)) {

      var colorMap = {
        2: '#F5F5DC',
        4: '#FFE4B5',
        8: '#FFD700',
        16: '#FF8C00',
        32: '#FF6347',
        64: '#FF4500',
        128: '#FF0000',
        256: '#DC143C',
        512: '#FFE333',
        1024: '#DCC744',
        2048: '#C1AB25'

      };


      var color = colorMap[value] || 'gray';
      cell.style.backgroundColor = color;
    } else {

      cell.style.backgroundColor = 'white';
    }
  });
}

function gameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (isEmpty(i, j)) {
        return false;
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      const current = Number(getValue(i, j));
      const next = Number(getValue(i, j + 1));
      if (current === next && current !== 0) {
        return false;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      const current = Number(getValue(i, j));
      const below = Number(getValue(i + 1, j));
      if (current === below && current !== 0) {
        return false;
      }
    }
  }
  changeTitre();
  return true;
}

window.onload = function() {

  testIsEmpty();

}
