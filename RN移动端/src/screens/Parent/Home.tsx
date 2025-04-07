import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ParentHome'>;

function ParentHome({ route }: Props) {
  const { username, userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>欢迎家长：{username}</Text>
      <Text>用户ID：{userId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    marginBottom: 10
  }
});

export default ParentHome;
