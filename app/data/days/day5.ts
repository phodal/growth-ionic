import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const DAYS5 = {
  title: "持续交付",
  intros: [
    {
      info: {slug: "ci", type: "desc"}
    },
    {
      info: {slug: "cd", type: "desc"}
    }
  ],
  skills: ["ci", "cd"],
  articlesView: [
    {
      title: "持续集成",
      articles: HELPER_ARTICLES["zh-cn"].ci
    },
    {
      title: "持续交付",
      articles: HELPER_ARTICLES["zh-cn"].cd
    }
  ],
  growthView: [
    {
      title: "持续集成",
      sections: [
        {
          title: "工具",
          info: {type: "tool", domain: "ci"}
        }
      ]
    },
    {
      title: "持续交付",
      sections: [
        {
          title: "书单",
          info: {type: "book", domain: "cd"}
        }
      ]
    }
  ],
  todoView: [
    {
      title: "持续交付",
      info: {domain: "ci"}
    },
    {
      title: "持续集成",
      info: {domain: "cd"}
    }
  ]
};
