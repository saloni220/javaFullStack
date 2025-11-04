// Get Elements
const count = document.getElementById("count");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");

// Initialize Counter
let counter = 0;

// Update UI Function
function updateCounter() {
  count.textContent = counter;
  count.style.color = counter > 0 ? "green" : counter < 0 ? "red" : "#333";
  count.style.transform = "scale(1.2)";
  setTimeout(() => (count.style.transform = "scale(1)"), 150);
}

// Event Listeners
increaseBtn.addEventListener("click", () => {
  counter++;
  updateCounter();
});

decreaseBtn.addEventListener("click", () => {
  counter--;
  updateCounter();
});

resetBtn.addEventListener("click", () => {
  counter = 0;
  updateCounter();
});
