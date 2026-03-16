// ── Score ──────────────────────────────────────
var score = 0;
var best  = 0;

function updateScore(add) {
  score += add;
  document.getElementById('scoreid').textContent = score;
  if (score > best) {
    best = score;
    document.getElementById('bestid').textContent = best;
  }
}

// ── Grid helpers ───────────────────────────────
function getTable() {
  return document.querySelector('table');
}

function getCell(i, j) {
  return getTable().rows[i].cells[j];
}

function getValue(i, j) {
  return getCell(i, j).innerHTML;
}

function setValue(i, j, val) {
  var cell = getCell(i, j);
  cell.innerHTML = val;
  // update data-val for CSS colors
  if (val === '' || val == 0) {
    cell.removeAttribute('data-val');
  } else {
    cell.setAttribute('data-val', val);
  }
}

function isEmpty(i, j) {
  return getValue(i, j) === '';
}

function hasEmpty() {
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (isEmpty(i, j)) return true;
  return false;
}

// ── Init ───────────────────────────────────────
function init() {
  score = 0;
  document.getElementById('scoreid').textContent = 0;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      setValue(i, j, '');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom2or4() {
  return Math.random() < 0.85 ? 2 : 4;
}

function addRandomTile(animate) {
  if (!hasEmpty()) return;
  var empties = [];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (isEmpty(i, j)) empties.push([i, j]);
  var pick = empties[getRandomInt(0, empties.length - 1)];
  setValue(pick[0], pick[1], getRandom2or4());
  if (animate) {
    var cell = getCell(pick[0], pick[1]);
    cell.classList.remove('new-tile');
    void cell.offsetWidth; // reflow
    cell.classList.add('new-tile');
  }
}

function startNewGame() {
  hideOverlay();
  init();
  addRandomTile(false);
  addRandomTile(false);
  document.getElementById('MJ').textContent = '2048';
}

// ── Move & Fusion ──────────────────────────────

// Move all tiles left in row i
function moveLeft(i) {
  var moved = false;
  for (let k = 0; k < 3; k++) {
    for (let j = 0; j < 3; j++) {
      if (isEmpty(i, j) && !isEmpty(i, j + 1)) {
        setValue(i, j, getValue(i, j + 1));
        setValue(i, j + 1, '');
        moved = true;
      }
    }
  }
  return moved;
}

// Fuse equal adjacent tiles left in row i
function fusionLeft(i) {
  var fused = false;
  for (let j = 0; j < 3; j++) {
    if (!isEmpty(i, j) && getValue(i, j) === getValue(i, j + 1)) {
      var result = Number(getValue(i, j)) * 2;
      setValue(i, j, result);
      setValue(i, j + 1, '');
      updateScore(result);
      fused = true;
    }
  }
  return fused;
}

function left() {
  var changed = false;
  for (let i = 0; i < 4; i++) {
    var a = moveLeft(i);
    var b = fusionLeft(i);
    var c = moveLeft(i);
    if (a || b || c) changed = true;
  }
  return changed;
}

// ── Right ──
function moveRight(i) {
  var moved = false;
  for (let k = 0; k < 3; k++) {
    for (let j = 3; j > 0; j--) {
      if (isEmpty(i, j) && !isEmpty(i, j - 1)) {
        setValue(i, j, getValue(i, j - 1));
        setValue(i, j - 1, '');
        moved = true;
      }
    }
  }
  return moved;
}

function fusionRight(i) {
  var fused = false;
  for (let j = 3; j > 0; j--) {
    if (!isEmpty(i, j) && getValue(i, j) === getValue(i, j - 1)) {
      var result = Number(getValue(i, j)) * 2;
      setValue(i, j, result);
      setValue(i, j - 1, '');
      updateScore(result);
      fused = true;
    }
  }
  return fused;
}

function right() {
  var changed = false;
  for (let i = 0; i < 4; i++) {
    var a = moveRight(i);
    var b = fusionRight(i);
    var c = moveRight(i);
    if (a || b || c) changed = true;
  }
  return changed;
}

// ── Up ──
function moveUp(j) {
  var moved = false;
  for (let k = 0; k < 3; k++) {
    for (let i = 0; i < 3; i++) {
      if (isEmpty(i, j) && !isEmpty(i + 1, j)) {
        setValue(i, j, getValue(i + 1, j));
        setValue(i + 1, j, '');
        moved = true;
      }
    }
  }
  return moved;
}

function fusionUp(j) {
  var fused = false;
  for (let i = 0; i < 3; i++) {
    if (!isEmpty(i, j) && getValue(i, j) === getValue(i + 1, j)) {
      var result = Number(getValue(i, j)) * 2;
      setValue(i, j, result);
      setValue(i + 1, j, '');
      updateScore(result);
      fused = true;
    }
  }
  return fused;
}

function up() {
  var changed = false;
  for (let j = 0; j < 4; j++) {
    var a = moveUp(j);
    var b = fusionUp(j);
    var c = moveUp(j);
    if (a || b || c) changed = true;
  }
  return changed;
}

// ── Down ──
function moveDown(j) {
  var moved = false;
  for (let k = 0; k < 3; k++) {
    for (let i = 3; i > 0; i--) {
      if (isEmpty(i, j) && !isEmpty(i - 1, j)) {
        setValue(i, j, getValue(i - 1, j));
        setValue(i - 1, j, '');
        moved = true;
      }
    }
  }
  return moved;
}

function fusionDown(j) {
  var fused = false;
  for (let i = 3; i > 0; i--) {
    if (!isEmpty(i, j) && getValue(i, j) === getValue(i - 1, j)) {
      var result = Number(getValue(i, j)) * 2;
      setValue(i, j, result);
      setValue(i - 1, j, '');
      updateScore(result);
      fused = true;
    }
  }
  return fused;
}

function down() {
  var changed = false;
  for (let j = 0; j < 4; j++) {
    var a = moveDown(j);
    var b = fusionDown(j);
    var c = moveDown(j);
    if (a || b || c) changed = true;
  }
  return changed;
}

// ── Win / Game Over ────────────────────────────
function checkWin() {
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (getValue(i, j) === '2048') return true;
  return false;
}

function canMove() {
  if (hasEmpty()) return true;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 3; j++)
      if (getValue(i, j) === getValue(i, j + 1)) return true;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 4; j++)
      if (getValue(i, j) === getValue(i + 1, j)) return true;
  return false;
}

