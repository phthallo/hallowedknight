/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Hallowed Knight
@author: phthallo
@tags: [metroidvania]
@addedOn: 2024-00-00
*/

// Definitely not inspired by Hollow Knight.

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
const currency ="n"
const keyGate = "w"
const dashStatue = "f"
const dashAbility="u"

const movementY = 2
const movement = 1


var lives = 3
var inventory = []
var money = 0
var lastXInput = ""

var keyGateOpen = false

setLegend(
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
.......22.......
................`],
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
  [currency, bitmap `
....22222222....
...2000000002...
..206666666602..
.20666666666602.
20662FFFFFF66602
2062226666626602
2066266666626602
2066F66666626602
2066F66666626602
2066F66666626602
2066F66666626602
2066622222266602
.20666666666602.
..206666666602..
...2000000002...
....22222222....`],
  [dashAbility, bitmap `
................
.........0......
.........0......
.........0......
.........0......
.........0......
......00.0......
.....0..00......
.....0..00......
.....0...0......
.....0...0......
.....00.00......
......0000......
.........0......
................
................`],
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
  [dashStatue, bitmap `
................
..222......222..
.21112....21112.
2111112222111112
2112111111112112
2112212112122112
.212.221122.212.
.......22.......
................
...LLLLLLLLLL...
......LLLL......
......LLLL......
......LLLL......
......LLLL......
....LLLLLLLL....
................`],
  [keyGate, bitmap `
.....000000.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....000000.....`],
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
0000000000000000
0111111111LL1110
01LLLLL111LL11L0
0111LLL111LL1110
0LL1LLL111LL1110
0L1LLLL1000L11L0
0L111111110L11L0
0LLLL111110L11L0
000001LLL11111L0
011111LL011111L0
001L00111110L1L0
0000011100011110
0L1LL1000LL11110
0LLL11111110LLL0
0LLL11LL1100LLL0
0000000000000000`],
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
0000000000000000
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0000000000000000`],
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

setSolids([player, stone, grass, keyGate])

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
ssssssssssskks`, // spawn room
  map `
sssssssssssiis
s...........ps
s..sssssssssss
s............s
ssssssssss...s
sssss........s
sssss.....ssss
sssss.......cs
ssssssssssssss`, // room below spawn room w/ chest
  map `
ssssssssssiiis
s........w...s
s.....ssssssss
s....sssssssss
s...ssssss.s.s
s.ssssssss...s
jp...........s
sss..........s
ssssssssssskks`, // hub room between grass and stone
  map `
gggggggggggggg
j............g
j............g
ggaaaaag.....g
ggggggggg....g
g....ggggg...g
g.....ggggg.pl
g...........gg
gkkggggggggggg`, // grass with acid lake
  map `
giiggggggggggg
ggp..........g
ggggg........g
gggggg......cg
gggggggggggggg
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee`, // grass with chest
  map `
sssssssiisssss
ssssssss.....s
sssssssss....s
sssssssssss..l
sssssss......l
sssssss....sss
sssssss..sss..
sssssss....p..
sssssssssssskk`, // room above hub room
  map `
ssssssssssssss
s............s
s...ss.......s
j..ss........s
jpss....ssssss
sss..........s
s...ss.......s
s...........fs
ssssssssssssss`, // dash room
  // DEATH
  map `
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee`,

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
    [2, 9, 7], null, null, [1, 12, 1], background
  ],
  "R1": [
    [0, 9, 7], null, null, null, background
  ],
  "R2": [[5, 10, 7], [3, 10, 6], null, [0, 10, 2], background],
  "R3": [null, "", [2, 1, 6],
    [4, 2, 1], backgroundGrass
  ],
  "R4": [
    [3, 4, 7], null, null, null, backgroundGrass
  ],
  "R5": ["", null, [6, 3, 4], [2, 11 , 1], background],
  "R6": [null, [5, 12, 4], null, null, background],
};

setMap(levels[level])

setPushables({
  [player]: []
})

// generate masks
updateHealth()
addSprite(0,1, currency)
updateCurrency(0) 

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
  }, 150);
}

// Check if the next tiles in front of the knight are free
function horizontalCheck(sprite){
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
      console.log("respawning in" + roomInfo[0] + "at" + roomInfo[1] + "," + roomInfo[2])
      setMap(levels[level])
      setBackground(levelsDir["R"+level][4])
      getFirst(sprite1).x = roomInfo[1]
      getFirst(sprite1).y = roomInfo[2]
      // Refresh UI
      if (keyGateOpen==true && level == 2){
          getFirst(keyGate).remove()
      }
      clearText()
      updateHealth()
      updateInv()
      updateCurrency(0)
      addSprite(0,1, currency)
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

function checkGate(knight){
  gateCoords = getTile(getFirst(knight).x+1, (getFirst(knight).y))
  if (gateCoords.find(sprite => sprite.type == keyGate) && (inventory.includes("h"))) {
    console.log("Knight is standing to left of a keyGate and has key")
    inventory.splice(inventory.indexOf("h"), 1)
    keyGateOpen = true
    getFirst(keyGate).remove()
  }
  console.log(inventory)
}

function updateHealth(){
  for (let i = 0; i < 3; i++){ 
    if (i < lives){
      addSprite(i,0, mask)
    } else
      addSprite(i,0, maskLost)    
  }
}

function updateInv(item=null){
  if (item){
    inventory.push(item)
  }
  for (let i = 0; i < inventory.length; i++){
    addSprite(i, 2, inventory[i])
  }
}

function updateCurrency(amount){
  money += amount
  addText(String(money), { 
  x: 2,
  y: 3,
  color: color`2`
})
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
  lastXInput = -1
})


onInput("d", () => {
  getFirst(player).x += movement;
  lastXInput = 1
})

onInput("k", () => {
  knightCoords = getTile(getFirst(player).x, getFirst(player).y)
  if (knightCoords.find(sprite => sprite.type == chest)) {
      addText("KEY obtained", {
      x: 0,
      y: 15,
      color: color`2`})
      updateInv(key)
      updateCurrency(2)
  }
  if (knightCoords.find(sprite=> sprite.type == dashStatue)){
      addText("DASH obtained", {
      x: 0,
      y: 15,
      color: color`2`})
      updateInv(dashAbility)
  }
  checkGate(player)
  updateInv()
})

onInput("l", () => {
  if (inventory.includes(dashAbility)){
      for (let i = 0; i <= 4; i++){
        getFirst(player).x += lastXInput
      }
  }
})

afterInput(() => {
  if (!(groundCheck(getFirst(player)))) {
    moveDown(getFirst(player))
  }
  console.log(getFirst(player).x, getFirst(player).y)
  checkInteraction(player, level)
  checkHazard(player, acid, [8, 3])
  updateInv()
  if (lives == 0){
    setMap(levels[levels.length-1])
    addText("~GAME OVER~", {
      x: 5,
      y: 7,
      color: color`2`})
}})