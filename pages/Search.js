import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../styles/global.style';

export default function Search() {
  return (
    <View style={styles.main}>
      <Text>This is Search Screen!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
