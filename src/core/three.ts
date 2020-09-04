import * as THREE from "three";
import Stats from "../../util/Stats";

export class Three {


    private container: HTMLElement;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene = new THREE.Scene();
    private light: THREE.DirectionalLight
    private stats:Stats = new Stats();

    constructor(containerId: string) {
        this.container = document.getElementById(containerId);
        this.draw();
    }


    public draw() {
        this.initThree();
        this.initStates();
        this.initCamera();
        this.initScene();
        this.initLight();
        this.initObject();
        this.animation();
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }

    /**
     *
     * 初始化3D渲染器
     */

    private initThree(): void {

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(width, height);
        this.container.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0xFFFFFF, 1.0);

    }

    /**
     * 初始化照相机
     */
    private initCamera(): void {
        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 1, 10000);
        const camera = this.camera;
        camera.position.x = 0;
        camera.position.y = 1000;
        camera.position.z = 0;
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        camera.lookAt(0, 0, 0);
    }

    private initScene(): void {

    }

    private initLight(): void {
        let light
        light = new THREE.AmbientLight(0xFF0000);
        light.position.set(100, 100, 200);
        this.scene.add(light);
        light = new THREE.PointLight(0x00FF00);
        light.position.set(0, 0,300);
        this.scene.add(light);
    }

    private initObject(): void {

        const geometry = new THREE.CylinderGeometry(100, 150, 400);
        const material = new THREE.MeshLambertMaterial({color: 0xFFFF00});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 0);
        this.scene.add(mesh);
    }

    private animation(): void {
        if (this.camera) {
            this.camera.position.x = this.camera.position.x - 1;
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animation.bind(this));
        this.stats.update();
    }

    /**
     * 初始化性能监视器
     */
    private initStates():void {
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        this.container.appendChild(this.stats.domElement);
    }


}