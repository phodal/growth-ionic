import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const SECTION2 = {
  "before": {
    title: "编码之前",
    intros: [
      {
        info: {slug: "before", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "编码之前",
        articles: HELPER_ARTICLES["zh-cn"].before
      }
    ],
    skills: ["front"],
    growthView: [
      {
        title: "before",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "before"}
          }
        ]
      }
    ],
    todoView: [{
      title: "编码之前",
      info: {domain: "before"}
    }]
  },
  "test": {
    title: "测试",
    intros: [
      {
        info: {slug: "test", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "测试",
        articles: HELPER_ARTICLES["zh-cn"].test
      }
    ],
    skills: ["test"],
    growthView: [
      {
        title: "编码之前",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "test"}
          }
        ]
      }
    ],
    todoView: [{
      title: "测试",
      info: {domain: "test"}
    }]
  },
  "coding": {
    title: "编码",
    intros: [
      {
        info: {slug: "coding", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "编码",
        articles: HELPER_ARTICLES["zh-cn"].coding
      }
    ],
    skills: ["coding"],
    growthView: [
      {
        title: "编码",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "coding"}
          }
        ]
      }
    ]
  }
};
