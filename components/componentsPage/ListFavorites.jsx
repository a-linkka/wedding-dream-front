import {Text, View, StyleSheet} from "react-native";
import {Search} from "../Search";
import {FavoritesMenu} from "../FavoritesMenu";

const styles = StyleSheet.create({
    view: {
        height: '100%',
        backgroundColor: 'white'
    }
})

export const ListFavorites = () => {
    return  <View style={styles.view}>
        <FavoritesMenu/>
    </View>
}