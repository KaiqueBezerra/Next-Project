import { ApiUrl } from "../api";

export function FAVORITE_POST(projectId: string) {
  return { URL: ApiUrl + `/favorites/${projectId}` };
}

export function FAVORITE_DELETE(projectId: string) {
  return { URL: ApiUrl + `/favorites/${projectId}` };
}

export function FAVORITES_BY_USER_GET(projectId: string) {
  return { URL: ApiUrl + `/favorites/${projectId}` };
}
