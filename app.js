(function () {
  const root = document.getElementById("apps");
  const apps = window.APPS || [];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  root.innerHTML = apps.map((a) => `
    <article class="card">
      <h2>${esc(a.name)}</h2>
      <p class="summary">${esc(a.summary)}</p>
      <div class="body">
        <a class="shot" href="${esc(a.url)}" target="_blank" rel="noopener" aria-label="${esc(a.name)} 열기">
          <img src="${esc(a.screenshot)}" alt="${esc(a.name)} 메인 화면" loading="lazy" onerror="this.remove()">
          <span class="ph">스크린샷 준비 중</span>
        </a>
        <div class="info">
          <ul class="features">${a.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
          <a class="open" href="${esc(a.url)}" target="_blank" rel="noopener">사이트 열기 →</a>
        </div>
      </div>
    </article>`).join("");
})();
