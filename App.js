import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native'
import {ListServices} from "./components/componentsPage/ListServices";
import { StyleSheet, Pressable, View} from 'react-native';
import {Menu} from "./components/Menu";
import {ListPosts} from "./components/componentsPage/ListPosts";
import {ListFavorites} from "./components/componentsPage/ListFavorites";
import {ClientPage} from "./components/componentsPage/ClientPage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {Services} from "./components/Services";
import {Post} from "./components/Post";
import {UpdateFormsUser} from "./components/LK/UpdateFormsUser";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {AuthContext} from "./utils/context";
import {Login} from "./components/auth/Login";
import {useContext} from "react";
import {Registration} from "./components/auth/Registration";
import {FormContext} from "./utils/context";
import {AddForm} from "./components/LK/AddForm";
import {OneService} from "./components/OneService";
import {ListSearch} from "./components/componentsPage/ListSearch";
import {AddPosts} from "./components/LK/AddPost";

export default function App() {

    const Stack = createNativeStackNavigator();
    const{auth, setAuth} = useContext(AuthContext)
    const{form, setForm} = useContext(FormContext)
    console.log(form)


  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Posts">
              <Stack.Screen name="Posts"
                            component={ListPosts}
                            options={{ headerShown: false,
                            transitionSpec: false }} />
              <Stack.Screen name="Services"
                            component={ListServices}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="Favorites"
                            component={ListFavorites}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="LK"
                            component={ClientPage}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="UserFavoriteServices"
                            component={Services}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="UserFavoritePosts"
                            component={Post}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="UpdateFormUser"
                            component={UpdateFormsUser}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="Login"
                            component={Login}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="Registration"
                            component={Registration}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="AddForm"
                            component={AddForm}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="OneService"
                            component={OneService}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="ListSearch"
                            component={ListSearch}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
              <Stack.Screen name="AddPost"
                            component={AddPosts}
                            options={{ headerShown: false,
                            transitionSpec: false}}/>
          </Stack.Navigator>
          {/*<StatusBar theme='auto'/>*/}
          {auth ? <Menu/> : form == 'Login' ? <Login/> : <Registration/>}
      </NavigationContainer>
      </GestureHandlerRootView>
  );
}


