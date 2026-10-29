const API_URL = "http://localhost:3000/api/auth";

async function sendAuthRequest(endpoint, payload, fallbackMessage) {
  let response;

  // Handle network errors
  try {
    response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your connection and try again."
    );
  }

  // Safely parse the response
  let data = null;

  try {
    data = await response.json();
  } catch {
    // The server may return an empty body or invalid JSON.
  }

  // Handle unsuccessful HTTP responses
  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `${fallbackMessage} (HTTP ${response.status})`;

    throw new Error(message);
  }

  // Ensure a usable response was returned
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(
      "The server returned an unexpected response. Please try again."
    );
  }

  return data;
}

async function register(userData) {
  return sendAuthRequest(
    "register",
    userData,
    "Registration failed"
  );
}

async function login(credentials) {
  return sendAuthRequest(
    "login",
    credentials,
    "Login failed"
  );
}

const authApi = {
  register,
  login,
};

export default authApi;