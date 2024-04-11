import {Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Formik} from "formik";
import {FormContext} from "../../utils/context";
import {useContext, useState} from "react";
import axios from "../../utils/axios";
import JWT from "expo-jwt";

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewForm: {
        width: '90%',
        backgroundColor: 'rgba(255,255,255,0.75)',
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        paddingBottom:20,
        paddingTop: 10

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
    },
    viewRole: {
        display: 'flex',
        flexDirection: "row",
        width: '90%',
        height: 45,
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 10
    },
    menuRole: {
        width: '50%',
        height: 45,
        justifyContent: "center",
        alignItems: "center"
    },
    menuRoleActive: {
        width: '50%',
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.03)',
    },
    textRole:{
        color: '#a1a1a1'
    },
    textRoleActive: {
        color: '#e30000'
    }

})

export const Registration = () => {


    const{form, setForm} = useContext(FormContext)
    const [active, setActive] = useState('user')

    const navReg = () => {
        setForm('Login')
    }

    const registration = (user) => {
        console.log({...user, role: active, telegram: '', viber: '', vk: ''})
        axios.post('/registration', {...user, role: active, telegram: '', viber: '', vk: ''})
            .then(res => {
                console.log(res.data)
                setForm('Login')
            })
    }

    function changeUser(){
        setActive('user')
    }

    function changeSpecialist(){
        setActive('specialist')
    }

    return <View style={styles.view}>
        <ImageBackground source={require('../../img/fon.png')} resizeMode="cover" style={styles.image}>
            <Formik
                initialValues={{ name:'', surname: '', city: '', phone_number: '', INN: '', organization: '', pass: ''}}
                onSubmit={(values) => {
                    registration(values)
                }}>
                {(props) => (
                    <View style={styles.viewForm}>
                        <Text style={styles.h1}>Регистрация</Text>
                        <View style={styles.viewRole}>
                            <TouchableOpacity style={active == 'user' ? styles.menuRoleActive : styles.menuRole}
                                                onPress={changeUser}>
                                <Text style={active == 'user' ? styles.textRoleActive : styles.textRole}>Клиент</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={active == 'specialist' ? styles.menuRoleActive : styles.menuRole}
                                            onPress={changeSpecialist}>
                                <Text style={active == 'specialist' ? styles.textRoleActive : styles.textRole}>Специалист</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            value={props.values.name}
                            placeholder='Имя'
                            onChangeText={props.handleChange('name')}
                            style={styles.textInput}
                        />
                        <TextInput
                            value={props.values.surname}
                            placeholder='Фамилия'
                            onChangeText={props.handleChange('surname')}
                            style={styles.textInput}
                        />
                        <TextInput
                            value={props.values.phone_number}
                            placeholder='Номер'
                            onChangeText={props.handleChange('phone_number')}
                            style={styles.textInput}
                        />
                        <TextInput
                            value={props.values.city}
                            placeholder='Город'
                            onChangeText={props.handleChange('city')}
                            style={styles.textInput}
                        />
                        <TextInput
                            value={props.values.INN}
                            placeholder='ИНН'
                            onChangeText={props.handleChange('INN')}
                            style={active == 'specialist' ? styles.textInput : {display: 'none'}}
                        /><TextInput
                        value={props.values.organization}
                        placeholder='Организация'
                        onChangeText={props.handleChange('organization')}
                        style={active == 'specialist' ? styles.textInput : {display: 'none'}}
                    />
                        <TextInput
                            value={props.values.pass}
                            placeholder='Пароль'
                            onChangeText={props.handleChange('pass')}
                            style={styles.textInput}
                        />
                        <TouchableOpacity
                            onPress={props.handleSubmit}
                            style={styles.button}
                        >
                            <Text style={styles.text}>Зарегистрироваться</Text>
                        </TouchableOpacity>
                        <View style={styles.viewReg}>
                            <Text style={styles.textReg}>Уже есть аккаунт?</Text>
                            <TouchableOpacity onPress={navReg}>
                                <Text style={styles.textLink}>Войти</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </ImageBackground>
    </View>
}