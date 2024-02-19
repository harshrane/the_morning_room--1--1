const joystick = document.getElementById("joystick");
const buttons = joystick.querySelectorAll("button");
const cameraRig = document.getElementById("cameraRig");

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(event) {
  const direction = event.target.id;
  // Update camera movement based on clicked button (e.g., using wasd-controls)
  cameraRig.setAttribute("wasd-controls", {
    acceleration: 0.2,
    enabled: true,
    axes:
      direction === "forward"
        ? "0 0 1"
        : direction === "backward"
        ? "0 0 -1"
        : direction === "left"
        ? "-1 0 0"
        : "1 0 0",
  });
}

