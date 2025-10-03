// ATENÇÃO: VERSÃO FINAL CORRIGIDA E SINCRONIZADA COM index.html.
// CORREÇÃO CRÍTICA: Lógica de validação de data/hora corrigida para evitar o erro de Terça-feira.
// NOVO: Cálculo de preço robusto para Porte (Carro/Van/Caminhão), Ducha/Geral e Higienização de Bancos.
// ----------------------------------------------------------------------
// 1. DADOS DOS SERVIÇOS (COM CAMPO 'TIME')
// ----------------------------------------------------------------------

const servicesData = [
    { 
        id: 1, 
        name: 'Lavagem Detalhada (Carro)', 
        desc: 'Limpeza profunda externa, descontaminação da pintura, atenção especial às rodas e cera UV. O preço varia com o porte.', 
        price_pequeno: 45.00, // Preço de partida (Pequeno)
        image: 'assets/carrosel-prime_01.png', 
        category: 'carro',
        time: '90 - 120 minutos' 
    },
    { 
        id: 2, 
        name: 'Lavagem Detalhada (Moto)', 
        desc: 'Limpeza profunda da moto, acessando partes não detalhadas numa ducha simples.', 
        price_pequeno: 50.00, 
        image: 'assets/carrosel-prime_02.png',
        category: 'moto',
        time: '70 - 90 minutos' 
    },
    { 
        id: 3, 
        name: 'Limpeza Detalhada (Interna)', 
        desc: 'Limpeza minuciosa do interior, com produtos de alta qualidade para remover sujeiras pesadas. O preço varia com o porte.', 
        price_pequeno: 60.00, // Preço de partida (Pequeno)
        image: 'assets/carrosel-prime_03.png',
        category: 'carro',
        time: '90 - 120 minutos' 
    },
    { 
        id: 4, 
        name: 'Limpeza de Motor', 
        desc: 'Proporciona durabilidade às engrenagens, bom fluxo do motor e proteção de 6 meses no verniz.', 
        price_pequeno: 50.00, 
        image: 'assets/carrosel-prime_04.png',
        category: 'todos',
        time: '70 - 90 minutos' 
    },
    { 
        id: 5, 
        name: 'Higienização Completa', 
        desc: 'Proporciona um ambiente agradável, elimina bactérias e deixa o carro cheiroso.', 
        price_pequeno: 300.00, 
        image: 'assets/carrosel-prime_05.png',
        category: 'carro',
        time: '3 - 4 horas' 
    },
    {
        id: 6,
        name: 'Ducha Moto',
        desc: 'Lavagem externa para motos.',
        price_pequeno: 20.00, 
        image: 'assets/MOTO.png',
        category: 'moto',
        time: '20 - 30 minutos' 
    },
    {
        id: 8,
        name: 'Lavagem Simples (Ducha ou Geral)', 
        desc: 'Lavagem externa simples. O preço varia conforme a opção (Ducha/Geral) e o porte do veículo.',
        price_pequeno: 18.00, 
        image: 'assets/carro prime.png',
        category: 'carro',
        time: '30 - 60 minutos' 
    },
    
    // --- NOVOS SERVIÇOS AVULSOS ---
    { 
        id: 9, 
        name: 'Restauração de Farol', 
        desc: 'Restaura a transparência do farol, melhorando a iluminação e a estética do veículo.', 
        price_pequeno: 80.00, 
        image: 'assets/Restauração de Farol.jpg',
        category: 'carro',
        time: '60 - 90 minutos' 
    },
    { 
        id: 10, 
        name: 'Higienização de Assoalho', 
        desc: 'Limpeza profunda do assoalho (carpete) do veículo, removendo manchas e odores.', 
        price_pequeno: 100.00, 
        image: 'assets/limpeza de assoalho.jpg',
        category: 'carro',
        time: '60 - 90 minutos' 
    },
      { 
        id: 11, 
        name: 'Higienização de Bancos', 
        desc: 'Limpeza e higienização dos bancos. O preço varia pela quantidade de bancos.', 
        price_pequeno: 200.00, 
        image: 'assets/logoprime.png',
        category: 'carro',
        time: '90 - 180 minutos' 
    },
    { 
        id: 12, 
        name: 'Higienização de Teto', 
        desc: 'Limpeza e remoção de manchas e sujeira do revestimento do teto interno do veículo.', 
        price_pequeno: 70.00, 
        image: 'assets/logoprime.png',
        category: 'carro',
        time: '60 - 90 minutos' 
    },

    // --- NOVOS PACOTES (PROMOÇÃO) ---
    { 
        id: 101, 
        name: 'Lavagem Detalhada + Motor (PACOTE)', 
        desc: 'Lavagem detalhada externa e limpeza do motor. Preço especial de pacote!', 
        price_pequeno: 80.00, // Preço Promocional
        price_original: 95.00, // Soma dos serviços avulsos (45 + 50)
        image: 'assets/ExternoMotor.jpg', 
        category: 'pacote', 
        time: '120 - 150 minutos' 
    },
    { 
        id: 102, 
        name: 'Limpeza Detalhada + Motor (PACOTE)', 
        desc: 'Limpeza detalhada interna e limpeza do motor. Preço especial de pacote!', 
        price_pequeno: 100.00, // Preço Promocional
        price_original: 110.00, // Soma dos serviços avulsos (60 + 50)
        image: 'assets/InteriorMotor.jpg',
        category: 'pacote', 
        time: '120 - 150 minutos' 
    },
];

