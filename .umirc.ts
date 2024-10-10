import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Site Backstage',
  },
  dva: {}, // 打开dva插件
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon: 'HomeOutlined',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'UserOutlined',
      routes: [
        {
          path: 'adminList',
          name: '管理员列表',
          component: './Admin',
        },
        {
          path: 'addAdmin',
          name: '添加管理员',
          component: './Admin/addAdmin',
        },
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'TeamOutlined',
      routes: [
        {
          name: '添加用户',
          component: './User/addUser',
          path: 'addUser',
        },
        {
          name: '用户列表',
          component: './User',
          path: 'userList',
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      icon: 'ReadOutlined',
      routes: [
        {
          name: '添加用户',
          component: './Book/addBook',
          path: 'addBook',
        },
        {
          name: '用户列表',
          component: './Book',
          path: 'bookList',
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      component: './Interview',
      icon: 'EditOutlined',
    },
    {
      name: '问答',
      path: '/issue',
      component: './Issue',
      icon: 'ProfileOutlined',
    },
    {
      name: '评论',
      path: '/comment',
      component: './Comment',
      icon: 'CalendarOutlined',
    },
    {
      name: '类型',
      path: '/type',
      component: './Type',
      icon: 'AppstoreOutlined',
    },
    {
      path: '/login',
      component: './Login',
      menuRender: false,
    },
  ],
  verifyCommit: {
    scope: ['feat', 'fix'],
    allowEmoji: true,
  },
  npmClient: 'npm',
  proxy: {
    '/api': {
      target: 'http://8.138.151.248',
      changeOrigin: true,
    },
    '/static': {
      target: 'http://8.138.151.248',
      changeOrigin: true,
    },
    '/res': {
      target: 'http://8.138.151.248',
      changeOrigin: true,
    },
  },
});
