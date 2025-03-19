import { ApiUrl } from "../api";

export function REPORT_POST(projectId: string) {
  return { URL: ApiUrl + `/reports/${projectId}` };
}
