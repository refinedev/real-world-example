import { HttpError, useLogin } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Link } from "react-router-dom";

type ILoginVariables = {
  password: string;
  email: string;
};
export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ILoginVariables, HttpError, ILoginVariables>();

  const { mutate: login, isLoading } = useLogin();

  return (
    <div className="auth-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to={`/register`}>Need an account?</Link>
            </p>

            <form>
              <fieldset disabled={isLoading}>
                <fieldset className="form-group">
                  <input
                    {...register("email", {
                      required: true,
                    })}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                  {errors?.email && (
                    <ul className="error-messages">
                      <li>{errors.email.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("password", {
                      required: true,
                    })}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    autoComplete=""
                  />
                  {errors?.password && (
                    <ul className="error-messages">
                      <li>{errors.password.message}</li>
                    </ul>
                  )}
                </fieldset>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    clearErrors();
                    handleSubmit((values) => login(values))();
                  }}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Submit
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
