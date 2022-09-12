import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (user) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </>
  );
};
