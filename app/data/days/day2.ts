import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const DAYS2 = {
  title: "编码",
  intros: [
    {
      info: {slug: "before", type: "desc"}
    },
    {
      info: {slug: "test", type: "desc"}
    },
    {
      info: {slug: "coding", type: "desc"}
    }
  ],
  skills: ["before", "test", "coding"],
  articlesView: [
    {
      title: "编码之前",
      articles: HELPER_ARTICLES["zh-cn"].before
    },
    {
      title: "测试",
      articles: HELPER_ARTICLES["zh-cn"].test
    },
    {
      title: "编码",
      articles: HELPER_ARTICLES["zh-cn"].coding
    }
  ],
  growthView: [
    {
      title: "编码之前",
      sections: [
        {
          title: "书单",
          info: {type: "book", domain: "before"}
        }
      ]
    },
    {
      title: "测试",
      sections: [
        {
          title: "书单",
          info: {type: "book", domain: "test"}
        }
      ]
    },
    {
      title: "编码",
      sections: [
        {
          title: "书单",
          info: {type: "book", domain: "coding"}
        }
      ]
    }
  ],
  todoView: [
    {
      title: "编码之前",
      info: {domain: "before"}
    },
    {
      title: "测试",
      info: {domain: "test"}
    },
    {
      title: "编码",
      info: {domain: "coding"}
    }
  ]
};
