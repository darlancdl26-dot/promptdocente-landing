/* Mapa de URLs exportadas pelo MCP do Figma (válidas por ~7 dias) */
/* Cada chave corresponde ao atributo data-asset no HTML */
const ASSETS = {
  /* Retrato usado no depoimento */
  anaLuiza: "https://www.figma.com/api/mcp/asset/e431f800-6dd2-4345-972f-aa1f3b37aff1",
  /* Ícone do logo circular */
  svgexport11: "https://www.figma.com/api/mcp/asset/8731cb58-f296-4712-ac2f-ad832fb67446",
  /* Ícone de engrenagem no header */
  svgexport21: "https://www.figma.com/api/mcp/asset/5dab24c2-351b-4c76-a257-b4e84a1f6548",
  /* Ilustração principal do mockup */
  download1: "https://www.figma.com/api/mcp/asset/1bfdde95-5ecc-4155-acf2-029b19f8aaf2",
  /* Barra superior do mockup */
  vector: "https://www.figma.com/api/mcp/asset/40158ebb-b712-49b4-a8cb-d1d3df830d2d",
  /* Bolinha vermelha (opcional; também estilizada em CSS) */
  vector1: "https://www.figma.com/api/mcp/asset/ae0055ad-edc3-4408-a7a7-1c04f0ff546c",
  /* Bolinha amarela */
  vector2: "https://www.figma.com/api/mcp/asset/390f18a3-09c9-4b86-b266-a9c29d3bad02",
  /* Bolinha verde */
  vector3: "https://www.figma.com/api/mcp/asset/eb6b543b-a516-4e3a-9e1b-20e0339024ab",
  /* Seta em botões primários */
  svgexport111: "https://www.figma.com/api/mcp/asset/8cbf8dae-4458-4a25-942c-a015a4bc5fbe",
  /* Ícone cartão 1 */
  svgexport51: "https://www.figma.com/api/mcp/asset/5e2783af-fc0e-461b-995b-7ca5bc718bba",
  /* Ícone cartão 2 */
  svgexport121: "https://www.figma.com/api/mcp/asset/fb998f9f-af6e-4409-8452-01714b733448",
  /* Ícone cartão 3 */
  svgexport71: "https://www.figma.com/api/mcp/asset/efb642a1-ca9b-47e1-a801-639dd8e408ea",
  /* Ícone cartão 4 */
  svgexport81: "https://www.figma.com/api/mcp/asset/631d61d1-e55a-4297-ac28-e3ac63d700fa",
  /* Ilustração do módulo Questões */
  frame6: "https://www.figma.com/api/mcp/asset/c47b4d5e-ad8a-4b17-b075-9a60890d52cb",
  /* Ícone de check nas listas */
  svgexport101: "https://www.figma.com/api/mcp/asset/0dd473b2-65d8-4447-a96a-7d9c492bddfe",
  /* Setas do carrossel */
  svgexport112: "https://www.figma.com/api/mcp/asset/daddbef1-a9c5-4832-85be-b770e3b8c4aa",
  /* Ícone “+” do FAQ */
  group: "https://www.figma.com/api/mcp/asset/9634778f-6cb6-4648-bf62-64e1cae43d4d",
};

/* Depoimentos exibidos no carrossel (texto alinhado ao tom do design) */
const TESTIMONIALS = [
  {
    quote:
      "Antes eu reescrevia o pedido várias vezes. Agora consigo chegar mais rápido a um prompt que realmente conversa com a habilidade.",
    name: "Prof. Ana Luiza",
    role: "Língua Portuguesa · 3ª série",
  },
  {
    quote:
      "O fluxo guiado reduziu o tempo entre objetivo de aula e material pronto para revisar com a coordenação.",
    name: "Prof. Ricardo M.",
    role: "Matemática · 2ª série",
  },
  {
    quote:
      "Consigo manter Bloom e referência curricular no mesmo lugar sem perder o fio do planejamento.",
    name: "Profª Carla S.",
    role: "Ciências da Natureza · 1ª série",
  },
];

/* Índice do slide atual no carrossel de depoimentos */
let currentSlide = 0;

/**
 * Atribui src a todos os elementos com classe js-asset e data-asset.
 */
function initAssets() {
  /* Seleciona todos os placeholders de imagem */
  document.querySelectorAll(".js-asset").forEach(function (el) {
    /* Lê a chave do mapa ASSETS */
    const key = el.getAttribute("data-asset");
    /* Se existir URL correspondente, define o src */
    if (key && ASSETS[key]) {
      el.src = ASSETS[key];
    }
  });
}

/**
 * Renderiza o depoimento atual no DOM.
 */
