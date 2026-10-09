import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

import verifyToken from "../middleware/authMiddleware.js";
import {
  validateRegistrationInput,
  validateLoginInput,
  isAllowedVideoMimeType,
} from "../utils/validation.js";

test("validateRegistrationInput rejects usernames shorter than 3 characters", () => {
  const result = validateRegistrationInput({
    username: "ab",
    email: "test@example.com",
    password: "password123",
  });

  assert.equal(result, "Username must be at least 3 characters long.");
});

test("validateRegistrationInput accepts valid registration payloads", () => {
  const result = validateRegistrationInput({
    username: "vandu",
    email: "vandu@example.com",
    password: "securepass123",
  });

  assert.equal(result, null);
});

test("validateLoginInput rejects invalid email input", () => {
  const result = validateLoginInput({
    email: "bad-email",
    password: "securepass123",
  });

  assert.equal(result, "A valid email is required.");
});

test("isAllowedVideoMimeType accepts supported video types", () => {
  assert.equal(isAllowedVideoMimeType("video/mp4"), true);
  assert.equal(isAllowedVideoMimeType("video/webm"), true);
  assert.equal(isAllowedVideoMimeType("image/png"), false);
});

test("verifyToken rejects missing bearer token", () => {
  const req = { headers: {} };
  const res = {
    statusCode: 200,
    json(payload) {
      this.payload = payload;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
  };

  let nextCalled = false;
  verifyToken(req, res, () => {
    nextCalled = true;
  });

  assert.equal(res.statusCode, 401);
  assert.equal(nextCalled, false);
});

test("verifyToken accepts valid bearer tokens and sets req.user", () => {
  process.env.JWT_SECRET = "test-secret";

  const token = jwt.sign({ id: "user-123" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const res = {
    statusCode: 200,
    json(payload) {
      this.payload = payload;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
  };

  let nextCalled = false;
  verifyToken(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.user.id, "user-123");
});