function showOverlay(title, sub) {
  document.getElementById('overlay-title').textContent = title;
  document.getElementById('overlay-sub').textContent = sub;
  document.getElementById('overlay').classList.add('show');
}

function hideOverlay() {
  document.getElementById('overlay').classList.remove('show');
}

// ── Keyboard ───────────────────────────────────
document.addEventListener('keydown', function(e) {
  var moved = false;
  if (e.key === 'ArrowLeft')  { moved = left();  e.preventDefault(); }
  if (e.key === 'ArrowRight') { moved = right(); e.preventDefault(); }
  if (e.key === 'ArrowUp')    { moved = up();    e.preventDefault(); }
  if (e.key === 'ArrowDown')  { moved = down();  e.preventDefault(); }

  if (moved) {
    addRandomTile(true);
    if (checkWin()) {
      showOverlay('🎉 YOU WIN!', 'Score : ' + score);
      return;
    }
    if (!canMove()) {
      showOverlay('GAME OVER', 'Score final : ' + score);
    }
  }
});

// ── Touch support ──────────────────────────────
var touchStartX = 0, touchStartY = 0;
document.addEventListener('touchstart', function(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
  var dx = e.changedTouches[0].clientX - touchStartX;
  var dy = e.changedTouches[0].clientY - touchStartY;
  var moved = false;
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx >  30) moved = right();
    if (dx < -30) moved = left();
  } else {
    if (dy >  30) moved = down();
    if (dy < -30) moved = up();
  }
  if (moved) {
    addRandomTile(true);
    if (checkWin())  { showOverlay('🎉 YOU WIN!', 'Score : ' + score); return; }
    if (!canMove())  { showOverlay('GAME OVER', 'Score final : ' + score); }
  }
}, { passive: true });

// ── Start ──────────────────────────────────────
window.onload = function() {
  startNewGame();
};
