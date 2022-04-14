import { useState } from "react";
import consultarCep from 'cep-promise';

function numbersOnly(str) {
    return str.replace(/[^\d]/g, '');
}

function Pesquisa(props) {
    const textoTopo = props.textoTopo;
    const goTo = props.goTo;
    const ticket = props.ticket;
    const setResultado = props.setResultado;
    const [cepNumber, setCepNumber] = useState("");

    function handleChange(evt) {
        const value = evt.target.value;
        setCepNumber(numbersOnly(value));
    }

    function clear() {
        setCepNumber("");
    }

    function handleSuccess(dadosCEP) {
        const resultado = {
            "ESTADO": dadosCEP.state,
            "CIDADE": dadosCEP.city,
            "BAIRRO": dadosCEP.neighborhood,
            "LOGRADOURO": dadosCEP.street
        }
        setResultado(resultado);
        goTo("RESULTADOS");
    }

    function handleError(err) {
        const errorMessage = err.message;
        setErrorMessage(errorMessage);
        goTo("ERRO");
    }

    function handleSearch() {
        ticket.current++;
        const currentTickt = ticket.current;
        goTo("CARREGANDO")
        consultarCep(cepNumber)
        .then(result => currentTickt == ticket.current && handleSuccess(result))
        .catch(err => currentTickt == ticket.current && handleError(err))
    }

    return <>
          <p>{textoTopo}</p>
          <p>Estado atual: {cepNumber}</p>
          <input value={numbersOnly (cepNumber)} onChange={handleChange}/>
          <button onClick={clear}>LIMPAR STATE</button>
          <button onClick={handleSearch}>CONSULTAR</button>
    </>
    
}
export default Pesquisa;