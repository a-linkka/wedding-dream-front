import {View, StyleSheet} from "react-native";
import {Search} from "../Search";
import {Categories} from "../Categories";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    }
})

export const ListSearch = () => {
    return <View style={styles.container}>
        <Search/>
        <Categories/>
    </View>
}