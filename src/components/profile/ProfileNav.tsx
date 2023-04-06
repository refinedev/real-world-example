import { CrudFilters, GetOneResponse } from "@refinedev/core";
import { Link } from "react-router-dom";

import { IProfile } from "interfaces";
import { useEffect } from "react";

type ProfileNavProps = {
  params: { page: string; username: string };
  profileData: GetOneResponse<IProfile> | undefined;
  setFilters: (filters: CrudFilters) => void;
};

export const ProfileNav: React.FC<ProfileNavProps> = ({
  params,
  profileData,
  setFilters,
}) => {
  useEffect(() => {
    if (params?.page === "favorites") {
      setFilters([
        {
          field: "author",
          value: undefined,
          operator: "eq",
        },
        {
          field: "favorited",
          value: params?.username,
          operator: "eq",
        },
      ]);
    }
  }, []);
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={`nav-link ${
              params?.page === "favorites" ? "" : "active"
            }`}
            to={`/profile/${profileData?.data.username}`}
            onClick={() => {
              setFilters([
                {
                  field: "favorited",
                  value: undefined,
                  operator: "eq",
                },
                {
                  field: "author",
                  value: params?.username,
                  operator: "eq",
                },
              ]);
            }}
          >
            My Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              params?.page === "favorites" ? "active" : ""
            }`}
            to={`/profile/${profileData?.data.username}/favorites`}
            onClick={() => {
              setFilters([
                {
                  field: "author",
                  value: undefined,
                  operator: "eq",
                },
                {
                  field: "favorited",
                  value: params?.username,
                  operator: "eq",
                },
              ]);
            }}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    </div>
  );
};
