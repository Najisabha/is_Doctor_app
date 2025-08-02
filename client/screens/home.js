import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text> الصفحة الرئيسية </Text>
      <Button 
        title="صفحة الأطباء"
        onPress={() => navigation.navigate('doctor')} 
      />
        <Button 
            title="تسجيل الدخول"
            onPress={() => navigation.navigate('signup')}
            style={{ marginTop: 20 }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
