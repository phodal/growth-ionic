import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const DAYS3 = {
  title: "上线",
  intros: [
    {
      info: {slug: "container", type: "desc"}
    },
    {
      info: {slug: "server", type: "desc"}
    },
    {
      info: {slug: "configurable", type: "desc"}
    }
  ],
  skills: ["container", "server", "configurable"],
  articlesView: [
    {
      title: "容器",
      articles: HELPER_ARTICLES["zh-cn"].container
    },
    {
      title: "Server",
      articles: HELPER_ARTICLES["zh-cn"].server
    },
    {
      title: "可配置",
      articles: HELPER_ARTICLES["zh-cn"].configurable
    }
  ],
  growthView: [
    {
      title: "容器",
      sections: [
        {
          title: "工具",
          info: {type: "tool", domain: "container"}
        }
      ]
    },
    {
      title: "Server",
      sections: [
        {
          title: "书单",
          info: {type: "book", domain: "server"}
        }
      ]
    },
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
  todoView: [
    {
      title: "容器",
      info: {domain: "container"}
    },
    {
      title: "Server",
      info: {domain: "server"}
    },
    {
      title: "可配置",
      info: {domain: "configurable"}
    }
  ]
};
