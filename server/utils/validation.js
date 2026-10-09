export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateRegistrationInput = ({ username, email, password }) => {
  if (!username || typeof username !== "string" || username.trim().length < 3) {
    return "Username must be at least 3 characters long.";
  }

  if (!email || !isValidEmail(email)) {
    return "A valid email is required.";
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  return null;
};

export const validateLoginInput = ({ email, password }) => {
  if (!email || !isValidEmail(email)) {
    return "A valid email is required.";
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  return null;
};

export const isAllowedVideoMimeType = (mimeType) => {
  const allowed = ["video/mp4", "video/quicktime", "video/x-msvideo", "video/webm"];
  return allowed.includes(mimeType);
};
