const ApiUrl = "http://localhost:3100";

export function LOGIN() {
  return { URL: ApiUrl + "/auth/user" };
}

export function USER_POST() {
  return { URL: ApiUrl + "/users/" };
}

export function USER_GET() {
  return { URL: ApiUrl + "/auth/user" };
}

export function USER_UPDATE() {
  return { URL: ApiUrl + "/users/" };
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
