import { HttpError, useLogin } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Link } from "react-router-dom";

type IRegisterVariables = {
  password: string;
  username: string;
  email: string;
};
export const RegisterPage: React.FC = () => {
  const { mutate: login, isLoading: isLoadingLogin } = useLogin();

  const {
    refineCore: {
      onFinish,
      mutationResult: { isLoading: isLoadingRegister },
    },
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<IRegisterVariables, HttpError, IRegisterVariables>({
    refineCoreProps: {
      resource: "users",
      redirect: false,
      meta: {
        resource: "user",
      }
    },
  });

  return (
    <div className="auth-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to={"/login"}>Have an account?</Link>
            </p>

            <form>
              <fieldset disabled={isLoadingLogin || isLoadingRegister}>
                <fieldset className="form-group">
                  <input
                    {...register("username", {
                      // required: true,
                    })}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                  {errors?.username && (
                    <ul className="error-messages">
                      <span>{errors.username?.message}</span>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("email", {
                      // required: true,
                    })}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                  {errors?.email && (
                    <ul className="error-messages">
                      <span>{errors.email?.message}</span>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("password", {
                      // required: true,
                    })}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <ul className="error-messages">
                      <span>{errors.password?.message}</span>
                    </ul>
                  )}
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={(e) => {
                    e.preventDefault();
                    clearErrors();
                    handleSubmit(async (values) => {
                      await onFinish(values);
                      login(values);
                    })();
                  }}
                >
                  Sign up
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
