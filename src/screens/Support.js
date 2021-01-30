import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  Image,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import config from '../config';
import Header from '../component/header';

const resourceType = 'url';
export default class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Link: 'http://quickyfly.supersoftsolutions.com/guidepdf.ashx?Id=2',
    };
  }
  componentWillMount = async () => {
    //this.getUrl();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          translucent
          backgroundColor="transparent"
          barStyle={'light-content'}
        />
        <Header title={'Support'} />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.centerView}>
            <View style={[styles.rowView, {paddingTop: 0}]}>
              <Image
                //source={require('../assets/images/logo3.png')}
                resizeMode={'contain'}
                style={styles.iconView}
              />
              <Image
                source={require('../assets/images/logo3.png')}
                resizeMode={'contain'}
                style={[
                  styles.iconView1,
                  {
                    marginHorizontal: 15,
                    marginTop: 10,
                  },
                ]}
              />
              <Image
                //source={require('../assets/images/logo2.png')}
                resizeMode={'contain'}
                style={styles.iconView}
              />
            </View>
            <View style={styles.centerView}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.rowViewContact}>
                  <Text style={styles.fontStyleTitle}>Helpline</Text>
                  <Text
                    onPress={() => {
                      Linking.openURL(`tel:9913017000`);
                    }}
                    style={styles.fontStyle}>
                    9913017000,{' '}
                    <Text
                      onPress={() => {
                        Linking.openURL(`tel:9913418000`);
                      }}
                      style={styles.fontStyle}>
                      9913418000
                    </Text>
                  </Text>
                </View>
                <Text
                  onPress={() => {
                    Linking.openURL(`https://www.beasa.in/`);
                  }}
                  style={styles.fontStyleTitle}>
                  www.beasa.in
                </Text>
              </View>
            </View>
            <Text style={styles.supportTitle}>Organized By</Text>
            <View style={[styles.rowViewSponsore, {justifyContent: 'center'}]}>
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
            <Text style={styles.supportTitle}>Sponsored By</Text>
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
            <Text style={styles.supportTitle}>Supported with</Text>
            <View style={[styles.rowViewSupport, {width: '90%'}]}>
              <Image
                source={require('../assets/images/SSILOGO.png')}
                resizeMode={'contain'}
                style={{
                  width: config.Constant.SCREEN_WIDTH * 0.19,
                  height: config.Constant.SCREEN_WIDTH * 0.19,
                }}
              />
              <Image
                source={require('../assets/images/artbeauty.png')}
                resizeMode={'contain'}
                style={{
                  width: config.Constant.SCREEN_WIDTH * 0.14,
                  height: config.Constant.SCREEN_WIDTH * 0.14,
                }}
              />
              <Image
                source={require('../assets/images/LTA.png')}
                resizeMode={'contain'}
                style={styles.iconViewBottom}
              />
              <Image
                source={require('../assets/images/impretions.png')}
                resizeMode={'contain'}
                style={styles.iconViewBottom}
              />
            </View>
            <View style={styles.rowViewSupport}>
              <Image
                source={require('../assets/images/support1.png')}
                resizeMode={'contain'}
                style={styles.iconViewBottom}
              />
              <Image
                source={require('../assets/images/support2.png')}
                resizeMode={'contain'}
                style={styles.iconViewBottom}
              />
              <Image
                source={require('../assets/images/support3.png')}
                resizeMode={'contain'}
                style={[
                  styles.iconViewBottom,
                  {
                    width: config.Constant.SCREEN_WIDTH * 0.16,
                    height: config.Constant.SCREEN_WIDTH * 0.16,
                  },
                ]}
              />
              <Image
                source={require('../assets/images/support4.png')}
                resizeMode={'contain'}
                style={styles.iconViewBottom}
              />
              <Image
                source={require('../assets/images/support5.png')}
                resizeMode={'contain'}
                style={styles.iconViewBottom}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  rowView: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  rowViewSupport: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  rowViewSponsore: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  iconView: {
    width: config.Constant.SCREEN_WIDTH * 0.18,
    height: config.Constant.SCREEN_WIDTH * 0.18,
  },
  iconViewBottom: {
    width: config.Constant.SCREEN_WIDTH * 0.18,
    height: config.Constant.SCREEN_WIDTH * 0.18,
  },
  iconViewSmall: {
    width: config.Constant.SCREEN_WIDTH * 0.18,
    height: config.Constant.SCREEN_WIDTH * 0.18,
  },
  iconViewSupport: {
    width: config.Constant.SCREEN_WIDTH * 0.18,
    height: config.Constant.SCREEN_WIDTH * 0.18,
  },
  iconView1: {
    width: config.Constant.SCREEN_WIDTH * 0.22,
    height: config.Constant.SCREEN_WIDTH * 0.22,
  },
  titleTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  descTxt: {
    fontSize: 20,
    color: 'black',
  },
  rowViewContact: {
    width: '80%',
    //alignSelf:'center',
    //flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  fontStyle: {
    fontSize: 18,
    color: config.Constant.COLOR_BLACK,
    letterSpacing: 0.98,
    fontWeight: '700',
    marginVertical: 5,
    alignSelf: 'center',
  },
  fontStyleTitle: {
    fontSize: 20,
    color: '#d90076',
    fontWeight: '700',
    alignSelf: 'center',
  },
  supportTitle: {
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  verticalBorder: {
    width: 5,
    height: config.Constant.SCREEN_WIDTH * 0.18,
    backgroundColor: '#353535',
    marginHorizontal: 20,
  },
});