function renderTestimonial(index) {
  /* Garante índice dentro do array */
  const i = ((index % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
  /* Obtém dados do item */
  const item = TESTIMONIALS[i];
  /* Referência ao parágrafo da citação */
  const quoteEl = document.getElementById("testimonial-quote");
  /* Referência ao nome */
  const nameEl = document.getElementById("testimonial-name");
  /* Referência ao papel/série */
  const roleEl = document.getElementById("testimonial-role");
  /* Preenche textos */
  if (quoteEl) quoteEl.textContent = item.quote;
  if (nameEl) nameEl.textContent = item.name;
  if (roleEl) roleEl.textContent = item.role;
  /* Atualiza estado visual dos dots */
  document.querySelectorAll(".testimonial__dot").forEach(function (dot, idx) {
    /* Marca ativo conforme índice */
    dot.classList.toggle("testimonial__dot--active", idx === i);
    /* Atualiza aria-current para leitores de tela */
    dot.setAttribute("aria-current", idx === i ? "true" : "false");
  });
  /* Guarda índice global */
  currentSlide = i;
}

/**
 * Avança ou retrocede o carrossel.
 * @param {number} delta - +1 próximo, -1 anterior
 */
function stepTestimonial(delta) {
  /* Calcula novo índice */
  renderTestimonial(currentSlide + delta);
}

/**
 * Vincula botões e teclado do carrossel.
 */
function initTestimonial() {
  /* Botão anterior */
  const prev = document.querySelector(".testimonial__arrow--prev");
  /* Botão próximo */
  const next = document.querySelector(".testimonial__arrow--next");
  /* Ao clicar anterior */
  if (prev) prev.addEventListener("click", function () { stepTestimonial(-1); });
  /* Ao clicar próximo */
  if (next) next.addEventListener("click", function () { stepTestimonial(1); });
  /* Dots */
  document.querySelectorAll(".testimonial__dot").forEach(function (dot) {
    dot.addEventListener("click", function () {
      /* Lê índice do data-slide */
      const idx = parseInt(dot.getAttribute("data-slide"), 10);
      if (!Number.isNaN(idx)) renderTestimonial(idx);
    });
  });
  /* Primeira renderização */
  renderTestimonial(0);
}

/**
 * Inicializa o acordeão do FAQ (um painel aberto por vez, opcional).
 */
function initFaq() {
  /* Seleciona todos os gatilhos */
  document.querySelectorAll(".faq__trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      /* ID do painel associado */
      const panelId = trigger.getAttribute("aria-controls");
      /* Elemento do painel */
      const panel = panelId ? document.getElementById(panelId) : null;
      /* Indica se este item já estava aberto antes do clique */
      const wasOpen = trigger.getAttribute("aria-expanded") === "true";
      /* Fecha todos os painéis (estado base) */
      document.querySelectorAll(".faq__trigger").forEach(function (t) {
        const pid = t.getAttribute("aria-controls");
        const p = pid ? document.getElementById(pid) : null;
        t.setAttribute("aria-expanded", "false");
        t.classList.remove("faq__trigger--open");
        if (p) p.hidden = true;
      });
      /* Se o clique não era no item já aberto, abre o painel correspondente */
      if (!wasOpen && panel) {
        trigger.setAttribute("aria-expanded", "true");
        trigger.classList.add("faq__trigger--open");
        panel.hidden = false;
      }
    });
  });
}

/** Mensagens exibidas ao clicar nos CTAs pretos (simulação de abertura do app) */
const FLOW_MESSAGES = {
  questoes: "Abrindo o fluxo de questões… (demo — ligue isto à sua API ou rota real depois).",
  atividades: "Abrindo o fluxo de atividades… (demo).",
  materiais: "Abrindo o fluxo de materiais… (demo).",
};

/** Tempo em ms para o toast sumir sozinho */
const TOAST_DURATION_MS = 4200;

/**
 * Mostra o toast na parte inferior da tela.
 * @param {string} message - Texto a exibir
 */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.removeAttribute("hidden");
  /* Força reflow para reiniciar a animação */
  toast.offsetHeight;
  toast.classList.add("toast--visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(function () {
    toast.classList.remove("toast--visible");
    window.setTimeout(function () {
      toast.setAttribute("hidden", "");
    }, 350);
  }, TOAST_DURATION_MS);
}

/**
 * Após clicar nos CTAs azuis “Criar minha primeira questão”, destaca o cartão #questoes ao rolar.
 */
function initScrollHighlight() {
  document.querySelectorAll("a.js-scroll-highlight").forEach(function (anchor) {
    anchor.addEventListener("click", function () {
      const href = anchor.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      window.setTimeout(function () {
        target.classList.add("module-card--highlight");
        window.setTimeout(function () {
          target.classList.remove("module-card--highlight");
        }, 1200);
      }, 450);
    });
  });
}

/**
 * Botões pretos dos módulos: exibem toast com o fluxo escolhido.
 */
function initAppFlowButtons() {
  document.querySelectorAll(".js-app-flow").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const flow = btn.getAttribute("data-flow");
      const msg = flow ? FLOW_MESSAGES[flow] : "Abrindo… (demo).";
      if (msg) showToast(msg);
    });
  });
}

/**
 * Abre/fecha o painel do botão de configurações e fecha com clique fora ou Esc.
 */
function initSettingsPopover() {
  const wrap = document.querySelector(".header__settings-wrap");
  const toggle = document.getElementById("header-settings-btn");
  const panel = document.getElementById("header-settings-popover");
  const closeBtn = document.querySelector(".header__popover-close");
  if (!wrap || !toggle || !panel) return;

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation(); /* Evita que o listener em document feche antes de alternar */
    setOpen(panel.hidden);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      setOpen(false);
    });
  }

  document.addEventListener("click", function () {
    setOpen(false);
  });

  wrap.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/**
 * Ponto de entrada quando o DOM estiver pronto.
 */
function init() {
  initAssets();
  initTestimonial();
  initFaq();
  initScrollHighlight();
  initAppFlowButtons();
  initSettingsPopover();
}

/* Executa após carregar o HTML */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
