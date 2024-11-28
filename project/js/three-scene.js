let scene, camera, renderer, geometry, material, mesh;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    document.getElementById('hero-3d').appendChild(renderer.domElement);
    
    geometry = new THREE.TorusKnotGeometry(10, 3, 200, 32);
    material = new THREE.MeshNormalMaterial({
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    camera.position.z = 30;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
}

function animate() {
    requestAnimationFrame(animate);
    
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    mesh.rotation.z += 0.002;
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    const width = window.innerWidth;
    camera.aspect = width / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Adjust size based on screen width
    if (width <= 768) {
        renderer.setSize(width, window.innerHeight / 1);
    } else {
        renderer.setSize(width / 2, window.innerHeight);
    }
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();