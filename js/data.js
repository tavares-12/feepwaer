// FeePwear - Dados dos produtos
// Somente: Camisetas, Calças e Tênis

const PRODUCTS = [
  // ===== CAMISETAS =====
  {
    id: 1,
    name: "Camiseta Dry-Fit Performance",
    category: "camisetas",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop",
    description: "Camiseta esportiva de alta performance com tecnologia dry-fit que absorve o suor rapidamente. Ideal para treinos intensos e uso diário. Tecido leve e respirável.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Branco", "Cinza"]
  },
  {
    id: 2,
    name: "Camiseta Oversized Street",
    category: "camisetas",
    price: 99.90,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=700&fit=crop",
    description: "Camiseta oversized no estilo streetwear. Caimento solto, gola canelada e estampa minimalista. Perfeita para quem busca conforto e estilo urbano.",
    sizes: ["P", "M", "G", "GG", "XG"],
    colors: ["Preto", "Branco", "Verde Militar"]
  },
  {
    id: 3,
    name: "Camiseta Regata Training",
    category: "camisetas",
    price: 69.90,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=700&fit=crop",
    description: "Regata de treino com tecido dry-fit e laterais vazadas para máxima ventilação. Ideal para musculação e atividades de alta intensidade.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Cinza", "Azul Marinho"]
  },
  {
    id: 4,
    name: "Camiseta Long Sleeve Performance",
    category: "camisetas",
    price: 109.90,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=700&fit=crop",
    description: "Manga longa com proteção UV e compressão leve. Excelente para corridas ao ar livre e treinos em clima mais frio.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Cinza Mescla"]
  },

  // ===== CALÇAS =====
  {
    id: 5,
    name: "Calça Jogger Esportiva",
    category: "calcas",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=700&fit=crop",
    description: "Jogger com punhos elásticos, bolsos laterais e tecido leve com elastano. Conforto total para treino e uso casual.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Cinza", "Verde Militar"]
  },
  {
    id: 6,
    name: "Calça Legging Compressão",
    category: "calcas",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa922c8?w=600&h=700&fit=crop",
    description: "Legging de alta compressão com tecnologia que modela o corpo e melhora a circulação. Zero transparência e ótimo suporte.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Cinza", "Azul"]
  },
  {
    id: 7,
    name: "Calça Moletom Premium",
    category: "calcas",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=700&fit=crop",
    description: "Moletom flanelado por dentro, cós elástico e ajuste perfeito. Ideal para o dia a dia e pós-treino.",
    sizes: ["P", "M", "G", "GG", "XG"],
    colors: ["Preto", "Cinza Mescla", "Bege"]
  },
  {
    id: 8,
    name: "Calça Cargo Street",
    category: "calcas",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=700&fit=crop",
    description: "Calça cargo com bolsos utilitários, tecido resistente e visual streetwear. Combina com qualquer look esportivo.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Verde Militar", "Bege"]
  },

  // ===== TÊNIS =====
  {
    id: 9,
    name: "Tênis Running Pro",
    category: "tenis",
    price: 249.90,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=700&fit=crop",
    description: "Tênis de corrida com amortecimento responsivo, solado de alta aderência e cabedal respirável. Perfeito para longas distâncias.",
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
    colors: ["Preto/Vermelho", "Branco/Preto"]
  },
  {
    id: 10,
    name: "Tênis Casual Urban",
    category: "tenis",
    price: 199.90,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=700&fit=crop",
    description: "Tênis casual de design limpo, solado confortável e visual moderno. Combina com looks do dia a dia e streetwear.",
    sizes: ["37", "38", "39", "40", "41", "42", "43"],
    colors: ["Branco", "Preto", "Cinza"]
  },
  {
    id: 11,
    name: "Tênis High Performance",
    category: "tenis",
    price: 279.90,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=700&fit=crop",
    description: "Modelo de alta performance com tecnologia de retorno de energia e estabilidade superior. Ideal para treinos intensos e competições.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Preto/Verde", "Azul/Branco"]
  },
  {
    id: 12,
    name: "Tênis Lifestyle Premium",
    category: "tenis",
    price: 229.90,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=700&fit=crop",
    description: "Tênis lifestyle com design minimalista, materiais premium e conforto excepcional para o uso diário.",
    sizes: ["37", "38", "39", "40", "41", "42", "43"],
    colors: ["Branco/Off-white", "Preto"]
  }
];

// Categorias oficiais (somente estas)
const CATEGORIES = {
  camisetas: "Camisetas",
  calcas: "Calças",
  tenis: "Tênis"
};
