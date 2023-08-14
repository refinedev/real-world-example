import { CrudFilters, CrudOperators, DataProvider } from "@refinedev/core";
import restDataProvider from "@refinedev/simple-rest";
import { stringify } from "query-string";
import { AxiosInstance } from "axios";

//TEMP URL
//const API_URL = "https://refine-real-world.herokuapp.com/api";

import { API_URL } from "./constants";

const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "eq":
      return "";
    default:
      throw new Error(`Operator ${operator} is not supported`);
  }
};

const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};
  if (filters) {
    filters.map((filter: any) => {
      if (
        filter.operator !== "or" &&
        filter.operator !== "and" &&
        "field" in filter
      ) {
        const { field, operator, value } = filter;

        const mappedOperator = mapOperator(operator);
        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });
  }

  return queryFilters;
};

export const dataProvider = (axios: AxiosInstance): DataProvider => {
  return {
    ...restDataProvider(API_URL, axios),
    getList: async ({ resource, pagination, filters, meta }) => {
      const url = `${API_URL}/${resource}`;

      // pagination
      const current = pagination?.current || 1;
      const pageSize = pagination?.pageSize || 10;

      const queryFilters = generateFilter(filters);

      const query: {
        limit: number;
        offset: number;
      } = {
        offset: (current - 1) * pageSize,
        limit: pageSize,
      };

      const { data } = await axios.get(
        `${url}?${stringify(query)}&${stringify(queryFilters)}`
      );

      return {
        data: data[meta?.resource ?? resource],
        total: data[`${meta?.resource ?? resource}Count`] || undefined,
      };
    },
    getOne: async ({ resource, id, meta }) => {
      const url = meta?.getComments
        ? `${API_URL}/${resource}/${id}/comments`
        : `${API_URL}/${resource}/${id}`;

      const { data } = await axios.get(url);

      return {
        data: data[meta?.resource || resource],
      };
    },
    create: async ({ resource, variables, meta }) => {
      const url = `${API_URL}/${resource}`;

      const { headers } = meta ?? {};

      const ignoreResourceWrapper = meta?.ignoreResourceWrapper ?? false;
      const newVariables = ignoreResourceWrapper ? variables : {
        [meta?.resource || resource]: variables,
      };

      const { data } = await axios.post(url, newVariables, {
        headers,
      });

      return {
        data: data[meta?.resource || resource],
      };
    },
    update: async ({ resource, id, variables, meta }) => {
      const url = meta?.URLSuffix
        ? `${API_URL}/${resource}/${id}/${meta.URLSuffix}`
        : `${API_URL}/${resource}/${id}`;

      const ignoreResourceWrapper = meta?.ignoreResourceWrapper ?? false;
      const newVariables = ignoreResourceWrapper ? variables : {
        [meta?.resource || resource]: variables,
      };

      const { data } = meta?.URLSuffix
        ? await axios.post(url)
        : await axios.put(url, newVariables);

      return {
        data: data[meta?.resource || resource],
      };
    },

    deleteOne: async ({ resource, id, variables, meta }) => {
      const url = meta?.URLSuffix
        ? `${API_URL}/${resource}/${id}/${meta.URLSuffix}`
        : `${API_URL}/${resource}/${id}`;

      const { data } = await axios.delete(url, {
        data: variables,
      });

      return {
        data,
      };
    },
  };
};
