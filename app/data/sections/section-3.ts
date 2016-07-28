import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const SECTION3 = {
  "container": {
    title: "容器",
    intros: [
      {
        info: {slug: "container", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "容器",
        articles: HELPER_ARTICLES["zh-cn"].container
      }
    ],
    skills: ["container"],
    growthView: [
      {
        title: "容器",
        sections: [
          {
            title: "工具",
            info: {type: "tool", domain: "container"}
          }
        ]
      }
    ],
    todoView: [{
      title: "容器",
      info: {domain: "container"}
    }]
  },
  "server": {
    title: "Server",
    intros: [
      {
        info: {slug: "server", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "Server",
        articles: HELPER_ARTICLES["zh-cn"].server
      }
    ],
    skills: ["server"],
    growthView: [
      {
        title: "Server",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "server"}
          }
        ]
      }
    ],
    todoView: [{
      title: "Server",
      info: {domain: "server"}
    }]
  },
  "configurable": {
    title: "可配置",
    intros: [
      {
        info: {slug: "configurable", type: "desc"}
      }
    ],
    articlesView: [
      {
        title: "可配置",
        articles: HELPER_ARTICLES["zh-cn"].configurable
      }
    ],
    skills: ["configurable"],
    growthView: [
      {
        title: "可配置",
        sections: [
          {
            title: "书单",
            info: {type: "book", domain: "configurable"}
          }
        ]
      }
    ],
    todoView: [{
      title: "可配置",
      info: {domain: "configurable"}
    }]
  }
};
