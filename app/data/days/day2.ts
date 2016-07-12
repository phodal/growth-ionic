import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const DAYS2 = {
  title: '编码',
  intros: [
    {
      info: {slug: 'front', type: 'desc'}
    }
  ],
  articlesView: [
    {
      title: '编码之前',
      articles: HELPER_ARTICLES['zh-cn'].before
    },
    {
      title: '测试',
      articles: HELPER_ARTICLES['zh-cn'].test
    },
    {
      title: '编码',
      articles: HELPER_ARTICLES['zh-cn'].coding
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
