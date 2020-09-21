import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import giveClassesImgBG from '../../assets/images/give-classes-background.png'

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
    const { goBack } = useNavigation();

    function handleNavigateBack() {
        goBack();
    }

    return (
    <View style={styles.container}>
        <ImageBackground resizeMode="contain" source={giveClassesImgBG} style={styles.content}>
            <Text style={styles.title}>Quer ser um Proffer? </Text>
            <Text style={styles.description}>Para começar a ser um professor, você precisa inserir alguns dados. </Text>
        </ImageBackground>
        <RectButton onPress={handleNavigateBack} style={styles.okButton}>
            <Text style={styles.okButtonText}>Tudo bem</Text>
        </RectButton>
    </View>
    
    )
}

export default GiveClasses;