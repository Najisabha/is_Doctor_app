import React, { useState , useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, KeyboardAvoidingView, Button, Alert } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import ProfileForm from '../components/profileForm';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/authStyles';
import axios from '../config/axios';
import * as Location from 'expo-location';
import Loader from '../components/Loader';
import AppAlert from '../components/AppAlert';
export default function SignUpScreen(props) {
  const { navigation } = props;

  const [Location , setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert , setAlert] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'alert',
    okText: 'حسناً',
    cancelText: 'إلغاء',
    onClose: () => {},
    onConfirm: () => {}
  });
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const _signIn = async (values) => {
    setLoading(true);
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      userType: values.userType ? 'doctor' : 'patient',
      specialization: values.specialization,
      workingHours: values.workingHours,
      location: values.location,
      latitude: values.latitude,
      longitude: values.longitude
    };
    try {
      const response = await axios.post('/auth/signup', body);
      if (response.status === 201) {
        navigation.navigate('Login');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error during sign up:', error);
      setLoading(false);
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'حدث خطأ أثناء إنشاء الحساب');
      }
      setAlert({
        visible: true,
        title: 'خطأ',
        message: error.response ? error.response.data.message : 'حدث خطأ أثناء إنشاء الحساب',
        type: 'alert',
        okText: 'حسناً',
        onClose: () => {
          setAlert({ ...alert, visible: false });
        }
      });
      setVisible(true);
    }
  }
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Loader loading={loading} title="جاري إنشاء الحساب..." />
        <AppAlert visible={visible} title={alert.title} message={alert.message} type={alert.type} onClose={() => setVisible(false)} />
        {/* مقدمة تسجيل حساب جديد */}
        <View style={localStyles.content}>
          <Icon name="user" size={50} color="#f50" />
          <Text style={localStyles.title}>تسجيل حساب جديد</Text>
        </View>

        {/* نموذج تسجيل الحساب */}
        <KeyboardAvoidingView behavior="padding" style={{ width: '100%' }} enabled>
          <View style={styles.formContainer}>
            <ProfileForm submit={(values => _signUp(values))} />
          </View>
        </KeyboardAvoidingView>
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
