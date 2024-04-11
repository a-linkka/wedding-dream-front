import styled from 'styled-components/native'
import {
    TouchableOpacity,
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    ToastAndroid,
    RefreshControl,
    Text
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useContext, useEffect, useState} from "react";
import axios from '../utils/axios'
import {AuthUserContext, MenuContext} from "../utils/context";
import {OneService} from "./OneService";
import {useNavigation, useRoute} from "@react-navigation/native";



const ServicesView = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  margin-bottom: 180px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 12px 0px 12px;
  justify-content: space-between;
  
`

const Service = styled.View`
  width: 48%;
  margin-bottom: 10px;
`

const ServiceImageView = styled.View`
  justify-content: center;
  align-items: center;
  height: 210px;
  min-width: 165px;
  max-width: 100%;
  border-radius: 10px;
  position: relative;
`

const ServiceImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 10px;
`

const FavoriteImage = styled.Image`
  margin-top: 2px;
  width: 20px;
  height: 20px;
`

const DescriptionView = styled.View`
  width: 100%;
  height: 100px;
  overflow: hidden
`

const ServiceBold = styled.Text`
  font-size: 16px;
  font-weight: bold;
`
const ServiceSpecialist = styled.Text`
 font-size: 12px;
`

const ServiceRating = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`

const ServiceRaitingImage = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 2px;
`
const ServiceRaitingText = styled.Text`
font-size: 12px;
  margin-right: 10px;
`

const ServiceCommentView = styled.View`
  background-color: #dcdcdc;
  border-radius: 4px;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
`
const ServiceCommentText = styled.Text`
font-size: 12px;
`

export const Services = ({clickUser}) => {
    const [favorite, setFavorite] = useState(require('../img/favorite.png'))
    const {authUser, setAuthUser} = useContext(AuthUserContext)
    const {menu, setMenuUser} = useContext(MenuContext)
    const navigation = useNavigation();
    const route = useRoute();
    const [result, setResult] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    console.log('услуг', route.params)
    console.log("Вывод", clickUser)

    const changeFavorite = (id) => {
        axios.post('/addFavorites', {"userID": authUser.user.id, "serviceID": id })
            .then(res => {
                console.log(res?.data)
                ToastAndroid.show('Услуга добавлена в Избранное', ToastAndroid.SHORT)
            })
    }

    useEffect(() => {
        if (menu == 'LK') {
            axios.get(`/getServicesSpecialist/${authUser.user.id}`)
                .then(function (response) {
                    // console.log(response.data);
                    setResult((response.data))
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else if (menu == "Favorite"){
            axios.get(`/getServicesFavorite/${authUser.user.id}`)
                .then(function (response) {
                    // console.log(response.data);
                    setResult((response.data))
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
         else if(clickUser){
             console.log('Робим')
            axios.get(`/getServicesSpecialist/${clickUser?.id}`)
                .then(function (response) {
                    // console.log(response.data);
                    setResult((response.data))
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else if(route.params != []){
            // console.log('ЮЗ ЭФФЕКТ', route?.params?.data)
            setResult(route?.params?.data)
        }

    }, [menu]);

    function check(){

        if (result != route.params?.data && menu == "Search"){
            console.log('Данные разные')
            if(clickUser){

            } else {
                setResult(route?.params?.data)
            }

        } else {
            console.log('Данные одинаковые')
        }
    }


    // Функция для обновления данных
    const handleRefresh = () => {
        if (menu == "LK"){
            setIsRefreshing(true);
            axios.get(`/getServicesSpecialist/${authUser.user.id}`)
                .then(function (response) {
                    // console.log(response.data);
                    setResult((response?.data))
                })
                .catch(function (error) {
                    console.log(error);
                })
            setIsRefreshing(false);
        }

    };

    function openService(service){
        // console.log(service)
        navigation.navigate('OneService', {...service, menu: menu})
    }

    check()

    return <ScrollView refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
    } style={{height: '100%'}}>
    <ServicesView>
        {result != [] ?
            result?.map((obj, i) => {
                    return <TouchableOpacity style={styles.service} onPress={() => openService(obj)}>
                            <ServiceImageView>
                                    <ServiceImage source={{uri: `http://192.168.1.38:5000/img/services/${obj?.photos}`}} />
                                <TouchableOpacity style={styles.favorite} onPress={() => changeFavorite(obj.id)}>
                                <LinearGradient colors={['#FF0000', '#FFA9AE']} style={styles.favorite}>
                                    <FavoriteImage source={require('../img/favorite.png')} />
                                </LinearGradient>
                                </TouchableOpacity>
                            </ServiceImageView>
                            <DescriptionView>
                                <ServiceBold>
                                    {obj.tittle}
                                </ServiceBold>
                                {/*<ServiceSpecialist>*/}
                                {/*    {authUser?.user?.organization}*/}
                                {/*</ServiceSpecialist>*/}
                                <ServiceRating>
                                    <ServiceRaitingImage source={require('../img/star.png')} />
                                    <ServiceRaitingText>
                                        4,5
                                    </ServiceRaitingText>
                                    <ServiceCommentView>
                                        <ServiceCommentText>
                                            1000 отзывов
                                        </ServiceCommentText>
                                    </ServiceCommentView>
                                </ServiceRating>
                                <ServiceBold>
                                    {obj.price} ₽
                                </ServiceBold>
                            </DescriptionView>
                        </TouchableOpacity>
                }
            )
            : <Text>По вашему запросу ничего не найдено</Text>
        }
        {menu == 'LK' ? <View style={{width: '100%', marginBottom: 60}}></View> : null}

    </ServicesView>
    </ScrollView>
}

const styles = StyleSheet.create({
    favorite: {
        borderRadius: 50,
        width: 30,
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: 5,
        marginRight: 5
    },
    service: {
        width: '48%',
        marginBottom: 10
    }
});