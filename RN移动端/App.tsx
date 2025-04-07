// rn路由所需依赖：
// # 核心包（最新稳定版）
// npm install @react-navigation/native
// # 原生依赖（必须）
// npm install react-native-screens react-native-safe-area-context
// # 堆栈导航器（选最新版）
// npm install @react-navigation/native-stack
// # 可选安全区域优化（针对刘海屏）
// npm install react-native-safe-area-view

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/navigation/RootStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}