import React from "react";
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  AppState,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";

export default class SplashScreen extends React.Component {
  state = {
    appUpdateView: false,
  };

  componentDidMount = async () => {
    try {
      //await AsyncStorage.removeItem('LogBook');

      var uId = await AsyncStorage.getItem("uId");
      if (!!uId) {
        DeviceInfo.getMacAddress().then((mac) => {
          console.log("mac = ", mac);
          this.getCheckData(mac, uId);
        });
      } else {
        setTimeout(() => {
          this.props.navigation.replace("Login");
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        this.props.navigation.replace("Login");
      }, 3000);
    }
  };
  getCheckData = async (macAddress, uId) => {
    const formData = new FormData();
    formData.append("uId", uId);
    formData.append("deviceid", macAddress);

    config.Constant.showLoader.showLoader();
    var data = await modules.APIServices.PostApiCall(
      config.ApiEndpoint.CHECK_LOGIN,
      formData
    );
    config.Constant.showLoader.hideLoader();
    if (data.status == "Success") {
      config.Constant.USER_DATA = { uId: uId };
      this.props.navigation.replace("Dasboard");
    } else {
      this.props.navigation.replace("Login");
    }
  };
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          translucent
          backgroundColor="transparent"
          barStyle={"light-content"}
        />
        <Image
          style={{
            width: config.Constant.SCREEN_WIDTH / 2,
            height: config.Constant.SCREEN_WIDTH / 2,
          }}
          resizeMode={"contain"}
          source={require("../assets/images/logo3.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
