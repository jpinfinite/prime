// ATENÇÃO: Verifique se os nomes dos arquivos na pasta assets estão EXATAMENTE
// iguais a estes (incluindo maiúsculas/minúsculas e a extensão .jpg)
const servicesData = [
    { 
        id: 1, 
        name: 'Lavagem Detalhada (Carro)', 
        desc: 'Limpeza profunda externa, descontaminação da pintura, atenção especial às rodas e cera UV.', 
        price: 'R$ 45,00',
        image: 'assets/carrosel-prime_01.jpg' 
    },
    { 
        id: 2, 
        name: 'Lavagem Detalhada (Moto)', 
        desc: 'Limpeza profunda da moto, acessando partes não detalhadas numa ducha simples.', 
        price: 'R$ 50,00', 
        image: 'assets/carrosel-prime_02.jpg' 
    },
    { 
        id: 3, 
        name: 'Limpeza Detalhada (Interna)', 
        desc: 'Limpeza minuciosa do interior, com produtos de alta qualidade para remover sujeiras pesadas.', 
        price: 'R$ 60,00',
        image: 'assets/carrosel-prime_03.jpg' 
    },
    { 
        id: 4, 
        name: 'Limpeza de Motor', 
        desc: 'Proporciona durabilidade às engrenagens, bom fluxo do motor e proteção de 6 meses no verniz.', 
        price: 'R$ 150,00',
        image: 'assets/carrosel-prime_04.jpg' 
    },
    { 
        id: 5, 
        name: 'Higienização Completa', 
        desc: 'Proporciona um ambiente agradável, elimina bactérias e deixa o carro cheiroso.', 
        price: 'R$ 300,00',
        image: 'assets/carrosel-prime_05.jpg' 
    },
    {
        id: 6,
        name: 'Ducha Moto',
        desc: 'Lavagem externa para motos.',
        price: 'R$ 20,00',
        image: 'assets/MOTO.jpg' 
    },
    {
        id: 7,
        name: 'Geral Moto',
        desc: 'Lavagem completa para motos.',
        price: 'R$ 20,00', 
        image: 'assets/MOTO.jpg' 
    },
    {
        id: 8,
        name: 'Ducha Carro',
        desc: 'Lavagem externa para carros.',
        price: 'R$ 18,00',
        image: 'assets/carro prime.jpg' 
    },
    {
        id: 9,
        name: 'Geral Carro',
        desc: 'Lavagem completa para carros.',
        price: 'R$ 35,00',
        image: 'assets/carro prime.jpg' 
    }
];

const servicesList = document.getElementById('servicesList');
const selectedName = document.getElementById('selectedName');
const selectedPrice = document.getElementById('selectedPrice');
const bookBtn = document.getElementById('bookBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const formServiceName = document.getElementById('formServiceName');
const formServiceImage = document.getElementById('formServiceImage'); 
let selectedService = null;

function renderServices(){
    servicesList.innerHTML = '';
    servicesData.forEach(s=>{
        const card = document.createElement('div');
        card.className='service-card';
        card.innerHTML = `
            <div class="service-title">${s.name}</div>
            <div class="service-desc">${s.desc}</div>
            <div class="price">${s.price}</div>`;
        card.onclick=(event)=>selectService(s, event); 
        servicesList.appendChild(card);
    });
}

function selectService(s, event){
    // Remove a classe 'selected' de todos os cartões
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));

    selectedService = s;
    selectedName.textContent = s.name;
    selectedPrice.textContent = s.price;
    bookBtn.disabled = false;

    // Adiciona a classe 'selected' ao cartão clicado
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('selected');
    }
}

// Função de fechamento do modal unificada
const closeModal = () => {
    modalBackdrop.style.display = "none";
    formServiceImage.style.display = 'none'; // Esconde a imagem ao fechar
    formServiceImage.src = ''; // Limpa a src
};

bookBtn.onclick=()=>{
    if(!selectedService) return;
    formServiceName.textContent = selectedService.name + " · " + selectedService.price;
    
    // Carrega a imagem no modal
    if (selectedService.image) {
        formServiceImage.src = selectedService.image;
        formServiceImage.style.display = 'block'; // Mostra a imagem
    } else {
        formServiceImage.style.display = 'none'; // Esconde se não houver imagem
    }

    modalBackdrop.style.display="flex";
};

document.getElementById('closeModal').onclick = closeModal;
document.getElementById('cancelBtn').onclick = closeModal;

document.getElementById('bookingForm').onsubmit=(e)=>{
    e.preventDefault();
    
    const clientName = document.getElementById('clientName').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const vehicleType = document.getElementById('vehicleType').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    let confirmationMessage = `✅ Agendamento confirmado!\n`;
    confirmationMessage += `Serviço: ${selectedService.name} (${selectedService.price})\n`;
    confirmationMessage += `Cliente: ${clientName}\n`;
    confirmationMessage += `Telefone: ${clientPhone}\n`;
    confirmationMessage += `Veículo: ${vehicleType}\n`;
    confirmationMessage += `Data: ${date} às ${time}`;

    alert(confirmationMessage);

    closeModal(); // Fecha o modal
    
    // Limpa a seleção e campos do formulário após o agendamento
    selectedService = null;
    selectedName.textContent = 'Nenhum';
    selectedPrice.textContent = '—';
    bookBtn.disabled = true;
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('bookingForm').reset();
};

// Inicia o carregamento dos serviços ao carregar a página
renderServices();