import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AsYouType, parsePhoneNumberFromString} from 'libphonenumber-js';
import React, {Fragment, useRef, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';

import CountryPicker, {CountryCode, Country} from 'react-native-country-picker-modal';
import {Button, Paragraph, TextInput} from 'react-native-paper';

type ConfirmationRef =
  | ((verificationCode: string) => Promise<FirebaseAuthTypes.UserCredential | null>)
  | null;

function Phone(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const confirmationRef = useRef<ConfirmationRef>(null);
  const [number, setNumber] = useState('+1 ');
  const [verification, setVerification] = useState('');

  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country>();
  const [visible, setVisible] = useState<boolean>(false);

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
      } catch (error) {
        confirmationRef.current = null;
        Alert.alert('Phone Auth Error', (error as Error).message);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleNumber(text: string) {
    const parsed = new AsYouType().input(text);
    setNumber(parsed);
  }

  function isValid() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - the country code lists are out of sync
    const phoneNumber = parsePhoneNumberFromString(
      number,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore ('AQ' does not exist yet)
      country?.cca2 ?? 'US'
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
      } catch (error) {
        Alert.alert('Phone Verification Error', (error as Error).message);
      } finally {
        setLoading(false);
      }
    }
  }

  return confirmationRef.current ? (
    <Fragment>
      <TextInput
        keyboardType='number-pad'
        mode='outlined'
        label='Verification Code'
        value={verification}
        onChangeText={setVerification}
        autoComplete='sms-otp'
      />

      <Button
        style={styles.submit}
        loading={loading}
        disabled={!verification}
        mode='contained'
        onPress={handleVerification}
      >
        Confirm
      </Button>
    </Fragment>
  ) : (
    <Fragment>
      <Paragraph style={styles.paragraph}>Touch to select phone number country:</Paragraph>
      <CountryPicker
        containerButtonStyle={styles.phoneCountry}
        countryCode={countryCode}
        {...{
          onSelect,
          withFlag: true,
          withCountryNameButton: true,
          withCallingCode: true,
          preferredCountries: ['US', 'GB'],
          modalProps: {
            visible
          },
          onClose: () => setVisible(false),
          onOpen: () => setVisible(true)
        }}
      />

      <Paragraph style={styles.paragraph}>Enter your phone number:</Paragraph>
      <TextInput
        keyboardType='number-pad'
        mode='outlined'
        label='Phone Number'
        value={number}
        onChangeText={handleNumber}
        autoComplete='tel'
      />

      <Button
        style={styles.submit}
        loading={loading}
        disabled={!isValid()}
        mode='contained'
        onPress={handlePhoneAuth}
      >
        Submit
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
    padding: 13
  },
  phoneCountryCode: {
    marginTop: 5,
    marginLeft: 5
  },
  paragraph: {
    marginBottom: 5
  },
  button: {
    marginBottom: 20
  },
  picker: {
    height: 0,
    opacity: 0
  },
  submit: {
    marginTop: 20
  }
});

export default Phone;
