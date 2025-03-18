import { ApiUrl } from "../api";

export function PROJECT_POST() {
  return { URL: ApiUrl + "/projects/" };
}

export function PROJECT_GET(id?: string) {
  return { URL: ApiUrl + `/projects/${id}` };
}

export function PROJECTS_GET(
  search: string | null,
  filter: string | null,
  page: number | null,
  limit: number | null
) {
  return {
    URL:
      ApiUrl +
      `/projects/?search=${search}&filter=${filter}&page=${page}&limit=${limit}`,
  };
}

export function PROJECTS_BY_USER_GET(
  page: number | null,
  limit: number | null
) {
  return { URL: ApiUrl + `/projects/user/?page=${page}&limit=${limit}` };
}
