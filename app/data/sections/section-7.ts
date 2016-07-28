import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const SECTION7 = {
  "retro": {
    title: "回顾与总结",
    intros: [
      {
        info: {slug: "retro", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "回顾与总结",
        articles: HELPER_ARTICLES["zh-cn"].retro
      }
    ],
    skills: [],
    growthView: [
      {
        title: "回顾与总结",
        sections: [
          {
            title: "工具",
            info: {type: "tool", domain: "retro"}
          }
        ]
      }
    ],
    todoView: [{
      title: "回顾与总结",
      info: {domain: "retro"}
    }]
  },
  "arch": {
    title: "架构设计",
    intros: [
      {
        info: {slug: "arch", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "架构设计",
        articles: HELPER_ARTICLES["zh-cn"].arch
      }
    ],
    skills: [],
    growthView: [
      {
        title: "架构设计",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "arch"}
          }
        ]
      }
    ],
    todoView: [{
      title: "架构设计",
      info: {domain: "arch"}
    }]
  }
};
