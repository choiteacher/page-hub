(function () {
  const root = document.getElementById("apps");
  const buttons = document.querySelectorAll(".toggle button");
  const apps = window.APPS || [];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function shot(app) {
    return `<div class="shot"><img src="${esc(app.screenshot)}" alt="${esc(app.name)} 메인 화면" loading="lazy"
      onerror="this.remove()"><span class="ph">스크린샷 준비 중</span></div>`;
  }

  function render() {
    // 썸네일 보기: 사이트 수(n)에 맞춰 화면을 나눔 (열 수 = 올림(√n))
    const cols = Math.ceil(Math.sqrt(apps.length || 1));
    root.style.setProperty("--cols", cols);
    root.style.setProperty("--rows", Math.ceil(apps.length / cols));
    root.innerHTML = apps.map((a) => `
      <a class="card" href="${esc(a.url)}" target="_blank" rel="noopener">
        <h2>${esc(a.name)}</h2>
        ${shot(a)}
        <p class="summary">${esc(a.summary)}</p>
        <ul class="features">${a.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <span class="open">사이트 열기 →</span>
      </a>`).join("");
  }

  function setView(view) {
    root.className = view;
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
    try { localStorage.setItem("pagehub-view", view); } catch (e) {}
  }

  buttons.forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
  render();
  let saved = "grid";
  try { saved = localStorage.getItem("pagehub-view") || "grid"; } catch (e) {}
  setView(saved === "list" ? "list" : "grid");
})();