// IDs dos serviços que exigem a seleção do porte do veículo
const SERVICES_WITH_PORTE = [1, 3, 8]; 
// IDs dos serviços que exigem a seleção de Bancos
const SERVICES_WITH_BANCOS = [11];

// ----------------------------------------------------------------------
// 2. DADOS E VARIÁVEIS PARA CUPOM E CONTROLE
// ----------------------------------------------------------------------

// Cupom ativo da semana - ATUALIZE ESTES DADOS SEMANALMENTE
const ACTIVE_COUPON = {
    code: 'NOGRAU', // Código para validação (case insensitive)
    discountPercent: 10, // Porcentagem de desconto (ex: 10)
    name: 'No Grau' // Nome amigável
};

const servicesList = document.getElementById('servicesList');
const selectedName = document.getElementById('selectedName');
const selectedPrice = document.getElementById('selectedPrice');
const bookBtn = document.getElementById('fixedBookBtn'); 
const clearBtn = document.getElementById('clearBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const formServiceName = document.getElementById('formServiceName');
const formServiceImage = document.getElementById('formServiceImage'); 
const duchaGeralContainer = document.getElementById('duchaGeralContainer'); 
const vehiclePorteSelect = document.getElementById('vehiclePorte'); 
const duchaOrGeralSelect = document.getElementById('duchaOrGeral'); 
// Elementos para Higienização de Bancos
const bancosContainer = document.getElementById('bancosContainer');
const bancosFrenteSelect = document.getElementById('bancosFrente');
const bancosTrasSelect = document.getElementById('bancosTras');

const calculatedPriceDisplay = document.getElementById('calculatedPriceDisplay'); 
const couponCodeInput = document.getElementById('couponCode'); 
const discountDisplay = document.getElementById('discountDisplay'); 

const filterBtn = document.getElementById('filterBtn');
const searchInput = document.getElementById('search');
const filterModalBackdrop = document.getElementById('filterModalBackdrop');
const closeFilterModalBtn = document.getElementById('closeFilterModal');
const filterOptions = document.querySelectorAll('.filter-option');
const controlsDiv = document.querySelector('.controls');
const openMenuBtn = document.getElementById('openMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuBackdrop = document.getElementById('menuBackdrop');
const sideMenu = document.getElementById('sideMenu');

const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

let selectedService = null;
let currentFilter = 'todos';

// ----------------------------------------------------------------------
// 3. LÓGICA DO MENU LATERAL
// ----------------------------------------------------------------------
openMenuBtn.onclick = () => {
    menuBackdrop.style.display = "block";
    setTimeout(() => {
        sideMenu.classList.add('open');
    }, 10); 
};
const closeMenu = () => {
    sideMenu.classList.remove('open');
    setTimeout(() => {
        menuBackdrop.style.display = "none";
    }, 300);
};
closeMenuBtn.onclick = closeMenu;
menuBackdrop.onclick = (e) => {
    if (e.target.id === 'menuBackdrop') {
        closeMenu();
    }
};

// ----------------------------------------------------------------------
// 4. FUNÇÃO PARA LIMPAR SELEÇÃO
// ----------------------------------------------------------------------
const clearSelection = () => {
    selectedService = null;
    selectedName.textContent = 'Nenhum';
    selectedPrice.textContent = '—';
    bookBtn.disabled = true; 
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));
};
clearBtn.onclick = clearSelection;


// ----------------------------------------------------------------------
// 5. FUNÇÃO ACORDEÃO (Toggle Details - VER)
// ----------------------------------------------------------------------

function toggleDetails(event, serviceCard) {
    event.stopPropagation();
    
    const panel = serviceCard.querySelector('.service-details-panel');
    const button = serviceCard.querySelector('.details-toggle-btn');
    
    // Fecha todos os outros painéis abertos antes de abrir este
    document.querySelectorAll('.service-details-panel.open').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.details-toggle-btn.open').forEach(b => b.classList.remove('open'));
    
    panel.classList.toggle('open');
    button.classList.toggle('open');
}


// ----------------------------------------------------------------------
// 6. LÓGICA DE FILTRAGEM E RENDERIZAÇÃO
// ----------------------------------------------------------------------

