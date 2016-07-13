import {HELPER_ARTICLES} from "../HELPER_ARTICLES";
export const DAYS7 = {
  title: '回顾与新架构',
  intros: [
    {
      info: {slug: 'retro', type: 'desc'}
    },
    {
      info: {slug: 'arch', type: 'desc'}
    }
  ],
  articlesView: [
    {
      title: '回顾与总结',
      articles: HELPER_ARTICLES['zh-cn'].retro
    },
    {
      title: '架构设计',
      articles: HELPER_ARTICLES['zh-cn'].arch
    }
  ],
  growthView: [
    {
      title: '回顾与总结',
      sections: [
        {
          title: '工具',
          info: {type: 'tool', domain: 'retro'}
        }
      ]
    },
    {
      title: '架构设计',
      sections: [
        {
          title: '书单',
          info: {type: 'book', domain: 'arch'}
        }
      ]
    }
  ],
  todoView: [
    {
      title: '回顾与总结',
      info: {domain: 'retro'}
    },
    {
      title: '新架构',
      info: {domain: 'arch'}
    }
  ]
};
