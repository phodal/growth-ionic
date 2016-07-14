import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const DAYS4 = {
  title: "数据分析",
  intros: [
    {
      info: {slug: "analytics", type: "desc"}
    },
    {
      info: {slug: "ux", type: "desc"}
    }
  ],
  skills: ["analytics", "ux"],
  articlesView: [
    {
      title: "数据分析",
      articles: HELPER_ARTICLES["zh-cn"].analytics
    },
    {
      title: "用户体验",
      articles: HELPER_ARTICLES["zh-cn"].ux
    }
  ],
  growthView: [
    {
      title: "数据分析",
      sections: [
        {
          title: "书单",
          info: {type: "book", domain: "analytics"}
        },
        {
          title: "工具",
          info: {type: "tool", domain: "analytics"}
        }
      ]
    },
    {
      title: "用户体验",
      sections: [
        {
          title: "书单",
          info: {type: "book", domain: "ux"}
        },
        {
          title: "Growth",
          info: {type: "book", domain: "ux"}
        }
      ]
    }
  ],
  todoView: [
    {
      title: "数据分析",
      info: {domain: "analytics"}
    }
  ]
};
