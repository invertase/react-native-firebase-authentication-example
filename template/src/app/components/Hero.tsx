import {Image, SafeAreaView, StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  height: number;
  image?: string;
  style?: ViewStyle;
}

function Hero({image, height, children, style}: Props): JSX.Element {
  return (
    <View style={[style, {height}]}>
      {!!image && (
        <Image
          style={[styles.absolute, styles.image]}
          source={{
            uri: image,
          }}
        />
      )}
      <SafeAreaView style={[styles.absolute, styles.fadedImage]}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  fadedImage: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Hero;
