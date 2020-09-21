import React, { useState, useEffect } from 'react';
import { View , ScrollView, Text} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){

    const [teachers, setTeachers] = useState([]);
    const [ isfiltersVisible , setIsFilterVisible] = useState(false);
    const [favorites, setFavorites] = useState<Number[]>([]);

    function handleToggleFilterVisible() {
        setIsFilterVisible(!isfiltersVisible);
    }
    const [subject, setSubject] = useState('');
    const [week_day, setWeekday] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response =>{
            if (response){
                const favoritedTeacher = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeacher.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        } )
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    async function handleFilterSubmit(){
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        
        setIsFilterVisible(false);
        setTeachers(response.data);
    }

    return (
    <View style={styles.container}>
        <PageHeader 
        title="Proffis Disponíveis"
         headerRight={
             <BorderlessButton onPress={handleToggleFilterVisible}>
                 <Feather name="filter" size={20} color="#FFF"/>
             </BorderlessButton>
         }> 


{     isfiltersVisible &&   (
         <Text style={styles.searchForm}><Text style={styles.label}>Matéria</Text></Text>        
         )}
         {     isfiltersVisible &&   (
        <TextInput 
        style={styles.input}
        value={subject}
        onChangeText={text => setSubject(text)}
        placeholder="Matéria escolhida"
        placeholderTextColor="#c1bccc"
        />)}
        {     isfiltersVisible &&   (
        <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
            <Text style={styles.label}>Dia da semana</Text>
            <TextInput 
        style={styles.input}
        placeholder="Qual o dia?"
        placeholderTextColor="#c1bccc"
        value={week_day}
        onChangeText={text => setWeekday(text)}
        />
            </View>
        </View>)}

      {     isfiltersVisible &&   (
        <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
            <Text style={styles.label}>Horário</Text>
            <TextInput 
        style={styles.input}
        placeholder="Qual o horário"
        placeholderTextColor="#c1bccc"
        value={time}
        onChangeText={text => setTime(text)}
        />
            </View>
        </View>
                )}
      {     isfiltersVisible &&   (
          <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>
                  Filtrar
              </Text>
          </RectButton>
      )}

        </PageHeader>
        <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 24,
        }}
        >
            {teachers.map((teacher: Teacher) =>{ 
            return (
            <TeacherItem 
            key={teacher.id} 
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
            />)})}
        </ScrollView>
    </View>
    )
}

export default TeacherList;