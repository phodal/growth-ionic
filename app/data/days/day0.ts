import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const DAYS0 = {
  title: "前期准备",
  intros: [
    {
      info: {slug: "hello", type: "desc"}
    },
    {
      info: {slug: "env", type: "desc"}
    }
  ],
  skills: ["hello", "env"],
  articlesView: [
    {
      title: "hello, world",
      articles: HELPER_ARTICLES["zh-cn"].hello
    },
    {
      title: "开发环境",
      articles: HELPER_ARTICLES["zh-cn"].env
    }
  ],
  growthView: [
    {
      title: "hello, world",
      sections: [
        {
          title: "书单",
          info: {type: "book", domain: "hello"}
        }
      ]
    },
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
  todoView: [
    {
      title: "hello, world",
      info: {domain: "hello"}
    },
    {
      title: "开发环境",
      info: {domain: "env"}
    }
  ]
};
