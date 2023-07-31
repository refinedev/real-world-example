import { HttpError, useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { ErrorList } from "../../components/Error";

type IArticlesVariables = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
    slug: string;
  };
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
      redirect: false,
      onMutationError: (error) => {
        setError("api", error?.response?.data.errors);
      },
      onMutationSuccess: (response) => {
        push(`/article/${response.data.article.slug}`);
      },
    },
  });

  const tags = getValues("article.tagList") ?? [];

  return (
    <div className="editor-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors.api && <ErrorList errors={errors.api} />}
            <form>
              <fieldset disabled={formLoading}>
                <fieldset className="form-group">
                  <input
                    {...register("article.title", {
                      required: true,
                    })}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                  {errors.article?.title && (
                    <ul className="error-messages">
                      <li>This field is required</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("article.description", {
                      required: true,
                    })}
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                  {errors.article?.description && (
                    <ul className="error-messages">
                      <li>This field is required</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    {...register("article.body", {
                      required: true,
                    })}
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                  {errors.article?.body && (
                    <ul className="error-messages">
                      <li>This field is required</li>
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
                          setValue("article.tagList", [...tags, value], {
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
                                "article.tagList",
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
