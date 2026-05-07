import { createHmac, randomInt, randomUUID, timingSafeEqual } from "crypto";

const CHALLENGE_TTL_MS = 10 * 60 * 1000;

type ChallengePayload = {
  answer: number;
  expiresAt: number;
  nonce: string;
};

type LeadChallenge = {
  question: string;
  token: string;
};

function getChallengeSecret() {
  return (
    process.env.LEAD_CHALLENGE_SECRET ??
    process.env.SMTP_PASS ??
    "siam-condomini-local-lead-challenge"
  );
}

function sign(value: string) {
  return createHmac("sha256", getChallengeSecret()).update(value).digest("base64url");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createLeadChallenge(): LeadChallenge {
  const first = randomInt(2, 10);
  const second = randomInt(2, 10);
  const payload: ChallengePayload = {
    answer: first + second,
    expiresAt: Date.now() + CHALLENGE_TTL_MS,
    nonce: randomUUID()
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");

  return {
    question: `${first} + ${second}`,
    token: `${encodedPayload}.${sign(encodedPayload)}`
  };
}

export function verifyLeadChallenge(answer: unknown, token: unknown) {
  if (typeof answer !== "string" || typeof token !== "string") {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature || !safeCompare(signature, sign(encodedPayload))) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as ChallengePayload;

    if (Date.now() > payload.expiresAt) {
      return false;
    }

    return Number(answer.trim()) === payload.answer;
  } catch {
    return false;
  }
}

export function isHoneypotFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}
