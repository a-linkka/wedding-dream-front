import {Search} from "../Search";
import {Services} from "../Services";
import styled from "styled-components/native";

const View = styled.View`
  box-sizing: border-box;
  background-color: white;
`

const CountProduct = styled.Text`
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
  color: #dcdcdc;
`

export const ListServices = () => {
    return <View>
                <Search/>
                <Services/>
    </View>

}