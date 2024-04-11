import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import {AuthUserContext, AuthContext} from "../../utils/context";
import {useContext} from "react";
import {MenuContext} from "../../utils/context";

const styles = StyleSheet.create({
    view: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    touchableDelete: {
        position: 'absolute',
        top: 0,
        right: 20,
    },
    touchableUpdate: {
        backgroundColor: '#e0e0e0',
        width: "90%",
        height: 30,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },
    updateText: {
        color: '#000000'
    }
})

const PhotoUserView = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: #969696;
`

const PhotoUserImage = styled.Image`
  width: 100%;
     height: 100%;
     border-radius: 100px;
`

const InfoUserView = styled.View`
  flex: 1;
  align-self: stretch;
  margin-left: 20px;
  height: 100px;
  justify-content: center;
`

const NameUser = styled.Text`
font-weight: bold;
  font-size: 16px;
`

const CityUserView = styled.View`
display: flex;
flex-direction: row;
  align-items: center;
`

const CityUserImage = styled.Image`
width: 13px;
  height: 13px;
  margin-right: 3px;
`

const CityUser = styled.Text`
  color: #8f8f8f;
`

const UpdateUser = styled.View`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  border-radius: 5px;
`

const UpdateImage = styled.Image`
  width: 20px;
  height: 20px;
`



export const InfoUser = ({user}) => {
    const role = 'specialist'
    console.log('user', user)

    const navigation = useNavigation();
    const{authUser, setAuthUser} = useContext(AuthUserContext)
    const {auth, setAuth} = useContext(AuthContext)
    const{menu, setMenu} = useContext(MenuContext)

    function UpdateUserFunction (){
        navigation.navigate('UpdateFormUser')
    }

    function Exit (){
        setAuth()
        navigation.navigate('Login')
    }

    return <View style={styles.view}>
        <PhotoUserView>
            <PhotoUserImage source={{uri: `http://192.168.153.23:5000/img/users/${user ? user?.user?.photos : authUser?.user?.photos}`}} />
        </PhotoUserView>
        <InfoUserView>
            <NameUser>{user ? user?.user?.name + " " + user?.user?.surname : authUser?.user?.name + ' ' + authUser?.user?.surname}</NameUser>
            <CityUserView>
                <CityUserImage source={require('../../img/marker.png')} />
                <CityUser>{user ? user?.user?.city : authUser?.user?.city}</CityUser>
            </CityUserView>
            {authUser?.user?.role == 'specialist' ? <Text>Флорист Декоратор</Text> : null}
            {user ? null : <TouchableOpacity style={styles.touchableUpdate} onPress={UpdateUserFunction}>
                {menu == "LK" ? <Text style={styles.updateText}>Редактировать</Text> : null}
            </TouchableOpacity>}
            {user ? null : <TouchableOpacity style={styles.touchableDelete} onPress={Exit}>
                <UpdateUser>
                    <UpdateImage source={require('../../img/exit.png')} />
                </UpdateUser>
            </TouchableOpacity>}

        </InfoUserView>
    </View>
}