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
          info: {slug: 'before', type: 'book', domain: 'before'}
        }
      ]
    },
    {
      title: '测试',
      sections: [
        {
          title: '书单',
          info: {slug: 'test', type: 'book', domain: 'test'}
        }
      ]
    },
    {
      title: '编码',
      sections: [
        {
          title: '书单',
          info: {slug: 'coding', type: 'book', domain: 'domain'}
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