function renderServices(filter = 'todos'){
    clearSelection();
    // Verifica se o servicesList existe antes de tentar limpar (para evitar erro no console)
    if (!servicesList) {
        console.error("Elemento com ID 'servicesList' não encontrado.");
        return;
    }
    servicesList.innerHTML = '';
    
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredServices = servicesData.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm) || s.desc.toLowerCase().includes(searchTerm);
        
        let matchesFilter = false;
        if (filter === 'todos') {
            matchesFilter = true;
        } else if (filter === 'pacote') {
            matchesFilter = s.category === 'pacote';
        } else {
            matchesFilter = s.category === filter || s.category === 'todos';
        }
        
        return matchesSearch && matchesFilter;
    });
    
    if (filteredServices.length === 0) {
        servicesList.innerHTML = '<p class="muted" style="text-align: center; margin-top: 20px;">Nenhum serviço encontrado. Tente outra busca ou filtro.</p>';
        return;
    }
    
    filteredServices.forEach(s=>{
        const card = document.createElement('div');
        card.className='service-card';
        
        let priceToDisplay = `R$ ${s.price_pequeno.toFixed(2).replace('.', ',')}`;
        let originalPrice = '';
        
        // LÓGICA DE PREÇO RISCADO PARA PACOTES
        if (s.category === 'pacote') {
            originalPrice = ` <span style="text-decoration: line-through; color: var(--muted); font-size: 0.9em;">R$ ${s.price_original.toFixed(2).replace('.', ',')}</span>`;
            priceToDisplay = `Pacote: R$ ${s.price_pequeno.toFixed(2).replace('.', ',')}`;
        }
        
        // APLICAR "A PARTIR DE" PARA SERVIÇOS QUE USAM PORTE (ID 1, 3, 8) E BANCOS (ID 11)
        if (SERVICES_WITH_PORTE.includes(s.id) || SERVICES_WITH_BANCOS.includes(s.id)) {
            priceToDisplay = `A partir de R$ ${s.price_pequeno.toFixed(2).replace('.', ',')}`;
        }
        
        // Estrutura do Card com a imagem, preço e botão VER
        card.innerHTML = `
            <div class="service-main-info">
                <div class="service-image-container">
                    <img src="${s.image}" alt="Imagem do Serviço ${s.name}" loading="lazy"/>
                </div>
                <div class="service-content">
                    <div class="service-header">
                        <div class="service-title">${s.name}</div>
                        <button class="details-toggle-btn" data-service-id="${s.id}">
                            <span class="arrow-icon">▼</span> VER
                        </button>
                    </div>
                    <div class="price">${priceToDisplay}${originalPrice}</div>
                </div>
            </div>
            <div class="service-details-panel">
                <p><strong>Descrição:</strong> ${s.desc}</p>
                <p><strong>Tempo Médio de Execução:</strong> ${s.time}</p>
            </div>
            `;
            
        // Adiciona o evento de seleção do serviço
        card.onclick=(event)=>selectService(s, event); 

        // Adiciona o evento de toggle (Acordeão)
        const detailsBtn = card.querySelector('.details-toggle-btn');
        detailsBtn.onclick = (event) => toggleDetails(event, card);

        servicesList.appendChild(card);
    });
    
    const filterNames = {
        'todos': 'Pesquisar serviço (Todos)',
        'carro': 'Pesquisar serviço (Carro/Pacote)', 
        'moto': 'Pesquisar serviço (Moto)',
        'pacote': 'Pesquisar serviço (Pacotes)'
    };
    searchInput.placeholder = filterNames[filter] || filterNames['todos'];
}

// Listener para a busca em tempo real
searchInput.addEventListener('input', () => {
    renderServices(currentFilter);
});

// LÓGICA DO MODAL DE FILTROS
filterBtn.onclick = () => {
    filterModalBackdrop.style.display = "flex";
};
controlsDiv.onclick = (e) => {
    if (e.target.id === 'search' || e.target.closest('.search')) {
        filterModalBackdrop.style.display = "flex";
    }
}
closeFilterModalBtn.onclick = () => {
    filterModalBackdrop.style.display = "none";
};
filterOptions.forEach(option => {
    option.onclick = (e) => {
        const newFilter = e.target.getAttribute('data-category');
        filterOptions.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = newFilter;
        renderServices(newFilter); 
        filterModalBackdrop.style.display = "none";
    }
});


// ----------------------------------------------------------------------
// 7. FUNÇÕES DE VALIDAÇÃO DE DATA E HORA (CORRIGIDA)
// ----------------------------------------------------------------------
const MIN_HOUR = 9;  // 09:00
const MAX_HOUR = 19; // 19:00

