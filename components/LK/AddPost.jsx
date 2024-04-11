import {Text, TextInput, TouchableOpacity, View, StyleSheet, Image, ScrollView} from "react-native";
import {Formik} from "formik";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useContext, useState} from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "../../utils/axios";
import {AuthUserContext} from "../../utils/context";
import FormData from 'form-data';
import {MenuContext} from "../../utils/context";

const styles = StyleSheet.create({
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
    textInputArea: {
        borderWidth: 1,
        borderColor: '#adadad',
        height: 200,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20,
    },
    h1: {
        fontSize: 25,
        fontWeight: "bold",
        color: '#e30000',
        marginBottom: 10
    },
    buttonView: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    viewImage:{
        width: '90%',
        aspectRatio: 1,
        backgroundColor: 'white',
        marginBottom: 10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        aspectRatio: 1,
        width:null,
        height: null,
        borderRadius: 10
    },
    addImage: {

    },
    touchableImage: {
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        backgroundColor: '#e0e0e0',
        borderRadius: 7,
        marginBottom: 20
    }
})

export const AddPosts = () => {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null)
    const{authUser, setAuthUser} = useContext(AuthUserContext)
    const [file, setFile] = useState()
    const route = useRoute();
    const formData = new FormData()
    const[image, setImage] = useState({})
    const{menu, setMenu} = useContext(MenuContext)

    function addService(service){
        // console.log(image)
        console.log(service)
        formData.append('image', image)
        formData.append('description', service?.descriptions)
        formData.append('tags', service?.tags)
        console.log(formData)
        if (route?.params){
            // console.log(service)
            // console.log(route.params.id)
            // axios.put(`updateService/${route?.params?.id}`, service)
            //     .then(res => {
            //         navigation.navigate('OneService', {...route.params, ...service})
            //     })
        } else {
            axios.post(`/createPost/${authUser.user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "cache-control": "no-cache",
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                },
            })
                .then(res => {
                    console.log(res.data)
                    navigation.navigate('LK')
                })
                .catch(error => {
                    console.log('ошибка', error)
                });
        }

    }

    function Back(service){
            navigation.navigate('LK')
    }

    async function addPhoto(){
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
        // formData.append('image', {
        //     uri: result.assets[0].uri,
        //     name: filename,
        //     type: "image/jpeg"
        // });

    }

    return <ScrollView>
        <Formik
            initialValues={{ descriptions: `${route?.params ? route?.params?.descriptions : ""}`,
                tags: `${route?.params ? route?.params?.word_key : ""}`}}
            onSubmit={(values) => {
                addService(values)
            }}>
            {(props) => (
                <View style={styles.container}>
                    <Text style={styles.h1}>Добавление поста</Text>
                    <View style={styles.viewImage}>
                        <Image source={ selectedImage ? {uri: selectedImage} : require('../../img/serviceImage/nonePhoto.png')} style={styles.image}/>
                    </View>
                    {route.params ? null : <TouchableOpacity style={styles.touchableImage} onPress={addPhoto}>
                        <Text style={styles.addImage}>Добавить фото</Text>
                    </TouchableOpacity>}
                    <TextInput
                        value={props.values.descriptions}
                        placeholder='Описание'
                        onChangeText={props.handleChange('descriptions')}
                        style={styles.textInputArea}
                        multiline={true}
                        textAlignVertical='top'
                    />
                    <TextInput
                        value={props.values.tags}
                        placeholder='Теги'
                        onChangeText={props.handleChange('tags')}
                        style={styles.textInput}
                    />
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={() => Back(route?.params)}
                            style={styles.button}>
                            <Text style={styles.buttonCancel}>Отмена</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={props.handleSubmit}
                            style={styles.button}>
                            <Text style={styles.buttonAdd}>{route?.params ? 'Редактировать' : 'Добавить'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}
        </Formik>

    </ScrollView>
}