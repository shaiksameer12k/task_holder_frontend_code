export function ApiHeaders(type = "POST", token = "") {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
}
