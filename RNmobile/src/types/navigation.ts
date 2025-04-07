//👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
//👇👇👇存储公共tsx类别
export type RootStackParamList = {
    Login: undefined;
    TeacherHome: { 
      username: string,
      userId: string
     }; 
    ParentHome: { 
      username: string,
      userId: string
     };
    // 其他路由...
  }
  
  // 扩展全局类型声明（解决类型推断）
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }
  