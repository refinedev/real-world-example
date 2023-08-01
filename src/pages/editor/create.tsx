import { HttpError, useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { ErrorList } from "../../components/Error";

type IArticlesVariables = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  slug: string;
};
export const EditorPage: React.FC = () => {
  const { push } = useNavigation();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    getValues,
  } = useForm<
    IArticlesVariables,
    HttpError,
    IArticlesVariables & {
      api: Record<string, string>;
    }
  >({
    refineCoreProps: {
      resource: "articles",
      meta: {
        resource: "article"
      },
      redirect: false,
      onMutationSuccess: (response) => {
        push(`/article/${response.data.slug}`);
      },
    },
  });

  const tags = getValues("tagList") ?? [];

  return (
    <div className="editor-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset disabled={formLoading}>
                <fieldset className="form-group">
                  <input
                    {...register("title", {
                      required: true,
                    })}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                  {errors?.title && (
                    <ul className="error-messages">
                      <li>{errors.title.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("description", {
                      required: true,
                    })}
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                  {errors?.description && (
                    <ul className="error-messages">
                      <li>{errors.description.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    {...register("body", {
                      required: true,
                    })}
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                  {errors?.body && (
                    <ul className="error-messages">
                      <li>{errors.body.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      if (e.key === "Enter") {
                        const value = (e.target as HTMLInputElement).value;
                        if (!tags.includes(value)) {
                          setValue("tagList", [...tags, value], {
                            shouldValidate: true,
                          });
                          (e.target as HTMLInputElement).value = "";
                        }
                      }
                    }}
                  />
                  <div className="tag-list">
                    {tags.map((item) => {
                      return (
                        <span key={item} className="tag-default tag-pill">
                          <i
                            className="ion-close-round"
                            onClick={() => {
                              setValue(
                                "tagList",
                                tags.filter((tag) => tag !== item),
                                {
                                  shouldValidate: true,
                                }
                              );
                            }}
                          ></i>
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();

                    clearErrors();
                    handleSubmit(async (values) => {
                      await onFinish(values);
                    })();
                  }}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
