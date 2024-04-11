import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
    useWindowDimensions,
    SafeAreaView,
    Animated,
    RefreshControl
} from "react-native";
import {useContext, useEffect, useState} from "react";
import axios from "../../utils/axios";
import {MenuContext} from "../../utils/context";
import {AuthUserContext} from "../../utils/context";


const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        display: "flex",
        flexDirection: "row",
        gap: 3,
        flexWrap: "wrap",
        marginBottom: 80
    },
    touchable: {
        flexBasis: '30%',
        aspectRatio: 1,
        flex:1,
        backgroundColor: 'white'
    },
    image:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover"
    },
    modal:{
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255,0.34)"
    },
    imageModal:{
        width: 350,
        height: 350
    }
})

export const Portfolio = () => {

    const{menu, setMenu} = useContext(MenuContext)
    const{authUser, setAuthUser} = useContext(AuthUserContext)
    const [photo, setPhoto] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        if (menu == 'LK') {
            axios.get(`/getPortfolio/${authUser.user.id}`)
                .then(function (response) {
                    // console.log(response.data);
                    setPhoto(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }, [menu]);

    const[imagePress, setImagePress] = useState(null)

    function handleImagePress(image){
        setImagePress(image)
    }

    const handleCloseModal = () => {
        setImagePress(null);
    };

    const{width: deviceWidth} = useWindowDimensions()

    const handleRefresh = () => {

        setIsRefreshing(true);
        axios.get(`/getPortfolio/${authUser.user.id}`)
            .then(function (response) {
                // console.log(response.data);
                setPhoto(response?.data)
            })
            .catch(function (error) {
                console.log(error);
            })
        setIsRefreshing(false);
    };


    return <ScrollView refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
    }>

    <View style={styles.view}>
        {photo.map( i => {
            return <TouchableOpacity
                style={styles.touchable}
                key={i?.id}
                onPress={() => handleImagePress(i?.photo)}
            >
            <Image source={{uri: `http://192.168.1.38:5000/img/portfolio/${i?.photo}`}} style={styles.image} />
            </TouchableOpacity>
        })}
        <TouchableOpacity style={styles.touchable}>

        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>

        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>

        </TouchableOpacity>
        <Modal visible={imagePress !== null} transparent={true}>
            <View style={styles.modal}>
                <TouchableOpacity onPress={handleCloseModal}>
                    <Animated.Image source={{uri: `http://192.168.1.38:5000/img/portfolio/${imagePress}`}} style={styles.imageModal} />
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
    </ScrollView>
}