import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../styles/global.style';

export default function Profile() {
  return (
    <View style={styles.main}>
      <Text>This is ProfileScreen!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
