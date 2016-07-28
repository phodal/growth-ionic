import {HELPER_ARTICLES} from "./HELPER_ARTICLES";
export const SECTIONS = {
  "hello": {
    title: "hello, world",
    articlesView: [
      {
        title: "hello, world",
        articles: HELPER_ARTICLES["zh-cn"].hello
      }
    ],
    skills: ["hello"],
    growthView: [
      {
        title: "hello, world",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "hello"}
          }
        ]
      }
    ],
    todoView: [{
      title: "hello, world",
      info: {domain: "hello"}
    }]
  },
  "env": {
    title: "开发环境",
    articlesView: [
      {
        title: "开发环境",
        articles: HELPER_ARTICLES["zh-cn"].env
      }
    ],
    skills: ["env"],
    growthView: [
      {
        title: "开发环境",
        sections: [
          {
            title: "工具",
            info: {type: "tool", domain: "pm"}
          }
        ]
      }
    ],
    todoView: [{
      title: "开发环境",
      info: {domain: "env"}
    }]
  }
};
