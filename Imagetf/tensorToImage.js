const bigMess = tf.randomUniform([512, 1024, 3]);

const myCanvas = document.getElementById("randomness");

tf.browser.toPixels(bigMess, myCanvas).then(() => {
  bigMess.dispose();
  console.log("make sure we cleaned ", tf.memory().numTensors);
});
