import { Routes as BrowserRouter, Route } from 'react-router-dom';

import * as Pages from './pages';
import { PrivateRoute, PrivateRole } from './components';
import { Auth, Dashboard } from './layouts';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route element={<Auth />}>
        <Route path="sign-up" element={<Pages.SignUp />} />
        <Route path="sign-in" element={<Pages.SignIn />} />
        <Route path="forgot-password" element={<Pages.ForgotPassword />} />
      </Route>

      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <PrivateRole roles={['owner', 'admin']}>
              <Dashboard />
            </PrivateRole>
          </PrivateRoute>
        }
      >
        <Route index element={<Pages.Home />} />

        <Route path="purchase-orders" element={<Pages.PurchaseOrders />} />

        <Route path="sales-transactions" element={<Pages.SalesTransaction />} />
        <Route path="purchase-transactions" element={<Pages.PurchaseTransactions />} />

        <Route path="categories" element={<Pages.Categories />} />
        <Route path="categories" element={<Pages.Categories />} />
        <Route path="units" element={<Pages.Units />} />
        <Route path="products" element={<Pages.Products />} />
        <Route path="customers" element={<Pages.Customers />} />
        <Route path="suppliers" element={<Pages.Suppliers />} />
        <Route
          path="employe"
          element={
            <PrivateRole roles={['owner']}>
              <Pages.Employe />
            </PrivateRole>
          }
        />

        <Route path="user-settings" element={<Pages.UserSettings />} />
      </Route>

      <Route
        path="sales-orders"
        element={
          // <PrivateRoute>
          <Pages.SalesOrders />
          // </PrivateRoute>
        }
      />
      <Route
        path="shops"
        element={
          <PrivateRoute>
            <PrivateRole roles={['owner']}>
              <Pages.Shops />
            </PrivateRole>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Pages.ErrorPage />} />
    </BrowserRouter>
  );
};

export default Routes;
