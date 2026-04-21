// ============================================================
// main.js — Cartão Digital Marco Aurelio
// ============================================================

// --- Configuração central ---
const CONFIG = {
  birthDate: new Date(1983, 9, 15), // 15 de outubro de 1983 — ajuste conforme necessário
};

// ============================================================
// Idade dinâmica
// ============================================================
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();
  const mesNasc = dataNascimento.getMonth();
  const diaNasc = dataNascimento.getDate();

  if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
    idade--;
  }
  return idade;
}

function atualizarIdade() {
  const el = document.getElementById("idade-atual");
  if (el) {
    const idade = calcularIdade(CONFIG.birthDate);
    el.textContent = `${idade} anos`;
  }
}

// ============================================================
// Animação de entrada com stagger
// (respeita prefers-reduced-motion)
// ============================================================
function aplicarAnimacaoEntrada() {
  const preferenceReducida = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (preferenceReducida) return;

  const card = document.querySelector(".profile-card");
  if (!card) return;

  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  });

  // Stagger nos botões de link
  const botoes = document.querySelectorAll(".link-btn");
  botoes.forEach((btn, i) => {
    btn.style.opacity = "0";
    btn.style.transform = "translateX(-12px)";
    btn.style.transition = `opacity 0.35s ease ${0.3 + i * 0.07}s, transform 0.35s ease ${0.3 + i * 0.07}s`;

    setTimeout(() => {
      btn.style.opacity = "1";
      btn.style.transform = "translateX(0)";
    }, 50);
  });
}

// ============================================================
// Animação dos modais (sem conflito com o Bootstrap)
// ============================================================
function configurarAnimacaoModais() {
  const preferenceReducida = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (preferenceReducida) return;

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("show.bs.modal", () => {
      const conteudo = modal.querySelector(".modal-content");
      if (!conteudo) return;
      conteudo.style.opacity = "0";
      conteudo.style.transform = "scale(0.92)";
      conteudo.style.transition = "opacity 0.22s ease, transform 0.22s ease";
    });

    modal.addEventListener("shown.bs.modal", () => {
      const conteudo = modal.querySelector(".modal-content");
      if (!conteudo) return;
      requestAnimationFrame(() => {
        conteudo.style.opacity = "1";
        conteudo.style.transform = "scale(1)";
      });
    });

    modal.addEventListener("hide.bs.modal", () => {
      const conteudo = modal.querySelector(".modal-content");
      if (!conteudo) return;
      conteudo.style.opacity = "0";
      conteudo.style.transform = "scale(0.92)";
    });
  });
}

// ============================================================
// Init
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  atualizarIdade();
  aplicarAnimacaoEntrada();
  configurarAnimacaoModais();
});
