import { Component, VERSION, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
import { modello } from './modello';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('canvas', { static: true }) private canvasRef;

  constructor() {}

  ngOnInit(): void {
    const WIDTH = 700;
    const HEIGHT = 500;
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x8D8585)
    // const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 20000);
    const camera = new THREE.OrthographicCamera(
      WIDTH / -2,
      WIDTH / 2,
      HEIGHT / 2,
      HEIGHT / -2,
      0.1,
      5000
    );

    camera.position.x = -0.017619599436985343;
    camera.position.y = 7.945177755396763;
    camera.position.z = 0.7381778357853488;
    camera.zoom = 5;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    renderer.setSize(500, 500);

    this.canvasRef.nativeElement.append(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.zoomSpeed = 2;
    var axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper);

    const render = function () {
      requestAnimationFrame(render);
      renderer.setClearColor(0xffffff, 1);
      renderer.render(scene, camera);
    };

    const geometry2 = new THREE.BufferGeometry();

    geometry2.setIndex(modello.faces);
    const vertices = new Float32Array(modello.vertices);
    geometry2.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    geometry2.computeVertexNormals();

    var material2 = new THREE.MeshLambertMaterial({
      opacity: 0.1,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    var x1 = new THREE.Mesh(geometry2, material2);
    scene.add(x1);

    render();

    //--------------------------------------

    this.luci(scene);
    // animate();
  }

  private luci(s) {
    // s: scena a cui aggiungere le luci
    // ========================  LUCI =================================

    var ambient = new THREE.AmbientLight(0x221100);
    s.add(ambient);

    var lights = [];
    var pointLightHelper = [];
    var sphereSize = 10;

    lights[0] = new THREE.PointLight(0xffffff, 0.8, 0);
    lights[1] = new THREE.PointLight(0xffffff, 0.8, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(50, 50, 50);
    lights[1].position.set(0, -50, 30);
    lights[2].position.set(-60, 0, -10);

    var index;
    for (index = 0; index < lights.length; ++index) {
      //Per ogni luce
      //Aggiunge un Helper per individuare la collocazione della luce stessa
      pointLightHelper[index] = new THREE.PointLightHelper(
        lights[index],
        sphereSize
      );
      s.add(pointLightHelper[index]);
      s.add(lights[index]); //Aggiunge la luce alla scena
    }
  }
}
