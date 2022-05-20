export default function authHeader() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
  } else {
    return { "Content-Type": "application/json" };
  }
}
