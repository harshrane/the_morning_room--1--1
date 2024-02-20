const cameraRig = document.getElementById('cameraRig');
const raycaster = document.getElementById('cameraRig').querySelector('a-entity[camera]');

let movementSpeed = 0.9; // Adjust movement speed as needed
let isInModel = true; // Flag to track camera position

AFRAME.registerComponent('oculus-joystick-movement', {
  tick: function () {
    const gamepad = AFRAME.utils.getComponent(cameraRig, 'oculus-touch-controls').gamepad;
    if (gamepad) {
      const joystick = gamepad.getAxes('oculusTouchLeftThumbstick');
      const movement = new THREE.Vector3(joystick[0], 0, joystick[1]);
      movement.normalize();

      // Check if camera is inside the model using raycast
      const intersection = raycaster.components.raycaster.getIntersection();
      if (intersection && intersection.object.el.id === 'model') {
        isInModel = true;
      } else {
        isInModel = false;
      }

      if (isInModel) {
        // Move camera within the model
        cameraRig.object3D.position = cameraRig.object3D.position.add(movement.multiplyScalar(movementSpeed));
      } else {
        // Rotate camera around the model
        cameraRig.object3D.rotation.y += movement.x * 0.01; // Adjust rotation speed as needed
      }
    }
  }
});

cameraRig.setAttribute('oculus-joystick-movement', {});
