import { shuffle } from "../utils/helpers";
export function getTrendingSongs(url, fnSuccess, fnError) {
  fetch(url)
    .then(res => res.json())
    .then(songs => fnSuccess(shuffle(songs)))
    .catch(fnError);
}

export function likeSong(url, body, fnSuccess, fnError) {
  fetch(url, { body, method: "POST" })
    .then(res => res.json())
    .then(fnSuccess)
    .catch(fnError);
}
