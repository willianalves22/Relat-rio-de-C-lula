document.getElementById("celula-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const button = form.querySelector("button");

  // Desativa o botão e mostra "Enviando..."
  button.disabled = true;
  button.textContent = "Enviando...";

  // Coleta os dados do formulário
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    // Envia os dados para o Apps Script (Web App)
    const response = await fetch("https://script.google.com/macros/s/AKfycbxEeGj4-pzQh29zAozKgs3Izp3G3Ww_K3zY22uZO9dTf5c4qNL42gvWGu2o4xclO8SM/exec", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Se a resposta for OK, mostra mensagem e reseta o formulário
    if (response.ok) {
      document.getElementById("mensagem-sucesso").classList.remove("oculto");
      form.reset();

      // Aguarda 2,5 segundos e recarrega a página
      setTimeout(() => {
        location.reload();
      }, 2500);
    } else {
      alert("Erro ao enviar. Tente novamente.");
    }

  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Erro na conexão. Verifique sua internet.");
  } finally {
    button.disabled = false;
    button.textContent = "Enviar";
  }
});
