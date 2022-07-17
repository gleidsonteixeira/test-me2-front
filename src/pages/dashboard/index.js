import "./dashboard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../../components/header';
import API from "../../services/api";


function Dashboard(){

    const [motoristas, setMotoristas] = useState([]);
    const [carros, setCarros] = useState([]);

    useEffect(() => {
        loadMotoristas();
        loadCarros();
    },[]);

    async function loadMotoristas(){
        try{
            const response = await API.get('motoristas');
            if(response.data.length > 0){
                setMotoristas(response.data);
            }
        } catch(err) {
            alerta(err.message);
            console.error(err);
        }
    }

    async function loadCarros(){
        try{
            const response = await API.get('carros');
            if(response.data.length > 0){
                setCarros(response.data);
            }
        } catch(err) {
            alerta(err.message);
            console.error(err);
        }
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
        <div id="dashboard">
            <Header/>
            <main>
                <h1>Dashboard</h1>
                <div className="menus">
                    <div className="item">
                        <i className="material-icons suave" translate="no">account_circle</i>
                        <p>
                            {motoristas.length} Motoristas
                            <Link to={"/dashboard/motoristas"}>Ver todos</Link>
                        </p>
                    </div>
                    <div className="item">
                        <i className="material-icons suave" translate="no">directions_car</i>
                        <p>
                            {carros.length} Carros
                            <Link to={"/dashboard/carros"}>Ver todos</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
