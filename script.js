const joystick = document.getElementById('joystick');
const joystickTouchArea = document.getElementById('joystickTouchArea');
const cameraRig = document.getElementById('cameraRig');
const raycaster = document.getElementById('cameraRig').querySelector('a-entity[camera]');

let isJoystickActive = false;
let joystickOffset = { x: 0, y: 0 };
let isInModel = true; // Flag to track camera position

joystickTouchArea.addEventListener('mousedown', startJoystick);
joystickTouchArea.addEventListener('mouseup', stopJoystick);
joystickTouchArea.addEventListener('touchstart', startJoystick);
joystickTouchArea.addEventListener('touchend', stopJoystick);

function startJoystick(event) {
  isJoystickActive = true;
  joystick.setAttribute('visible', true);
  const touchX = event.clientX || event.touches[0].clientX;
  const touchY = event.clientY || event.touches[0].clientY;
  joystickOffset.x = touchX - joystick.offsetLeft - joystick.clientWidth / 2;
  joystickOffset.y = touchY - joystick.offsetTop - joystick.clientHeight / 2;
}

function stopJoystick() {
  isJoystickActive = false;
  joystick.setAttribute('visible', false);
  joystickOffset.x = 0;
  joystickOffset.y = 0;
}

AFRAME.registerComponent('joystick-movement', {
  tick: function () {
    if (isJoystickActive) {
      const cameraPosition = cameraRig.object3D.position;
      const movement = new THREE.Vector3(joystickOffset.x, 0, joystickOffset.y);
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
        cameraRig.object3D.position = cameraPosition.add(movement.multiplyScalar(0.05)); // Adjust movement speed as needed
      } else {
        // Rotate camera around the model
        cameraRig.object3D.rotation.y += movement.x * 0.01; // Adjust rotation speed as needed
      }
    }
  }
});

cameraRig.setAttribute('joystick-movement', {});
