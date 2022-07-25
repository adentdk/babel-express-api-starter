import Chat from "../pages/Chat"
import Login from "../pages/Login"

const routesConfig = [
  {
    path: '/',
    exact: false,
    component: () => <></>,
    navigate: '/chats',
    meta: {
      public: true,
    }
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    meta: {
      title: 'Login',
      unAuth: true,
    }
  },
  {
    path: '/chats',
    exact: true,
    component: Chat,
    meta: {
      title: 'Chat',
      private: true,
    }
  }
]

export default routesConfig;
