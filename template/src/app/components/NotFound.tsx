import {useLinkTo} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAppSettings} from './AppSettings';

export const NotFound = () => {
  const appSettings = useAppSettings();
  const linkTo = useLinkTo();

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.sectionTitle}>
        {appSettings.t('PageNotFoundText')}
      </Text>
      <View style={styles.spacer} />
      <Button onPress={() => linkTo('/')}>{appSettings.t('home')}</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
});
