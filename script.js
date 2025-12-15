/* ==========================================================================
   1. BANCO DE DADOS (LISTA DE FILMES)
   ========================================================================== */
const bancoDeFilmes = [
    { titulo: "a noite de jogos", arquivo: "a noite de jogos C.html" },
    { titulo: "a culpa é das estrelas", arquivo: "aculpa.html" },
    { titulo: "as branquelas", arquivo: "as branquelas C.html" },
    { titulo: "avatar", arquivo: "avatar.html" },
    { titulo: "batman", arquivo: "batman A.html" },
    { titulo: "blade runner", arquivo: "bladerunner2049.html" },
    { titulo: "bruxa de blair", arquivo: "bruxadeblair.html" },
    { titulo: "como se fosse a primeira vez", arquivo: "comosefosseaprimeiravez.html" },
    { titulo: "auto da compadecida", arquivo: "compadecida C.html" },
    { titulo: "cronicas de narnia", arquivo: "cronicasdenarnia.html" },
    { titulo: "diario de uma paixao", arquivo: "diariodeumapaixao.html" },
    { titulo: "2001 uma odisseia", arquivo: "doismil.html" },
    { titulo: "exorcista", arquivo: "exorcista.html" },
    { titulo: "fantasia", arquivo: "fantasia.html" },
    { titulo: "gente grande", arquivo: "gentegrandeC.html" },
    { titulo: "guerra infinita", arquivo: "guerrainfinita.html" },
    { titulo: "halloween", arquivo: "halloween.html" },
    { titulo: "harry potter", arquivo: "harrypotterpedrafilosofal.html" },
    { titulo: "interestelar", arquivo: "interestelar.html" },
    { titulo: "invocacao do mal", arquivo: "invocaçãodomal.html" },
    { titulo: "john wick", arquivo: "john wick4 A.html" },
    { titulo: "la la land", arquivo: "lalaland.html" },
    { titulo: "mad max", arquivo: "madmax.html" },
    { titulo: "matrix", arquivo: "matrix.html" },
    { titulo: "me chame pelo seu nome", arquivo: "mechamepeloseunome.html" },
    { titulo: "o resgate", arquivo: "o resgate 2 A.html" },
    { titulo: "o chamado", arquivo: "ochamado.html" },
    { titulo: "o iluminado", arquivo: "oiluminado.html" },
    { titulo: "labirinto do fauno", arquivo: "olabirintodofauno.html" },
    { titulo: "orgulho e preconceito", arquivo: "orgulhoepreconceio.html" },
    { titulo: "palm springs", arquivo: "palm springs C.html" },
    { titulo: "panico", arquivo: "panico.html" },
    { titulo: "perfeitos desconhecidos", arquivo: "perfeitos.html" },
    { titulo: "piratas do caribe", arquivo: "piratasdocaribe.html" },
    { titulo: "prisioneiro de azkaban", arquivo: "prisioneiro.html" },
    { titulo: "se beber nao case", arquivo: "sebbernksaC.html" },
    { titulo: "senhor dos aneis", arquivo: "senhordosaneis.html" },
    { titulo: "star wars", arquivo: "starwars4.html" },
    { titulo: "superbad", arquivo: "super bad C.html" },
    { titulo: "titanic", arquivo: "titanic.html" },
    { titulo: "top gun", arquivo: "top gun A.html" },
    { titulo: "tropa de elite", arquivo: "tropa de elite A.html" },
    { titulo: "truque de mestre", arquivo: "truquedemestre.html" },
    { titulo: "vingadores ultimato", arquivo: "vingadoresultimato.html" },
    { titulo: "wicked", arquivo: "wicked.html" },
    { titulo: "zootopia", arquivo: "zootopia.html" }
];

/* ==========================================================================
   2. FUNÇÕES GLOBAIS (Acessíveis via onclick no HTML)
   ========================================================================== */

// Abre o Zoom (Overlay Customizado)
window.abrirZoom = function(src) {
    const overlay = document.getElementById('posterOverlay');
    const img = document.getElementById('imgZoom');
    
    if (overlay && img) {
        img.src = src;
        overlay.classList.add('active'); 
        overlay.style.display = 'flex'; // Garante que apareça
        document.body.style.overflow = 'hidden'; // Trava a rolagem
    }
};

// Fecha o Zoom
window.fecharZoom = function() {
    const overlay = document.getElementById('posterOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Libera a rolagem
    }
};

