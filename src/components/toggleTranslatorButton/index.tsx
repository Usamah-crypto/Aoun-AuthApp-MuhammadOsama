import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import i18n from '../../translations';
import {styles} from './styles';

const TogggleTranslatorButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => i18n.changeLanguage('ar')}>
        <Text style={styles.text}>عربي</Text>
      </TouchableOpacity>
      <Text style={styles.text}> / </Text>
      <TouchableOpacity onPress={() => i18n.changeLanguage('en')}>
        <Text style={styles.text}>Eng</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TogggleTranslatorButton;
