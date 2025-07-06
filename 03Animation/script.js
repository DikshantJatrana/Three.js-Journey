import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//Render
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();
//gsap
gsap.to(mesh.position, {
  duration: 1,
  x: 1,
  yoyo: true,
});

//Animation
const tick = () => {
  //time

  // const elpisedTime = clock.getElapsedTime();

  // //updated obejct
  // camera.position.y = Math.sin(elpisedTime);
  // camera.position.x = Math.cos(elpisedTime);
  // camera.lookAt(mesh.position);

  // //render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