// Botões de "Já assisti" (Olho verde)
window.toggleAction = function(element) {
    const icon = element.querySelector('i');
    // Alterna a classe de sucesso (verde)
    element.classList.toggle('text-success');
    
    // Se ficou verde, anima
    if (element.classList.contains('text-success')) {
        animarIcone(icon);
    }
};

// Botão de Favoritar (Coração/Estrela)
window.toggleFavorite = function(element) {
    const icon = element.querySelector('i');
    
    // Alterna o estado ativo
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
        icon.classList.remove('far'); // Remove contorno
        icon.classList.add('fas');    // Adiciona preenchido
        animarIcone(icon);
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
};

// Helper: Animação de "Pulo" no ícone
function animarIcone(icon) {
    icon.style.transform = 'scale(1.3)';
    setTimeout(() => { icon.style.transform = 'scale(1)'; }, 200);
}

/* ==========================================================================
   3. LÓGICA DE PESQUISA (Busca Segura)
   ========================================================================== */

function formatarTexto(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function realizarBusca() {
    const campo = document.getElementById('campoPesquisa');
    if (!campo) return; // Segurança

    const termoDigitado = formatarTexto(campo.value);

    if (termoDigitado === "") {
        alert("Por favor, digite o nome de um filme.");
        return;
    }

    const filmeEncontrado = bancoDeFilmes.find(filme => {
        return formatarTexto(filme.titulo).includes(termoDigitado);
    });

    if (filmeEncontrado) {
        window.location.href = filmeEncontrado.arquivo;
    } else {
        alert("Filme não encontrado! Tente outro nome.");
    }
}

/* ==========================================================================
   4. INICIALIZAÇÃO E EVENTOS DO DOM (O Cérebro do Site)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema iniciado. Carregando componentes...");

    // A. Carregar Cabeçalho
    fetch('cabecalho.html')
        .then(r => { if(!r.ok) throw new Error("Erro Header"); return r.text(); })
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(e => console.error(e));

    // B. Carregar Rodapé
    fetch('rodape.html')
        .then(r => { if(!r.ok) throw new Error("Erro Footer"); return r.text(); })
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(e => console.error(e));

    // C. Configurar Estrelas de Avaliação (Se existirem na página)
    const stars = document.querySelectorAll('.user-rating i');
    if (stars.length > 0) {
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                // Reseta todas para vazio
                stars.forEach(s => {
                    s.classList.remove('fas', 'text-warning');
                    s.classList.add('far');
                });
                // Preenche até a clicada
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.remove('far');
                    stars[i].classList.add('fas', 'text-warning');
                }
            });
        });
    }

    // D. Configurar Botão de Login (Página de Login)
    const btnLogin = document.getElementById("botaoLogin");
    if (btnLogin) {
        btnLogin.addEventListener("click", function(e) {
            e.preventDefault(); // Previne recarregar a página se for form
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            setTimeout(() => {
                alert("Login realizado com sucesso! (Simulação)");
                window.location.href = "perfil.html"; // Redireciona
            }, 1500);
        });
    }

    // E. Event Delegation (Ouvintes Globais para Elementos Dinâmicos)
    // Isso garante que o clique funcione mesmo que o cabeçalho carregue depois
    document.addEventListener('click', function(e) {
        
        // Botão de Pesquisa
        if(e.target && (e.target.id === 'btnPesquisar' || e.target.closest('#btnPesquisar'))){
            realizarBusca();
        }

        // Fechar Menu Mobile ao clicar em link
        if(e.target && e.target.classList.contains('nav-link') && window.innerWidth < 992) {
            const menuToggle = document.getElementById('menuNavegacao');
            if(menuToggle && menuToggle.classList.contains('show')) {
                // Usa Bootstrap API para fechar
                const bsCollapse = bootstrap.Collapse.getInstance(menuToggle);
                if(bsCollapse) bsCollapse.hide();
            }
        }
    });

    // Tecla Enter na Pesquisa
    document.addEventListener('keypress', function(e) {
        if(e.target && e.target.id === 'campoPesquisa' && e.key === 'Enter'){
            realizarBusca();
        }
    });

    // F. Configuração de Scroll Horizontal (Se houver listas com botões)
    function setupScroll(containerId, btnId) {
        const container = document.getElementById(containerId);
        const btn = document.getElementById(btnId);
        if (container && btn) {
            btn.addEventListener('click', () => {
                container.scrollBy({ left: 220, behavior: 'smooth' });
            });
        }
    }
    setupScroll('listaFavoritos', 'btnFavNext');
    setupScroll('listaAvaliados', 'btnAvalNext');
});