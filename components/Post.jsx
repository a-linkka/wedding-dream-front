import styled from 'styled-components/native'
import {StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Text, View} from "react-native";
import {useState, useEffect, useContext} from "react";
import axios from '../utils/axios'
import {useNavigation} from "@react-navigation/native";
import {CustomContext} from "../utils/context";
import {MenuContext} from "../utils/context";
import {Menu} from "./Menu";
import {AuthUserContext} from "../utils/context";

const styles = StyleSheet.create({
    postsImage: {
     flex: 1,
     resizeMode: "cover",
     aspectRatio: 1,
        width:null,
        height: null
    },

    touchableOpacity: {
        width: '100%',
        display: "flex",
        justifyContent: "center"
    },
    textCLose: {
        width: '100%',
        textAlign: "justify",
        height: 90,
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    textAdd: {
        width: '100%',
        textAlign: "justify",
    },
    body: {
        marginBottom: 60
    },
    userView: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    }
});

const PostView = styled.View`
    width: 100%;
  flex-grow: 1;
  margin-bottom: 10px;
`

// const UserView = styled.View`
//   width: 100%;
//   height: 50px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   margin-left: 10px;
// `

const Username = styled.Text `
    font-weight: bold;
`

const UserImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  margin-right: 10px;
`

const PostImageView = styled.View`
  width: 100%;
  flex: 1;
`

const PostDescriptionView = styled.View`
  padding: 5px 10px 0 10px;
  width: 100%;
  flex: 1;
`

const PostDescriptionEmojiView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 5px;
`

const EmojiImage = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
`

const PostLikesText = styled.Text`
font-weight: bold;
  margin-bottom: 5px;
`

const  PostDescriptionTags = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Tags = styled.Text`
  color: #FF0000;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
`

const PostClose = styled.Text`
  margin-top: 0;
  font-size: 12px;
  color: #a1a1a1;
  text-align: center;
  margin-top: 5px;
`




export const Post = ({clickUser}) => {

    const [expanded, setExpanded] = useState(false);
    const navigation = useNavigation();
    const {user, setUser} = useContext(CustomContext)
    const{menu, setMenu} = useContext(MenuContext)
    const{authUser, setAuthUser} = useContext(AuthUserContext)
    let count = 0

    const ToggleExpand = () => {
        setExpanded(!expanded)
    }
    console.log('clickUser', clickUser)
    console.log(menu)
    const [result, setResult] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (menu == "Home"){
            axios.get('/allPosts')
                .then(function (response) {
                    console.log(response.data)
                    setResult(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        } if (menu == 'LK') {
            axios.get(`/allPosts/${authUser?.user?.id}`)
                .then(function (response) {
                    console.log(response.data)
                    setResult(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
            else if(clickUser){
            axios.get(`/allPosts/${clickUser?.id}`)
                .then(function (response) {
                    console.log(response.data)
                    setResult(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, []);


    function onUser(id){
        axios.get(`/user/${id}`)
            .then(res => {
                navigation.navigate('LK', res.data)
            })

    }

    return <ScrollView style={{height:Dimensions.get('screen').height}}>


        <View style={styles.body}>
            {result.map(post => {
                console.log(`http://192.168.153.23:5000/img/posts/` + post.photo)
                return <PostView key={post?.photo}>
                    <TouchableOpacity
                        style={styles.userView}
                        onPress={() => onUser(post?.userid)}
                    >
                        <UserImage  source={{uri: `http://192.168.153.23:5000/img/users/${post?.photos}`}}/>
                        <Username>{post?.name + ' ' + post?.surname}</Username>
                    </TouchableOpacity>
                    <PostImageView>
                        <Image  source={{uri: `http://192.168.153.23:5000/img/posts/` + post.photo}}
                                style={styles.postsImage}
                        />
                        {/*<Image  source={require('../img/posts/postsPhotos/tild3837-6435-4738-a464-626438623166__u4fd1rpojfy.jpg')}*/}
                        {/*        style={styles.postsImage}*/}
                        {/*/>*/}
                    </PostImageView>
                    <PostDescriptionView>
                        <PostDescriptionEmojiView>
                            <EmojiImage source={require('../img/posts/postsAttributes/likes.png')} />
                            <EmojiImage source={require('../img/posts/postsAttributes/comment.png')}/>
                        </PostDescriptionEmojiView>
                        <PostLikesText>
                            Нравится: 72
                        </PostLikesText>
                        <PostDescriptionTags>
                            <Tags>#{post.tags}</Tags>
                        </PostDescriptionTags>
                        <Text style={ expanded ? styles.textAdd : styles.textCLose}>{post.description}</Text>
                        <TouchableOpacity onPress={ToggleExpand}>
                            <PostClose>
                                {expanded ? "Свернуть" : "Читать далее"}
                            </PostClose>
                        </TouchableOpacity>
                    </PostDescriptionView>
                </PostView>
            })}
        </View>
        {menu == "LK" ? <View style={{width: "100%", backgroundColor: 'white', marginBottom: 200}}></View> : null}
    </ScrollView>
}