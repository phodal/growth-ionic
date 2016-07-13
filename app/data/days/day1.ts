import {HELPER_ARTICLES} from "../HELPER_ARTICLES";

export const DAYS1 = {
  title: '从零开始',
  intros: [
    {
      info: {slug: 'build', type: 'desc'}
    },
    {
      info: {slug: 'front', type: 'desc'}
    },
    {
      info: {slug: 'backend', type: 'desc'}
    }
  ],
  skills: ['build', 'front', 'backend'],
  articlesView: [
    {
      title: '构建系统',
      articles: HELPER_ARTICLES['zh-cn'].build
    },
    {
      title: '前端',
      articles: HELPER_ARTICLES['zh-cn'].front
    },
    {
      title: '后台',
      articles: HELPER_ARTICLES['zh-cn'].backend
    },
  ],
  growthView: [
    {
      title: '前端',
      sections: [
        {
          title: 'Debug',
          info: {slug: 'debug', type: 'general', domain: 'frontend'}
        }
      ]
    },
    {
      title: '后台',
      sections: [
        {
          title: '服务框架',
          info: {slug: 'framework', type: 'general', domain: 'backend'}
        },
        {
          title: '应用框架',
          info: {slug: 'services', type: 'general', domain: 'backend'}
        }
      ]
    }
  ],
  todoView: [
    {
      title: '前端',
      info: {domain: 'frontend'}
    },
    {
      title: '后台',
      info: {domain: 'backend'}
    }
  ]
};
