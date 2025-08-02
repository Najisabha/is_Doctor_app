import React from 'react';
import { ScrollView, StyleSheet, View, Text, KeyboardAvoidingView , Button } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import ProfileForm from '../components/profileForm';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/authStyles';

export default function SignUpScreen(props) {
  const { navigation } = props;

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* مقدمة تسجيل حساب جديد */}
        <View style={localStyles.content}>
          <Icon name="user" size={50} color="#f50" />
          <Text style={localStyles.title}>تسجيل حساب جديد</Text>
        </View>
        {/* نموذج تسجيل الحساب */}
        <ProfileForm />
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
  content: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
