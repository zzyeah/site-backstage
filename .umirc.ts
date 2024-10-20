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
      access: 'NormalAdmin',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon: 'HomeOutlined',
      access: 'NormalAdmin',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'UserOutlined',
      access: 'SuperAdmin',
      routes: [
        {
          path: 'adminList',
          name: '管理员列表',
          component: './Admin',
          access: 'SuperAdmin',
        },
        {
          path: 'addAdmin',
          name: '添加管理员',
          component: './Admin/addAdmin',
          access: 'SuperAdmin',
        },
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'TeamOutlined',
      access: 'NormalAdmin',
      routes: [
        {
          name: '添加用户',
          component: './User/addUser',
          path: 'addUser',
          access: 'NormalAdmin',
        },
        {
          name: '用户列表',
          component: './User',
          path: 'userList',
          access: 'NormalAdmin',
        }
      ],
    },
    {
      name: '博客',
      path: '/blog',
      icon: 'ReadOutlined',
      access: 'NormalAdmin',
      routes: [
        {
          name: '添加博客',
          component: './Blog/addBlog',
          path: 'addBlog',
          access: 'NormalAdmin',
        },
        {
          name: '博客列表',
          component: './Blog',
          path: 'blogList',
          access: 'NormalAdmin',
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      component: './Interview',
      icon: 'EditOutlined',
      access: 'NormalAdmin',
    },
    {
      name: '问答',
      path: '/issue',
      component: './Issue',
      icon: 'ProfileOutlined',
      access: 'NormalAdmin',
    },
    {
      name: '评论',
      path: '/comment',
      component: './Comment',
      icon: 'CalendarOutlined',
      access: 'NormalAdmin',
    },
    {
      name: '类型',
      path: '/type',
      component: './BlogType',
      icon: 'AppstoreOutlined',
      access: 'NormalAdmin',
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
      // target: 'http://8.138.151.248',
      target: 'http://localhost:4015',
      changeOrigin: true,
    },
    '/static': {
      // target: 'http://8.138.151.248',
      target: 'http://localhost:4015',
      changeOrigin: true,
    },
    '/res': {
      // target: 'http://8.138.151.248',
      target: 'http://localhost:4015',
      changeOrigin: true,
    },
  },
});
