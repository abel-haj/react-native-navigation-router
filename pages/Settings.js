import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../styles/global.style';

export default function Settings() {
  return (
    <View style={styles.main}>
      <Text>This is SettingsScreen!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
