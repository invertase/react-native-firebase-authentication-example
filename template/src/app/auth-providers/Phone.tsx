import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  AsYouType,
  CountryCode,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import {Fragment, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import {Button, Paragraph, TextInput, useTheme} from 'react-native-paper';
import {useAlerts} from 'react-native-paper-alerts';

import {useAppSettings} from '../components/AppSettings';

type ConfirmationRef =
  | ((
      verificationCode: string,
    ) => Promise<FirebaseAuthTypes.UserCredential | null>)
  | null;

function Phone(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const confirmationRef = useRef<ConfirmationRef>(null);
  const [number, setNumber] = useState('+1 ');
  const [verification, setVerification] = useState('');

  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState<Country>();
  const [visible, setVisible] = useState<boolean>(false);

  const theme = useTheme();
  const appSettings = useAppSettings();
  const Alert = useAlerts();

  const onSelect = (newCountry: Country) => {
    setCountryCode(newCountry.cca2);
    setCountry(newCountry);
    setNumber(`+${newCountry.callingCode[0]} `);
  };

  async function handlePhoneAuth() {
    if (!loading && confirmationRef) {
      setLoading(true);
      try {
        const result = await auth().signInWithPhoneNumber(number);
        confirmationRef.current = result.confirm.bind(result);
      } catch (e) {
        setLoading(false);
        confirmationRef.current = null;
        const error = e as FirebaseAuthTypes.PhoneAuthError;
        Alert.alert(
          appSettings.t('phone-auth-error'),
          appSettings.t(error.code ?? 'unknownError'),
          [{text: appSettings.t('OK')}],
        );
      }
    }
  }

  function handleNumber(text: string) {
    const parsed = new AsYouType().input(text);
    setNumber(parsed);
  }

  function isValid() {
    const phoneNumber = parsePhoneNumberFromString(
      number,
      ((country && country.cca2) || 'US') as CountryCode,
    );
    if (phoneNumber) {
      return phoneNumber.isValid();
    }

    return false;
  }

  async function handleVerification() {
    if (!loading && confirmationRef.current) {
      setLoading(true);
      try {
        await confirmationRef.current(verification);
        confirmationRef.current = null;
      } catch (e) {
        const error = e as FirebaseAuthTypes.PhoneAuthError;
        Alert.alert(
          appSettings.t('phone-auth-error'),
          appSettings.t(error.code ?? 'unknownError'),
          [{text: appSettings.t('OK')}],
        );
      } finally {
        setLoading(false);
      }
    }
  }

  return confirmationRef.current ? (
    <Fragment>
      <TextInput
        keyboardType="number-pad"
        mode="outlined"
        label={appSettings.t('phoneVerificationCode')}
        value={verification}
        onChangeText={setVerification}
        autoComplete="sms-otp"
      />

      <Button
        style={styles.submit}
        loading={loading}
        disabled={!verification}
        mode="contained"
        onPress={handleVerification}>
        {appSettings.t('phoneVerificationConfirm')}
      </Button>
    </Fragment>
  ) : (
    <Fragment>
      <Paragraph style={styles.paragraph}>
        {appSettings.t('phoneVerificationCountryInstructions')}
      </Paragraph>
      <CountryPicker
        containerButtonStyle={styles.phoneCountry}
        theme={{
          primaryColor: theme.colors.surface,
          primaryColorVariant: theme.colors.surface,
          backgroundColor: theme.colors.background,
          onBackgroundTextColor: theme.colors.onSurface,
        }}
        // @ts-ignore
        countryCode={countryCode}
        {...{
          excludeCountries: ['AQ'],
          onSelect,
          withFlag: true,
          withCountryNameButton: true,
          withCallingCode: true,
          preferredCountries: ['US', 'GB'],
          modalProps: {
            visible,
          },
          onClose: () => setVisible(false),
          onOpen: () => setVisible(true),
        }}
      />

      <Paragraph style={styles.paragraph}>
        {appSettings.t('phoneVerificationNumberInstructions')}
      </Paragraph>
      <TextInput
        keyboardType="number-pad"
        mode="outlined"
        label={appSettings.t('phoneVerificationNumberLabel')}
        value={number}
        onChangeText={handleNumber}
        autoComplete="tel"
      />

      <Button
        style={styles.submit}
        loading={loading}
        disabled={!isValid()}
        mode="contained"
        onPress={handlePhoneAuth}>
        {appSettings.t('phoneVerificationNumberSubmit')}
      </Button>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  phoneCountry: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    padding: 13,
  },
  phoneCountryCode: {
    marginTop: 5,
    marginLeft: 5,
  },
  paragraph: {
    marginBottom: 5,
  },
  button: {
    marginBottom: 20,
  },
  picker: {
    height: 0,
    opacity: 0,
  },
  submit: {
    marginTop: 20,
  },
});

export default Phone;
