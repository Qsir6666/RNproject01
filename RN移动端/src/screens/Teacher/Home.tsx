import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation'; // 引入统一定义

type Props = NativeStackScreenProps<RootStackParamList, 'TeacherHome'>; // 精确匹配

function TeacherDashboard({ route }: Props) {
  const { username } = route.params;
 
  return (
<View style={styles.container}>
      <Text style={styles.welcome}>欢迎回来，{username}老师！</Text>
    </View>

  );
}
const styles = StyleSheet.create({
    container: { padding: 20 },
    welcome: { fontSize: 18, fontWeight: '500' }
  })

export default TeacherDashboard