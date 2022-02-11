//User ID
const nomeUsuario = {name: prompt("Digite seu nome")}
const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nomeUsuario)

requisicao.then(loginSucesso);
requisicao.catch(loginErro);

//Entrou na sala
function loginSucesso(){
    //esconder login
    const searchMessages = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    searchMessages.then(printMessages);
    //ver os participantes
    //continuar online
}

function loginErro(){
    alert("ops! algo deu errado! tente novamente")

}

function printMessages(response){
    const allMessages = response.data;
    let chat = document.querySelector(".chat");
    for(let i=0; i < allMessages.length; i++){
        if (allMessages[i].type = "status"){
            chat.innerHTML += `
                <div class="entrada-saida texto-msg">
                    <time>(${allMessages[i].time})</time>
                    <p class="acao"><span class="from">${allMessages[i].from}</span> ${allMessages[i].text}</p>
                </div>
            `
        } else if (allMessages[i].type = "message"){


        } else if (allMessages[i].type = "private_message"){

        }
    }
}



//Menu
function abrirMenu(){
    document.getElementById("menu").style.display = "block";
}

function fecharMenu(){
    document.getElementById("menu").style.display = "none";
}

