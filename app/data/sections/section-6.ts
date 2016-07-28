import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const SECTION6 = {
  "legacy": {
    title: "遗留系统",
    articlesView: [
      {
        title: "遗留系统",
        articles: HELPER_ARTICLES["zh-cn"].legacy
      }
    ],
    skills: [],
    growthView: [
      {
        title: "遗留系统",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "legacy"}
          }
        ]
      }
      ],
    todoView: [

    ]
  },
  "refactor": {
    title: "重构",
    articlesView: [
      {
        title: "重构",
        articles: HELPER_ARTICLES["zh-cn"].refactory
      }
    ],
    skills: [],
    growthView: [
      {
        title: "重构",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "refactory"}
          },
          {
            title: "Growth",
            info: {type: "growth", domain: "refactory"}
          }
        ]
      }],
    todoView: [

    ]
  }
};
