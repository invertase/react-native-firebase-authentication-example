import {StyleSheet, View} from 'react-native';
import Phone from '../auth-providers/Phone';

function PhoneSignIn(): JSX.Element {
  return (
    <View style={styles.container}>
      <Phone />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default PhoneSignIn;
