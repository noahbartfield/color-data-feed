import React, { useState, useEffect } from 'react';
import './App.css';
import * as firebase from 'firebase'
import cleanData from './cleanData.js'
import buildModel from './tfjs'

function App() {

  const [color, setColor] = useState(`rgb(${Math.floor((Math.random() * 255) + 1)}, ${Math.floor((Math.random() * 255) + 1)}, ${Math.floor((Math.random() * 255) + 1)})`)
  const [R, setR] = useState('')
  const [G, setG] = useState('')
  const [B, setB] = useState('')

  function changeColor() {
    let r = Math.floor((Math.random() * 255) + 1)
    setR(r)
    let g = Math.floor((Math.random() * 255) + 1)
    setG(g)
    let b = Math.floor((Math.random() * 255) + 1)
    setB(b)
    
    setColor(`rgb(${r}, ${g}, ${b})`)
    console.log('backgroundColor: ', color);
  }

  function submit(button) {
    //send object to firebase and refresh page
    console.log('submitting')

    let colorDatabase = firebase.database().ref('colors')
    const data = ({
      "R": R,
      "G": G,
      "B": B,
      "label": button.target.id
    })

    let color = colorDatabase.push(data);
    console.log("Firebase generated key: " + color.key);

    changeColor()
  }

  useEffect(() => {
    changeColor()
  }, [])

  function logData() {
    cleanData()
  }

  buildModel()

  return (
    <div className="App">
      <div>
        <canvas style={{ background: color, height: '240px', width: '240px' }}></canvas>
      </div>
      <button id='red-ish' onClick={submit}>red-ish</button>
      <button id='pink-ish' onClick={submit}>pink-ish</button>
      <button id='purple-ish' onClick={submit}>purple-ish</button>
      <button id='blue-ish' onClick={submit}>blue-ish</button>
      <button id='green-ish' onClick={submit}>green-ish</button>
      <button id='yellow-ish' onClick={submit}>yellow-ish</button>
      <button id='orange-ish' onClick={submit}>orange-ish</button>
      <button id='brown-ish' onClick={submit}>brown-ish</button>
      <button id='grey-ish' onClick={submit}>grey-ish</button>
      <div>
        <button onClick={logData}>Log Data</button>
      </div>
    </div>
  );
}

export default App;
