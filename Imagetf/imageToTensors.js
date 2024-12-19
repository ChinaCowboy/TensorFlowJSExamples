window.addEventListener("load", function () {
  tf.tidy(() => {
    const domImage = document.getElementById("domImage");
    const dotTensor = tf.browser.fromPixels(domImage);
    console.log(`load successfully from DOM to a ${dotTensor.shape} tensor`);

    //Now load an image object in JavaScript

    const localImage = new Image();
    localImage.crossOrigin = "anonymous";
    localImage.src = "cats.jpg";

    localImage.onload = () => {
      const localTensor = tf.browser.fromPixels(localImage);
      const canvas = this.document.getElementById("cats");
      const flippedTesnor = tf.reverse(localTensor, 0);
      tf.browser.toPixels(flippedTesnor, canvas).then(() => {
        localTensor.dispose();
        flippedTesnor.dispose();
      });

      console.log(
        `load successfully from DOM to a ${localTensor.shape} tensor`
      );
    };
  });
});
