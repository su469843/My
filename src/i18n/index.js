import { createI18n } from 'vue-i18n'

const messages = {
  'zh-tw': {
    personalInfo: {
      name: '我',
      quote: '在安靜中尋找力量，在真誠中建立連結',
      traits: {
        infp: {
          title: 'INFP 性格',
          description: '敏感、富有同理心，喜歡探索內心世界'
        },
        growth: {
          title: '性格轉變',
          description: '從開朗活潑到內斂沉靜，經歷讓我更加成熟'
        },
        thinking: {
          title: '深度思考',
          description: '喜歡思考人生的意義，關注細節與情感'
        },
        creative: {
          title: '創意表達',
          description: '透過不同方式表達想法，享受創作的過程'
        },
        genuine: {
          title: '真誠交流',
          description: '雖然內向，但重視真摯的人際互動'
        }
      }
    },
    chat: {
      title: '與我對話',
      placeholder: '來跟我聊聊吧...',
      send: '發送',
      thinking: '思考中...'
    }
  },
  'zh-cn': {
    personalInfo: {
      name: '我',
      quote: '在安静中寻找力量，在真诚中建立连结',
      traits: {
        infp: {
          title: 'INFP 性格',
          description: '敏感、富有同理心，喜欢探索内心世界'
        },
        growth: {
          title: '性格转变',
          description: '从开朗活泼到内敛沉静，经历让我更加成熟'
        },
        thinking: {
          title: '深度思考',
          description: '喜欢思考人生的意义，关注细节与情感'
        },
        creative: {
          title: '创意表达',
          description: '通过不同方式表达想法，享受创作的过程'
        },
        genuine: {
          title: '真诚交流',
          description: '虽然内向，但重视真挚的人际互动'
        }
      }
    },
    chat: {
      title: '与我对话',
      placeholder: '来跟我聊聊吧...',
      send: '发送',
      thinking: '思考中...'
    }
  },
  'en': {
    personalInfo: {
      name: 'Me',
      quote: 'Finding strength in quietness, building connections through authenticity',
      traits: {
        infp: {
          title: 'INFP Personality',
          description: 'Sensitive, empathetic, loves exploring the inner world'
        },
        growth: {
          title: 'Personal Growth',
          description: 'From outgoing to introspective, matured through experiences'
        },
        thinking: {
          title: 'Deep Thinker',
          description: 'Contemplates life\'s meaning, attentive to details and emotions'
        },
        creative: {
          title: 'Creative Expression',
          description: 'Expresses ideas in various ways, enjoys the creative process'
        },
        genuine: {
          title: 'Authentic Connection',
          description: 'Though introverted, values genuine human interactions'
        }
      }
    },
    chat: {
      title: 'Chat with Me',
      placeholder: 'Let\'s have a chat...',
      send: 'Send',
      thinking: 'Thinking...'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-tw',
  fallbackLocale: 'en',
  messages
})