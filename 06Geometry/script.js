import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";
// Canvas
const canvas = document.querySelector("canvas.webgl");

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

const count = 50;
const positionArray = new Float32Array(count * 3 * 3);
for (let index = 0; index < count * 3 * 3; index++) {
  positionArray[index] = Math.random() - 0.5;
}

const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
const geometryTri = new THREE.BufferGeometry();
geometryTri.setAttribute("position", positionAttribute);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometryTri, material);

scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  150
);

camera.position.z = 3;

camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
//Render
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const tick = () => {
  const elpisedTime = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
