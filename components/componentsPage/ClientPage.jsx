import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {useState, useContext, useEffect} from "react";
import {InfoUser} from "../LK/InfoUser";
import {Post} from "../Post";
import {Portfolio} from "../LK/Portfolio";
import {SocialLinks} from "../LK/SocialLinks";
import {MenuSpecialist} from "../LK/MenuSpecialist";
import * as ImagePicker from "expo-image-picker";
import {CustomContext} from "../../utils/context";
import axios from "../../utils/axios";
import {useNavigation, useRoute} from "@react-navigation/native";
import {AuthUserContext} from "../../utils/context";
import FormData from 'form-data';


const styles = StyleSheet.create({
    view: {
        height: '100%',
        backgroundColor: 'white'
    }
})

export const ClientPage = () => {

    const [result, setResult] = useState()
    const navigation = useNavigation();

    useEffect(() => {
        axios.get('/user/1')
            .then(function (response) {
                console.log(response.data)
                setResult(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const[typeAdd, setTypeAdd] = useState('service')
    const [selectedImage, setSelectedImage] = useState(null)
    const {user, setUser} = useContext(CustomContext)
    const {authUser, setAuthUser} = useContext(AuthUserContext)
    const route = useRoute();
    console.log('Из поста', route?.params?.user)
    const handleChildData = (data) => {
        setTypeAdd(data)
    }

    async function addWhat(){
        if(authUser?.user?.role == 'user'){
            navigation.navigate('AddPost')
        } else {
            if (typeAdd === 'service'){
                navigation.navigate('AddForm')
            } else if(typeAdd === 'post') {
                navigation.navigate('AddPost')
            } else if (typeAdd === 'portfolio'){
                let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    quality: 1
                });

                let adress = result.assets[0].uri.split('/')
                let filename = adress[adress.length-1]

                const formData = new FormData();
                formData.append('image', {
                    uri: result.assets[0].uri,
                    name: filename,
                    type: "image/jpeg"
                });

                await axios.post(`/addPortfolio/${authUser?.user?.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "cache-control": "no-cache",
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                    },
                }).then(res => {
                    console.log(res.data)
                })
            }
        }

    }

    return <View style={styles.view}>
        <TouchableOpacity onPress={addWhat}
            style={{width: 50, height: 50, backgroundColor: 'rgba(0,0,0,0)', position: 'absolute', zIndex:1, right: 15, bottom: 75}}>
            <Image source={require('../../img/free-icon-font-add.png')} style={{width: '100%', height: '100%', backgroundColor: 'white', borderRadius: 50}} />
        </TouchableOpacity>

        <InfoUser user={route?.params}/>
        {authUser?.user?.role == "specialist" || route?.params ? <SocialLinks clickUser={route?.params?.links}/> : null}

        {route?.params ? <View style={{width:'100%', height:'100%'}}>
            {route?.params?.user?.role == 'user' ? <Post clickUser={route?.params?.user}/> : null}
            {route?.params?.user?.role == 'specialist' ? <MenuSpecialist onChildData={handleChildData} clickUser={route?.params?.user}/> : null}
            {route?.params?.user?.role == 'specialist' ? <Portfolio /> : null}
        </View> : <View style={{width:'100%', height:'100%'}}>
            {authUser?.user?.role == 'user' ? <Post/> : null}
            {authUser?.user?.role == 'specialist' ? <MenuSpecialist onChildData={handleChildData}/> : null}
            {authUser?.user?.role == 'specialist' ? <Portfolio /> : null}
        </View>}

    </View>
}