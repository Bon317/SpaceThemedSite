//'npm run dev' to start local host

import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Object3D, TextureLoader } from 'three';


//create the scene camer and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(10);
renderer.render( scene, camera);

//Create the torus
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material =  new THREE.MeshStandardMaterial({color: 0xFF6346});
const torus =  new THREE.Mesh(geometry, material);
//scene.add(torus)


//create the lighting
const pointLight =  new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)


//create helper grid and lighting position
/*
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper)
*/

const controls = new OrbitControls(camera, renderer.domElement);

// Generate Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.20, 24, 24);
  const material =  new THREE.MeshStandardMaterial( {color: 0xffffff} )
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloat( -100, 125 ) );
  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar)

//Load in the background
const spaceTexture = new THREE.TextureLoader().load('space.png');
scene.background = spaceTexture;

//Create Earth
const earthTexture = new THREE.TextureLoader().load('Earth.jpg');
const normalTexture = new THREE.TextureLoader().load('NormalMapEarth.png');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: earthTexture,
    normalMap: normalTexture
  } )
);
earth.position.setX(8);
scene.add(earth);

//Create moon
const moonTexture = new THREE.TextureLoader().load('Moon.jpg');
const moonNormalTexture = new THREE.TextureLoader().load('MoonNormal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 14, 14),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: moonNormalTexture
  } )
);

moon.position.setX(10);

//create pivot point
const pivotPoint = new Object3D();
pivotPoint.add(moon);
pivotPoint.position.setX(8);
scene.add(pivotPoint);

//Create Mars
const marsTexture = new THREE.TextureLoader().load('Mars.jpg');
const marsNormalTexture = new THREE.TextureLoader().load('NormalMapEarth.png');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: marsTexture,
    normalMap: marsNormalTexture
  } )
);

mars.position.setX(65);
scene.add(mars);


//Create Jupiter
const jupiterTexture = new THREE.TextureLoader().load('Jupiter.jpg');
const jupiterNormalTexture = new THREE.TextureLoader().load('JupiterNormal.jpg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: jupiterTexture,
    normalMap: jupiterNormalTexture
  } )
);

jupiter.position.setX(104);
scene.add(jupiter);

//move on scroll

function moveCamera() {
  const t =  document.body.getBoundingClientRect().top;
  console.log(t);
/*
  if(camera.position.z < 15 ){
  camera.position.z = 10 + (t * -.02);
  }
  */
  camera.position.x = t * -.032;
  camera.target.x = t * -32;
  

}
 document.body.onscroll = moveCamera


//animate the scene
function animate() {
  requestAnimationFrame( animate );

  /*
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  */
  earth.rotation.y += 0.025
  mars.rotation.y += 0.02
  moon.rotation.y += 0.005
  jupiter.rotation.y += 0.005
  pivotPoint.rotation.y += 0.006
  controls.update();
  renderer.render( scene, camera);
}

animate()