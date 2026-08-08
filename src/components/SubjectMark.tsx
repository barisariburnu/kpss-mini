import { StyleSheet, Text, View } from 'react-native';

import type { Subject } from '../types';

type Props = {
  subject: Subject;
  size?: number;
};

export function SubjectMark({ subject, size = 44 }: Props) {
  return (
    <View
      style={[
        styles.mark,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: subject.softColor,
        },
      ]}
    >
      <Text
        style={[
          styles.symbol,
          { color: subject.color, fontSize: Math.max(16, size * 0.42) },
        ]}
      >
        {subject.symbol}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mark: { alignItems: 'center', justifyContent: 'center' },
  symbol: { fontWeight: '800' },
});
