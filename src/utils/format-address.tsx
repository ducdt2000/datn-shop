export function formatAddress(...address: string[]) {
  const result = address.join(', ');

  return result;
}

export function unformatAddress(addressFull: string) {
  const buff = addressFull.split(', ');

  return buff;
}
