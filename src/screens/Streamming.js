import React from "react";
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  AppState,
} from "react-native";
import config from "../config";
import Header from "../component/header";
import ZoomUs from "react-native-zoom-us";
import modules from "../modules";
import CustButton from "../component/CustButton";
import { ConfirmDialog } from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddLog, EndLog, UploadData } from "../Util/Utilities";
const resourceType = "url";
export default class Streamming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      liveUser: 0,
      appState: AppState.currentState,
      myTxt: "",
    };
  }

  componentDidMount = async () => {
    this.GetliveUser();

    this.props.navigation.addListener("focus", () => {
      console.log("Start Strame");
    });
    this.props.navigation.addListener("blur", () => {
      console.log("Stop Strame");
      EndLog();
    });
    AppState.addEventListener("change", this._handleAppStateChange);

    //this.getUrl();
    AppState.removeEventListener("change", this._handleAppStateChange);
  };
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
    } else {
      try {
        EndLog();
      } catch (error) {}
    }
    this.setState({ appState: nextAppState });
  };
  getMeetingId = async () => {
    const formData = new FormData();

    formData.append("uId", config.Constant.USER_DATA.uId);

    config.Constant.showLoader.showLoader();
    var data = await modules.APIServices.PostApiCall(
      config.ApiEndpoint.MEETING_ID,
      formData
    );
    config.Constant.showLoader.hideLoader();
    if (!!data) {
      await ZoomUs.initialize(
        {
          clientKey: "JfsdG0at3p1Z58sOTp4iHiSdrIHOGH36CLuG",
          clientSecret: "YHxsgpEzVgwYyW1HlBNfTwaEdpoQHUCqi8l4",
        },
        {
          disableShowVideoPreviewWhenJoinMeeting: true,
        }
      );
      AddLog();
      await ZoomUs.joinMeeting({
        userName: data.Name,
        meetingNumber: data.Meeting_ID,
        password: data.Password,
        participantID: config.Constant.USER_DATA.uId,

        // userId: config.Constant.USER_DATA.uId,
        // zoomAccessToken: 'zak',
        // userType: 2, // optional
      });
    } else {
      modules.DropDownAlert.showAlert(
        "error",
        "Error",
        "Something went wrong please try again"
      );
    }
  };
  GetliveUser = async () => {
    const formData = new FormData();

    formData.append("uId", config.Constant.USER_DATA.uId);
    config.Constant.showLoader.showLoader();
    var data = await modules.APIServices.PostApiCall(
      config.ApiEndpoint.LIVE_USER,
      formData
    );
    config.Constant.showLoader.hideLoader();
    if (!!data && data.status && data.status == "Success") {
      this.setState({
        liveUser: data.count,
        myTxt: !!data.text ? data.text : "",
      });
    } else {
    }
  };
  Logoutmethod = () => {
    this.setState({ dialogVisible: false });
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() =>
        this.props.navigation.reset({
          index: 1,
          routes: [{ name: "Login" }],
        })
      );
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
        <Header
          onPressRight={() => {
            this.setState({
              dialogVisible: true,
            });
          }}
          title={"Streaming"}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: "100%" }}>
            <Text style={[styles.fontStyleTitle, { textAlign: "center" }]}>
              {this.state.myTxt}
            </Text>
            <CustButton
              onPress={() => {
                this.getMeetingId();
                //this.props.navigation.navigate('OtpScreen');
              }}
              containerStyle={{
                width: "90%",
                height: 40,
                alignSelf: "center",
              }}
              btnTxt={"Join Video Hangout"}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                alignSelf: "center",
                width: "100%",
              }}
            >
              <Image
                resizeMode={"contain"}
                style={{ width: 100, height: 100, marginHorizontal: 0 }}
                source={require("../assets/images/svg_eye.gif")}
              />
              <Text style={styles.fontStyleTitle}>{this.state.liveUser}</Text>
            </View>
            <CustButton
              onPress={() => {
                UploadData(true);
                //this.props.navigation.navigate('OtpScreen');
              }}
              containerStyle={{
                width: "90%",
                height: 40,
                alignSelf: "center",
              }}
              btnTxt={"Submit Records"}
            />
          </View>
        </View>
        <ConfirmDialog
          title=""
          message={"Are you sure you want to logout ?"}
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({ dialogVisible: false })}
          positiveButton={{
            title: "Logout",
            onPress: () => this.Logoutmethod(),
          }}
          negativeButton={{
            title: "Cancel",
            onPress: () => this.setState({ dialogVisible: false }),
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rowView: {
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingBottom: 30,
  },
  iconView: {
    width: config.Constant.SCREEN_WIDTH * 0.4,
    height: config.Constant.SCREEN_WIDTH * 0.4,
  },
  fontStyleTitle: {
    fontSize: 18,
    marginVertical: 20,
    color: "#d90076",
    fontWeight: "700",
    alignSelf: "center",
  },
});
