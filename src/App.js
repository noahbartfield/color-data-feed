import React, { useState, useEffect } from 'react';
import './App.css';
import * as firebase from 'firebase';
import cleanData from './cleanData.js';
import buildModel from './tfjs';
import data from './tfjs/data.json'

import ColorBlock from './colorBlock';

function App() {
  const [color, setColor] = useState(
    `rgb(${Math.floor(Math.random() * 255 + 1)}, ${Math.floor(
      Math.random() * 255 + 1
    )}, ${Math.floor(Math.random() * 255 + 1)})`
  );
  const [R, setR] = useState('');
  const [G, setG] = useState('');
  const [B, setB] = useState('');
  const [colorHistory, setColorHistory] = useState([]);
  const [colorDataArray, setColorDataArray] = useState([])

  function changeColor() {
    let r = Math.floor(Math.random() * 255 + 1);
    setR(r);
    let g = Math.floor(Math.random() * 255 + 1);
    setG(g);
    let b = Math.floor(Math.random() * 255 + 1);
    setB(b);

    setColor(`rgb(${r}, ${g}, ${b})`);
    console.log('backgroundColor: ', color);
  }

  function submit(button) {
    //send object to firebase and refresh page
    console.log('submitting');

    let colorDatabase = firebase.database().ref('colors');
    const data = {
      R: R,
      G: G,
      B: B,
      label: button.target.id,
    };

    let color = colorDatabase.push(data);
    console.log('Firebase generated key: ' + color.key);

    setColorHistory((colorHistory) => [...colorHistory, data]);

    changeColor();
  }

  useEffect(() => {
    changeColor();
  }, []);

  function build() {
    buildModel();
  }

  function chooseDataColor(e) {
    const colorArray = data.colors.filter(color => color.label === `${e.target.id}-ish`)
    setColorDataArray(colorArray)
  }

  return (
    <div className='App'>
      <div>
        <button onClick={build}>Train Model</button>
      </div>
      <div>
        <canvas
          style={{ background: color, height: '240px', width: '240px' }}
        ></canvas>
      </div>
      <button id='red-ish' onClick={submit}>
        red-ish
      </button>
      <button id='pink-ish' onClick={submit}>
        pink-ish
      </button>
      <button id='purple-ish' onClick={submit}>
        purple-ish
      </button>
      <button id='blue-ish' onClick={submit}>
        blue-ish
      </button>
      <button id='green-ish' onClick={submit}>
        green-ish
      </button>
      <button id='yellow-ish' onClick={submit}>
        yellow-ish
      </button>
      <button id='orange-ish' onClick={submit}>
        orange-ish
      </button>
      <button id='brown-ish' onClick={submit}>
        brown-ish
      </button>
      <button id='grey-ish' onClick={submit}>
        grey-ish
      </button>
      <div>
        <button id='red' onClick={chooseDataColor}>Log Red Data</button>
        <button id='pink' onClick={chooseDataColor}>Log Pink Data</button>
        <button id='purple' onClick={chooseDataColor}>Log Purple Data</button>
        <button id='blue' onClick={chooseDataColor}>Log Blue Data</button>
        <button id='green' onClick={chooseDataColor}>Log Green Data</button>
        <button id='yellow' onClick={chooseDataColor}>Log Yellow Data</button>
        <button id='orange' onClick={chooseDataColor}>Log Orange Data</button>
        <button id='brown' onClick={chooseDataColor}>Log Brown Data</button>
        <button id='grey' onClick={chooseDataColor}>Log Grey Data</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: 'auto' }}>
        {colorDataArray.length > 0 &&
          colorDataArray.map((colorData) => <ColorBlock colorData={colorData} />)}
      </div>
    </div>
  );
}

export default App;
