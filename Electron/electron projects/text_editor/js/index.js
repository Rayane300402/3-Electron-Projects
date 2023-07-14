// const electron = require('electron')
// const {ipcRenderer} = electron

const { ipcRenderer } = require("electron");


// Get the textarea element and the plus/minus buttons
let textarea = document.getElementById("textarea");
let increaseButton = document.getElementById("increase");
let decreaseButton = document.getElementById("decrease");
let saveButton = document.getElementById("save");

// Set the default font size
let fontSize = 20;

// Add event listeners to the buttons
increaseButton.addEventListener("click", function() {
  // Increase the font size by 1
  fontSize++;
  // Set the new font size
  textarea.style.fontSize = fontSize + "px";
});

decreaseButton.addEventListener("click", function() {
  // Decrease the font size by 1
  fontSize--;
  // Set the new font size
  textarea.style.fontSize = fontSize + "px";
});



  // var textarea = document.querySelector('#textarea')

  // let defaultFontSize = 20
  // function increaseFont(){
  //     textarea.style.fontSize = `${++defaultFontSize}px`
  // }

  // function decreaseFont(){
  //     textarea.style.fontSize = `${--defaultFontSize}px`
  // }

  function saveText(){
      let text = textarea.value
      console.log(text)
      ipcRenderer.send('save', text)
  }

  ipcRenderer.on('saved', (event, results)=>{
    if(results=='success'){
      console.log('note saved successfully')
      textarea.style.backgroundColor = "#b2ff99"
    }else{
      console.log('error saving text')
      textarea.style.backgroundColor = "#ff8989"
    }

    setTimeout( function(){textarea.style.backgroundColor = ""} , 1000)
    
  })

  ipcRenderer.on('save-clicked', ()=>{
    saveText()
  })