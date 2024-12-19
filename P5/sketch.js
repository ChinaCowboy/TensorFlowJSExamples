async function printGridFromDoc(url) {
  try {
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = url;
    // "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub";

    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));

    //const response = await fetch(url,{mode:'no-cors''});

    // Check if response is OK
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Get the response as text (HTML)
    const text = await response.text();

    // Log the raw HTML response for debugging
    console.log(text);

    // Parse the HTML to find the data you need
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const positions = {};
    const characterData = [];

    // Example extraction based on the assumed format of the doc
    // doc.querySelectorAll(".character-class").forEach((element) => {
    //   const char = element.textContent;
    //   const x = parseInt(element.getAttribute("x-coordinate"), 10);
    //   const y = parseInt(element.getAttribute("y-coordinate"), 10);
    //   positions[`${x},${y}`] = char;
    //   characterData.push({ character: char, x: x, y: y });
    // });

    const tableRows = doc.querySelectorAll("tr"); // Select all table rows

    const parsedData = Array.from(tableRows)
      .slice(1)
      .map((row) => {
        const cells = row.querySelectorAll("td"); // Select all spans within the row
        positions[
          `${cells[0]?.textContent.trim()},${cells[2]?.textContent.trim()}`
        ] = cells[1]?.textContent.trim();
        return {
          xCoordinate: cells[0]?.textContent.trim(),
          character: cells[1]?.textContent.trim(),
          yCoordinate: cells[2]?.textContent.trim(),
        };
      });

    console.log(parsedData);

    const maxX = Math.max(...parsedData.map((item) => item.xCoordinate));
    const maxY = Math.max(...parsedData.map((item) => item.yCoordinate));

    const grid = [];
    for (let i = 0; i <= maxY; i++) {
      const row = [];
      for (let j = 0; j <= maxX; j++) {
        row.push(positions[`${j},${i}`] || " ");
      }
      grid.push(row);
    }

    for (const row of grid) {
      console.log(row.join(""));
      stroke(255);
    }

    return parsedData;
  } catch (error) {
    console.error("Error fetching or processing the document:", error);
    return null;
  }
}

// Call the function with the provided URL
let drawData = null;

async function setup() {
  createCanvas(600, 600);
  drawData = await printGridFromDoc(
    "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub"
  );
}
async function draw() {
  background(0);
  stroke(255);
  if (drawData) {
    strokeWeight(8);

    const maxX = Math.max(...drawData.map((item) => item.xCoordinate));
    const maxY = Math.max(...drawData.map((item) => item.yCoordinate));

    drawData.forEach((element) => {
      let x = map(element.xCoordinate, 0, maxX, 10, width - 10);

      let y = map(element.yCoordinate, maxY, 0, height / 6 - 10, 10);
      //console.log("x->,y ", x, element.xCoordinate, y, element.yCoordinate);
      fill("yellow");
      textSize(1);
      text(element.character, x, y);
    });
  }
}
