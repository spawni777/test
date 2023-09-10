export const normalizeSize = (bytes: number) => {
  const KBytes = Math.floor(bytes / 1000);

  if (KBytes < 1024) {
    return `${KBytes}kb`;
  }

  const MBytes = Math.floor(KBytes / 1024);

  return `${MBytes}mb`;
}
