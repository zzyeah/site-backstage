import { AdminController } from '@/services';
import { LoginRequest } from '@/types/Api/Admin/login.request';
import { LoginResponse } from '@/types/Api/Admin/login.response';
import { DefaultResponse } from '@/types/Api/response.interface';
import { LoginInfo } from '@/types/Login/login.interface';
import { BarcodeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

function Login() {
  /**
   * 存放用户的表单输入
   */
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    loginId: '',
    loginPwd: '',
    captcha: '',
    remember: true,
  });

  const [captcha, setCaptcha] = useState<string>('');

  /**
   * 从服务器获取验证码
   */
  async function captchaClickHandle() {
    const result = await AdminController.captcha();
    setCaptcha(result);
  }

  function afterLoginError(err: string) {
    message.warning(err);
    captchaClickHandle();
  }

  async function onFinish() {
    function transferLoginRequest(loginInfo: LoginInfo): LoginRequest {
      let remember = 1;
      if (loginInfo.remember) {
        remember = 7;
      }
      const request: LoginRequest = {
        ...loginInfo,
        remember: remember,
      };

      return request;
    }

    function testHandleLoginResponse(
      res: DefaultResponse<LoginResponse>,
    ): DefaultResponse<LoginResponse> {
      if (res.code === 0) {
        return { ...res, data: { ...res.data, enabled: true } };
      }
      return res;
    }

    let res = await AdminController.login(transferLoginRequest(loginInfo));
    /**
     * { "code": 406, "msg": "验证码不正确", "data": null}
     * { "code": 0, "msg": "", "data": null}
     * { "code": 0, "msg": "", "data": {...}}
     */
    res = testHandleLoginResponse(res);
    if (res.code === 0) {
      const { data } = res;
      if (!data) {
        // 账号密码不正确
        afterLoginError('账号密码不正确');
      } else if (!data.enabled) {
        // 账号密码正确,但是账号已经被冻结
        afterLoginError('账号已被冻结, 请联系管理员');
      } else {
        // 账号密码正确, 账号可用
        // 跳转到后台管理系统的首页
      }
    } else {
      afterLoginError(res.msg);
    }
    console.log(res);
  }

  function updateInfo(newContent: any, key: string) {
    const newLoginInfo = { ...loginInfo };
    newLoginInfo[key] = newContent;
    setLoginInfo(newLoginInfo);
  }

  /**
   * 初始化
   */
  useEffect(() => {
    captchaClickHandle();
  }, []);

  return (
    <div>
      {/* 登录表单 */}
      <div className={styles.container}>
        <h1>coder station 后台管理系统</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={loginInfo}
          onFinish={onFinish}
        >
          {/* 登录账号 */}
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入账号"
              value={loginInfo.loginId}
              onChange={(e) => updateInfo(e.target.value, 'loginId')}
            />
          </Form.Item>

          {/* 登录密码 */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
              value={loginInfo.loginPwd}
              onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  prefix={<BarcodeOutlined className="site-form-item-icon" />}
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) => updateInfo(e.target.value, 'captcha')}
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          {/* 7天免登录 */}
          <Form.Item name="remember" className={styles.remember}>
            <Checkbox
              checked={loginInfo.remember}
              onChange={(e) => updateInfo(e.target.checked, 'remember')}
            >
              7天免登录
            </Checkbox>
          </Form.Item>

          {/* 登录按钮 */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginBtn}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
