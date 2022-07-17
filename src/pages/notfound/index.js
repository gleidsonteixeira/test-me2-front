import "./notfound.css";
import lost from "./lost.png";

export default function Notfound(){

    function voltar(){
        window.history.back();
    }

    return(
        <div id="notfound" className="base">
            <img src={lost} alt="pagina não encontrada"/>
            <div>
                <h1>4<span>0</span>4</h1>
                <h2>Ops...<br />não encontramos a página que procura</h2>
                <button className="click suave" onClick={voltar}><span className="suave">Tente novamente</span></button>
            </div>
        </div>
    )
}