function validateDateAndTime() {
    // 1. Validação de Data (Bloqueio de Terça-feira e Data Passada)
    if (dateInput.value) {
        // Pega a data selecionada no input e força a interpretação correta do fuso (00:00:00 local)
        const selectedDate = new Date(dateInput.value + 'T00:00:00'); 

        // Bloquear Terças-feiras (getDay(): 0=Dom, 1=Seg, 2=Ter, ...)
        if (selectedDate.getDay() === 2) { 
            alert('Não abrimos às Terças-feiras. Por favor, selecione outro dia.');
            dateInput.value = '';
            return false;
        }

        // Bloquear datas passadas (compara com a data de hoje sem a hora)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Zera a hora de hoje
        
        // Zera a hora da data selecionada para comparação
        const selectedDayOnly = new Date(dateInput.value + 'T00:00:00'); 
        selectedDayOnly.setHours(0, 0, 0, 0); 
        
        if (selectedDayOnly < today) {
            alert('Você não pode agendar em datas passadas.');
            dateInput.value = ''; 
            return false;
        }
    }
    
    // 2. Validação de Hora (Bloqueio de Horário Fora do Intervalo)
    if (timeInput.value) {
        const selectedHour = parseInt(timeInput.value.split(':')[0], 10);
        
        if (selectedHour < MIN_HOUR || selectedHour >= MAX_HOUR) {
             // >= MAX_HOUR impede o agendamento exatamente às 19:00
            alert(`O horário de agendamento deve ser entre ${MIN_HOUR}:00 e ${MAX_HOUR}:00.`);
            timeInput.value = '';
            return false;
        }
    }
    
    return true;
}


// ----------------------------------------------------------------------
// 8. FUNÇÕES DE SELEÇÃO E MODAL DE AGENDAMENTO
// ----------------------------------------------------------------------

function selectService(s, event){
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));
    selectedService = s;
    selectedName.textContent = s.name;
    
    let priceText = `R$ ${s.price_pequeno.toFixed(2).replace('.', ',')}`;
    
    // APLICAR "A PARTIR DE" PARA SERVIÇOS QUE USAM PORTE (ID 1, 3, 8) OU BANCOS (ID 11)
    if (SERVICES_WITH_PORTE.includes(s.id) || SERVICES_WITH_BANCOS.includes(s.id)) {
        priceText = `A partir de R$ ${s.price_pequeno.toFixed(2).replace('.', ',')}`;
    }
    
    // Adicionar preço original riscado para pacotes
    if (s.category === 'pacote') {
        const originalPriceFormatted = s.price_original.toFixed(2).replace('.', ',');
        priceText = `Pacote: R$ ${s.price_pequeno.toFixed(2).replace('.', ',')} <span style="text-decoration: line-through; color: #999; font-size: 0.8em;">R$ ${originalPriceFormatted}</span>`;
    }

    selectedPrice.innerHTML = priceText;
    bookBtn.disabled = false; 
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('selected');
    }
}

const closeModal = () => {
    modalBackdrop.style.display = "none";
    formServiceImage.style.display = 'none';
    formServiceImage.src = '';
    duchaGeralContainer.style.display = 'none';
    bancosContainer.style.display = 'none'; 
    duchaOrGeralSelect.style.display = 'none'; 
    
    // Limpa o cupom ao fechar
    couponCodeInput.value = '';
    
    // Remove os listeners de validação ao fechar
    dateInput.removeEventListener('change', validateDateAndTime);
    timeInput.removeEventListener('change', validateDateAndTime);
    timeInput.removeEventListener('input', validateDateAndTime);
    
    // Mostra o botão fixo ao fechar o modal
    bookBtn.classList.remove('hidden'); 
};

document.getElementById('closeModal').onclick = closeModal;
document.getElementById('cancelBtn').onclick = closeModal;

bookBtn.onclick=()=>{
    if(!selectedService) return;
    
    document.getElementById('bookingForm').reset();
    
    formServiceName.textContent = selectedService.name;
    if (selectedService.image) {
        formServiceImage.src = selectedService.image;
        formServiceImage.style.display = 'block';
    } else {
        formServiceImage.src = 'assets/logoprime.png'; // Usando uma imagem mais genérica do seu asset
        formServiceImage.style.display = 'block';
    }

    const needsPorte = SERVICES_WITH_PORTE.includes(selectedService.id);
    const needsDuchaGeral = selectedService.id === 8;
    const needsBancos = SERVICES_WITH_BANCOS.includes(selectedService.id); 
    
    // Reseta e oculta todos os containers de opções variáveis
    duchaGeralContainer.style.display = 'none'; 
    vehiclePorteSelect.value = ""; 
    duchaOrGeralSelect.value = "";
    
    bancosContainer.style.display = 'none';
    bancosFrenteSelect.value = "2"; 
    bancosTrasSelect.value = "3"; 

    // LÓGICA DE EXIBIÇÃO
    if (needsPorte) {
        duchaGeralContainer.style.display = 'block'; 
        if (needsDuchaGeral) {
            duchaOrGeralSelect.style.display = 'block'; 
        } else {
             duchaOrGeralSelect.style.display = 'none'; 
        }
    } 
    else if (needsBancos) {
        bancosContainer.style.display = 'block';
    }
    
    // Chamada inicial para preencher o preço
    updatePriceDisplay();
    
    // Adiciona a validação de horário
    const todayISO = new Date().toISOString().split('T')[0];
    dateInput.min = todayISO;
    timeInput.min = `${String(MIN_HOUR).padStart(2, '0')}:00`;
    timeInput.max = `${String(MAX_HOUR).padStart(2, '0')}:00`;
    
    dateInput.addEventListener('change', validateDateAndTime);
    timeInput.addEventListener('change', validateDateAndTime);
    timeInput.addEventListener('input', validateDateAndTime);
    
    // Esconde o botão fixo ao abrir o modal
    bookBtn.classList.add('hidden'); 
    modalBackdrop.style.display="flex";
};


