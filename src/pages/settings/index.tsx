import { useNavigation, useLogout, HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { TOKEN_KEY } from "../../constants";

type IUserVariables = {
  image: string;
  token: string;
  username: string;
  bio: string;
  email: string;
  password: string;
};

export const SettingsPage: React.FC = () => {
  const { push } = useNavigation();
  const { mutate: logout } = useLogout();

  const {
    register,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, formLoading },
  } = useForm<IUserVariables, HttpError, IUserVariables>({
    refineCoreProps: {
      id: "",
      action: "edit",
      resource: "user",
      redirect: false,
      onMutationSuccess: ({ data }) => {
        localStorage.setItem(TOKEN_KEY, data.token);
        push(`/profile/${data.username}`);
      },
    },
  });

  return (
    <div className="settings-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={handleSubmit(onFinish)}>
              <fieldset disabled={formLoading}>
                <fieldset className="form-group">
                  <input
                    {...register("image", {
                      required: true,
                    })}
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                  {errors?.image && (
                    <ul className="error-messages">
                      <li>{errors.image.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("username", {
                      required: true,
                    })}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                  {errors?.username && (
                    <ul className="error-messages">
                      <li>{errors.username.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    {...register("bio")}
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>
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
                    {...register("password")}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={formLoading}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={() => logout()}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
