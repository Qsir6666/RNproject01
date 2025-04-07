import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'

function Login(): React.JSX.Element {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);  //密码可见性状态

  const handleLogin = async () => {
    // 基础表单验证
    if (!username.trim() || !password.trim()) {
      Alert.alert('输入错误', '请填写完整的登录信息');
      return;
    }

    setLoading(true)
    setError('')

    try {
      const res = await axios.post('http://192.168.203.231:3000/mobile/getlogin', {
        username: username.trim(),
        password: password.trim()
      })
      if (res.data.code === 200) {
        const role = res.data.data.rolename.toLowerCase()
        const routeName = role === 'teacher' ? 'TeacherHome' : 'ParentHome'  // 获取路由名称
        navigation.navigate(routeName, { 
          username: res.data.data.username,
          userId: res.data.data._id 
        })
        const showName = role === 'teacher' ? '教师' : '家长'  // 获取路由名称
        Alert.alert('欢迎回来', `${showName} ${res.data.data.name}`)
      } else {
        throw new Error(res.data.message || '登录失败');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      Alert.alert('登录错误', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 登录表单 */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>用户登录</Text>
        <TextInput
          style={styles.input}
          placeholder="请输入用户名"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="请输入密码"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.visibilityButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.visibilityText}>
              {showPassword ? '隐藏' : '显示'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 错误提示 */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* 登录按钮 */}
        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>立即登录</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20
  },
  passwordInput: {
    paddingRight: 80
  },
  visibilityButton: {
    position: 'absolute',
    right: 15,
    top: 12,
    padding: 5
  },
  visibilityText: {
    color: '#007bff',
    fontSize: 14
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledButton: {
    backgroundColor: '#6c757d'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center'
  },
  successText: {
    color: '#28a745',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 30
  }
});

export default Login;
