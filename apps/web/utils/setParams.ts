export const setNewParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(key, value);

  return params.toString();
};
