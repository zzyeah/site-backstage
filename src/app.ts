// 运行时配置

import { message } from 'antd';
import { AdminController } from './services';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  if (location.pathname === '/login') {
    // 说明是要强行跳登录页
    // 判断是否有有效的 token
    const token = localStorage.getItem('adminToken'); // 获取本地 token
    if (token) {
      // 说明本地有 token，接下来还需要验证 token 的有效性
      let result;
      try {
        result = await AdminController.getInfo();
      } catch (error) {
        console.log(error);
      }
      if (result.data) {
        // 说明不仅有 token，而且该 token 还是有效的
        // 那么就不允许跳转
        message.warning('请先退出后再登录');
        history.go(-1);
      }
    }
  } else {
    // 说明是要强行跳内部页面
    // 需要进行 token 的有效性验证
    let result;
    try {
      result = await AdminController.getInfo();
    } catch (error) {
      console.log(error);
    }
    if (result.data) {
      const { data } = await AdminController.getAdminById(result.data.id);
      return {
        name: data.nickname,
        avatar: data.avatar,
        adminInfo: data,
      };
    } else {
      // token 验证失效，跳转至登录
      // 失效可能是 token 过期，也有可能是本地就没有 token，不管有没有，删除掉
      localStorage.removeItem('adminToken');
      location.href = '/login';
      message.warning('登录过期，请重新登录');
    }
  }
}

export const layout = () => {
  return {
    logo: 'https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-10-18-074620.png',
    menu: {
      locale: false,
    },
  };
};
