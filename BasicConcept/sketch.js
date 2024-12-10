const model = tf.sequential();

//dense is a full connected layers

const hidden = tf.layers.dense({
  units: 4, //number of nodes
  inputShape: [2], //inpit shape
  activation: "sigmoid",
});

// add the layter

model.add(hidden);

const output = tf.layers.dense({
  units: 1,
  activation: "sigmoid",
});

model.add(output);
const sgdOpt = tf.train.sgd(0.1);

model.compile({
  optimizer: sgdOpt,
  loss: tf.losses.meanSquaredError,
});

const xs = tf.tensor2d([
  [0, 0],
  [0.5, 0.5],
  [1, 1],
]);

const ys = tf.tensor2d([[1], [0.5], [0]]);

async function train() {
  for (let i = 0; i < 1000; i++) {
    const config = {
      shuffle: true,
      epochs: 10,
    };
    const response = await model.fit(xs, ys, config);
    console.log(response.history.loss[0]);
  }
}

train().then(() => {
  let outputs = model.predict(xs);
  outputs.print();
  console.log("training complete");
});
