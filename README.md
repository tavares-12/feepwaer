# FeePwear — Loja de Moda Esportiva

Aplicativo web profissional de e-commerce de moda esportiva.

**Categorias disponíveis:** somente **Camisetas**, **Calças** e **Tênis**.

## Como rodar no GitHub Codespaces

1. Abra o Codespace do repositório
2. No terminal:
   ```bash
   npx serve .
   ```
   ou simplesmente abra o arquivo `index.html` com Live Preview / Simple Browser.

## Como rodar localmente

```bash
npx serve .
```

ou abra o `index.html` direto no navegador.

## Funcionalidades

- Página inicial com hero, destaques e categorias
- Catálogo com filtro por categoria (Camisetas / Calças / Tênis)
- Página de produto com seleção de tamanho e quantidade
- Carrinho de compras completo
- Checkout com formulário
- Ao finalizar o pedido → botões para enviar mensagem no WhatsApp (acompanhar pedido, tirar dúvida, etc.)
- Login de cliente (e-mail ou botão Google simulado)
- Área do Desenvolvedor (senha: **1111**) para ver todos os pedidos
- Design moderno, responsivo e profissional
- Dados salvos em localStorage (banco de dados no lado do cliente)

## Configurações importantes

Abra o arquivo `js/app.js` e altere:

```js
const WHATSAPP_NUMBER = "5511999999999"; // coloque seu número com DDI + DDD
```

## Logo e fotos reais

Assim que você enviar a logo e o PDF (ou as fotos do Drive), eu atualizo os arquivos de imagem.

---
Desenvolvido para o repositório **feepwaer**
