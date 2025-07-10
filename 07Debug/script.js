import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";
import gsap from "gsap";
import * as dat from "lil-gui";

//debug
const gui = new dat.GUI();
const parameter = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
  },
};

//debugging function

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
  color: parameter.color,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//debug
gui.add(mesh.position, "y", -3, 3, 0.01).name("red cube y");
gui.add(mesh.position, "x", -3, 3, 0.01).name("red cube x");
gui.add(mesh.position, "z", -3, 3, 0.01).name("red cube z");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.add(parameter, "spin");

gui.addColor(parameter, "color").onChange(() => {
  material.color.set(parameter.color);
});

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
