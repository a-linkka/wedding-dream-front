import styled from "styled-components/native";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Services} from "./Services";
import {Post} from "./Post";

const styles = StyleSheet.create({
    tab: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.03)'
    },
    tabActive: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        width: '50%'
    },
    view: {
        height: '100%',
        backgroundColor: 'white'
    }
})


const MenuFavoritesView = styled.View`
width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
`

const TabImage = styled.Image`
width: 25px;
  height: 25px;
`

export const FavoritesMenu = () => {
    const navigation = useNavigation();

    const[services, setServices] = useState(require('../img/cartColor.png'))
    const[posts, setPosts] = useState(require('../img/post.png'))
    const[active, setActive] = useState(true)

    function changeServices(){
        setServices(require('../img/cartColor.png'))
        setPosts(require('../img/post.png'))
        setActive(true)
    }

    function changePosts(){
        setPosts(require('../img/postColor.png'))
        setServices(require('../img/cart.png'))
        setActive(false)
    }

    return <View style={styles.view}>
                <MenuFavoritesView>
                    <TouchableOpacity onPress={changeServices} style={styles.touchable}>
                        <View style={active ? styles.tabActive : styles.tab}>
                            <TabImage source={services}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changePosts} style={styles.touchable}>
                        <View style={active ? styles.tab : styles.tabActive}>
                            <TabImage source={posts} />
                        </View>
                </TouchableOpacity>
                </MenuFavoritesView>
        {active ? <Services/> : <Post/> }
    </View>
}