export const serverURL = "http://localhost:4004";

export const serverHeaders = {
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("dkz_login_token")
      : "",
};

export function formatIndianRupee(num: number) {
  let str = num.toString();
  let result = "";
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    result = str[i] + result;
    count++;
    if (count % 2 === 0 && i !== 0) {
      result = "," + result;
    }
  }
  return "\u20B9 " + num.toLocaleString("en-IN"); // Adding Indian Rupee symbol
}
