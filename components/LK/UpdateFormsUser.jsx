import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ScrollView} from "react-native";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker'
import {useContext, useState} from "react";
import {AuthUserContext} from "../../utils/context";
import {Formik} from "formik";
import axios from "../../utils/axios";
import FormData from 'form-data';

const styles = StyleSheet.create({
    view: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 20
    },
    touchableImage: {
        position: 'absolute',
        bottom: 10,
        right: 20,
    },
    buttonAdd: {
        borderStyle: "solid",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF0000',
        color: '#FF0000',
        width: 150,
        height:45,
        textAlign: "center",
        paddingTop: 10

    },
    buttonCancel: {
        borderStyle: "solid",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#adadad',
        color: '#adadad',
        padding: 10,
        width: 150,
        height:45,
        textAlign: "center",
        paddingTop: 10,
        marginRight: 20
    },
    container: {
        width: '100%',
        height: "100%",
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom:60
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#adadad',
        height: 50,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20,
    },
    buttonView: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

})

const Container = styled.View`
  width: 90%;
  margin-bottom: 20px;
`

const InputText = styled.TextInput `
  font-size: 16px;
  color: black;
  border: 1px solid #adadad;
  height: 50px;
  width: 100%;
  border-radius: 15px;
`

const DescriptionInputText = styled.Text`
  margin-bottom: 3px;
`

const PhotoUserView = styled.View`
     width: 180px;
     height: 180px;
    margin-bottom: 20px;
`

const PhotoUserImage = styled.Image`
    width: 100%;
     height: 100%;
     border-radius: 100px;
`

const UpdatePhotoView = styled.View`
    width: 25px;
    height: 25px;
    background-color: #FF0000;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`

const UpdatePhotoImage = styled.Image`
  width: 15px;
  height: 15px;
`

const ButtonViewContainer = styled.View`
width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`


export const UpdateFormsUser = () => {

    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null)
    const{authUser, setAuthUser} = useContext(AuthUserContext)
    const[image, setImage] = useState({})
    const formData = new FormData()

    async function addPhoto() {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        });
        setSelectedImage(result.assets[0].uri)
        let adress = result.assets[0].uri.split('/')
        let filename = adress[adress.length-1]

        setImage({
            uri: result.assets[0].uri,
            name: filename,
            type: "image/jpeg"
        })
    }

    function addService(service){
        // formData.append('image', image)
        // formData.append('name', service?.name)
        // formData.append('surname', service?.surname)
        // formData.append('city', service?.city)
        // formData.append('phone_number', service?.phone_number)
        // formData.append('INN', service?.inn)
        // formData.append('organization', service?.organization)
        // formData.append('telegram', service?.telegram)
        // formData.append('viber', service?.viber)
        // formData.append('vk', service?.vk)
        // formData.append('linksID', authUser?.links?.id)
        // console.log(formData)
        //             axios.put(`/updateUser/${authUser?.user?.id}`, formData, {
        //                 headers: {
        //                     'Content-Type': 'multipart/form-data',
        //                     "cache-control": "no-cache",
        //                     "processData": false,
        //                     "contentType": false,
        //                     "mimeType": "multipart/form-data",
        //                 },
        //             }).then(r => {
        //                 navigation.navigate('LK')
        //             })
        axios.put(`/updateUser/${authUser?.user?.id}`, {...service, linksID: authUser?.links?.id})
            .then(r => {
            navigation.navigate('LK')
        })
    }

    function Back(){
        navigation.navigate('LK')
    }

    return <ScrollView>
    <View style={styles.view}>
    <Text style={styles.title}>Редактирование</Text>
        <PhotoUserView>
            <PhotoUserImage source={ selectedImage ? {uri: selectedImage} : {uri: `http://192.168.153.23:5000/img/users/${authUser?.user?.photos}`}}  />
            <TouchableOpacity style={styles.touchableImage} onPress={addPhoto}>
                {/*<UpdatePhotoView>*/}
                {/*    <UpdatePhotoImage source={require('../../img/pencilWhite.png')} />*/}
                {/*</UpdatePhotoView>*/}
            </TouchableOpacity>
        </PhotoUserView>
        <Formik

            initialValues={{name: authUser?.user?.name,
                surname: authUser?.user?.surname,
                city: authUser?.user?.city,
                phone_number: authUser?.user?.phone_number,
                inn: authUser?.user?.inn,
                organization: authUser?.user?.organization,
                telegram: authUser?.links?.telegram,
                viber: authUser?.links?.viber,
                vk: authUser?.links?.vk}}
            onSubmit={(values) => {
                addService(values)
            }}>
            {(props) => (
                <View style={styles.container}>
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
                        value={props.values.city}
                        placeholder='Город'
                        onChangeText={props.handleChange('city')}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={props.values.phone_number}
                        placeholder='Номер телефона'
                        onChangeText={props.handleChange('phone_number')}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={props.values.inn}
                        placeholder='ИНН'
                        onChangeText={props.handleChange('inn')}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={props.values.organization}
                        placeholder='Организация'
                        onChangeText={props.handleChange('organization')}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={props.values.telegram}
                        placeholder='Ссылка на Telegram'
                        onChangeText={props.handleChange('telegram')}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={props.values.viber}
                        placeholder='Ссылка на Viber'
                        onChangeText={props.handleChange('viber')}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={props.values.vk}
                        placeholder='Ссылка на Вконтакте'
                        onChangeText={props.handleChange('vk')}
                        style={styles.textInput}
                    />
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={() => Back()}
                            style={styles.button}>
                            <Text style={styles.buttonCancel}>Отмена</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={props.handleSubmit}
                            style={styles.button}>
                            <Text style={styles.buttonAdd}>Редактировать</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}
        </Formik>
    </View>
    </ScrollView>
}