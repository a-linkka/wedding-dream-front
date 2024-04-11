import styled from "styled-components/native";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {useState} from "react";
import {Services} from "../Services";
import {Post} from "../Post";
import {Portfolio} from "./Portfolio";

const styles = StyleSheet.create({
    tab: {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.03)',
        flex: 1
    },
    tabActive: {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
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
  flex-wrap: wrap;
`

const TabImage = styled.Image`
width: 25px;
  height: 25px;
`

export const MenuSpecialist = ({onChildData, clickUser}) => {
    console.log('Из поста в меню:', clickUser)

    const[services, setServices] = useState(require('../../img/serviceColor.png'))
    const[posts, setPosts] = useState(require('../../img/post.png'))
    const[portfolio, setPortfolio] = useState(require('../../img/briefcase.png'))
    const[active, setActive] = useState('services')

    function changeServices(){
        setServices(require('../../img/serviceColor.png'))
        setPosts(require('../../img/post.png'))
        setPortfolio(require('../../img/briefcase.png'))
        setActive('services')
        onChildData('service')
    }

    function changePosts(){
        setPosts(require('../../img/postColor.png'))
        setServices(require('../../img/service.png'))
        setPortfolio(require('../../img/briefcase.png'))
        setActive('posts')
        onChildData('post')
    }
    function changePortfolio(){
        setPortfolio(require('../../img/briefcaseColor.png'))
        setServices(require('../../img/service.png'))
        setPosts(require('../../img/post.png'))
        setActive('portfolio')
        onChildData('portfolio')
    }

    return <View style={styles.view}>
        <MenuFavoritesView>
            <TouchableOpacity onPress={changeServices} style={active === 'services' ? styles.tabActive : styles.tab}>
                    <TabImage source={services}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={changePosts} style={active === 'posts' ? styles.tabActive : styles.tab}>
                    <TabImage source={posts} />
            </TouchableOpacity>
            <TouchableOpacity onPress={changePortfolio} style={active === 'portfolio' ? styles.tabActive : styles.tab}>
                    <TabImage source={portfolio} />
            </TouchableOpacity>
        </MenuFavoritesView>
        {active === 'services' ? <Services clickUser={clickUser}/> : null }
        {active === 'posts' ? <Post clickUser={clickUser}/> : null }
        {active === 'portfolio' ? <Portfolio/> : null }
    </View>
}