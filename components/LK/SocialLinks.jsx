import {View, StyleSheet, TouchableOpacity, Linking} from "react-native";
import styled from "styled-components/native";
import {AuthUserContext} from "../../utils/context";
import {useContext} from "react";

const styles = StyleSheet.create({
    container:{
      display: "flex",
      flexDirection: "row"
    },
    button:{
        width: "32%",
        height: 40,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#FF0000',
        justifyContent: "center",
        alignItems: "center"
    }
})

const SocialLinksView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 10px 10px 10px;
  justify-content: space-between;
  
`

const LinksImage = styled.Image`
  width: 25px;
  height: 25px;
`

export const SocialLinks = ({clickUser}) => {

    const {authUser, setAuthUser} = useContext(AuthUserContext)

    const handleExternalLink = (url) => {
        Linking.openURL(url);
    }

    return <SocialLinksView>

            <TouchableOpacity style={styles.button} onPress={() => handleExternalLink(clickUser ? clickUser?.vk : authUser?.links?.vk)}>
                <LinksImage source={require('../../img/vk.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleExternalLink(clickUser ? clickUser?.viber : authUser?.links?.viber)}>
                <LinksImage source={require('../../img/viber.png')} />
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => handleExternalLink(clickUser ? clickUser?.telegram : authUser?.links?.telegram)}>
                <LinksImage source={require('../../img/telegram.png')} />
            </TouchableOpacity>

    </SocialLinksView>
}