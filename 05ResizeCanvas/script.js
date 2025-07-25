import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 2;
scene.add(camera);

window.addEventListener("resize", () => {
  (sizes.width = window.innerWidth),
    (sizes.height = window.innerHeight),
    (camera.aspect = sizes.width / sizes.height);
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Render
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

//Animation
const tick = () => {
  const elpisedTime = clock.getElapsedTime();

  controls.update();
  // //render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
