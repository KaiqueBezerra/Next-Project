const ApiUrl = "http://localhost:3100";

export function LOGIN() {
  return { URL: ApiUrl + "/auth/user" };
}

export function USER_GET() {
  return { URL: ApiUrl + "/auth/user" };
}

export function PROJECTS_GET(search?: string) {
  return { URL: ApiUrl + `/projects/?search=${search}` };
}

export function PROJECT_GET(id?: string) {
  return { URL: ApiUrl + `/projects/${id}` };
}
