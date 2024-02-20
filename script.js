const cameraRig = document.getElementById('cameraRig');

let movementSpeed = 0.1; // Adjust movement speed as needed

AFRAME.registerComponent('oculus-joystick-movement', {
  tick: function () {
    const gamepad = AFRAME.utils.getComponent(cameraRig, 'oculus-touch-controls').gamepad;
    if (gamepad) {
      const joystick = gamepad.getAxes('oculusTouchLeftThumbstick');
      const movement = new THREE.Vector3(joystick[0], 0, joystick[1]);
      movement.normalize();

      cameraRig.object3D.position = cameraRig.object3D.position.add(movement.multiplyScalar(movementSpeed));
    }
  }
});

cameraRig.setAttribute('oculus-joystick-movement', {});
