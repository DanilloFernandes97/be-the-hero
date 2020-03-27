import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

// useNavigation - semelhante ao history do reactjs.
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

// Não preciso especificar se é logo.png, logo@2x.png ou logo@3x.png, o React pega a melhor de acordo o dispositivo.
import logoImg from '../../assets/logo.png';

export default function Incidents() {

    const [incidents, setIncidents] = useState([]);  
    const [totalIncidents, setTotalIncidents] = useState(0);

    // *** Estados da Paginação ***
    const [page, setPage] = useState(1); // Estado inicial da página logicamente é zero.
    const [loading, setLoading] = useState(false); // Guarda a info quando estamos buscando dados novos pra não serem buscados novamente pra carregar uma página por vez.
    // ***

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {    

        if (loading) { // Caso uma requisição está sendo feita, não carregue outra (Quando o usuário carrega pra baixo sem parar).

            return;
            
        }   

        if (totalIncidents > 0 && incidents === totalIncidents){ // Se já chegou ao fim então não faz sentido realizar requisições.

            return;

        }

        setLoading(true);

        const response = await api.get("incidents", { 
            params: { page } 
        });

        // Seta na array de incidents todos os dados existentes mais os novos da requisição.
        setIncidents( [...incidents, ...response.data ] );   

        setTotalIncidents(response.headers['x-total-count']);

        // Pula pra mais uma página.
        setPage(page + 1);

        setLoading(false);

    }

    useEffect( () => {
        loadIncidents();
    } );

    return(        

        <View style={styles.container}>

            <View style={styles.header}>

                <Image source={logoImg}/>

                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {totalIncidents} casos</Text>.
                </Text>

            </View>

            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                
                style={styles.incidentList}

                data={ incidents }

                keyExtractor = {incident => String(incident.id)}

                showsVerticalScrollIndicator = { false }            

                onEndReached={loadIncidents}

                onEndReachedThreshold={0.2}

                renderItem={( {item: incident}) => (
                
                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG</Text>
                        <Text style={styles.incidentValue}> {incident.name} </Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}> {incident.title} </Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}> 
                            {Intl.NumberFormat("pt-BR", {
                                 style:'currency', 
                                 currency:'BRL'
                            }).format(incident.value)} 
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={ () => navigateToDetail(incident) }
                        >

                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>

                        </TouchableOpacity>

                    </View>

               )}        

            />


       </View>
          
    );

}