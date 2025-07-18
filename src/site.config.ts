import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  // === Basic configuration ===
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: "Sijolin' Blog",
  /** Will be used in index page & copyright declaration */
  author: 'Sijolin',
  /** Description metadata for your website. Can be used in page metadata. */
  description: '路虽远，行则将至。',
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',
  /** Specify the default language for this site. */
  locale: {
    lang: 'zh_CN',
    attrs: 'en_US',
    // Date locale
    dateLocale: 'zh-CN',
    dateOptions: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  },
  /** Set a logo image to show in the homepage. */
  logo: {
    src: 'src/assets/avatar.png',
    alt: 'Sijolin Avatar'
  },

  // === Global configuration ===
  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  // Still in test
  head: [
    /* Telegram channel */
    {
      tag: 'meta',
      attrs: { name: '', content: '' },
      content: ''
    }
  ],
  customCss: [],

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Projects', link: '/projects' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' }
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    // Year format
    year: `© ${new Date().getFullYear()}`,
    // year: `© 2019 - ${new Date().getFullYear()}`,
    links: [
      // Registration link
      {
        title: '饿 ICP 备 114514号',
        link: 'https://www.travellings.cn/go.html',
        style: 'text-sm opacity-75 hover:opacity-100' // 悬停变色 + 字体大小
      },
      {
        title: '开往',
        link: 'https://www.travellings.cn/go.html',
        style: 'text-sm font-medium hover:text-blue-500' // 悬停变色 + 加粗
      },
      // Privacy Policy link
      {
        title: '隐私政策',
        link: '/privacy',
        pos: 2, // position set to 2 will be appended to copyright line
        style: 'text-sm hover:underline' // 悬停下划线
      }
    ],
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: true,
    /** Optional details about the social media accounts for this site. */
    social: {
      github: 'https://github.com/sijolin',
      email: 'mailto:vty4190@qq.com'
     }
  },

  content: {
    externalLinksContent: ' ↗',
    /** Blog page size for pagination (optional) */
    blogPageSize: 8,
    externalLinkArrow: true, // show external link arrow
    // Currently support weibo, x, bluesky
    share: ['weibo', 'x', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  // Links management
  // See: https://astro-pure.js.org/docs/integrations/links
  links: {
    // Friend logbook
    logbook: [
      { date: '2024-07-01', content: 'Lorem ipsum dolor sit amet.' },
      { date: '2024-07-01', content: 'vidit suscipit at mei.' },
      { date: '2024-07-01', content: 'Quem denique mea id.' }
    ],
    // Yourself link info
    applyTip: [
      { name: 'Name', val: theme.title },
      { name: 'Desc', val: theme.description || 'Null' },
      { name: 'Link', val: 'https://sijolin.com/' },
      { name: 'Avatar', val: 'https://sijolin.com/images/avatar.png' }
    ]
  },
  // Enable page search function
  pagefind: true,
  // Add a random quote to the footer (default on homepage footer)
  // See: https://astro-pure.js.org/docs/integrations/advanced#web-content-render
  quote: {
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    // server: 'https://v1.hitokoto.cn/?c=i',
    // target: (data) => (data as { hitokoto: string }).hitokoto || 'Error'
    // https://github.com/lukePeavey/quotable
    server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data[0].content || 'Error'`
  },
  // UnoCSS typography
  // See: https://unocss.dev/presets/typography
  typography: {
    class: 'prose text-base text-muted-foreground',
    // The style of blockquote font, normal or italic (default to italic in typography)
    blockquoteStyle: 'italic',
    // The style of inline code block, code or modern (default to code in typography)
    inlineCodeBlockStyle: 'modern'
  },
  // A lightbox library that can add zoom effect
  // See: https://astro-pure.js.org/docs/integrations/others#medium-zoom
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // Comment system
  waline: {
    enable: true,
    // Server service link
      server: 'https://example.sijolin.com/',
      // Refer https://waline.js.org/en/guide/features/emoji.html
      emoji: ['bmoji', 'weibo'],
      // Refer https://waline.js.org/en/reference/client/props.html
      additionalConfigs: {
        // search: false,
        pageview: true,
        comment: true,
        locale: {
          reaction0: 'Like',
          placeholder: '真正重要的东西，用眼睛是看不见的。」——写下你的想法吧',
          nick: '昵称',
          mail: '邮箱',
          link: '网址（可选）',
        },
  
        // 图片上传功能
        imageUploader: false,
  
        // 表情面板设置
        emojiCDN: '', // 自定义表情CDN
        emojiMaps: {}, // 自定义表情映射
  
        // 字数限制
        wordLimit: 0, // 0表示无限制
  
        // 评论列表分页
        pageSize: 10,
  
        // 必填项设置
        requiredFields: ['nick', 'mail'], // 必须填写昵称和邮箱
  
        // 匿名评论
        anonymous: true, // 允许匿名评论
  
        // 复制评论链接
        copyright: true, // 显示版权信息
  
        // 自定义CSS类名
        meta: ['nick', 'mail', 'link'],
        metaPlaceholder: {
          nick: '请输入昵称',
          mail: '请输入邮箱地址',
          link: '请输入网址(可选)'
      }
    }
  }
}

export const terms: CardListData = {
  title: 'Terms content',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
