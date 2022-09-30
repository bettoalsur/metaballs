class Bola {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.velx = random(1,3)*(-1)**Math.trunc(random(0,2));
    this.vely = random(1,3)*(-1)**Math.trunc(random(0,2));
    this.d = min(width,height)/(numBolas-1);
  }
  
  show() {
    stroke(0);
    strokeWeight(1);
    noFill()
    ellipse(this.x,this.y,this.d,this.d)
  }
  
  update() {
    this.x += this.velx;
    this.y += this.vely;
    
    if (this.x > width-this.d/2) {
      this.x = width-this.d/2
      this.velx*=-1;
    }
    if (this.x < this.d/2) {
      this.x = this.d/2
      this.velx*=-1;
    }
    if (this.y > height-this.d/2) {
      this.y = height-this.d/2
      this.vely*=-1;
    }
     if (this.y < this.d/2) {
       this.y = this.d/2;
        this.vely*=-1;
    }  
  }
}

let density;
let numBolas = 7;
let bolas = [];
let tol = 0.03;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  colorMode(HSB);
  density = pixelDensity();
  for (let i = 0; i < numBolas ; i++) {
    bolas.push( new Bola() );
  }
}

function draw() {
  background(0);
  loadPixels();
  for (let y = 0; y < height ; y++){
    for (let x = 0; x < width ; x++){
      let z = 0;
      for (let bola of bolas){
        let dist =  ( (x-bola.x)**2 + (y-bola.y)**2 );
        z += bola.d*bola.d/dist/4;
      }
      z = (z > 1-tol && z < 1+tol) ? 255 : 0
      let indexBloclPixel = y*density*width*density+x*density;
      for(let i = 0 ; i < density ; i++) {
        for (let j = 0 ; j < density ; j ++) {
          let indexPixel = indexBloclPixel+i*width*density+j;
          pixels[indexPixel*4] = z*(x/width+y/height)/2;
          pixels[indexPixel*4+1] = z*(2-x/width-y/height)/2;
          pixels[indexPixel*4+2] = z;
        }
      }
    }
  }
  updatePixels();
  
  for (let bola of bolas){
    bola.update();
  }
}