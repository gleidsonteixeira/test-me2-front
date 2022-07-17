import "./header.css";
import logo from "./logo_me2.png";
import eu from './gleidson-teixeira.jpg'
import { Link } from "react-router-dom";

function Header() {

    function menu(){
        let header = document.getElementsByTagName("header")[0];
        header.classList.toggle("active")
    }

    return (
        <header className="suave">
            <Link className="logo" to="/"><img src={logo} alt="ME2" /></Link>
            <ul>
                <li>
                    <Link to="/dashboard" className="suave"><i className="material-icons suave" translate="no">dashboard</i> Início</Link>
                </li>
                <li>
                    <Link to="/dashboard/motoristas" className="suave"><i className="material-icons suave" translate="no">account_circle</i>Motoristas</Link>
                </li>
                <li>
                    <Link to="/dashboard/carros" className="suave"><i className="material-icons suave" translate="no">directions_car</i>Carros</Link>
                </li>
            </ul>
            <div className="perfil">
                <div className="foto">
                    <img src={eu} alt="Gleidson Teixeira" />
                </div>
                <p>Gleidson Teixeira <Link to="/" className="suave">Sair</Link></p>
            </div>
            <div id="menu-btn" className="click suave" onClick={menu}><i className="material-icons" translate="no">menu</i></div>
        </header>
    );
}

export default Header;