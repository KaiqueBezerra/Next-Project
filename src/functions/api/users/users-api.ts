import { ApiUrl } from "../api";

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

export function USER_DELETE() {
  return { URL: ApiUrl + "/users/" };
}
