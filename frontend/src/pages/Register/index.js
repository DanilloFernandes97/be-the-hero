import React, { useState } from 'react';

import './styles.css';

import { Link, useHistory } from 'react-router-dom'; // Pacote para a rota e não dar reload no app qnd clicar no register

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoimg from '../../assets/logo.svg';

export default function Register(){
     
    // Faz a navegação via JavaScript quando não se pode user o Link to.
    const history= useHistory();

    // estados que vão guardar os dados dos inputs.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e){

        // e -> parametro do evento js.
        // preventDefault previne do formulário fazer o comportamento padrão de recarregar a página no onSubmmit.
        e.preventDefault(); 

        // Transforma os dados dos estados em um objeto para enviar para api.
        const data = {
            name, 
            email, 
            whatsapp, 
            city, 
            uf
        }

        try {

            const response = await api.post('ongs', data);
         
            window.alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');

        } catch (error) {
            window.alert('Erro no cadastro, tente novamente.');
        }

    }

    return(

      <div className="register-container">

        <div className="content">

            <section>            

                <img src = {logoimg} alt="Be The Hero"/>

                <h1>Cadastro</h1>

                <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG.</p>

                <Link className="back-link" to="/">
                         <FiArrowLeft size={16} color="#EO2041" />
                          Voltar
                </Link>

            </section>

            <form onSubmit={handleRegister}>

                <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input 
                    placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsApp(e.target.value)}
                />

                <div className="input-group">

                    <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />

                    <input 
                        placeholder="UF" 
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        style={ { width: 80 } }
                    />

                </div>

                <button className="button" type="submit">
                    Cadastrar
                </button>

            </form>

        </div>

      </div>

    );

}