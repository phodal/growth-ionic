import * as showdown from "showdown";

export function convertToMarkdown(data) {
  let converter = new showdown.Converter({tables: true, smoothLivePreview: true, ghCodeBlocks: true});
  return converter.makeHtml(data);
}
