window.addEventListener("load", function () {
  tf.tidy(() => {
    //Now load an image object in JavaScript

    const localImage = new Image();
    localImage.crossOrigin = "anonymous";
    localImage.src = "cats.jpg";

    localImage.onload = () => {
      const localTensor = tf.browser.fromPixels(localImage);

      const flippedTesnor = tf.reverse(localTensor, 0);
      const canvas = this.document.getElementById("cats");
      // flip
      tf.browser.toPixels(flippedTesnor, canvas).then(() => {
        localTensor.dispose();
        flippedTesnor.dispose();
      });

      //NearestNeighbor
      const canvas_s = this.document.getElementById("cats-s");
      const newSmallSize = [256, 612];
      const smallResizeTensor = tf.image.resizeNearestNeighbor(
        localTensor,
        newSmallSize,
        true
      );

      tf.browser.toPixels(smallResizeTensor, canvas_s).then(() => {
        smallResizeTensor.dispose();
      });

      //Bilinear rezie and slize (crop)
      const smallResizeTensor2 = tf.image.resizeBilinear(
        localTensor,
        newSmallSize,
        true
      );

      const smallResizeTensor2Int = smallResizeTensor2.asType("int32");
      const canvas_l = this.document.getElementById("cats-l");

      tf.browser.toPixels(smallResizeTensor, canvas_l).then(() => {
        smallResizeTensor2.dispose();
        smallResizeTensor2Int.dispose();
      });

      const startPoint = [0, 120, 0];
      const canvas_c = this.document.getElementById("cats-c");
      const cropped = tf.slice(localTensor, startPoint, newSmallSize);

      tf.browser.toPixels(cropped, canvas_c).then(() => {
        cropped.dispose();
      });
      console.log(
        `load successfully from DOM to a ${localTensor.shape} tensor`
      );
    };
  });
});
