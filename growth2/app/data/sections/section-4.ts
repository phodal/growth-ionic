import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const SECTION4 = {
  "analytics": {
    title: "数据分析",
    intros: [
      {
        info: {slug: "analytics", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "数据分析",
        articles: HELPER_ARTICLES["zh-cn"].analytics
      }
    ],
    skills: ["analytics"],
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
      }],
    todoView: [{
      title: "数据分析",
      info: {domain: "analytics"}
    }]
  },
  "ux": {
    title: "用户体验",
    intros: [
      {
        info: {slug: "ux", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "数据分析",
        articles: HELPER_ARTICLES["zh-cn"].ux
      }
    ],
    skills: ["ux"],
    growthView: [
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
      }]
  }
};
