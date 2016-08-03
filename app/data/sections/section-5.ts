import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const SECTION5 = {
  "ci": {
    title: "持续交付",
    intros: [
      {
        info: {slug: "ci", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "持续交付",
        articles: HELPER_ARTICLES["zh-cn"].ci
      }
    ],
    skills: ["ci"],
    growthView: [
      {
        title: "持续集成",
        sections: [
          {
            title: "工具",
            info: {type: "tool", domain: "ci"}
          }
        ]
      }
    ],
    todoView: [{
      title: "持续交付",
      info: {domain: "ci"}
    }]
  },
  "cd": {
    title: "持续交付",
    intros: [
      {
        info: {slug: "cd", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "持续交付",
        articles: HELPER_ARTICLES["zh-cn"].cd
      }
    ],
    skills: ["cd"],
    growthView: [
      {
        title: "持续交付",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "cd"}
          }
        ]
      }
    ]
  }
};
