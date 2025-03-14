import { ApiUrl } from "../api";

export function FAVORITE_POST(projectId: string) {
  return { URL: ApiUrl + `/favorites/${projectId}` };
}

export function FAVORITE_DELETE(projectId: string) {
  return { URL: ApiUrl + `/favorites/${projectId}` };
}

export function FAVORITES_BY_USER_GET() {
  return { URL: ApiUrl + `/favorites/` };
}

export function VERIFY_FAVORITE_BY_USER(projectId: string) {
  return { URL: ApiUrl + `/favorites/${projectId}` };
}
