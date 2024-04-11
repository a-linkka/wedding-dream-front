import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from "react-native";
import {useState} from "react";

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 100
    },
    categoryView: {
        backgroundColor: '#ffadad',
        borderRadius: 15,
        width: '100%',
        height: 100,
        justifyContent: "center",
        paddingLeft: 15,
        marginTop: 10
    },
    categoryText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    podcategoryView: {
        backgroundColor: 'rgba(255,173,173,0.29)',
        height: 50,
        width: '100%',
        justifyContent: "center",
        paddingLeft: 15
    }
})

export const Categories = () => {

    const [lady, setLady] = useState(false)
    const [men, setMen] = useState(false)
    const [our, setOur] = useState(false)

    function changeLady(){
        if (lady){
            setLady(false)
        } else {
            setLady(true)
        }
    }

    function changeMen() {
        if (men) {
            setMen(false)
        } else {
            setMen(true)
        }
    }

    function changeOur() {
        if (our) {
            setOur(false)
        } else {
            setOur(true)
        }
    }

            return <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.categoryView} onPress={changeLady}>
                <Text style={styles.categoryText}>Для неё</Text>
            </TouchableOpacity>
                {lady ? <View>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Букет невесты</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Маникюр / Педикюр</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Макияж</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Платье невесты</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Обувь</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Прическа</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Аксессуары</Text>
                    </TouchableOpacity>
                </View> : null}

                <TouchableOpacity style={styles.categoryView} onPress={changeMen}>
                    <Text style={styles.categoryText}>Для него</Text>
                </TouchableOpacity>
                {men ? <View>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Бутаньерка</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Костюм</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Прическа</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Обувь</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Аксессуары</Text>
                    </TouchableOpacity>
                </View> : null}

                <TouchableOpacity style={styles.categoryView} onPress={changeOur}>
                    <Text style={styles.categoryText}>Общее</Text>
                </TouchableOpacity>
                {our ? <View>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Кольца</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Локация</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Ведущий</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Развлечения</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.podcategoryView}>
                        <Text>Декор</Text>
                    </TouchableOpacity>
                </View> : null}

    </ScrollView>
}