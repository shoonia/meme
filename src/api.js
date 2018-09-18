const getUrl = path => `https://shoonia.wixsite.com/meme-api/_functions${path}`;
const request = url => fetch(url).then(response => response.json());

export const fetchPageByNumber = pageNumber => request(getUrl(`/page/${pageNumber}`));

export default '';
