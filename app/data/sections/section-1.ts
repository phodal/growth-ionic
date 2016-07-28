import {HELPER_ARTICLES} from "../HELPER_ARTICLES";

export const SECTION1 = {
  "build": {
    title: "构建系统",
    articlesView: [
      {
        title: "构建系统",
        articles: HELPER_ARTICLES["zh-cn"].build
      }
    ],
    skills: ["build"],
    todoView: [{
      title: "构建系统",
      info: {domain: "build"}
    }]
  },
  "front": {
    title: "前端",
    articlesView: [
      {
        title: "前端",
        articles: HELPER_ARTICLES["zh-cn"].front
      }
    ],
    skills: ["front"],
    growthView: [
      {
        title: "前端",
        sections: [
          {
            title: "Debug",
            info: {slug: "debug", type: "general", domain: "frontend"}
          }
        ]
      }
    ],
    todoView: [{
      title: "前端",
      info: {domain: "frontend"}
    }]
  },
  "backend": {
    title: "后台",
    articlesView: [
      {
        title: "后台",
        articles: HELPER_ARTICLES["zh-cn"].backend
      }
    ],
    skills: ["front"],
    growthView: [
      {
        title: "后台",
        sections: [
          {
            title: "服务框架",
            info: {slug: "framework", type: "general", domain: "backend"}
          },
          {
            title: "应用框架",
            info: {slug: "services", type: "general", domain: "backend"}
          }
        ]
      }
    ],
    todoView: [{
      title: "后台",
      info: {domain: "backend"}
    }]
  },
};
