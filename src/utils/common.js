export const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export const buildUrl = (url, params = {}) => {
  let urlWithParams = url;

  // заменяем :param в пути
  Object.entries(params).forEach(([key, value]) => {
    urlWithParams = urlWithParams.replace(`:${key}`, value);
  });

  // формируем query string из тех параметров, что не использовались
  const queryParams = Object.entries(params)
    .filter(([key]) => !url.includes(`:${key}`))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  const queryString = new URLSearchParams(queryParams).toString();

  return queryString ? `${urlWithParams}?${queryString}` : urlWithParams;
};

export const sumBy = (array, key) => array.reduce((prev, curr) => prev + (curr[key] || 0), 0);

export const formatPrice = (price) => {
	if (typeof price !== 'number') return 'N/A';
	return `$${price.toFixed(2)}`;
};