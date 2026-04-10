// ===== DADOS DOS PRODUTOS =====
const produtos = [
  { id: 1, nome: 'Dipirona 500mg', categoria: 'medicamentos', emoji: '💊', preco: 8.90, desc: 'Analgésico e antitérmico. 20 comprimidos.', tag: 'Genérico', estoque: true },
  { id: 2, nome: 'Vitamina C 1000mg', categoria: 'suplementos', emoji: '🍊', preco: 34.90, desc: 'Antioxidante. 60 cápsulas efervescentes.', tag: 'Suplemento', estoque: true },
  { id: 3, nome: 'Protetor Solar FPS 50+', categoria: 'cosmeticos', emoji: '☀️', preco: 49.90, desc: 'Proteção UVA/UVB. Toque seco. 60ml.', tag: 'Cosmético', estoque: true },
  { id: 4, nome: 'Omeprazol 20mg', categoria: 'medicamentos', emoji: '💊', preco: 12.50, desc: 'Antiácido. 14 cápsulas. Trato o refluxo.', tag: 'Genérico', estoque: true },
  { id: 5, nome: 'Colágeno Hidrolisado', categoria: 'suplementos', emoji: '🌿', preco: 59.90, desc: 'Tipo I e II. 300g. Sabor neutro.', tag: 'Suplemento', estoque: true },
  { id: 6, nome: 'Termômetro Digital', categoria: 'equipamentos', emoji: '🌡️', preco: 29.90, desc: 'Medição axilar e oral. Resultado em 60s.', tag: 'Equipamento', estoque: true },
  { id: 7, nome: 'Fraldas Premium G', categoria: 'bebes', emoji: '👶', preco: 64.90, desc: 'Pacote com 60 unidades. Absorção tripla.', tag: 'Bebê', estoque: true },
  { id: 8, nome: 'Aparelho de Pressão', categoria: 'equipamentos', emoji: '🩺', preco: 189.90, desc: 'Digital automático de pulso. Memória 60 medições.', tag: 'Equipamento', estoque: false },
  { id: 9, nome: 'Ibuprofeno 400mg', categoria: 'medicamentos', emoji: '💊', preco: 15.90, desc: 'Anti-inflamatório. 20 comprimidos.', tag: 'Genérico', estoque: true },
  { id: 10, nome: 'Whey Protein 900g', categoria: 'suplementos', emoji: '💪', preco: 129.90, desc: 'Concentrado. Chocolate. 30g de proteína.', tag: 'Suplemento', estoque: true },
  { id: 11, nome: 'Shampoo Anticaspa', categoria: 'higiene', emoji: '🧴', preco: 22.90, desc: 'Ação antifúngica. Uso diário. 400ml.', tag: 'Higiene', estoque: true },
  { id: 12, nome: 'Oxímetro de Pulso', categoria: 'equipamentos', emoji: '🩺', preco: 79.90, desc: 'Mede SpO2 e frequência cardíaca.', tag: 'Equipamento', estoque: true },
];

// ===== CARRINHO =====
let carrinho = JSON.parse(localStorage.getItem('farmavida_cart') || '[]');

function salvarCarrinho() {
  localStorage.setItem('farmavida_cart', JSON.stringify(carrinho));
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const total = carrinho.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto || !produto.estoque) return;
  const existe = carrinho.find(i => i.id === id);
  if (existe) existe.qty++;
  else carrinho.push({ ...produto, qty: 1 });
  salvarCarrinho();
  mostrarNotificacao(`"${produto.nome}" adicionado ao carrinho!`);
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(i => i.id !== id);
  salvarCarrinho();
}

function atualizarQtd(id, delta) {
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removerDoCarrinho(id);
  else salvarCarrinho();
}

// ===== NOTIFICAÇÃO =====
function mostrarNotificacao(msg) {
  let notif = document.getElementById('notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notif';
    notif.style.cssText = `
      position:fixed;bottom:24px;right:24px;background:#1a6b3c;color:#fff;
      padding:12px 20px;border-radius:10px;font-size:14px;font-weight:500;
      z-index:9999;transform:translateY(80px);opacity:0;transition:all 0.3s ease;
      box-shadow:0 4px 16px rgba(0,0,0,0.2);max-width:320px;
    `;
    document.body.appendChild(notif);
  }
  notif.textContent = '✅ ' + msg;
  notif.style.transform = 'translateY(0)';
  notif.style.opacity = '1';
  setTimeout(() => {
    notif.style.transform = 'translateY(80px)';
    notif.style.opacity = '0';
  }, 2800);
}

// ===== RENDERIZAR CARD DE PRODUTO =====
function renderProdutoCard(produto) {
  return `
    <div class="product-card" onclick="window.location='pages/produto.html?id=${produto.id}'">
      <div class="product-img">${produto.emoji}</div>
      <div class="product-info">
        <div class="product-tag">${produto.tag}</div>
        <div class="product-name">${produto.nome}</div>
        <div class="product-desc">${produto.desc}</div>
        <div class="product-footer">
          <div class="product-price">
            R$ ${produto.preco.toFixed(2).replace('.', ',')}
            ${produto.estoque ? '' : '<small style="color:#dc2626">Indisponível</small>'}
          </div>
          <button class="btn-add" onclick="event.stopPropagation();adicionarAoCarrinho(${produto.id})"
            ${!produto.estoque ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>
            + Adicionar
          </button>
        </div>
      </div>
    </div>
  `;
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MENU MOBILE =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '68px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = '#fff';
      links.style.padding = '16px 24px';
      links.style.borderBottom = '1px solid var(--border)';
    });
  }
  atualizarContadorCarrinho();
});
