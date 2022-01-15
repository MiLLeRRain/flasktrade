const scene = new THREE.Scene();
const clock = new THREE.Clock();
scene.background = new THREE.Color(0xc7d6ed);
// scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#background')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 12);

// const geometry = new THREE.IcosahedronGeometry(THREE.MathUtils.randFloatSpread(5), 0);
// const material = new THREE.MeshPhongMaterial({ color: 0x049ef4, specular: 0x555555, shininess: 30 });
// const diamond = new THREE.Mesh(geometry, material); // actual object
// scene.add(diamond);

const light = new THREE.SpotLight(0xffffff);
light.position.set(200, 0, 20)
const light2 = new THREE.SpotLight(0xffffff);
light2.position.set(-200, 0, -20)
scene.add(light, light2);

// const lightHelper = new THREE.SpotLightHelper(light, light2)
// scene.add(lightHelper)

// const gridHelper = new THREE.GridHelper(100, 100)
// scene.add(gridHelper)

const geos = [];
var startColor1 = new THREE.Color(0x049ef4);
var startColor2 = new THREE.Color(0xf4a804)
var endColor1 = new THREE.Color(0x049ef0);
var endColor2 = new THREE.Color(0xf4a800)

function addGeometry(shape) {
    var geometry
    var geoColor
    switch(shape) {
        case 'diamond':
            geometry = new THREE.OctahedronGeometry(THREE.MathUtils.randFloatSpread(30, 80), 0);
            geoColor = startColor1
            break;
        case 'dode':
            geometry = new THREE.DodecahedronGeometry(THREE.MathUtils.randFloatSpread(30, 80), 0);
            geoColor = startColor2
            break;
        default:
            console.log('no shape assigned')
    }
    var material = new THREE.MeshPhongMaterial({ color: geoColor, specular: 0x555555, shininess: 30, transparent: true, opacity: 1 }); //
    var obj = new THREE.Mesh(geometry, material)
    
    // var [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50))
    // obj.position.set(x, y, z)

    var [x, y, z] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(20))
    obj.position.set(x, y, z)

    scene.add(obj)
    // geos.push(obj)
    return obj
}

var diamonds = Array(30).fill().map(() => addGeometry('diamond'))
var dodes = Array(30).fill().map(() => addGeometry('dode'))

geos.push(...diamonds, ...dodes)

function animate() {
    requestAnimationFrame(animate);
    // camera.rotation.x += 0.002
    // camera.rotation.y += 0.001
    // camera.rotation.z -= 0.002
    geos.forEach((child) => {
        child.rotation.x += child.position.y / 10000
        child.rotation.y += child.position.z / 10000
        child.rotation.z += child.position.x / 10000
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


