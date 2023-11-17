import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './Navigation/AppNavigation';
import { store } from './redux/store';
import { Provider } from 'react-redux';
// import ToastManager from "expo-react-native-toastify";
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {


  return (
    <RootSiblingParent>
    <Provider store={store}>
      {/* <ToastManager /> */}
      <AppNavigation />
    </Provider>
    </RootSiblingParent>
  );
}


