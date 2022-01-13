const scene = new THREE.Scene();
const clock = new THREE.Clock();
scene.background = new THREE.Color(0xc7d6ed);
// scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#background')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);

// const geometry = new THREE.IcosahedronGeometry(THREE.MathUtils.randFloatSpread(5), 0);
// const material = new THREE.MeshPhongMaterial({ color: 0x049ef4, specular: 0x555555, shininess: 30 });
// const diamond = new THREE.Mesh(geometry, material); // actual object
// scene.add(diamond);

const light = new THREE.SpotLight(0xffffff);
light.position.set(10, 10, 10)
const light2 = new THREE.SpotLight(0xffffff);
light2.position.set(-10, -10, -10)
scene.add(light, light2);

// const lightHelper = new THREE.SpotLightHelper(light, light2)
// scene.add(lightHelper)

// const gridHelper = new THREE.GridHelper(100, 100)
// scene.add(gridHelper)

const geos = [];

function addDiamonds() {
    const geometry = new THREE.OctahedronGeometry(THREE.MathUtils.randFloatSpread(2, 10), 0);
    const material = new THREE.MeshPhongMaterial({ color: 0x049ef4, specular: 0x555555, shininess: 30, transparent: true, opacity: 0.6 });
    const diamond = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50))

    diamond.position.set(x, y, z)
    scene.add(diamond)
    geos.push(diamond)
}

function addDodes() {
    const geometry = new THREE.DodecahedronGeometry(THREE.MathUtils.randFloatSpread(2, 10), 0);
    const material = new THREE.MeshPhongMaterial({ color: 0xf4a804, specular: 0x555555, shininess: 30, transparent: true, opacity: 0.6 });
    const dode = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50))

    dode.position.set(x, y, z)
    scene.add(dode)
    geos.push(dode)
}

Array(150).fill().forEach(addDiamonds)
Array(150).fill().forEach(addDodes)

var startColor1 = new THREE.Color(0x049ef4);
var startColor2 = new THREE.Color(0xf4a804)
var endColor1 = new THREE.Color(0xffffff);
var endColor2 = new THREE.Color(0xffffff)

function animate() {
    requestAnimationFrame(animate);
    camera.rotation.x += 0.002
    camera.rotation.y += 0.001
    camera.rotation.z -= 0.002
    geos.forEach((child) => {
        child.rotation.x += child.position.x / 1000
        child.rotation.y += child.position.y / 1000
        child.rotation.z += child.position.z / 1000
        let t = clock.getElapsedTime();
        let s = Math.sin(t * 2.0) * 0.5;
        if (child['geometry']['type'] == 'OctahedronGeometry') {
            child.material.color.copy(startColor1).lerpHSL(endColor1, s);
        }
        else {
            child.material.color.copy(startColor2).lerpHSL(endColor2, s);
        }

    })
    renderer.render(scene, camera)
}

animate();


