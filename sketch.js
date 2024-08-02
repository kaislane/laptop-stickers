let images = []; // Array para almacenar las imágenes;
let dragIndex = -1; // Índice de la imagen que se está arrastrando;
let offsetX, offsetY;

function preload() {
  // Stickers;
  images.push({ img: loadImage('./img/image1.png'), x: 0, y: 0, width: 180, height: 180, scale: 1 });
  images.push({ img: loadImage('./img/image2.png'), x: 0, y: 0, width: 180, height: 180, scale: 1 });
  images.push({ img: loadImage('./img/image3.png'), x: 0, y: 0, width: 180, height: 180, scale: 1 });
  images.push({ img: loadImage('./img/image4.png'), x: 0, y: 0, width: 180, height: 180, scale: 1 });
  images.push({ img: loadImage('./img/image5.png'), x: 0, y: 0, width: 180, height: 180, scale: 1 });
  images.push({ img: loadImage('./img/image6.png'), x: 0, y: 0, width: 180, height: 180, scale: 1 });
  images.push({ img: loadImage('./img/image7.png'), x: 0, y: 0, width: 180, height: 180, scale: 1 });
  images.push({ img: loadImage('./img/image8.png'), x: 0, y: 0, width: 180, height: 180, scale: 1 });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(233, 85, 45);
  noStroke(); // Elimina los bordes;

  // Posiciones de las imágenes;
  let totalWidth = width - 40; // Ancho total disponible restando márgenes laterales de 20px cada uno;
  let numImages = 8;
  let imageWidth = 180;
  let spacing = (totalWidth - (numImages * imageWidth)) / (numImages + 1); // Espacio entre imágenes;

  for (let i = 0; i < numImages; i++) {
    images[i].x = 20 + spacing * (i + 1) + imageWidth * i;
    images[i].y = height - 220;
  }
}

function draw() {
  //background(233, 85, 45);

  fill(255);
  rectMode(CENTER);
  rect(width / 2, height - (225 / 2) - 20, width - 40, 225, 10);

  fill(180);
  rect(width / 2, (height - 225 - 20) / 2, 960, 540, 30);

  fill(60);
  ellipse(width / 2, (height - 225 - 20) / 2, 80, 80);

  // Actualizo la posición al arrastrar un sticker;
  if (dragIndex != -1) {
    images[dragIndex].x = lerp(images[dragIndex].x, mouseX - offsetX, 0.1);
    images[dragIndex].y = lerp(images[dragIndex].y, mouseY - offsetY, 0.1);
    images[dragIndex].scale = lerp(images[dragIndex].scale, 1.1, 0.1); // Aumentar tamaño;
  }

  // Dibujo todas las imágenes;
  for (let imgObj of images) {
    push();
    translate(imgObj.x + imgObj.width / 2, imgObj.y + imgObj.height / 2);
    scale(imgObj.scale);
    imageMode(CENTER);
    image(imgObj.img, 0, 0, imgObj.width, imgObj.height);
    pop();
  }

  // Reducir tamaño al soltar la imagen;
  if (dragIndex == -1) {
    for (let imgObj of images) {
      imgObj.scale = lerp(imgObj.scale, 1, 0.1);
    }
  }

  frameRate(60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(233, 85, 45);
}

// Detecto cuándo se presiona el ratón;
function mousePressed() {
  // Verifico si el clic está dentro de alguna imagen;
  for (let i = 0; i < images.length; i++) {
    let imgObj = images[i];
    if (mouseX > imgObj.x && mouseX < imgObj.x + imgObj.width && mouseY > imgObj.y && mouseY < imgObj.y + imgObj.height) {
      dragIndex = i;
      // Guardo la posición relativa a la imagen;
      offsetX = mouseX - imgObj.x;
      offsetY = mouseY - imgObj.y;
      break;
    }
  }
}

// Detecto cuándo se suelta el ratón;
function mouseReleased() {
  dragIndex = -1;
}

// Shortcuts del teclado
function keyPressed() {
  // F: Fullscreen
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  // P: Pantallazo
  if (key === 'p') {
    saveFrames('sketch-', 'png', 1, 1);
  }
}
