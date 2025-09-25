// ATENÇÃO: ESTA É A VERSÃO FINAL COM AS EXTENSÕES (.png), PREÇOS, SERVIÇOS
// E A INTEGRAÇÃO COM O SEU WHATSAPP, PORTE DO VEÍCULO E OPÇÃO DUCHA/GERAL.

// ----------------------------------------------------------------------
// 1. DADOS DOS SERVIÇOS 
//    * ID 8: Serviço consolidado "Lavagem Simples (Carro)" - o preço é dinâmico.
// ----------------------------------------------------------------------

const servicesData = [
    { 
        id: 1, 
        name: 'Lavagem Detalhada (Carro)', 
        desc: 'Limpeza profunda externa, descontaminação da pintura, atenção especial às rodas e cera UV.', 
        price_pequeno: 45.00, 
        image: 'assets/carrosel-prime_01.png'
    },
    { 
        id: 2, 
        name: 'Lavagem Detalhada (Moto)', 
        desc: 'Limpeza profunda da moto, acessando partes não detalhadas numa ducha simples.', 
        price_pequeno: 50.00, 
        image: 'assets/carrosel-prime_02.png'
    },
    { 
        id: 3, 
        name: 'Limpeza Detalhada (Interna)', 
        desc: 'Limpeza minuciosa do interior, com produtos de alta qualidade para remover sujeiras pesadas.', 
        price_pequeno: 60.00, 
        image: 'assets/carrosel-prime_03.png'
    },
    { 
        id: 4, 
        name: 'Limpeza de Motor', 
        desc: 'Proporciona durabilidade às engrenagens, bom fluxo do motor e proteção de 6 meses no verniz.', 
        price_pequeno: 50.00, 
        image: 'assets/carrosel-prime_04.png'
    },
    { 
        id: 5, 
        name: 'Higienização Completa', 
        desc: 'Proporciona um ambiente agradável, elimina bactérias e deixa o carro cheiroso.', 
        price_pequeno: 300.00, 
        image: 'assets/carrosel-prime_05.png'
    },
    {
        id: 6,
        name: 'Ducha Moto',
        desc: 'Lavagem externa para motos.',
        price_pequeno: 20.00, 
        image: 'assets/MOTO.png'
    },
    {
        id: 8,
        name: 'Lavagem Simples (Carro)', // SERVIÇO CONSOLIDADO
        desc: 'Lavagem externa simples. Escolha entre Ducha ou Geral no agendamento.',
        price_pequeno: 18.00, // Preço Base (Ducha Pequeno)
        image: 'assets/carro prime.png'
    }
];

// ----------------------------------------------------------------------
// 2. FUNÇÃO DE CÁLCULO DE PREÇO POR PORTE E OPÇÃO (Ducha/Geral)
// ----------------------------------------------------------------------

function calculatePrice(serviceId, porte, subServiceOption = null) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return '—';

    let finalPrice = service.price_pequeno;

    // --- LÓGICA DE PREÇO PARA O SERVIÇO CONSOLIDADO (ID 8) ---
    if (service.id === 8) { 
        if (subServiceOption === 'ducha') {
            switch (porte) {
                case 'pequeno': finalPrice = 18.00; break;
                case 'medio': finalPrice = 22.00; break;
                case 'grande': finalPrice = 25.00; break;
                case 'van-pequena': finalPrice = 25.00; break;
                case 'van-media': finalPrice = 35.00; break;
                case 'caminhao-pequeno': finalPrice = 25.00; break;
                default: finalPrice = 18.00;
            }
        } else if (subServiceOption === 'geral') {
            switch (porte) {
                case 'pequeno': finalPrice = 35.00; break;
                case 'medio': finalPrice = 40.00; break;
                case 'grande': finalPrice = 45.00; break;
                case 'van-pequena': finalPrice = 50.00; break;
                case 'van-media': finalPrice = 70.00; break;
                case 'caminhao-pequeno': finalPrice = 50.00; break;
                default: finalPrice = 35.00;
            }
        } else {
             // Retorna o preço base da Ducha Pequeno se a opção não for selecionada no modal
            finalPrice = 18.00; 
        }
    } 
    // --- LÓGICA DE PREÇO PARA OUTROS SERVIÇOS (DETALHADOS) ---
    else {
        // Se não for Lavagem Simples, aplica o ajuste de detalhamento por porte
        if (porte === 'medio' || porte === 'grande') {
            // Aumento de 10% para carros maiores
            finalPrice = service.price_pequeno * 1.10; 
        } else if (porte === 'van-pequena' || porte === 'caminhao-pequeno') {
             // Adicionar R$ 10,00 para porte Van Pequena/Caminhão
             finalPrice = service.price_pequeno + 10.00; 
        } else if (porte === 'van-media') {
             // Adicionar R$ 20,00 para porte médio de Van
             finalPrice = service.price_pequeno + 20.00; 
        }
    }


    return finalPrice.toFixed(2).replace('.', ',');
}

// ----------------------------------------------------------------------
// 3. VARIÁVEIS E FUNÇÕES GERAIS (DOM E CONTROLE)
// ----------------------------------------------------------------------

