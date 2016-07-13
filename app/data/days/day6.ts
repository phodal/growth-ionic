import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const DAYS6 = {
  title: '遗留系统',
  intros: [
    {
      info: {slug: 'legacy', type: 'desc'}
    },
    {
      info: {slug: 'refactor', type: 'desc'}
    }
  ],
  articlesView: [
    {
      title: '遗留系统',
      articles: HELPER_ARTICLES['zh-cn'].legacy
    },
    {
      title: '重构',
      articles: HELPER_ARTICLES['zh-cn'].refactor
    }
  ],
  growthView: [
    {
      title: 遗留系统,
      sections: [
        {
          title: '书单',
          info: {type: 'book', domain: 'legacy'}
        }
      ]
    },
    {
      title: 重构,
      sections: [
        {
          title: '书单',
          info: {type: 'book', domain: 'refactor'}
        },
        {
          title: 'Growth',
          info: {type: 'growth', domain: 'refactor'}
        }
      ]
    }
  ]
  todoView: [

  ]
};