// ----------------------------------------------------------------------
// 9. FUNÇÕES DE CÁLCULO DE PREÇO POR PORTE, BANCOS E CUPOM
// ----------------------------------------------------------------------

function getPorteName(porte) {
    const names = {
        'pequeno': 'Carro Pequeno (Ex: Gol, Celta)',
        'medio': 'Carro Médio (Ex: Hilux, Compass)',
        'grande': 'Carro Grande (Ex: Sedan/SUV maiores)',
        'van-pequena': 'Van Pequena (Ex: Ducato 1ª versão)',
        'van-media': 'Van Média',
        'van-grande': 'Van Grande (Ex: Sprinter, Ducato nova)',
        'caminhao-pequeno': 'Caminhão Pequeno (Ex: HR, Bongo)',
        'caminhao-medio': 'Caminhão Médio',
        'caminhao-grande': 'Caminhão Grande'
    };
    return names[porte] || porte.toUpperCase();
}


/**
 * Retorna o preço base do serviço como um NÚMERO (sem formatação).
 */
function getBasePrice(serviceId, porte = null, subServiceOption = null, bancosFrente = null, bancosTras = null) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return null;

    const isSimpleWash = serviceId === 8;
    const isDetailedWashOrInternal = serviceId === 1 || serviceId === 3;
    const isBancosHigienization = serviceId === 11;
    
    // Se o serviço é um pacote, retorna o preço promocional
    if (service.category === 'pacote') {
        return service.price_pequeno;
    }
    
    // Se o serviço não tem variação por porte/bancos
    if (!isSimpleWash && !isDetailedWashOrInternal && !isBancosHigienization) {
        return service.price_pequeno;
    }

    // LÓGICA PARA HIGIENIZAÇÃO DE BANCOS (ID 11)
    if (isBancosHigienization) {
        if (!bancosFrente || !bancosTras) return null;
        
        let priceFrente = parseFloat(bancosFrente) * 60.00; // R$ 60 por banco individual
        let priceTras = 0.00;
        
        if (parseFloat(bancosTras) === 3) {
            priceTras = 140.00; // Banco inteiro de 3 lugares
        } else {
            priceTras = parseFloat(bancosTras) * 60.00; // Bancos individuais (van/doblo)
        }
        
        return priceFrente + priceTras;
    }

    // Se o serviço tem variação por porte, mas o porte não foi selecionado
    if ((isSimpleWash || isDetailedWashOrInternal) && !porte) return null; 

    let basePrice = 0.00;
    
    // LÓGICA PARA LAVAGEM DETALHADA (ID 1)
    if (serviceId === 1) {
        switch (porte) {
            case 'pequeno': basePrice = 45.00; break;
            case 'medio': basePrice = 55.00; break;
            case 'grande': basePrice = 65.00; break;
            case 'van-pequena': basePrice = 80.00; break; 
            case 'van-media': basePrice = 95.00; break; 
            case 'van-grande': basePrice = 110.00; break; 
            case 'caminhao-pequeno': basePrice = 100.00; break; 
            case 'caminhao-medio': basePrice = 130.00; break; 
            case 'caminhao-grande': basePrice = 160.00; break; 
            default: basePrice = 0.00;
        }
        return basePrice > 0 ? basePrice : null;
    }

    // LÓGICA PARA LIMPEZA DETALHADA INTERNA (ID 3)
    if (serviceId === 3) {
        switch (porte) {
            case 'pequeno': basePrice = 60.00; break;
            case 'medio': basePrice = 75.00; break;
            case 'grande': basePrice = 90.00; break;
            case 'van-pequena': basePrice = 110.00; break; 
            case 'van-media': basePrice = 130.00; break; 
            case 'van-grande': basePrice = 150.00; break; 
            case 'caminhao-pequeno': basePrice = 130.00; break; 
            case 'caminhao-medio': basePrice = 180.00; break; 
            case 'caminhao-grande': basePrice = 230.00; break; 
            default: basePrice = 0.00;
        }
        return basePrice > 0 ? basePrice : null;
    }

    // LÓGICA Específica para Lavagem Simples (Serviço ID 8)
    if (isSimpleWash) {
        if (!subServiceOption) return null;

        if (subServiceOption === 'ducha') {
            switch (porte) {
                case 'pequeno': basePrice = 18.00; break;
                case 'medio': basePrice = 22.00; break;
                case 'grande': basePrice = 28.00; break;
                case 'van-pequena': basePrice = 25.00; break;
                case 'van-media': basePrice = 30.00; break;
                case 'van-grande': basePrice = 35.00; break;
                case 'caminhao-pequeno': basePrice = 30.00; break;
                case 'caminhao-medio': basePrice = 50.00; break;
                case 'caminhao-grande': basePrice = 70.00; break;
                default: basePrice = 0.00;
            }
        } else if (subServiceOption === 'geral') {
            switch (porte) {
                case 'pequeno': basePrice = 35.00; break;
                case 'medio': basePrice = 40.00; break;
                case 'grande': basePrice = 50.00; break;
                case 'van-pequena': basePrice = 50.00; break;
                case 'van-media': basePrice = 60.00; break;
                case 'van-grande': basePrice = 70.00; break;
                case 'caminhao-pequeno': basePrice = 50.00; break;
                case 'caminhao-medio': basePrice = 80.00; break;
                case 'caminhao-grande': basePrice = 120.00; break;
                default: basePrice = 0.00;
            }
        }
        
        return basePrice > 0 ? basePrice : null;
    }
    
    return null; 
}

