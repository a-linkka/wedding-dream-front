import {View, StyleSheet, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from "../utils/axios";
import {useEffect, useState} from "react";
import {SocialLinks} from "./LK/SocialLinks";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        marginBottom: 60
    },
    viewImage: {
        width: "100%",
        aspectRatio: 1
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        aspectRatio: 1,
        width:null,
        height: null
    },
    h1: {
        fontWeight: "bold",
        fontSize: 20
    },
    price: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#FF0000'
    },
    viewDescriptionText: {
        paddingLeft: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    viewSpec: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        padding: 10
    },
    photoUser: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10,
    },
    nameUser: {
        fontWeight: "bold"
    },
    viewDescription:{
        backgroundColor: 'white',
        padding: 10,
        paddingBottom: 15,
        borderRadius: 15
    }
})

export const OneService = () => {
    const[user, setUser] = useState('')
    const route = useRoute();
    const navigation = useNavigation();
    console.log('user', user)

    useEffect(() => {
    axios.get(`/user/${route.params.userid}`)
        .then(res => {
            console.log(res.data)
            setUser(res.data)
        })
    }, [route]);

    function updateService(service){
        navigation.navigate('AddForm', service)
        // console.log(service)
    }

    console.log(route?.params?.photos)

    function onUser(){
        axios.get(`/user/${user?.user?.id}`)
            .then(res => {
                navigation.navigate('LK', res.data)
            })
    }

    return <ScrollView>
    <View style={styles.container}>
            <View style={styles.viewImage}>
                <Image source={route?.params?.photos ? {uri: `http://192.168.1.38:5000/img/services/${route?.params?.photos}`} : require('../img/serviceImage/nonePhoto.png')} style={styles.image}/>
            </View>
        <View style={styles.viewDescriptionText}>
            <Text style={styles.h1}>{route?.params?.tittle}</Text>
            <Text style={styles.price}>{route?.params?.price} ₽</Text>
        </View>
        {route?.params?.menu == "LK" ? <TouchableOpacity style={{borderColor: '#FF0000', borderWidth: 1.5, backgroundColor: 'white',
                                                    borderRadius: 10,
                                                    marginTop: 10, marginRight: 10, marginLeft: 10,
                                                    padding: 10,
                                                    alignItems: 'center', justifyContent: 'center'}}
                                                    onPress={() => updateService(route.params)}>
            <Text style={{color: '#FF0000', fontWeight: 'bold'}}>Редактировать</Text>
        </TouchableOpacity> : null}

        <TouchableOpacity style={styles.viewSpec} onPress={onUser}>
            <Image source={{uri: `http://192.168.1.38:5000/img/users/${user?.user?.photos}`}} style={styles.photoUser}/>
            <View>
                <Text style={styles.nameUser}>{user?.user?.name + ' ' + user?.user?.surname}</Text>
                <Text>{user?.user?.organization}</Text>
            </View>
        </TouchableOpacity>
        <View style={{backgroundColor: 'white', borderRadius: 15, marginBottom: 10}}>
            <SocialLinks/>
        </View>

        <View style={styles.viewDescription}>
            <Text style={{marginBottom: 5, fontWeight: 'bold'}}>Описание услуги</Text>
            <Text>
                {route?.params?.descriptions}
            </Text>
        </View>
    </View>
    </ScrollView>
}