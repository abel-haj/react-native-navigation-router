import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles/global.style';
import { Button } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.main}>
      <Text>Welcome to the homepage!</Text>
      <StatusBar style="auto" />
      <Button title="Go Inside" onPress={() => navigation.navigate('Stack')} />
    </View>
  );
}