/**
 * Funcao principal para atualizar o display de preço no modal, incluindo cupom.
 */
function updatePriceDisplay() {
    if (!selectedService) return;
    
    const needsPorte = SERVICES_WITH_PORTE.includes(selectedService.id);
    const needsDuchaGeral = selectedService.id === 8;
    const needsBancos = SERVICES_WITH_BANCOS.includes(selectedService.id); 

    // 1. Coleta opções para cálculo do Preço Base
    let porte = needsPorte ? vehiclePorteSelect.value : null;
    let subServiceOption = needsDuchaGeral ? duchaOrGeralSelect.value : null;
    let bancosFrente = needsBancos ? bancosFrenteSelect.value : null;
    let bancosTras = needsBancos ? bancosTrasSelect.value : null;
    
    // Verifica se a seleção está incompleta
    if ((needsPorte && (!porte || (needsDuchaGeral && !subServiceOption))) || (needsBancos && (!bancosFrente || !bancosTras))) {
        let alertMessage = '';
        if (needsDuchaGeral) alertMessage = `⚠️ Selecione o Porte e a Opção (Ducha/Geral)`;
        else if (needsPorte) alertMessage = `⚠️ Selecione o Porte do Veículo`;
        else if (needsBancos) alertMessage = `⚠️ Selecione a Quantidade de Bancos`;
        
        calculatedPriceDisplay.textContent = alertMessage;
        discountDisplay.innerHTML = '';
        couponCodeInput.setAttribute('data-final-price', 'NaN');
        return;
    }
    
    // 2. Calcula o Preço Base (NUMÉRICO)
    let basePrice = getBasePrice(selectedService.id, porte, subServiceOption, bancosFrente, bancosTras);
    
    if (basePrice === null) basePrice = selectedService.price_pequeno;
    
    // 3. Lógica do Cupom
    const enteredCoupon = couponCodeInput.value.trim().toUpperCase();
    let finalPrice = basePrice;
    let discountAmount = 0;
    let discountApplied = false;
    
    // NÃO APLICA CUPOM EM PACOTES
    if (selectedService.category !== 'pacote' && enteredCoupon === ACTIVE_COUPON.code) {
        discountAmount = basePrice * (ACTIVE_COUPON.discountPercent / 100);
        finalPrice = basePrice - discountAmount;
        discountApplied = true;
    }
    
    // 4. Atualiza os displays
    const basePriceFormatted = basePrice.toFixed(2).replace('.', ',');
    const finalPriceFormatted = finalPrice.toFixed(2).replace('.', ',');
    const discountAmountFormatted = discountAmount.toFixed(2).replace('.', ',');
    
    // Texto do preço base (Riscado ou não)
    let priceStrikeText = `Preço Base: <span style="text-decoration: ${discountApplied ? 'line-through' : 'none'}; color: ${discountApplied ? 'var(--muted)' : 'var(--primary)'};">R$ ${basePriceFormatted}</span>`;
    
    if (selectedService.category === 'pacote') {
        const originalPriceFormatted = selectedService.price_original.toFixed(2).replace('.', ',');
        priceStrikeText = `Preço Avulso: <span style="text-decoration: line-through; color: var(--muted); font-weight: 400;">R$ ${originalPriceFormatted}</span>`;
    }
    
    calculatedPriceDisplay.innerHTML = priceStrikeText;
    
    if (discountApplied) {
        discountDisplay.innerHTML = `
            <div class="discount-applied">
                🎉 Cupom *${ACTIVE_COUPON.code}* aplicado! -R$ ${discountAmountFormatted} (${ACTIVE_COUPON.discountPercent}%)
            </div>
            <div class="final-price-value">
                Preço Final: R$ ${finalPriceFormatted}
            </div>
        `;
    } else if (selectedService.category === 'pacote') {
         discountDisplay.innerHTML = `
            <div class="discount-applied" style="color: var(--primary);">
                ⭐ PROMOÇÃO DE PACOTE!
            </div>
            <div class="final-price-value">
                Preço Final: R$ ${finalPriceFormatted}
            </div>
        `;
    } else if (enteredCoupon && enteredCoupon !== ACTIVE_COUPON.code) {
        discountDisplay.innerHTML = `
            <div class="coupon-error">
                ❌ Cupom "${enteredCoupon}" inválido.
            </div>
            <div class="final-price-value">
                Preço Final: R$ ${basePriceFormatted}
            </div>
        `;
    } else {
        discountDisplay.innerHTML = `
            <div class="final-price-value">
                Preço Final: R$ ${basePriceFormatted}
            </div>
        `;
    }
    
    // 5. Armazena o preço final e status do desconto (para o WhatsApp)
    couponCodeInput.setAttribute('data-final-price', finalPrice.toFixed(2));
    couponCodeInput.setAttribute('data-discount-applied', discountApplied ? 'true' : 'false');
    couponCodeInput.setAttribute('data-base-price', basePrice.toFixed(2));
}

