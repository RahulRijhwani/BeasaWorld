import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
  ScrollView,
  Image,
  Linking,
} from 'react-native';

import Config from '../config/index';
import {getStatusBarHeight} from '../Util/Utilities';
import config from '../config/index';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {color} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import Dash from 'react-native-dash';
import moment from 'moment';
import Share from 'react-native-share';

export default class CustDrawer extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    popupDisplay: false,
    imageChange: true,
    dialogVisible: false,
  };

  render() {
    const userImage = '';
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: getStatusBarHeight() + 10,width:'100%',backgroundColor:config.Constant.COLOR_PRIMARY}} />
        <Text style={styles.itemHeaderTxt}>{'QuickyFly'}</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{width: '100%', flex: 1,backgroundColor:'white'}}>
          <TouchableOpacity
            onPress={() => {
              this.props.props.navigation.closeDrawer();

              this.props.props.navigation.navigate('Profile');
            }}
            activeOpacity={0.6}
            style={[
              styles.itemContainer,
              {
                marginTop: 10,
                flexDirection: 'row',
                width: '95%',
                borderBottomWidth: 0,
                borderStyle: 'dotted',
                paddingBottom: 20,
                alignItems: 'center',
                borderRadius: 1,
              },
            ]}>
            {!!config.Constant.USER_DATA && !!config.Constant.USER_DATA.logo ? (
              <FastImage
                source={{uri: config.Constant.USER_DATA.logo}}
                resizeMode={`cover`}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  borderWidth:1,
                  borderColor:config.Constant.COLOR_PRIMARY,
                  padding:10,
                }}
              />
            ) : (
              <Image
                source={require('../assets/images/shop.png')}
                resizeMode={`cover`}
                style={{
                  width: 80,
                  height: 80,
                  tintColor: config.Constant.COLOR_PRIMARY,
                  backgroundColor: config.Constant.COLOR_WHITE,
                  borderRadius: 100,
                }}
              />
            )}
            <View style={{paddingHorizontal: 10, flex: 1}}>
              <Text
                style={[
                  styles.itemTxt,
                  {fontSize: 13, marginBottom: 5, flexWrap: 'wrap'},
                ]}>{`${
                !!config.Constant.USER_DATA && !!config.Constant.USER_DATA.Email ?config.Constant.USER_DATA.Email:' - '
              }`}</Text>
              <Text style={[styles.itemTxt, {fontSize: 13}]}>{`${
                !!config.Constant.USER_DATA && !!config.Constant.USER_DATA.Mobile ?'+91 '+config.Constant.USER_DATA.Mobile:' - '
              }`}</Text>
            </View>
          </TouchableOpacity>
          <Dash
            dashColor={config.Constant.COLOR_BORDER}
            style={{width: '95%', alignSelf: 'center', height: 1}}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.props.navigation.closeDrawer();
              this.props.props.navigation.navigate('Wallet');
            }}
            activeOpacity={0.6}
            style={[styles.itemContainer, {marginTop: 25}]}>
            <Text style={styles.itemTxt}>
              {`Premium - ${
                !!config.Constant.USER_DATA &&
                !!config.Constant.USER_DATA.Membership_Status ?config.Constant.USER_DATA.Membership_Status:'-'
              } `}
              {!!config.Constant.USER_DATA &&
                config.Constant.USER_DATA.Membership_Status == 'Active' &&
                ` - upto ${moment(
                  config.Constant.USER_DATA.Renew_Date,
                  'DD-MM-YYYY',
                ).format('Do MMM')}`}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              this.props.props.navigation.closeDrawer();
              this.props.props.navigation.navigate('SavedImage');
            }}
            activeOpacity={0.6}
            style={[styles.itemContainer]}>
            <Text style={styles.itemTxt}>{'Downloads'}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              this.props.props.navigation.closeDrawer();
              this.props.props.navigation.navigate('AddMoney');
            }}
            activeOpacity={0.6}
            style={[styles.itemContainer]}>
            <Text style={styles.itemTxt}>{'Packages'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.props.navigation.closeDrawer();
              this.props.props.navigation.navigate('Guide');
            }}
            activeOpacity={0.6}
            style={[styles.itemContainer]}>
            <Text style={styles.itemTxt}>{'Guide'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.props.navigation.closeDrawer();
              this.props.props.navigation.navigate('QA');
            }}
            activeOpacity={0.6}
            style={[styles.itemContainer]}>
            <Text style={styles.itemTxt}>{'Q & A'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.props.navigation.closeDrawer();
              shareAppOptions = {
                url: 'https://play.google.com/store/apps/details?id=com.pginfotech.quickyfly'
              };
              Share.open(shareAppOptions)
            }}
            activeOpacity={0.6}
            style={[styles.itemContainer]}>
            <Text style={styles.itemTxt}>{'Share Quickyfly App'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('mailto:info@quickyfly.com');
            }}
            activeOpacity={0.6}
            style={[styles.itemContainer]}>
            <Text style={styles.itemTxt}>{'Contact Us'}</Text>
            <Text style={[styles.itemTxt, {fontSize: 13, marginTop: 5}]}>
              {'info@quickyfly.com'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Logout', `Are you sure you want logout`, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Logout',
                  onPress: async () => {
                    try {
                      await AsyncStorage.removeItem('uId');
                    } catch (error) {}
                    this.props.props.navigation.dispatch(
                      StackActions.replace('Login'),
                    );
                  },
                },
              ]);
            }}
            activeOpacity={0.6}
            style={[styles.itemContainer, {borderBottomWidth: 0}]}>
            <Text style={styles.itemTxt}>{'Logout'}</Text>
          </TouchableOpacity>
        </ScrollView>
        <Text style={styles.itemBottomTxt}>{'Version : 3.0'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Config.Constant.COLOR_WHITE,
    alignItems: 'center',
    paddingTop: 0,
  },
  itemContainer: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: config.Constant.COLOR_BORDER,
  },
  itemTxt: {
    color: config.Constant.COLOR_BLACK,
    fontSize: 15,
  },
  innerIcon: {
    width: config.Constant.SCREEN_WIDTH * 0.08,
    height: config.Constant.SCREEN_WIDTH * 0.08,
    marginRight: 10,
    tintColor: config.Constant.COLOR_PRIMARY,
  },

  itemBottomTxt: {
    color: config.Constant.COLOR_BLACK,
    fontSize: 14,
    width: '90%',
    textAlign: 'left',
    alignSelf: 'center',
    marginBottom: 10,
  },
  itemHeaderTxt: {
    color: 'white',
    backgroundColor: config.Constant.COLOR_PRIMARY,
    fontSize: 19,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});
