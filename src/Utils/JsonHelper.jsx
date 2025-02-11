import DOMPurify from "dompurify";

DOMPurify.setConfig({ADD_ATTR: ['target']});

const lang = document.documentElement.lang;
const locale = lang !== "en" ? `/${lang}` : '';

//fetch fields.json, pages.json, cards.json
export const fetchData = async (filename, setContent, setError) => {
  const path = `https://vote.gov${locale}/nvrf/assets/${filename}`;
  const response = await fetch(path)
    .then(response => response.json())
    .catch(() => setError(true));
  setContent(response);
}

//fetch [state]/data.json
export const fetchStateData = async (state, setContent, setError) => {
  const path = `https://vote.gov${locale}/nvrf/assets/state/${state}/data.json`;
  const response = await fetch(path)
    .then(response => response.json())
    .catch(() => setError(true));
  setContent(response);
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);