import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom'; // Pacote para a rota e não dar reload no app qnd clicar no register

import api from '../../services/api';

import './styles.css'; 

import { FiLogIn } from 'react-icons/fi';

import heroesimg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';

export default function Logon(){

    const [id, setId] = useState('');

    const history = useHistory();

   async function handleLogin(e){

        e.preventDefault();

        try{

            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);

            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        }  catch(error) {            
            window.alert(`Falha no login, tente novamente.`);
        }

    }

    return (
        
        <div className="logon-container">

            <section className="form">

                <img src = {logoimg} alt="Be The Hero"/>

                <form onSubmit = {handleLogin}>

                    <h1>Faça o seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                         <FiLogIn size={16} color="#EO2041" />
                          Não tenho cadastro
                    </Link>

                </form>

            </section>
            
            <img src = {heroesimg} alt="Imagem da Logo"/>
        
        </div>
    );

}