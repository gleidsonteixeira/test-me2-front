import './login.css'
import logo from './logo_me2.png'
// import api from "../../services/api";

function Login() {

    function login(){
        const form = document.getElementById("login");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let button = document.getElementsByTagName("button");
            button[0].disabled = true;
            let span = document.getElementsByClassName("btn-text");
            span[0].textContent = "Aguarde...";
            logar();
        });
    }

    function logar(){
        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 2000);
    }

    function alerta(mensagem) {
        let alertas = document.createElement("div");
        let alerta = document.createElement("div");
        let body = document.getElementsByTagName("body");
        let lista = document.getElementsByClassName("body .alertas");

        alertas.className = "alertas";
        alerta.className = "alerta";
        alerta.textContent = mensagem;

        if (lista.length > 0) {
            lista.append(alerta);
        } else {
            body[0].append(alertas);
            alertas.append(alerta);
        }

        setTimeout(function () {
            alerta.className = "alerta active";
        }, 0);
        setTimeout(function () {
            alerta.className = "alerta";
        }, 2800);
        setTimeout(function () {
            alerta.remove();
        }, 3000);
    }

    return (
        <div id="login" className="base">
            <form id="login" onSubmit={logar}>
                <div className="logo">
                    <img src={logo} alt="ME2"/>
                </div>
                <label htmlFor="form_email">Email</label>
                <input type="text" name="email" id="form_email" placeholder="exemplo@empresa.com" autoComplete="off" />
                <label htmlFor="form_senha">Senha</label>
                <input type="password" name="password" id="form_senha" placeholder="********" autoComplete="new-passord" />
                <button type="submit" className="suave click" onClick={login}><span className="suave btn-text">Entrar</span></button>
            </form>
        </div>
    );
}
  
export default Login;