//User ID
const nomeUsuario = {name: prompt("Digite seu nome")}
const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nomeUsuario)
let mensagemEnviada = {
    from: nomeUsuario.name,
    to:"Todos",
    text:"",
    type:"message"
}

let msgAntiga="";
let msgNova="";


requisicao.then(loginSucesso);
requisicao.catch(loginErro);

function logado(){
    const usuarioOnline = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', nomeUsuario);
}
//Entrou na sala
function loginSucesso(){
    //esconder login
    setInterval(getMessages, 3000);
    //ver os participantes
    setInterval(logado, 5000);
}

function getMessages(){
    const searchMessages = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    searchMessages.then(printMessages);
    searchMessages.catch(failGetMessages);
}

function loginErro(){
    alert("Esse nome de usuário já está sendo usado!")
    const nomeUsuario = {name: prompt("Digite seu nome")}
}

function failGetMessages(){
    alert("Erro ao carregar as mensagens");
    window.location.reload();
}

function printMessages(response){
    let allMessages = response.data;
    let chat = document.querySelector(".chat");
    chat.innerHTML = ""
    for(let i=0; i < allMessages.length; i++){
        if (allMessages[i].type === "status"){
            chat.innerHTML += `
                <div class="entrada-saida texto-msg">
                    <time>(${allMessages[i].time})</time>
                    <p class="acao"><span class="from">${allMessages[i].from}</span> ${allMessages[i].text}</p>
                </div>
            `
        } else if (allMessages[i].type === "message"){
            chat.innerHTML += `
                <div class="geral texto-msg">
                    <time>(${allMessages[i].time})</time>
                    <p class="acao"><span class="from">${allMessages[i].from}</span> para <span class="to">${allMessages[i].to}</span>:</p>
                    <p class="mensagem">${allMessages[i].text}</p>
                </div>
            `

        } else if (allMessages[i].type === "private_message"){
            chat.innerHTML += `
                <div class="privada texto-msg hidden">
                    <time>(${allMessages[i].time})</time>
                    <p class="acao"><span class="from">${allMessages[i].from}</span> reservadamente para <span class="to">${allMessages[i].to}</span>:</p>
                    <p class="mensagem"> ${allMessages[i].text}</p>
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

    mensagem.value = "";
}



//Menu
function abrirMenu(){
    document.getElementById("menu").style.display = "block";
}

function fecharMenu(){
    document.getElementById("menu").style.display = "none";
}

