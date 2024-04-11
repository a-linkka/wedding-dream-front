import styled from 'styled-components/native'
import {useContext, useState} from "react";
import {TouchableOpacity,  StyleSheet} from "react-native";
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MenuContext} from "../utils/context";


const MenuView = styled.View`
  position: absolute;
  align-items: center;
  height: 60px;
  width: 100%;
  bottom: 0;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 35px 0px 35px;
`
const IconImage = styled.Image`
  height: 25px;
  width: 25px;
`

export const Menu = () => {

    const navigation = useNavigation();

    const [home, setHome] = useState(require('../img/home.png'))
    const [search, setSearch] = useState(require('../img/searchMenu.png'))
    const [favorite, setFavorite] = useState(require('../img/favoriteMenu.png'))
    const [user, setUser] = useState(require('../img/userColor.png'))
    const{menu, setMenu} = useContext(MenuContext)
    console.log(menu)


    const clearImage = () => {
        setHome(require('../img/home.png'))
        setSearch(require('../img/searchMenu.png'))
        setFavorite(require('../img/favoriteMenu.png'))
        setUser(require('../img/user.png'))
    }

    const changeHomeImage = () => {
        clearImage()
        setHome(require('../img/homeColor.png'))
        navigation.navigate('Posts')
        setMenu("Home")
    }

    const changeSearchImage = () => {
        clearImage()
        setSearch(require('../img/searchMenuColor.png'))
        navigation.navigate('ListSearch')
        setMenu("Search")
    }
    const changeFavoriteImage = () => {
        clearImage()
        setFavorite(require('../img/favoriteMenuColor.png'))
        navigation.navigate('Favorites')
        setMenu("Favorite")
    }
    const changeUserImage = () => {
        clearImage()
        setUser(require('../img/userColor.png'))
        navigation.navigate('LK')
        setMenu("LK")
    }

    return <MenuView>
        <TouchableOpacity onPress={changeHomeImage} style={styles.areaClick} >
            <IconImage source={home} />
        </TouchableOpacity>

        <TouchableOpacity onPress={changeSearchImage} style={styles.areaClick}>
            <IconImage source={search} />
        </TouchableOpacity>
        <TouchableOpacity onPress={changeFavoriteImage} style={styles.areaClick}>
            <IconImage source={favorite} />
        </TouchableOpacity>
        <TouchableOpacity onPress={changeUserImage} style={styles.areaClick}>
            <IconImage source={user} />
        </TouchableOpacity>
    </MenuView>
}

const styles = StyleSheet.create({
    areaClick: {
        width: 40,
        height: 25,
        alignItems: "center",
        justifyContent: "center"
    }
});