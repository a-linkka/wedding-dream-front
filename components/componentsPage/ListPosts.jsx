import styled from 'styled-components/native'
import {Dimensions, ScrollView} from "react-native";
import {Post} from "../Post";
import {Search} from "../Search";

const ListPostView = styled.View`
background-color: white;
  height: 100%;
`

export const ListPosts = () => {
    return <ListPostView>
        {/*<Search/>*/}
            <Post/>
    </ListPostView>
}