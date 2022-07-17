import "./motorista.css";
import { useEffect, useState } from "react";
import Header from '../../components/header';
import DataTable from 'react-data-table-component';
import API from "../../services/api";

function Motoristas(){

    const [motoristas, setMotoristas] = useState([]);
    const [carros, setCarros] = useState([]);
    const [pesquisa, setPesquisa] = useState([]);
    const columns = [
        {
            name: '#',
            selector: row => row.motorista_id,
            maxWidth: '50px',
            sortable: true,
            hide: "sm"
        },
        {
            name: 'Motorista',
            selector: row => row.motorista_nome,
            sortable: true,
        },
        {
            name: 'Telefone',
            selector: row => row.motorista_telefone,
            maxWidth: '150px',
            sortable: true,
            hide: "sm"
        },
        {
            name: 'CNH',
            selector: row => row.motorista_cnh,
            maxWidth: '100px',
            sortable: true,
            hide: "sm"
        },
        {
            name: 'Carro',
            selector: row => (row.carro) ? row.carro.carro_modelo: "---",
            maxWidth: '100px',
            sortable: true,
            hide: "sm"
        },
        {
            name: 'Ações',
            button: true,
            cell: row =>    <div>
                                <i className="acao material-icons click suave" translate="no" onClick={() => editar(row)}>create</i>
                                <i className="acao material-icons click suave" translate="no" onClick={() => {deletar(row.motorista_id)}}>delete</i>
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
        loadMotoristas();
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
        document.getElementById("motorista_id").value = data.motorista_id;
        document.getElementById("motorista_nome").value = data.motorista_nome;
        document.getElementById("motorista_telefone").value = data.motorista_telefone;
        document.getElementById("motorista_cnh").value = data.motorista_cnh;
        document.getElementById("carro_id").value = data.carro_id;
        lateral.className = "suave active";
        form.className = "suave active";
    }

    function deletar(motorista_id){
        let confirmar = document.getElementById("confirmar");
        let sim = document.getElementById("sim");
        confirmar.className = "suave active";
        sim.setAttribute("motorista_id", motorista_id);
    }
    
    function cancelar(){
        let confirmar = document.getElementById("confirmar");
        confirmar.className = "suave";
    }

    async function confirmar(){
        let sim = document.getElementById("sim");
        try{
            await API.delete('motorista/'+sim.getAttribute("motorista_id"));
            cancelar();
            loadMotoristas();
            alerta("Registro apagado com sucesso");
        } catch(err) {
            alerta(err.message);
            console.error(err);
        }
    }

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

    async function criarForm(e){
        e.preventDefault();
        const form = new FormData(document.getElementById("criar"));
        try{
            const sending = await API.post('motorista', form);
            fechar();
            loadMotoristas();
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
            const sending = await API.post('motorista/'+form.get("motorista_id"), form);
            fechar();
            loadMotoristas();
            alerta("Registro atualizado com sucesso");
            console.log(sending.data)
        } catch(err) {
            alerta(err.message);
            console.error(err);
        }
    }

    function pesquisar(motoristas){
        return motoristas.filter((motorista) => {
            if(motorista.motorista_nome.toLowerCase().indexOf(pesquisa) > -1 || motorista.motorista_cnh.toLowerCase().indexOf(pesquisa) > -1)
            return motorista;
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
        <div id="motoristas">
            <Header/>
            <main>
                <h1>Motoristas <button className="click suave criar" onClick={criar}><span>Novo motorista</span></button></h1>
                <div className="pesquisa">
                    <label>Buscar</label>
                    <input type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} placeholder="procure por motorista ou CNH" />
                </div>
                <DataTable
                    columns={columns}
                    data={pesquisar(motoristas)}
                    striped={true}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                />

                <div id="lateral" className="suave">
                    <form id="criar" className="suave" onSubmit={criarForm}>
                        <h3>Criar <i className="material-icons click suave" translate="no" title="fechar" onClick={fechar}>close</i></h3>
                        <label>Nome</label>
                        <input type="text" name="motorista_nome" required />
                        <label>Telefone</label>
                        <input type="text" name="motorista_telefone" required />
                        <label>CNH</label>
                        <input type="text" name="motorista_cnh" required />
                        <label>Carro</label>
                        <select name="carro_id">
                            <option value="">Nenhum</option>
                            {
                                carros.map((carro) => {
                                    return(
                                        <option value={carro.carro_id}>{carro.carro_modelo}</option>
                                    )
                                })
                            }
                        </select>
                        <button type="submit" className="click suave" onClick={ () => {} }><span>Adicionar</span></button>
                    </form>
                    <form id="editar" className="suave" onSubmit={editarForm}>
                        <h3>Editar <i className="material-icons click suave" translate="no" title="fechar" onClick={fechar}>close</i></h3>
                        <input type="hidden" name="motorista_id" id="motorista_id" />
                        <label>Nome</label>
                        <input type="text" name="motorista_nome" id="motorista_nome" required />
                        <label>Telefone</label>
                        <input type="text" name="motorista_telefone" id="motorista_telefone" required />
                        <label>CNH</label>
                        <input type="text" name="motorista_cnh" id="motorista_cnh" required />
                        <label>Carro</label>
                        <select name="carro_id" id="carro_id">
                            <option value="">Nenhum</option>
                            {
                                carros.map((carro) => {
                                    return(
                                        <option value={carro.carro_id}>{carro.carro_modelo}</option>
                                    )
                                })
                            }
                        </select>
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

export default Motoristas;
