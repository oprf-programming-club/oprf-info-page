import { ServerResponse } from "http";

export const endStatus = (
  res: ServerResponse,
  statusCode: number,
  statusMessage?: string,
  message = statusMessage
) => {
  res.statusCode = statusCode;
  if (statusMessage) res.statusMessage = statusMessage;
  res.end(message);
};

export const endJSON = (res: ServerResponse, obj: any) => {
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(obj));
  res.write("\n");
  res.end();
};
