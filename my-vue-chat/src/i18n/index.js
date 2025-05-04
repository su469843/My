import { createI18n } from 'vue-i18n'

const messages = {
  'zh-tw': {
    header: {
      title: '我的個人空間',
      chat: '聊天對話',
      writing: 'AI 寫作'
    },
    intro: {
      title: '關於我',
      description: '大家好，我是一個 INFP 性格的人。以前比較開朗，現在變得較為內向。雖然有時候比較膽小，但我很享受與人交流的過程。'
    },
    traits: {
      title: '個人特質',
      personality: 'INFP 性格',
      introvert: '內向但友善',
      thoughtful: '善於思考',
      creative: '富有創造力',
      genuine: '重視真誠的交流'
    },
    chat: {
      placeholder: '輸入訊息...',
      send: '發送',
      thinking: '思考中...'
    },
    writing: {
      title: 'AI 寫作助手',
      placeholder: '在此輸入需要改善的文字...',
      improve: '改善文字',
      styleSelect: '選擇寫作風格'
    }
  },
  'zh-cn': {
    header: {
      title: '我的个人空间',
      chat: '聊天对话',
      writing: 'AI 写作'
    },
    intro: {
      title: '关于我',
      description: '大家好，我是一个 INFP 性格的人。以前比较开朗，现在变得较为内向。虽然有时候比较胆小，但我很享受与人交流的过程。'
    },
    traits: {
      title: '个人特质',
      personality: 'INFP 性格',
      introvert: '内向但友善',
      thoughtful: '善于思考',
      creative: '富有创造力',
      genuine: '重视真诚的交流'
    },
    chat: {
      placeholder: '输入讯息...',
      send: '发送',
      thinking: '思考中...'
    },
    writing: {
      title: 'AI 写作助手',
      placeholder: '在此输入需要改善的文字...',
      improve: '改善文字',
      styleSelect: '选择写作风格'
    }
  },
  'en': {
    header: {
      title: 'My Personal Space',
      chat: 'Chat',
      writing: 'AI Writing'
    },
    intro: {
      title: 'About Me',
      description: 'Hello everyone, I am a person with an INFP personality. I used to be more outgoing, but now I\'ve become more introverted. Although I can be timid at times, I really enjoy the process of communicating with others.'
    },
    traits: {
      title: 'Personal Traits',
      personality: 'INFP Personality',
      introvert: 'Introverted but Friendly',
      thoughtful: 'Thoughtful',
      creative: 'Creative',
      genuine: 'Values Authentic Connection'
    },
    chat: {
      placeholder: 'Type a message...',
      send: 'Send',
      thinking: 'Thinking...'
    },
    writing: {
      title: 'AI Writing Assistant',
      placeholder: 'Enter text to improve here...',
      improve: 'Improve Text',
      styleSelect: 'Select Writing Style'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-tw',
  fallbackLocale: 'en',
  messages
})