import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Phone from '../auth-providers/Phone';

function PhoneSignIn(): JSX.Element {
  const theme = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.colors.backdrop}]}>
      <Phone />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default PhoneSignIn;
