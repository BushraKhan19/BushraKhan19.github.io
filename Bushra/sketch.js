// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDuXe_DxTkWCQ-9u8Ox-ekuM0mzbWi8GO0",
    authDomain: "game-dffae.firebaseapp.com",
    databaseURL: "https://game-dffae.firebaseio.com",
    projectId: "game-dffae",
    storageBucket: "game-dffae.appspot.com",
    messagingSenderId: "643820427447",
    appId: "1:643820427447:web:200dd35e51c03068"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database= firebase.database()
let Name= document.getElementById("Name")
let scoreboard={}
let x
let y

let b
let k

let c
let d

let e
let f


let score
let level
let eradius
let time


function setup() {
  createCanvas(windowWidth, windowHeight);
  x= 555
  y= 120
  b= 680
  k= 430
  c= 100
  d= 300
  e= [555,120,77]
  f= [454,543,143]
  score= 0
  eradius= 50
  level= 1
  time= 20
  c=[500,300,600,400]
  d=[200,444,500,300]
  

}



function draw() {
   if (time > 0) { 
background(100, 50, 70);


  fill(150,90,60)
  textSize(40)
  text('score:'+score,300,100)
  text('time:'+time.toFixed(0),300,50)
  time= time- 0.05

  
  
  
  
  
  circle(x,y,30)
  //x= x+1
  if (score>=30 && level == 1){
    level= 2
    score= 0
    eradius= 70
  }
if (score>=70 && level == 2){
    level= 3
    score= 0
    eradius= 20
  }
  if (score>=100 && level == 3){
    level= 4
    score= 0
    eradius= 20
  }
 
  
  if (dist( x, y, b, k) < 40 + 80) {
	score = score + 1
}
if (touches.length == 0)   { 
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 6
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 6
  }
  if (keyIsDown(UP_ARROW)) {
    y = y - 6
  }
  if (keyIsDown(DOWN_ARROW)) {
    y = y + 6
  }
}
	  
else { 
		x = touches[0].x
		y = touches[0].y
}

fill(40,80,100)
circle(b,k,53)
b= b+5

for (i=0; i<4; i=i+1) {
fill(20,70,120)
circle(c[i],d[i],eradius)
c[i]=c[i]+5
  if (dist( x, y, c[i], d[i]) < eradius + 80) {
	score = score - 0.5
}
  if ( c[i] > width) {
	c[i] = 0 
}
}

if (level==3) {
  for (i=0; i<10; i=i+1) {
    fill(20,70,120)
    circle(e[i],f[i],eradius)
    e[i]=e[i]-5
      if (dist( x, y, e[i], f[i]) < eradius + 80) {
        score = score - 0.5
    }
      if ( e[i] < 0) {
        e[i] = width 
    }
}
}
  
if ( b > width) {
	b = 0
}
}

 else {
  Name.innerHTML = "Name? <input id= 'Name2'><button onclick ='restart()'>Restart</button> <button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button>"
  noLoop()
}
  
}
function restart() { 
    let Name2= document.getElementById("Name2")
	name = Name2.value 
	database.ref(name).set(score)
	if (name != "") { 
			scoreboard[name] = score
		}
    alert("Scoreboard: " +
    JSON.stringify(scoreboard,null,1)) 
    x= 555
    y= 120
    b= 680
    k= 430
    c= 100
    d= 300
    e= [555,120,77]
    f= [454,543,143]
    score= 0
    eradius= 50
    level= 1
    time= 20
    c=[500,300,600,400]
    d=[200,444,500,300]
    loop()
	Name.innerHTML = ""
  generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()





