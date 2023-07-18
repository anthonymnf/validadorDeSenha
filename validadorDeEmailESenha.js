// No minimo o email deve ter a seguinte estrutura: zz@zz.zz
function validadorDeEmail(email) {
  if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/gm)) {
    const err = new Error("Email inválido");
    err.input = "email";
    throw err;
  }
}
// No minimo a senha deve possuir: - Pelo menos uma letra minúscula.- Pelo menos uma letra maiúscula.- Pelo menos um número- Pelo menos um caractere especial.- Pelo menos 8 caracteres.
function validadorDeSenha(password) {
  if (
    password.length < 8 ||
    !password.match(/[a - z]/) ||
    !password.match(/[A - Z]/) ||
    !password.match(/[0 - 9]/) ||
    !password.match(/[^a-zA-Z0-9\s]/) //O ^ dentro dos colchetes nega essa regra, portanto essa regra vai servir para encontrar caracteres especiais
  ) {
    const err = new Error("Senha inválida");
    err.input = "password";

    throw err;
  }
}

function resetFormStyles() {
  Object.entries(userInputs).forEach(([key, value]) => {
    value.classList.remove("success", "error");
    document.querySelector(`#${key}-error`).textContent = "";
  });
}

const userInputs = {};
userInputs.name = document.getElementById("name");
userInputs.email = document.getElementById("email");
userInputs.password = document.getElementById("password");

const form = document.querySelector("form");
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  resetFormStyles();
  try {
    userInputs.name.classList.add("success");
    validadorDeEmail(userInputs.email.value);
    userInputs.email.classList.add("success");
    validadorDeSenha(userInputs.password.value);
    userInputs.password.classList.add("success");
  } catch (err) {
    userInputs[err.input].classList.add("error");
    document.querySelector(`#${err.input}-error`).textContent = err.message;
  }
});
