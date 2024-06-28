/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Hallowed Knight
@author: phthallo
@tags: [metroidvania]
@addedOn: 2024-00-00
*/

const mask = "m"
const maskLost = "d"
const player = "p"
const stone = "s"
const background = "b"
const screenTransitionTop = "i"
const screenTransitionLeft = "j"
const screenTransitionRight = "l"
const screenTransitionBottom = "k"
const grass = "g"
const backgroundGrass = "t"
const acid = "a"
const black = "e"
const chest = "c"
const key = "h"
const movementY = 2
const movement = 1

var lives = 3


setLegend(
  [player, bitmap`
................
..000......000..
..020......020..
..020......020..
...0200000020...
...0022222200...
....02022020....
....02022020....
....02222220....
.....022220.....
.....000000.....
....00LLLL00....
....0LLLLLL0....
....0LLLLLL0....
....00LLLL00....
.....00LL00.....`], 
  // UI ELEMENTS
  [maskLost, bitmap `
................
....22222222....
...2000000002...
..200110000002..
..201110011102..
..201110011102..
..201110000002..
..201100000002..
..201000001102..
..200011001102..
..201111101102..
..200111100002..
...2000110002...
....22000022....
......2222......
................`],
  [mask, bitmap `
................
....22222222....
...2000000002...
..201111111102..
..201111111102..
..201111111102..
..201LL11LL102..
..201LL11LL102..
..201LL11LL102..
..201111111102..
..201111111102..
..200111111002..
...2000110002...
....22000022....
......2002......
.......22.......`],
  [key, bitmap `
................
..........6666..
.........666666.
.........66..66.
.........66..66.
.........666666.
........666666..
.......666......
......666.......
.....666........
....66666.......
...666..6.......
.....66..6......
......6.........
.......6........
................`],
  [screenTransitionTop, bitmap `
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [screenTransitionLeft, bitmap `
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............`],
  [screenTransitionRight, bitmap `
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL`],
  [screenTransitionBottom, bitmap `
................
................
................
................
................
................
................
................
................
................
................
................
................
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  // OTHER STUFF
  [chest, bitmap `
................
................
................
................
................
................
..000......000..
..0F00000000F0..
..0FCCCCCCCCF0..
..0FFFF11FFFF0..
..0FCCC11CCCF0..
..0FCCCCCCCCF0..
..0FCCCCCCCCF0..
..0FCCCCCCCCF0..
..0FCCCCCCCCF0..
..000000000000..`],
  [stone, bitmap `
1111111111111111
1111111111LL1111
11LLLLL111LL11L1
1111LLL111LL1111
1LL1LLL111LL1111
LL1LLLL1000L11LL
LL111111110L110L
LLLLL111110L110L
000001LLL111110L
111111LL011111L1
001L00111110L1L1
L000011100011111
LL1LL1000LL11111
LLLL11111110LLL1
1LLL11LL1100LLL1
1LLLL1111LL11111`],
  [background, bitmap `
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [grass, bitmap `
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [backgroundGrass, bitmap `
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [acid, bitmap `
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [black, bitmap `
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
)

setSolids([player, stone, grass])

setBackground(background)

let level = 0
const levels = [
  map `
ssssssssssiiis
s............s
s............s
s.....ssssssss
s...ss.......s
s............s
s..ssss......s
sp...........s
ssssssssssskks`,
  map `
sssssssssssiii
s...........p.
s..sssssssssss
s............s
ss...........s
sssssssss....s
sssss.....ssss
sssss.......cs
ssssssssssssss`,
  map `
ssssssssssiiis
s............s
s........sssss
s....s...sssss
s...ssssss.s.s
s.ssssssss...s
jp...........s
sss..........s
ssssssssssskks`,
  map `
gggggggggggggg
j............g
j............g
ggaaaaag.....g
ggggggggg....g
g....ggggg...g
g.....ggggg.pl
g...........gg
gkkggggggggggg`,
  map `
giigggggggggg
ggp.........g
ggggg.......g
gggggg......g
ggggggggggggg`,
  map `
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee`
]

// How to interpret the levelsDir => 
// Each key refers to a room. The values of each room are represented
// by a list. This list features the information for the room 
// transition to the top, left, right and bottom transitions.
// If the transition is null, there is no transition on that side of the room.
// The first element of the list (e.g [2, 9, 7], with the first element being 2
// represents the room that the transition leads to.
// The second and third elements represent the coordinates of the spawn position.
// This is because you can enter a room from multiple directions, and where the Knight
// spawns should reflect that.

const levelsDir = {
  "R0": [
    [2, 9, 7], null, null, [1, 12, 1]
  ],
  "R1": [
    [0, 9, 7], null, null, null
  ],
  "R2": ["", [3, 10, 6], null, [0, 10, 2]],
  "R3": [null, "", [2, 1, 6],
    [4, 2, 1]
  ],
  "R4": [
    [3, 4, 7], null, null, null
  ],
};

setMap(levels[level])

setPushables({
  [player]: []
})

// generate masks
updateHealth()


// Jumps are two units, and if we don't check if there are platforms
// directly above the Knight it will simply move through it.
function ceilingCheck(sprite) {
  var yPos = sprite.y
  sprite.y -= movement // try to move the sprite up
  if (sprite.y == yPos) { // if moving up didnt work
    return true
  } else // uh oh move it back
    sprite.y += movement
  return false
}

// Check if the Knight is currently on a platform.
function groundCheck(sprite) {
  var yPos = sprite.y
  sprite.y += movement // try to move the sprite down
  if (sprite.y == yPos) {
    // do nothing because apparently javascript doesnt have pass
    return true
  } else
    sprite.y -= movement // wow the sprite is not currently on the ground! move it back
  return false
}

// While the Knight is not on the ground, move downwards.
function moveDown(sprite) {
  setTimeout(() => {
    while (!(groundCheck(sprite))) {
      sprite.y += movement;
    }
  }, 300);
}

// Room transitions + regenerate the UI
function checkInteraction(sprite1, lvl) {
  const arr = ["i", "j", "l", "k"]
  knightCoords = getTile(getFirst(sprite1).x, getFirst(sprite1).y)
  currentLevel = "R" + lvl
  for (roomDirection in [0, 1, 2, 3]) {
    if (knightCoords.find(sprite => sprite.type == arr[roomDirection]) && (levelsDir[currentLevel][roomDirection])) {
      roomInfo = levelsDir[currentLevel][roomDirection]
      level = roomInfo[0]
      //console.log("respawning in" + roomInfo[0] + "at" + roomInfo[1] + "," + roomInfo[2])
      setMap(levels[level])
      getFirst(sprite1).x = roomInfo[1]
      getFirst(sprite1).y = roomInfo[2]
      updateHealth()
    }
  }
}

function checkHazard(sprite, hazard, respawnCoords) {
  knightCoords = getTile(getFirst(sprite).x, (getFirst(sprite).y))
  if (knightCoords.find(sprite => sprite.type == hazard)) {
    lives -= 1
    updateHealth()
    console.log(lives)
    getFirst(sprite).x = respawnCoords[0]
    getFirst(sprite).y = respawnCoords[1]
  }
}

function updateHealth(){
  for (let i = 0; i < 3; i++){ // 
    if (i < lives){
      addSprite(i,0, mask)
    } else
      addSprite(i,0, maskLost)    
  }
}
function updateInv(item){
  addSprite(0,1, key)
}

// Directions or smth yay
onInput("w", () => {
  if (!(ceilingCheck(getFirst(player)))) {
    getFirst(player).y -= movement;
    getFirst(player).y -= movement;
    moveDown(getFirst(player))
  }
})

onInput("a", () => {
  getFirst(player).x -= movement;
  if (!(groundCheck(getFirst(player)))) {
    moveDown(getFirst(player))
  }
})


onInput("d", () => {
  getFirst(player).x += movement;
  if (!(groundCheck(getFirst(player)))) {
    moveDown(getFirst(player))
  }
})

onInput("k", () => {
  knightCoords = getTile(getFirst(player).x, getFirst(player).y)
  if (knightCoords.find(sprite => sprite.type == chest)) {
      addText("chest opened", {
      x: 0,
      y: 15,
      color: color`2`})
    updateInv(key)

  }
})


afterInput(() => {
  console.log(getFirst(player).x, getFirst(player).y)
  checkInteraction(player, level)
  checkHazard(player, acid, [8, 3])
  if (lives == 0){
    setMap(levels[levels.length-1])
    addText("~GAME OVER~", {
      x: 5,
      y: 7,
      color: color`2`})
}})