const servicesList = document.getElementById('servicesList');
const selectedName = document.getElementById('selectedName');
const selectedPrice = document.getElementById('selectedPrice');
const bookBtn = document.getElementById('bookBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const formServiceName = document.getElementById('formServiceName');
const formServiceImage = document.getElementById('formServiceImage'); 
const duchaGeralContainer = document.getElementById('duchaGeralContainer');
let selectedService = null;


function renderServices(){
    servicesList.innerHTML = '';
    servicesData.forEach(s=>{
        const card = document.createElement('div');
        card.className='service-card';
        
        let priceToDisplay = s.price_pequeno;
        if (s.id === 8) {
            priceToDisplay = 'A partir de 18,00';
        } else {
             priceToDisplay = `R$ ${s.price_pequeno.toFixed(2).replace('.', ',')}`;
        }


        card.innerHTML = `
            <div class="service-title">${s.name}</div>
            <div class="service-desc">${s.desc}</div>
            <div class="price">${priceToDisplay}</div>`;
        card.onclick=(event)=>selectService(s, event); 
        servicesList.appendChild(card);
    });
}

function selectService(s, event){
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));

    selectedService = s;
    selectedName.textContent = s.name;
    
    let priceText = `R$ ${s.price_pequeno.toFixed(2).replace('.', ',')}`;
    
    // Se for o serviço consolidado, mostra o preço base 'a partir de'
    if (s.id === 8) {
        priceText = 'A partir de 18,00';
    }

    selectedPrice.textContent = priceText;
    bookBtn.disabled = false;

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('selected');
    }
}

const closeModal = () => {
    modalBackdrop.style.display = "none";
    formServiceImage.style.display = 'none';
    formServiceImage.src = '';
    // Esconde o seletor Ducha/Geral ao fechar
    duchaGeralContainer.style.display = 'none';
};

bookBtn.onclick=()=>{
    if(!selectedService) return;
    
    formServiceName.textContent = selectedService.name + " · (Preço final ajustado por porte e opção)";
    
    if (selectedService.image) {
        formServiceImage.src = selectedService.image;
        formServiceImage.style.display = 'block';
    } else {
        formServiceImage.style.display = 'none';
    }

    // LÓGICA PARA MOSTRAR/ESCONDER A OPÇÃO DUCHA/GERAL
    if (selectedService.id === 8) {
        duchaGeralContainer.style.display = 'block';
    } else {
        duchaGeralContainer.style.display = 'none';
    }

    modalBackdrop.style.display="flex";
};

document.getElementById('closeModal').onclick = closeModal;
document.getElementById('cancelBtn').onclick = closeModal;

// ----------------------------------------------------------------------
// 4. FUNÇÃO DE ENVIO PARA O WHATSAPP (Com Cálculo do Preço Final)
// ----------------------------------------------------------------------

document.getElementById('bookingForm').onsubmit = (e) => {
    e.preventDefault();

    // SEU NÚMERO DE WHATSAPP FINAL
    const whatsappNumber = '5521997759751'; 

    const clientName = document.getElementById('clientName').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const vehiclePorte = document.getElementById('vehiclePorte').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    let subServiceOption = null;
    let subServiceName = '';

    // Verifica se a opção Ducha/Geral é relevante
    if (selectedService.id === 8) {
        subServiceOption = document.getElementById('duchaOrGeral').value;
        subServiceName = subServiceOption === 'ducha' ? 'Ducha (Simples)' : 'Geral (Completa)';
    }

    // --- CÁLCULO DO PREÇO FINAL ---
    const finalPrice = calculatePrice(selectedService.id, vehiclePorte, subServiceOption);
    // ----------------------------

    // Formata a data e hora para um formato mais legível
    const formattedDate = new Date(date).toLocaleDateString('pt-BR');

    // 1. Cria o texto da mensagem
    let message = `*✅ NOVO AGENDAMENTO PRIME!*`;
    message += `\n\n*Serviço Principal:* ${selectedService.name}`;
    
    // Adiciona a opção se for Lavagem Simples
    if (subServiceName) {
        message += `\n*Opção:* ${subServiceName}`;
    }

    message += `\n*Porte:* ${vehiclePorte.toUpperCase()}`;
    message += `\n*Preço Final Estimado:* R$ ${finalPrice}`;
    message += `\n\n*Cliente:* ${clientName}`;
    message += `\n*Telefone:* ${clientPhone}`;
    message += `\n*Data e Hora:* ${formattedDate} às ${time}`;
    message += `\n\n_Aguardo confirmação e dados do veículo!_`;


    // 2. Codifica a mensagem para a URL
    const encodedMessage = encodeURIComponent(message);

    // 3. Cria o link de WhatsApp (usando a API oficial)
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // 4. Abre o link (redireciona o usuário para o WhatsApp)
    window.open(whatsappLink, '_blank');

    closeModal(); // Fecha o modal após a tentativa de envio

    // Limpa a seleção e campos do formulário
    selectedService = null;
    document.getElementById('selectedName').textContent = 'Nenhum';
    document.getElementById('selectedPrice').textContent = '—';
    document.getElementById('bookBtn').disabled = true;
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('bookingForm').reset();
};

// Inicia o carregamento dos serviços ao carregar a página
renderServices();
