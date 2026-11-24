export function serviceDelay(): Promise<void> {
  const milliseconds = 300 + Math.floor(Math.random() * 301);
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}
