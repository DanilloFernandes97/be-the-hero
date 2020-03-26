import React, { useState } from 'react';

import './styles.css';

import api from '../../services/api';

import logoimg from '../../assets/logo.svg';

import { FiArrowLeft } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom'; // Pacote para a rota e não dar reload no app qnd clicar no register


export default function NewIncident() {

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

   async function handleNewIncident(e) {

        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {

            await api.post('incidents', data, 
                { 
                    headers: {
                       Authorization: ongId 
                    }  
                } );

            history.push('/profile');

        } catch (error) {
            window.alert('Erro ao cadastrar caso, tente novamente');    
        }

    }

    return ( 

        <div className="new-incident-container">

        <div className="content">

            <section>            

                <img src = {logoimg} alt="Be The Hero"/>

                <h1>Cadastrar novo caso</h1>

                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                <Link className="back-link" to="/profile">
                         <FiArrowLeft size={16} color="#EO2041" />
                          Voltar para home
                </Link>

            </section>

            <form onSubmit={handleNewIncident}>

                <input 
                    placeholder="Título do caso"
                    value={title}
                    onChange={ e => setTitle(e.target.value) }
                />
                <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={ e => setDescription(e.target.value) }
                />
                <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={ e => setValue(e.target.value) }
                />
        
                <button className="button" type="submit">
                    Cadastrar
                </button>

            </form>

        </div>

      </div>
    );

}