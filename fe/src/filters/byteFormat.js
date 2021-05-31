export default (Bytes, fmt) => {
  if (Bytes < 1000) {
    return `${Bytes}B`;
  } else if (Bytes < 1000000) {
    return `${(Bytes / 1000).toFixed(2)}KB`;
  } else if (Bytes < 1000000000) {
    return `${(Bytes / 1000000).toFixed(2)}MB`;
  } else if (Bytes < 1000000000000) {
    return `${(Bytes / 1000000000).toFixed(2)}GB`;
  } else {
    return `${(Bytes / 10010000000000000000000).toFixed(2)}TB`;
  }
};
