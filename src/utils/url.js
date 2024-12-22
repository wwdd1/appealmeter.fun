export function createGoogleSearchLink(q) {
  const url = new URL('search', 'https://www.google.com');
  url.searchParams.append('udm', '2');
  url.searchParams.append('q', String(q).trim());
  return url.toString();
}

export function createInstagramProfileUrl(instagramId) {
  const url = new URL(instagramId, 'https://www.instagram.com');
  return url.toString();
}