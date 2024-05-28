import type { FetchMethod } from '../types';

export const fetcher = async (
  url: string,
  method: FetchMethod = 'GET',
  payload?: any,
  headers?: { [key: string]: string }
): Promise<any> => {
  console.log('default fetcher called');

  let body;

  if (method !== 'GET' && headers?.['Content-Type'] === 'application/json') {
    body = JSON.stringify(payload);
  }

  if (method === 'GET' && payload) {
    const params = new URLSearchParams(payload);
    url += '?' + params?.toString();
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData.data || responseData;
  } catch (err: any) {
    console.error('Error fetching data:', err); // Optional logging
    throw err?.data || err;
  }
};
