const API_KEY = process.env.REACT_APP_OPEN_WEATHERMAP_API_KEY;

export const getApi = async(url: string) => {
  const response = await fetch(
    `${url}&appid=${API_KEY}`
  );

  if (!response.ok) throw response.json();

  return response.json();
}