// Adiciona listeners para os selects de preço dinâmico
bancosFrenteSelect.addEventListener('change', updatePriceDisplay);
bancosTrasSelect.addEventListener('change', updatePriceDisplay);
vehiclePorteSelect.addEventListener('change', updatePriceDisplay);
duchaOrGeralSelect.addEventListener('change', updatePriceDisplay);
couponCodeInput.addEventListener('input', updatePriceDisplay);


// ----------------------------------------------------------------------
// 10. FUNÇÕES DE CONTROLE DE CUPOM (Validação e Limitação)
// ----------------------------------------------------------------------

/**
 * Verifica se o número de telefone está apto a usar o cupom (limite de 7 dias).
 */
function canUseCoupon(phone) {
    const usageHistoryJSON = localStorage.getItem('couponUsage');
    let usageHistory = usageHistoryJSON ? JSON.parse(usageHistoryJSON) : {};
    
    if (usageHistory[phone]) {
        const lastUsedTimestamp = usageHistory[phone];
        const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        const now = new Date().getTime();
        
        if (now - lastUsedTimestamp < oneWeekInMilliseconds) {
            return false; // Bloqueado
        }
    }
    return true; // Pode usar
}

/**
 * Registra o uso do cupom para o telefone.
 */
function registerCouponUse(phone) {
    const usageHistoryJSON = localStorage.getItem('couponUsage');
    let usageHistory = usageHistoryJSON ? JSON.parse(usageHistoryJSON) : {};
    
    usageHistory[phone] = new Date().getTime();
    
    localStorage.setItem('couponUsage', JSON.stringify(usageHistory));
}


// ----------------------------------------------------------------------
// 11. SUBMISSÃO DO FORMULÁRIO
// ----------------------------------------------------------------------

