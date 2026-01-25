import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';
import useAuthStore from './stores/auth/authStore';
import ToastProvider from './components/ui/ToastProvider';

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastProvider />
    </>
  );
}

export default App;
