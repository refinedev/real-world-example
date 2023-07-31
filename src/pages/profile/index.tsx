import { useEffect } from "react";
import {
  useGetIdentity,
  useTable,
  useDelete,
  useUpdate,
  useOne,
  useParse,
} from "@refinedev/core";
import dayjs from "dayjs";
import { ArticleList } from "../../components/article";
import { Pagination } from "../../components/Pagination";
import { UserInfo, ProfileNav } from "../../components/profile";

import { IArticle, IProfile, IUser } from "../../interfaces";

export const ProfilePage: React.FC = () => {
  const { data: user } = useGetIdentity<IUser>();
  const { mutate: updateMutation } = useUpdate();
  const { mutate: deleteMutation } = useDelete();

  const parse = useParse();
  const { params } = parse();
  const username = params?.username;

  const { tableQueryResult, current, pageCount, setCurrent, setFilters } =
    useTable<IArticle>({
      resource: "articles",
      queryOptions: {
        enabled: username !== undefined,
      },
      filters: {
        defaultBehavior: "replace",
        initial: [
          {
            field: "author",
            value: username,
            operator: "eq",
          },
        ],
      },
    });

  useEffect(() => {
    setCurrent(1);
  }, [username, params?.page]);

  const { data: profileData, isLoading: isLoading } = useOne<IProfile>({
    resource: "profiles",
    id: username,
    meta: {
      resource: "profile",
    },
  });

  const favArticle = (slug: string) => {
    updateMutation({
      resource: "articles",
      id: slug,
      meta: {
        URLSuffix: "favorite",
      },
      values: {},
    });
  };

  const unFavArticle = (slug: string) => {
    deleteMutation({
      resource: "articles",
      id: slug,
      meta: {
        URLSuffix: "favorite",
      },
    });
  };

  const followUser = (username: string) => {
    updateMutation({
      resource: "profiles",
      id: username,
      meta: {
        URLSuffix: "follow",
      },
      values: {},
    });
  };

  const unFollowUser = (username: string) => {
    deleteMutation({
      resource: "profiles",
      id: username,
      meta: {
        URLSuffix: "follow",
      },
    });
  };

  return (
    <div className="profile-page">
      <UserInfo
        loading={isLoading}
        profile={profileData}
        params={params}
        user={user}
        followUser={(userName) => {
          followUser(userName);
        }}
        unFollowUser={(userName) => {
          unFollowUser(userName);
        }}
      />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ProfileNav
              params={params}
              profileData={profileData}
              setFilters={setFilters}
            />

            {tableQueryResult.isLoading && (
              <div className="article-preview">Loading articles...</div>
            )}

            {!tableQueryResult.data?.total && (
              <div className="article-preview">
                No articles are here... yet.
              </div>
            )}

            {username &&
              tableQueryResult?.data?.data?.map((item) => {
                return (
                  <ArticleList
                    key={item.slug}
                    slug={item.slug}
                    author={item.author.username}
                    image={item.author.image}
                    title={item.title}
                    createdAt={dayjs(item.createdAt).format("MMM DD, YYYY")}
                    favCount={item.favoritesCount}
                    description={item.description}
                    favArticle={(slug: string) => {
                      item.favorited ? unFavArticle(slug) : favArticle(slug);
                    }}
                    isItemFavorited={item.favorited}
                  />
                );
              })}
            <Pagination
              total={pageCount}
              current={current}
              setCurrent={setCurrent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
