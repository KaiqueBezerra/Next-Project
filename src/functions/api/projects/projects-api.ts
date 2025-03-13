import { ApiUrl } from "../api";

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
