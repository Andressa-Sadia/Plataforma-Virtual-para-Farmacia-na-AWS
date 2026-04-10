document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('featuredProducts');
  if (!grid) return;
  const destaque = produtos.filter(p => p.estoque).slice(0, 4);
  grid.innerHTML = destaque.map(renderProdutoCard).join('');
});
