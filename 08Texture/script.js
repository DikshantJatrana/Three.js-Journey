import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";
import gsap from "gsap";

const parameter = {
  color: 0xff0000,
};

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("on start");
};
loadingManager.onLoad = () => {
  console.log("on load");
};
loadingManager.onProgress = () => {
  console.log("on progress");
};
loadingManager.onError = () => {
  console.log("on error");
};

const TextureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = TextureLoader.load(
  "/static/textures/checkerboard-8x8.png"
);
const alphaTexture = TextureLoader.load("/static/textures/door/alpha.jpg");
const heightTexture = TextureLoader.load("/static/textures/door/height.jpg");
const normalTexture = TextureLoader.load("/static/textures/door/normal.jpg");
const roughness = TextureLoader.load("/static/textures/door/roughness.jpg");
const metalTexture = TextureLoader.load("/static/textures/door/metalness.jpg");
const ambientOcclusionTexture = TextureLoader.load(
  "/static/textures/door/ambientOcclusion.jpg"
);

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 2;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;
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
  map: colorTexture,
});
const mesh = new THREE.Mesh(geometry, material);

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
