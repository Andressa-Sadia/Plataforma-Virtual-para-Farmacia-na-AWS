let catAtiva = 'todos';
let busca = '';
let ordem = 'default';
let apenasEstoque = false;

function filtrarEOrdenar() {
  let lista = [...produtos];
  if (catAtiva !== 'todos') lista = lista.filter(p => p.categoria === catAtiva);
  if (busca) lista = lista.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));
  if (apenasEstoque) lista = lista.filter(p => p.estoque);
  if (ordem === 'preco-asc') lista.sort((a, b) => a.preco - b.preco);
  else if (ordem === 'preco-desc') lista.sort((a, b) => b.preco - a.preco);
  else if (ordem === 'nome') lista.sort((a, b) => a.nome.localeCompare(b.nome));
  return lista;
}

function renderProdutos() {
  const grid = document.getElementById('produtosGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultCount');
  const lista = filtrarEOrdenar();
  if (!lista.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    count.textContent = '';
  } else {
    empty.style.display = 'none';
    grid.innerHTML = lista.map(renderProdutoCard).join('');
    count.textContent = `${lista.length} produto${lista.length !== 1 ? 's' : ''} encontrado${lista.length !== 1 ? 's' : ''}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Verificar parâmetro de categoria na URL
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    catAtiva = cat;
    document.querySelectorAll('.filtro-opt').forEach(el => {
      el.classList.toggle('active', el.dataset.cat === cat);
    });
  }

  renderProdutos();

  // Filtro categorias
  document.querySelectorAll('.filtro-opt').forEach(el => {
    el.addEventListener('click', () => {
      catAtiva = el.dataset.cat;
      document.querySelectorAll('.filtro-opt').forEach(o => o.classList.remove('active'));
      el.classList.add('active');
      renderProdutos();
    });
  });

  // Busca
  document.getElementById('searchInput').addEventListener('input', e => {
    busca = e.target.value;
    renderProdutos();
  });

  // Ordenação
  document.getElementById('orderSelect').addEventListener('change', e => {
    ordem = e.target.value;
    renderProdutos();
  });

  // Apenas estoque
  document.getElementById('apenasEstoque').addEventListener('change', e => {
    apenasEstoque = e.target.checked;
    renderProdutos();
  });
});
