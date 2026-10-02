const toggleBtn = document.getElementById("themeToggle");
const htmlElement = document.documentElement;
const btnText = document.getElementById("btnText");

toggleBtn.addEventListener("click", () => {
  // tema actual
  const currentTheme = htmlElement.getAttribute("data-theme");
  // Alternamos el tema
  const newTheme = currentTheme === "light" ? "dark" : "light";
  // Aplicamos el nuevo tema al HTML
  htmlElement.setAttribute("data-theme", newTheme);
    //obtiene la clase para el cambio de icono
  document.body.classList.toggle("dark-mode");
  // Actualiza el texto 
  if (document.body.classList.contains("dark-mode")) {
    btnText.textContent = "Modo claro";
  } else {
    btnText.textContent = "Modo obscuro";
  }
});
