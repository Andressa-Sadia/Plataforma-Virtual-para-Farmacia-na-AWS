# 💊 FarmaVida — Plataforma Virtual de Farmácia na AWS

Plataforma de e-commerce farmacêutico desenvolvida para demonstrar a criação de uma aplicação web completa utilizando a infraestrutura da **Amazon Web Services (AWS)**.

## 🎯 Objetivo

Conceber e projetar uma plataforma virtual para uma farmácia fictícia, enfrentando desafios semelhantes aos encontrados em projetos reais de computação em nuvem. O projeto aplica conceitos teóricos em um cenário prático e dinâmico, servindo como porta de entrada para o mundo da AWS.

## 🌐 Páginas da Aplicação

| Página | Descrição |
|--------|-----------|
| `index.html` | Home com hero, categorias e produtos em destaque |
| `pages/produtos.html` | Catálogo com filtros, busca e ordenação |
| `pages/carrinho.html` | Carrinho de compras com cálculo de frete |
| `pages/login.html` | Autenticação do usuário |
| `pages/sobre.html` | Sobre o projeto e **arquitetura AWS** |
| `pages/contato.html` | Formulário de contato |

## 🧩 Funcionalidades

- Catálogo de produtos com 12 itens em 6 categorias
- Filtro por categoria, busca por nome e ordenação por preço
- Carrinho de compras com persistência via `localStorage`
- Cálculo automático de frete (grátis acima de R$ 150)
- Formulário de contato com validação
- Tela de login com feedback visual
- Navbar responsiva com menu mobile
- Notificações de ação (toast)
- Layout totalmente responsivo (mobile-first)

## ☁️ Arquitetura AWS

| Serviço | Função |
|---------|--------|
| **Amazon EC2** | Servidores web com Auto Scaling (t3.medium) |
| **Amazon S3** | Armazenamento de assets estáticos e backups |
| **Amazon RDS** | Banco de dados MySQL 8.0 Multi-AZ |
| **CloudFront** | CDN para distribuição global de conteúdo |
| **Route 53** | DNS gerenciado com latency routing |
| **ALB** | Application Load Balancer com SSL/TLS |
| **AWS WAF** | Proteção contra ataques web e DDoS |
| **AWS Shield** | Proteção contra DDoS avançado |
| **Amazon SES** | E-mails transacionais (pedido, senha) |
| **CloudWatch** | Monitoramento, logs e alarmes |

### Fluxo de requisição

```
Usuário → Route 53 → CloudFront → AWS WAF → ALB → EC2 → RDS
                                                   ↓
                                              S3 / SES / CloudWatch
```

## 🛠️ Tecnologias utilizadas

- **HTML5** — Estrutura semântica
- **CSS3** — Variáveis CSS, Grid, Flexbox, animações
- **JavaScript** — Manipulação do DOM, localStorage, filtros dinâmicos
- **Google Fonts** — DM Serif Display + DM Sans

## 📁 Estrutura do Projeto

```
farmacia-aws/
├── index.html              # Página inicial
├── css/
│   ├── main.css            # Estilos globais, componentes, navbar, footer
│   ├── home.css            # Estilos específicos da home
│   └── produtos.css        # Estilos da página de produtos
├── js/
│   ├── main.js             # Dados dos produtos, carrinho, funções globais
│   ├── home.js             # Lógica da home
│   └── produtos.js         # Filtros e listagem de produtos
└── pages/
    ├── produtos.html       # Catálogo de produtos
    ├── carrinho.html       # Carrinho de compras
    ├── login.html          # Login do usuário
    ├── sobre.html          # Sobre + arquitetura AWS
    └── contato.html        # Formulário de contato
```

## 🚀 Como rodar o projeto

Por ser um projeto em HTML/CSS/JS puro, basta abrir o arquivo no navegador:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/farmacia-aws.git
cd farmacia-aws

# Opção 1 — Abrir direto no navegador
open index.html

# Opção 2 — Usar um servidor local (recomendado)
npx serve .
# ou
python3 -m http.server 3000
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📈 Diferenciais do projeto

- Arquitetura AWS completa documentada com fluxo de requisição
- Carrinho funcional com persistência entre páginas via `localStorage`
- Filtros dinâmicos sem recarregamento de página
- Design responsivo com tema verde farmacêutico consistente
- Aplicação dos 5 pilares do **AWS Well-Architected Framework**:
  - ✅ Excelência operacional (CloudWatch)
  - ✅ Segurança (WAF, Shield, IAM)
  - ✅ Confiabilidade (Multi-AZ, Auto Scaling)
  - ✅ Eficiência de performance (CloudFront, ALB)
  - ✅ Otimização de custos (Auto Scaling, S3 lifecycle)

## 🚀 Possíveis melhorias

- Integração real com AWS Cognito para autenticação
- Backend com AWS Lambda + API Gateway (serverless)
- Banco de dados DynamoDB para catálogo de produtos
- Pagamentos com AWS Payment Cryptography
- Pipeline CI/CD com AWS CodePipeline + CodeDeploy
- Testes automatizados com AWS Device Farm

---

💡 Projeto desenvolvido com foco em aprendizado prático de computação em nuvem, simulando um cenário real de e-commerce farmacêutico na AWS.
