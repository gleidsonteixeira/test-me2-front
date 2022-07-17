import "./carros.css";
import { useEffect, useState } from "react";
import Header from '../../components/header';
import DataTable from 'react-data-table-component';
import API from "../../services/api";

function Carros(){

    const [carros, setCarros] = useState([]);
    const [pesquisa, setPesquisa] = useState([]);
    const columns = [
        {
            name: '#',
            selector: row => row.carro_id,
            maxWidth: '50px',
            sortable: true,
            hide: "sm"
        },
        {
            name: 'Modelo',
            selector: row => row.carro_modelo,
            sortable: true,
        },
        {
            name: 'Marca',
            selector: row => row.carro_marca,
            maxWidth: '100px',
            sortable: true,
            hide: "sm"
        },
        {
            name: 'Placa',
            selector: row => row.carro_placa,
            maxWidth: '100px',
            sortable: true,
            hide: "sm"
        },
        {
            name: 'Cor',
            selector: row => row.carro_cor,
            maxWidth: '100px',
            sortable: true,
            hide: "sm"
        },
        {
            name: 'Ações',
            button: true,
            cell: row =>    <div>
                                <i className="acao material-icons click suave" translate="no" onClick={() => editar(row)}>create</i>
                                <i className="acao material-icons click suave" translate="no" onClick={() => {deletar(row.carro_id)}}>delete</i>
                            </div>,
        },
    ];
    const paginationComponentOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    useEffect(() => {
        loadCarros();
    },[]);
    
    function fechar(){
        let lateral = document.getElementById("lateral");
        let criar = document.getElementById("criar");
        let editar = document.getElementById("editar");
        lateral.className = "suave";
        criar.className = "suave";
        editar.className = "suave";
        criar.reset();
        editar.reset();
    };

    function criar(){
        let lateral = document.getElementById("lateral");
        let form = document.getElementById("criar");
        lateral.className = "suave active";
        form.className = "suave active";
    };
    
    function editar(data){
        let lateral = document.getElementById("lateral");
        let form = document.getElementById("editar");
        document.getElementById("carro_id").value = data.carro_id;
        document.getElementById("carro_modelo").value = data.carro_modelo;
        document.getElementById("carro_marca").value = data.carro_marca;
        document.getElementById("carro_placa").value = data.carro_placa;
        document.getElementById("carro_cor").value = data.carro_cor;
        lateral.className = "suave active";
        form.className = "suave active";
    }

    function deletar(carro_id){
        let confirmar = document.getElementById("confirmar");
        let sim = document.getElementById("sim");
        confirmar.className = "suave active";
        sim.setAttribute("carro_id", carro_id);
    }
    
    function cancelar(){
        let confirmar = document.getElementById("confirmar");
        confirmar.className = "suave";
    }

    async function confirmar(){
        let sim = document.getElementById("sim");
        try{
            await API.delete('carro/'+sim.getAttribute("carro_id"));
            cancelar();
            loadCarros();
            alerta("Registro apagado com sucesso");
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

    async function criarForm(e){
        e.preventDefault();
        const form = new FormData(document.getElementById("criar"));
        try{
            const sending = await API.post('carro', form);
            fechar();
            loadCarros();
            alerta("Registro criado com sucesso");
            console.log(sending.data)
        } catch(err) {
            alerta(err.message);
            console.error(err);
        }
    }

    async function editarForm(e){
        e.preventDefault();
        const form = new FormData(document.getElementById("editar"));
        try{
            const sending = await API.post('carro/'+form.get("carro_id"), form);
            fechar();
            loadCarros();
            alerta("Registro atualizado com sucesso");
            console.log(sending.data)
        } catch(err) {
            alerta(err.message);
            console.error(err);
        }
    }

    function pesquisar(carros){
        return carros.filter((carro) => {
            if(carro.carro_modelo.toLowerCase().indexOf(pesquisa) > -1 || carro.carro_placa.toLowerCase().indexOf(pesquisa) > -1 || carro.carro_marca.toLowerCase().indexOf(pesquisa) > -1)
            return carro;
        });
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
        <div id="carros">
            <Header/>
            <main>
                <h1>Carros <button className="click suave criar" onClick={criar}><span>Novo carro</span></button></h1>
                <div className="pesquisa">
                    <label>Buscar</label>
                    <input type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} placeholder="procure por modelo, marca ou placa" />
                </div>
                <DataTable
                    columns={columns}
                    data={pesquisar(carros)}
                    striped={true}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                />

                <div id="lateral" className="suave">
                    <form id="criar" className="suave" onSubmit={criarForm}>
                        <h3>Criar <i className="material-icons click suave" translate="no" title="fechar" onClick={fechar}>close</i></h3>
                        <label>Marca</label>
                        <input type="text" name="carro_marca" required />
                        <label>Modelo</label>
                        <input type="text" name="carro_modelo" required />
                        <label>Placa</label>
                        <input type="text" name="carro_placa" required />
                        <label>Cor</label>
                        <input type="text" name="carro_cor" required />
                        <button type="submit" className="click suave" onClick={ () => {} }><span>Adicionar</span></button>
                    </form>
                    <form id="editar" className="suave" onSubmit={editarForm}>
                        <h3>Editar <i className="material-icons click suave" translate="no" title="fechar" onClick={fechar}>close</i></h3>
                        <input type="hidden" name="carro_id" id="carro_id" />
                        <label>Marca</label>
                        <input type="text" name="carro_marca" id="carro_marca" required />
                        <label>Modelo</label>
                        <input type="text" name="carro_modelo" id="carro_modelo" required />
                        <label>Placa</label>
                        <input type="text" name="carro_placa" id="carro_placa" required />
                        <label>Cor</label>
                        <input type="text" name="carro_cor" id="carro_cor" required />
                        <button type="submit" className="click suave"><span>Atualizar</span></button>
                    </form>
                </div>

                <div id="confirmar" className="suave">
                    <p>Deseja realmente apagar esse registro?</p>
                    <div className="opcoes">
                        <div id="sim" className="click suave" onClick={confirmar}>Sim</div>
                        <div id="nao" className="click suave" onClick={cancelar}>Não</div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Carros;
