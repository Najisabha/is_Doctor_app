import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-web';
export default function doctorScreen() {
  return (
    <ScrollView>
        <View style={styles.container}>
            <Text> صفحة الأطباء </Text>
            <Button
                title="صفحة الرئيسية"
                onPress={() => navigation.navigate('home')}
            />
            <Button
                title="تسجيل الدخول"
                onPress={() => navigation.navigate('signup')}
                style={{ marginTop: 20 }}
            />
        </View>
    </ScrollView>
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
