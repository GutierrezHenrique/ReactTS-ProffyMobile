import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import  styles from './styles';
import LandingIMG from '../../assets/images/landing.png';
import StudyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import headerIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';
function Landing(){
    const {navigate} = useNavigation();

    function handleNavigateToGiveClassesPage(){
        navigate('GiveClasses');
    }


    function handleNavigateToGiveStudyPages(){
        navigate('Study');
    }

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;

            setTotalConnections(total);
        })
    },[]);

    return (
        <View style={styles.container}>
            <Image source={LandingIMG} style={styles.banner} />
            <Text style={styles.title}>
                Seja Bem vindo, {'\n'}
                <Text style={styles.titleBold}>
                     Oque deseja fazer?
                    </Text>
            </Text>
            <View style={styles.buttonsContainer}>
                <RectButton onPress={handleNavigateToGiveStudyPages} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={StudyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>
            
            <Text style={styles.totalConnections}>
                Total de { totalConnections } conexões já realizadas. {' '}
                <Image source={headerIcon} /> 
            </Text>
        </View>
    )
}

export default Landing;