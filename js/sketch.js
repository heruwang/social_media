'use strict';

//DB URL: https://console.firebase.google.com/u/0/project/socialmedia-912ca/database/socialmedia-912ca/data//


let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'demo-messages'; // name of folder you create in db
let messageInput;
let sendMessageBtn;
let receiveMessageBtn;
let sendAgainBtn;
let receivedMessage;
let receiveDiv, sendDiv;


function setup() {
  noCanvas();

 // access DOM elements
  //messageInput = select("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageBtn = document.querySelector("#sendMessageBtn");
  receiveMessageBtn = document.querySelector("#receiveMessageBtn");
  receivedMessage = document.querySelector("#receivedMessage");
  sendAgainBtn = document.querySelector("#sendAgainBtn");
  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");

  sendMessageBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);
  sendAgainBtn.addEventListener('click', sendAgain);


  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  // paste your config file here
  let config = {
    apiKey: "AIzaSyAns57wfC4JE6_xq7J1VCUp_todVSX4tm8",
    authDomain: "socialmedia-912ca.firebaseapp.com",
    databaseURL: "https://socialmedia-912ca.firebaseio.com",
    projectId: "socialmedia-912ca",
    storageBucket: "socialmedia-912ca.appspot.com",
    messagingSenderId: "444827764383",
    appId: "1:444827764383:web:9ca16c4fde02456138c4aa",
    measurementId: "G-VYBJGNT549"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!

}

function draw() {

}

function sendMessage() {
  if (messageInput.value) {
    let timestamp = Date.now();

    nodeData = {
      messageText: messageInput.value,
      timestamp: timestamp,
      received: false,
    }

    createNode(folderName, timestamp, nodeData);
    console.log("sent message:");
    console.log(nodeData);

    messageInput.value = ''

    sendDiv.style.display = 'none';
    receiveDiv.style.display = 'block';

  } else {
    alert("uh oh. type message first");
  }
}

function receiveMessage(){

  //shuffle array first
 shuffleArray(fbDataArray);

  for(let i=0; i<fbDataArray.length; i++){
    if(fbDataArray[i].received == false){
      //console.log("received message:");
      //console.log(fbDataArray[i].messageText);

      receivedMessage.innerHTML = fbDataArray[i].messageText;

      updateNode(folderName, fbDataArray[i].timestamp, {received: true});

      receiveMessageBtn.style.display = 'none';
      sendAgainBtn.style.display = 'block';

      break;

    }else{
      receivedMessage.innerHTML = "no more messages out in the sky";
      //console.log("no more messages out in the sky");
    }
  }
}

function sendAgain(){
  //reset receive div
  receivedMessage.innerHTML="";
  receiveMessageBtn.style.display = 'block';
  sendAgainBtn.style.display = 'none';


  receiveDiv.style.display = 'none';
  sendDiv.style.display = 'block';
}
function shuffleArray(array){
  // iterate backwards through an array
for (let i = array.length - 1; i > 0; i--) {

  // grab random index from 0 to i
  let randomIndex = Math.floor(Math.random() * (i + 1));

  // swap elements array[i] and array[j]
  [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // using "destructuring assignment" syntax

  // same can be written as:
  // let arrayItem = array[i]; // array item in original position array[i]
  // array[i] = array[randomIndex]; // overwrite array[i] with new item at random index
  // array[randomIndex] = arrayItem; // now move array item from original position into random position

}
}
