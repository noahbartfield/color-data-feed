import data from './data.json'
import * as tf from '@tensorflow/tfjs'

function buildModel() {
    let model;

    const labelList = [
        'blue-ish',
        'green-ish',
        'yellow-ish',
        'orange-ish',
        'red-ish',
        'purple-ish',
        'pink-ish',
        'brown-ish',
        'grey-ish'
    ]

    let colors = []
    let labels = []
    for (let record of data.colors) {
        let col = [record.R / 255, record.G / 255, record.B / 255]
        colors.push(col)
        labels.push(labelList.indexOf(record.label))
    }
    console.log(colors.length)
    const labelsTensor = tf.tensor1d(labels, 'int32')
    const xs = tf.tensor2d(colors)
    const ys = tf.oneHot(labelsTensor, 9)
    labelsTensor.dispose()
    xs.print()
    ys.print()


    //define model
    model = tf.sequential()

    const hidden = tf.layers.dense({
        units: 16,
        activation: 'sigmoid',
        inputShape: [3]
    })
    const output = tf.layers.dense({
        units: 9,
        activation: 'softmax'
    })
    model.add(hidden)
    model.add(output)

    // Create an opimizer
    const lr = 0.2
    const sgdOpt = tf.train.sgd(lr)

    model.compile({
        optimizer: sgdOpt,
        loss: 'categoricalCrossentropy'
    })



    // "meanSquaredError" --> "categoricalCrossEntropy"

    // compile model

    // tain model


    const config = {
        verbose: true,
        epochs: 5,
        shuffle: true
    }

    async function trainModel() {
        for (let i = 0; i < 10; i++) {
            const response = await model.fit(xs, ys, config)
            console.log(response.history.loss[0])
        }
    }

    trainModel().then(() => {
        console.log('training complete')
        const outputs = model.predict(xs)
        outputs.print()
    })

}

export default buildModel