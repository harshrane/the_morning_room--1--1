const joystick = document.getElementById('joystick');
const buttons = joystick.querySelectorAll('button');
const cameraRig = document.getElementById('cameraRig');
const raycaster = document.getElementById('raycaster');

let joystickOffset = { x: 0, y: 0, z: 0.1 }; // Adjust z-offset based on desired joystick position

buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

cameraRig.addEventListener('xrelementmoved', updateRaycastOrigin);

cameraRig.addEventListener('enter-vr', () => {
  joystick.style.opacity = 1;
  joystick.style.zIndex = 2; // Remove negative z-index in VR for full visibility
});

cameraRig.addEventListener('exit-vr', () => {
  joystick.style.opacity = 0;
  joystick.style.zIndex = -1; // Restore negative z-index when exiting VR
});

function handleButtonClick(event) {
  const direction = event.target.id;
  const speed = 0.2; // Adjust movement speed as needed

  switch (direction) {
    case 'forward':
      cameraRig.setAttribute('wasd-controls', { acceleration: speed, enabled: true, axes: '0 0 1' });
      break;
    case 'backward':
      cameraRig.setAttribute('wasd-controls', { acceleration: speed, enabled: true, axes: '0 0 -1' });
      break;
    case 'left':
      cameraRig.setAttribute('wasd-controls', { acceleration: speed, enabled: true, axes: '-1 0 0' });
      break;
    case 'right':
      cameraRig.setAttribute('wasd-controls', { acceleration: speed, enabled: true, axes: '1 0 0' });
      break;
  }
}

function updateRaycastOrigin() {
  const cameraPosition = cameraRig.object3D.position;
  raycaster.setAttribute('raycaster', { origin: cameraPosition.clone().add(joystickOffset) });
}
