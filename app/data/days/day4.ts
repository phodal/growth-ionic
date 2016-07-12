import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const DAYS4 = {
  title: '数据分析',
  intros: [
    {
      info: {slug: 'front', type: 'desc'}
    }
  ],
  articlesView: [
    {
      title: '构建系统',
      articles: HELPER_ARTICLES['zh-cn'].build
    }
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
    }
  ],
  todoView: [
    {
      title: '前端',
      info: {domain: 'frontend'}
    }
  ]
};
