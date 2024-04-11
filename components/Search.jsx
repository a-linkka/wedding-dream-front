import styled from 'styled-components/native';
import {View, TextInput, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import {Formik} from "formik";
import axios from "../utils/axios";
import {useNavigation} from "@react-navigation/native";
import {MenuContext} from "../utils/context";
import {useContext} from "react";

const styles = StyleSheet.create({
    viewForm:{
        width: '100%',
        height: 50,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        borderWidth: 1.5,
        borderColor: '#FF0000',
        height: 45,
        width: '85%',
        borderRadius: 10,
        paddingLeft: 10

    },
    button: {
        width: 50,
        height: 45,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        marginLeft: 3
    },
    searchImage: {
        width: 30,
        height: 30
    }

})

const SearchView = styled.View`
  padding: 10px 10px 10px 10px;
  margin-bottom: 15px;
  flex-direction: row;
  height: 70px;
  justify-content: center;
`

export const Search = () => {

    const navigation = useNavigation();
    const{menu, setMenu} = useContext(MenuContext)

    function changeSearch(search){
        console.log(search.search)
        if (search.search != "" & menu == 'Search'){
            axios.post('/getServices', search)
                .then(res => {
                    navigation.navigate('Services', {data: res.data, ...search})
                    console.log({data: res.data, ...search})
                })
        }

    }

    return <SearchView>
        <Formik
            initialValues={{search: ''}}
            onSubmit={(values) => {
                changeSearch(values)
            }}>
            {(props) => (
                <View style={styles.viewForm}>
                    <TextInput
                        value={props.values.search}
                        placeholder='Поиск'
                        onChangeText={props.handleChange('search')}
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        onPress={props.handleSubmit}
                        style={styles.button}
                    >
                        <Image source={require('../img/search.png')} style={styles.searchImage}/>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    </SearchView>
}