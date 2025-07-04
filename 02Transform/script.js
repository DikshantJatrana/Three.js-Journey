import * as THREE from "three";

//Canva
const canvas = document.querySelector("canvas.webgl");

//Scene
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//postions
mesh.position.set(1, 0.6, -0.9);
console.log(mesh.position.length());

//scale
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;

//rotation
mesh.rotation.y = 0.25;
mesh.rotation.z = 0.5;

//Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//sizes
const sizes = {
  width: 800,
  height: 600,
};

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//Look at
camera.lookAt(mesh.position);

//distance of mesh to camera
console.log(mesh.position.distanceTo(camera.position));

//render
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
