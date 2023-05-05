import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles/global.style';
import { Button } from 'react-native';

export default function StackScreen({ navigation }) {
  return (
    <View style={styles.main}>
      <Text>Welcome!</Text>
      <Text>This is another screen, inside the home stack</Text>
      <StatusBar style="auto" />
      <Button title="Go Back" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
