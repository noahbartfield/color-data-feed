import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase'
import ColorBlock from './colorBlock'

function cleanData() {
    let canvasArray = []
    let colorByLabel = {
        'blue-ish': [],
        'green-ish': [],
        'yellow-ish': [],
        'orange-ish': [],
        'red-ish': [],
        'purple-ish': [],
        'pink-ish': [],
        'brown-ish': [],
        'grey-ish': []
    }
    function setUp() {
        const database = firebase.database()
        const ref = database.ref('colors')
        ref.once('value', gotData)
    }
    function gotData(results) {
        const data = results.val()
        const keys = Object.keys(data)
        for (let key of keys) {
            let record = data[key]
            let col = `rgb(${record.R}, ${record.G}, ${record.B})`
            colorByLabel[record.label].push(col)
        }
        console.log(colorByLabel)

        let blues = colorByLabel['blue-ish']
        for (let i = 0; i < blues.length; i++) {
            const color = blues[i]
            return <canvas style={{ background: color, height: '10px', width: '10px' }}></canvas>
        }
    }

    function printBlocks() {
        colorByLabel['blue-ish'].map(blue => {
            return <ColorBlock color={blue} />
        })
    }

    setUp()
    printBlocks()

    colorByLabel['blue-ish'].map(blue => {
        return <ColorBlock color={blue} />
    })
}

export default cleanData