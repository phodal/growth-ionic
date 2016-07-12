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
      title: '编码之前',
      sections: [
        {
          title: '书单',
          info: {slug: 'before', type: 'general', domain: 'before'}
        }
      ]
    },
    {
      title: '测试',
      sections: [
        {
          title: '书单',
          info: {slug: 'test', type: 'general', domain: 'test'}
        }
      ]
    },
    {
      title: '编码',
      sections: [
        {
          title: '书单',
          info: {slug: 'coding', type: 'general', domain: 'domain'}
        }
      ]
    }
  ],
  todoView: [
    {
      title: '编码之前',
      info: {domain: 'before'}
    },
    {
      title: '测试',
      info: {domain: 'test'}
    },
    {
      title: '编码',
      info: {domain: 'coding'}
    }
  ]
};
