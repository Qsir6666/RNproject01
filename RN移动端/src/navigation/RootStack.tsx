import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login'; //登录
import ParentHome from '../screens/Parent/Home'; //家长端主页
import TeacherHome from '../screens/Teacher/Home'; //教师端主页



export type RootStackParamList = {
  Login: undefined
  ParentHome: undefined
  TeacherHome: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"      //指定导航初始加载页面为登录页
      screenOptions={{
        headerShown: false,         // 全局隐藏nav，然后按需显示
        headerTitleAlign: 'center', // 标题居中
        gestureEnabled: true,      // 允许系统返回手势（Android侧滑返回/iOS右划返回）
      }}
    >
      {/* 登录 */}
      <Stack.Screen name="Login" component={Login}
        options={{  title: '登录',
          headerBackTitle: '返回'  // iOS专属配置
        }}
      />
      {/* 家长端首页 */}
      <Stack.Screen name="ParentHome" component={ParentHome} options={{ headerShown: true,title: '家长端首页' }}/>
      {/* 教师端首页 */}
      <Stack.Screen name="TeacherHome" component={TeacherHome} options={{ headerShown: true,title: '教师端首页' }}/>




    </Stack.Navigator>
  );
}