document.getElementById('bookingForm').onsubmit = (e) => {
    e.preventDefault();
    
    if (!validateDateAndTime()) {
        return;
    }
    
    const whatsappNumber = '5521997759751'; 

    const clientName = document.getElementById('clientName').value.trim();
    const rawClientPhone = document.getElementById('clientPhone').value; 
    const clientPhone = rawClientPhone.replace(/\D/g, ''); 
    const date = dateInput.value;
    const time = timeInput.value;
    
    if (!clientName || !clientPhone || clientPhone.length < 8) {
         alert("Por favor, preencha o Nome e Telefone corretamente.");
        return;
    }


    const needsPorte = SERVICES_WITH_PORTE.includes(selectedService.id);
    const needsDuchaGeral = selectedService.id === 8;
    const needsBancos = SERVICES_WITH_BANCOS.includes(selectedService.id); 
    
    let subServiceOption = null;
    let subServiceName = '';
    let vehiclePorte = null; 
    let bancosFrente = null;
    let bancosTras = null;

    if (needsPorte) {
        vehiclePorte = document.getElementById('vehiclePorte').value; 
        if (needsDuchaGeral) subServiceOption = document.getElementById('duchaOrGeral').value;
        
        if (!vehiclePorte || (needsDuchaGeral && !subServiceOption)) {
            alert('Por favor, complete todas as opções obrigatórias para calcular o preço.');
            return;
        }
        
        if (needsDuchaGeral) {
            subServiceName = document.getElementById('duchaOrGeral').options[document.getElementById('duchaOrGeral').selectedIndex].text;
        }
    }
    
    if (needsBancos) {
        bancosFrente = document.getElementById('bancosFrente').value;
        bancosTras = document.getElementById('bancosTras').value;
        
        if (!bancosFrente || !bancosTras) {
             alert('Por favor, complete todas as opções obrigatórias para calcular o preço.');
            return;
        }
    }
    
    // Garante que o preço foi calculado
    updatePriceDisplay();
    
    let finalPrice = couponCodeInput.getAttribute('data-final-price');
    const basePrice = couponCodeInput.getAttribute('data-base-price');
    let isDiscountApplied = couponCodeInput.getAttribute('data-discount-applied') === 'true';
    const isPacote = selectedService.category === 'pacote'; 

    if (!finalPrice || finalPrice === 'NaN') {
        alert('Erro no cálculo do preço. Por favor, revise a seleção de opções do serviço.');
        return;
    }
    
    // LÓGICA DE LIMITE DE USO DE CUPOM POR TELEFONE
    let couponRestrictionMessage = '';
    
    if (isDiscountApplied) {
        if (canUseCoupon(clientPhone)) {
            registerCouponUse(clientPhone); 
        } else {
            isDiscountApplied = false;
            finalPrice = basePrice;
            couponRestrictionMessage = `\n\n*⚠️ ATENÇÃO:* O cupom ${ACTIVE_COUPON.code} não foi aplicado. Este telefone usou o cupom há menos de 7 dias. O preço final será o valor base.`;
        }
    }

    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR');
    
    let message = `*✅ NOVO AGENDAMENTO PRIME!*`;
    message += `\n\n*Serviço:* ${selectedService.name}`;
    
    if (subServiceName) {
        message += `\n*Opção:* ${subServiceName}`;
    }
    
    if (vehiclePorte) {
        const porteName = getPorteName(vehiclePorte);
        message += `\n*Porte do Veículo:* ${porteName}`;
    }
    
    if (needsBancos) {
        message += `\n*Bancos Dianteiros:* ${bancosFrente} lugar(es) individual(is)`;
        message += `\n*Bancos Traseiros:* ${bancosTras} lugar(es)`;
    }

    // Adiciona informação do preço final/cupom/pacote
    if (isPacote) {
        const originalPriceFloat = selectedService.price_original;
        const finalPriceFloat = parseFloat(finalPrice);
        const discountAmount = originalPriceFloat - finalPriceFloat;
        
        const originalPriceFormatted = originalPriceFloat.toFixed(2).replace('.', ',');
        const discountAmountFormatted = discountAmount.toFixed(2).replace('.', ',');
        
        message += `\n\n*PREÇO AVULSO:* R$ ${originalPriceFormatted}`;
        message += `\n*PROMOÇÃO PACOTE:* -R$ ${discountAmountFormatted}`;
        message += `\n*PREÇO FINAL ESTIMADO:* R$ ${finalPriceFloat.toFixed(2).replace('.', ',')}`;
    } else if (isDiscountApplied) {
        const basePriceFloat = parseFloat(basePrice);
        const finalPriceFloat = parseFloat(finalPrice);
        const discountAmount = basePriceFloat - finalPriceFloat;
        
        const basePriceFormatted = basePriceFloat.toFixed(2).replace('.', ',');
        const discountAmountFormatted = discountAmount.toFixed(2).replace('.', ',');
        
        message += `\n\n*VALOR BASE:* R$ ${basePriceFormatted}`;
        message += `\n*CUPOM APLICADO:* ${ACTIVE_COUPON.name} (${ACTIVE_COUPON.discountPercent}%)`;
        message += `\n*DESCONTO:* -R$ ${discountAmountFormatted}`;
        message += `\n*PREÇO FINAL ESTIMADO:* R$ ${finalPriceFloat.toFixed(2).replace('.', ',')}`;
        message += `\n\n*Regra:* O cupom é válido por 7 dias. Seu uso está sujeito a conferência na loja.`; 
    } else {
        message += `\n*Preço Final Estimado:* R$ ${parseFloat(finalPrice).toFixed(2).replace('.', ',')}`;
        message += couponRestrictionMessage; 
    }
    
    message += `\n\n*Cliente:* ${clientName}`;
    message += `\n*Telefone:* ${rawClientPhone}`; 
    message += `\n*Data e Hora:* ${formattedDate} às ${time}`;
    message += `\n\n_Aguardo confirmação!_`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');

    closeModal();
    clearSelection();
    document.getElementById('bookingForm').reset();
};

// Inicia o carregamento dos serviços
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o input de busca não é clicável no início
    searchInput.setAttribute('readonly', true);
    renderServices(currentFilter);
});
