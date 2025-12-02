export function isAllowed(question) {
  const banned = [
    /illegal/i,
    /hack/i,
    /murder/i,
    /kill/i,
    /sex/i,
    /drugs/i,
    /crime/i
  ];

  if (!question || question.length < 3) return false;

  for (let bad of banned) {
    if (bad.test(question)) return false;
  }
  return true;
}
