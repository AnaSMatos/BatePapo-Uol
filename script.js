//User ID

let nomeUsuario;

function login(){
    nomeUsuario = {name: prompt("Digite seu nome")}
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nomeUsuario)
    requisicao.then(loginSucesso);
    requisicao.catch(loginErro);
}

login();


let mensagemEnviada = {
    from: nomeUsuario.name,
    to:"Todos",
    text:"",
    type:"message"
}

let msgAntiga="";
let msgNova="";




function logado(){
    const usuarioOnline = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', nomeUsuario);
}

//Entrou na sala
function loginSucesso(){
    //esconder login
    getMessages();
    setInterval(getMessages, 3000);
    setInterval(logado, 5000);
}

function getMessages(){
    const searchMessages = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    searchMessages.then(printMessages);
    searchMessages.catch(failGetMessages);
}

function loginErro(){
    alert("Esse nome de usuário já está sendo usado!")
    login();
}

function failGetMessages(){
    alert("Erro ao carregar as mensagens");
    window.location.reload();
}

function filterMessages(objeto){
    for(i=0; i<objeto.length; i++){
        if (objeto[i].to === "Todos" || objeto[i].to === nomeUsuario){
            return true;
        }else{
            return false;
        }
    }
}


function printMessages(response){
    let allMessages = response.data;
    allMessages.filter(filterMessages);
    let chat = document.querySelector(".chat");
    chat.innerHTML = ""
    for(let i=0; i < allMessages.length; i++){
        if (allMessages[i].type === "status"){
            chat.innerHTML += `
                <div class="entrada-saida texto-msg" data-identifier="message">
                    <p><time>(${allMessages[i].time})</time>
                    <span class="from">${allMessages[i].from}</span> ${allMessages[i].text}</p>
                </div>
            `
        } else if (allMessages[i].type === "message"){
            chat.innerHTML += `
                <div class="geral texto-msg" data-identifier="message">
                    <p><time>(${allMessages[i].time}) </time> <span class="from"> ${allMessages[i].from} </span> 
                    para <span class="to"> ${allMessages[i].to} </span>: ${allMessages[i].text}</p>
                </div>
            `

        } else if (allMessages[i].type === "private_message"){
            chat.innerHTML += `
                <div class="privada texto-msg data-identifier="message">
                    <p><time>(${allMessages[i].time}) </time><span class="from">${allMessages[i].from}</span> 
                    reservadamente para <span class="to">${allMessages[i].to}</span>: ${allMessages[i].text}</p>
                </div>
            
            `
        }
    }

    msgNova = document.querySelector(".texto-msg:last-child")
    if (msgNova.innerHTML !== msgAntiga.innerHTML) {
        msgNova.scrollIntoView();
        msgAntiga = msgNova;
    }
}

function sendMessage(){
    let mensagem = document.querySelector("#send-message");
    mensagemEnviada.text = mensagem.value;
    postMessage = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagemEnviada)
    postMessage.catch(failSendMessage)
    mensagem.value = "";
}

function failSendMessage(){
    alert("Algo deu errado! A página será recarregada.")
    window.location.reload();
}


//Menu
function abrirMenu(){
    let open = document.querySelector("aside");
    open.classList.remove("hidden")
}

function fecharMenu(){
    let open = document.querySelector(".menu");
    open.classList.add("hidden")
}

function participantes(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promisse.then(printParticipants);
    promisse.catch(erroParticipantes);
}

function printParticipants(response){
    let allParticipants = response.data;
    let ul = document.querySelector(".pessoas-online")

    ul.innerHTML = `
    <li onclick="selecionado(this)">
        <ion-icon name="people"></ion-icon>    
        Todos
        <ion-icon class="checkmark-off" name="checkmark-outline"></ion-icon>
    </li>
    `
    for(let i = 0; i < allParticipants.length; i++){
        const participant = allParticipants[i];

        ul.innerHTML += `
            <li onclick="selecionado(this)">
                <ion-icon name="people"></ion-icon>    
                ${participant.name}
                <ion-icon class="checkmark-off" name="checkmark-outline"></ion-icon>
            </li>
        `
    }
}

function erroParticipantes(){
    alert("Ops! Algo deu errado. A página será recarregada")
    window.location.reload();   
}

