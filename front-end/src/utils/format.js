export function shortDate(iso) {
  if(!iso) return '';
  return new Date(iso).toLocaleString();
}
