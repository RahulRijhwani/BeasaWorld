import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  AppState,
  Image,
  View,
  Text,
  Platform,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import CustInput from '../component/CustInput';
import CustButton from '../component/CustButton';
import config from '../config';
import modules from '../modules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      Pass: '',
      fcmData: '',
      ipaddress: '',
      macaddress: '',
      deviceid: '',
      appersion: '',
      devicetype: '',
      brandname: '',
      location: '',
    };
    //config.Constant.showLoader.showLoader();
  }
  componentDidMount = () => {
    DeviceInfo.getIpAddress().then((ip) => {
      console.log('ip = ', ip);
      this.setState({
        ipaddress: ip,
      });
    });
    DeviceInfo.getMacAddress().then((mac) => {
      console.log('mac = ', mac);
      this.setState({
        macaddress: mac,
      });
    });
    console.log('deviceid = ', DeviceInfo.getDeviceId());
    this.setState({
      deviceid: DeviceInfo.getDeviceId(),
    });

    console.log('appersion = ', DeviceInfo.getReadableVersion());
    this.setState({
      appersion: DeviceInfo.getReadableVersion(),
    });

    console.log('brandname = ', DeviceInfo.getBrand());
    this.setState({
      brandname: DeviceInfo.getBrand(),
    });
    this.setState({
      devicetype: Platform.OS,
    });
    this.getLiveLatLong();
  };
  getFcm = async () => {
    await firebaseService
      .messaging()
      .getToken()
      .then((fcmTkn) => {
        console.log('getFcm = ' + fcmTkn);
        this.setState({
          fcmData: fcmTkn,
        });
      })
      .catch((err) => {
        console.log('getFcm' + err);
      });
  };

  verify = async () => {
    debugger;
    if (!this.state.userId) {
      modules.DropDownAlert.showAlert(
        'error',
        'Error',
        'Please fill correct User Id',
      );
      //  try {
      //    await AsyncStorage.setItem('uId', '4');
      //    this.props.navigation.navigate('DrawerNavigator');
      //  } catch (error) {}
    } else if (!this.state.Pass) {
      modules.DropDownAlert.showAlert(
        'error',
        'Error',
        'Please fill correct Password',
      );
    } else {
      const formData = new FormData();
      formData.append('username', this.state.userId);
      formData.append('password', this.state.Pass);
      formData.append('ipaddress', this.state.ipaddress);
      formData.append('macaddress', this.state.macaddress);
      formData.append('deviceid', this.state.deviceid);
      formData.append('appersion', this.state.appersion);
      formData.append('devicetype', this.state.devicetype);
      formData.append('brandname', this.state.brandname);
      formData.append('location', this.state.location);

      debugger;
      config.Constant.showLoader.showLoader();
      var data = await modules.APIServices.PostApiCall(
        config.ApiEndpoint.LOGIN,
        formData,
      );
      config.Constant.showLoader.hideLoader();
      if (data.status == 'Success') {
        modules.DropDownAlert.showAlert(
          'success',
          'Success',
          'Login successfully',
        );
        config.Constant.USER_DATA = {uId: data.uId};
        await AsyncStorage.setItem('uId', data.uId);
        this.props.navigation.replace('Dasboard');
      } else {
        modules.DropDownAlert.showAlert(
          'error',
          'Error',
          'Something went wrong please try again',
        );
      }
    }
  };
  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };
  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
  getLiveLatLong = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      async (position) => {
        this.onMaLocationUpdate(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  onMaLocationUpdate = (lat, lng) => {
    var apiLink =
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      lat +
      ',' +
      lng +
      '&key=AIzaSyAcBd39jf5F36LtrGXmvV8iV6ohuB2RvPQ';

    fetch(apiLink)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.results.length > 0) {
          this.setState({
            location: responseJson.results[0].formatted_address,
          });
        }
      });
  };

  render() {
    const {userId, Pass} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />

        <View>
          <ScrollView
            contentContainerStyle={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <Image
              style={{
                width: config.Constant.SCREEN_WIDTH / 3,
                height: config.Constant.SCREEN_WIDTH / 3,
                alignSelf: 'center',
                marginBottom: 10,
                marginTop:30
              }}
              resizeMode={'contain'}
              source={require('../assets/images/logo3.png')}
            />
            <Text style={styles.fontTitle}>
              We are Thankful to our {'\n'}{' '}
              <Text style={{fontWeight: '700'}}>Prestigious Sponsors</Text>
            </Text>

            <View style={styles.rowViewSponsore}>
              <Image
                source={require('../assets/images/sponsore1.png')}
                resizeMode={'contain'}
                style={{
                  width: config.Constant.SCREEN_WIDTH * 0.13,
                  height: config.Constant.SCREEN_WIDTH * 0.10,
                }}
              />
              <Image
                source={require('../assets/images/sponsore2.png')}
                resizeMode={'contain'}
                style={{
                  width: config.Constant.SCREEN_WIDTH * 0.20,
                  height: config.Constant.SCREEN_WIDTH * 0.12,
                }}
              />
              <Image
                source={require('../assets/images/sponsore3.png')}
                resizeMode={'contain'}
                style={{
                  width: config.Constant.SCREEN_WIDTH * 0.20,
                  height: config.Constant.SCREEN_WIDTH * 0.12,
                }}
              />
              <Image
                source={require('../assets/images/sainath_traders.png')}
                resizeMode={'contain'}
                style={{
                  width: config.Constant.SCREEN_WIDTH * 0.20,
                  height: config.Constant.SCREEN_WIDTH * 0.20,
                }}
              />
              <Image
                source={require('../assets/images/rebeca.png')}
                resizeMode={'contain'}
                style={{
                  width: config.Constant.SCREEN_WIDTH * 0.12,
                  height: config.Constant.SCREEN_WIDTH * 0.16,
                }}
              />
            </View>
            
            <CustInput
              value={userId}
              containerStyle={{
                width: '80%',
                alignSelf: 'center',
                marginVertical: 10,
              }}
              textContainerStyle={config.Constant.COLOR_PRIMARY}
              title={'User Id'}
              onChangeText={(userId) => {
                this.setState({
                  userId,
                });
              }}
            />
            <CustInput
              containerStyle={{
                width: '80%',
                alignSelf: 'center',
              }}
              value={Pass}
              textContainerStyle={config.Constant.COLOR_PRIMARY}
              title={'User Password'}
              onChangeText={(Pass) => {
                this.setState({
                  Pass,
                });
              }}
            />
            <CustButton
              onPress={() => {
                this.verify();
                //this.props.navigation.navigate('OtpScreen');
              }}
              containerStyle={{
                marginTop: 20,
                width: '80%',
                alignSelf: 'center',
              }}
              btnTxt={'Login'}
            />
            <Text style={styles.supportTitle}>Organized By</Text>

            <View style={[styles.rowViewSponsore,{justifyContent:'center'}]}>
              <Image
                source={require('../assets/images/logo1.png')}
                resizeMode={'contain'}
                style={[styles.iconViewSupport]}
              />
              <View style={styles.verticalBorder} />
              <Image
                source={require('../assets/images/logo2.png')}
                resizeMode={'contain'}
                style={styles.iconViewSupport}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowViewSponsore: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  iconViewSupport: {
    width: config.Constant.SCREEN_WIDTH * 0.24,
    height: config.Constant.SCREEN_WIDTH * 0.18,
  },
  verticalBorder: {
    width: 5,
    height: config.Constant.SCREEN_WIDTH * 0.18,
    backgroundColor: '#353535',
    marginHorizontal: 20,
  },
  supportTitle: {
    alignSelf: 'center',
    marginVertical: 15,
    fontSize: 18,
  },
  fontTitle: {
    alignSelf: 'center',
    marginVertical: 15,
    fontSize: 20,
    color: 'black',
    letterSpacing: 0.9,
  },
  iconViewSmall: {
    width: config.Constant.SCREEN_WIDTH * 0.16,
    height: config.Constant.SCREEN_WIDTH * 0.16,
  },
});
