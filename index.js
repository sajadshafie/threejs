import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import {GLTFLoaderExtensions} from 'three-stdlib'
// import * as STDLIB from 'three-stdlib'
// import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({ antialias: true });
scene.background = new THREE.Color(0xdddddd);

let camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
//   camera.rotation.y = 9000;
camera.rotation.y = 49;
//   camera.position.z=1000;
camera.position.x = -5;
camera.position.y = 2;
camera.position.z = 2;

var control = new OrbitControls(camera, renderer.domElement);
control.addEventListener("change");

let directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
// scene.add(directionalLight);
let hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);

let light = new THREE.PointLight(0xc4c4c4, 10);
light.position.set(10, 50, 500);
// scene.add(light);

let light2 = new THREE.PointLight(0xc4c4c4, 10);
light2.position.set(200, 100, 50);
// scene.add(light2);

let light3 = new THREE.PointLight(0xc4c4c4, 10);
light3.position.set(0, 50, 100);
// scene.add(light3);

let light4 = new THREE.PointLight(0xc4c4c4, 10);
light4.position.set(-500, 300, 500);
// scene.add(light4);

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
let loader = new GLTFLoader();
let clock = new THREE.Clock();
let mixer;
loader.load(
  "./bird/scene.gltf",
  (gltf) => {
    
    // console.log(gltf);
      const textureload=new THREE.TextureLoader()
     const texture= textureload.load('./bird/textures/BirdOrange_LMB_baseColor.png')
      
    const clock=new THREE.Clock()
    const model=gltf.scene
    const animation=gltf.animations
    scene.add(model)
    var material=new THREE.MeshBasicMaterial({
      map:texture
    })
    scene.add(material)
    //   model.traverse(async res=>{
    //      if(res.material){
          
    //       // res.material.map=texture
    //     }
    //   })
      console.log(gltf)
      const mixer=new THREE.AnimationMixer(model)
      const clip=animation[0]
      const action=mixer.clipAction(clip)
      
      action.play()
      function animate() {
        mixer.update(clock.getDelta())
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }   
      animate();
    
  },
  (load) => {
    console.log((load.loaded / load.total) * 100 + "% loaded");
  },
  (err) => {
    console.log(err);
  }
);