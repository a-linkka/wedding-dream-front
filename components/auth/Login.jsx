import {StyleSheet, View, Text, TouchableOpacity, TextInput, Button, ImageBackground} from "react-native";
import {Formik} from "formik";
import axios from "../../utils/axios";
import JWT from "expo-jwt";
import {AuthContext} from "../../utils/context";
import {useContext} from "react";
import styled from "styled-components/native";
import {FormContext, AuthUserContext} from "../../utils/context";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewForm: {
      width: '90%',
      backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        paddingBottom:20,
        paddingTop: 10,
        height: "auto",
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'rgba(255,0,0,0.76)',
        height: 50,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 5,
        marginBottom: 20
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:"100%"
    },
    h1: {
        fontSize: 35,
        fontWeight: "bold",
        color: '#e30000',
        marginBottom: 30
    },
    button: {
        marginTop: 5,
        width: '50%',
        backgroundColor: '#e30000',
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16
    },
    viewReg: {
        marginTop: 7,
        alignItems: "center",
        justifyContent: "center"
    },
    textReg: {
        fontSize: 13
    },
    textLink: {
        fontSize: 13,
        color: '#e30000',
        textDecorationLine: "underline"
    }

})

export const Login = () => {

    const{auth, setAuth} = useContext(AuthContext)
    const{form, setForm} = useContext(FormContext)
    const{authUser, setAuthUser} = useContext(AuthUserContext)
    const navigation = useNavigation();

    const authtorization = (auth) => {
        axios.post('/login', auth)
            .then(res => {
                console.log(res.data)
                setAuth(res.data)
                navigation.navigate('LK')
            })
        axios.post('/userPhone', {phone: auth.phone_number})
            .then(res => {
                console.log(res.data)
                setAuthUser(res.data)
            })
    }

    const navReg = () => {
        setForm('Registration')
    }

    return <View style={styles.view}>
        <ImageBackground source={require('../../img/fon.png')} resizeMode="cover" style={styles.image}>
        <Formik
            initialValues={{phone_number: '', pass: ''}}
            onSubmit={(values) => {
                authtorization(values)
        }}>
            {(props) => (
                <View style={styles.viewForm}>
                    <Text style={styles.h1}>Вход</Text>
                    <TextInput
                        value={props.values.phone_number}
                        placeholder='Введите номер'
                        onChangeText={props.handleChange('phone_number')}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={props.values.pass}
                        placeholder='Введите пароль'
                        onChangeText={props.handleChange('pass')}
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        onPress={props.handleSubmit}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Войти</Text>
                    </TouchableOpacity>
                    <View style={styles.viewReg}>
                        <Text style={styles.textReg}>У вас нет аккаунта?</Text>
                        <TouchableOpacity onPress={navReg}>
                            <Text style={styles.textLink}>Зарегистрироваться</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
        </ImageBackground>
    </View>
}