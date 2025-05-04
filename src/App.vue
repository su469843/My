<script setup>
import { ref, computed } from 'vue'
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutSider, 
         NMenu, NInput, NButton, NCard, NSpace, NSelect, NMessageProvider, NDivider } from 'naive-ui'
import { writingPrompts } from './config/prompts'
import { marked } from 'marked'
import axios from 'axios'

const activeTab = ref('chat')
const messages = ref([])
const newMessage = ref('')
const isTyping = ref(false)
const selectedPrompt = ref('general')
const writingContent = ref('')
const theme = ref('light')

const menuOptions = [
  {
    label: '聊天對話',
    key: 'chat',
    icon: '💭'
  },
  {
    label: 'AI 寫作',
    key: 'writing',
    icon: '✍️'
  }
]

const OPENROUTER_CONFIG = {
  baseURL: 'https://api.openrouter.ai/api/v1',
  defaultModel: 'qwen/qwen3-235b-a22b:free'
}

const personalInfo = {
  name: '我',
  traits: [
    { 
      icon: '🎭', 
      title: 'INFP 性格',
      description: '敏感、富有同理心，喜歡探索內心世界'
    },
    { 
      icon: '🌱', 
      title: '性格轉變',
      description: '從開朗活潑到內斂沉靜，經歷讓我更加成熟'
    },
    { 
      icon: '💭', 
      title: '深度思考',
      description: '喜歡思考人生的意義，關注細節與情感'
    },
    { 
      icon: '🎨', 
      title: '創意表達',
      description: '透過不同方式表達想法，享受創作的過程'
    },
    { 
      icon: '🤝', 
      title: '真誠交流',
      description: '雖然內向，但重視真摯的人際互動'
    }
  ],
  quote: '在安靜中尋找力量，在真誠中建立連結'
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  
  const userMessage = newMessage.value
  messages.value.push({
    text: userMessage,
    isUser: true
  })
  
  newMessage.value = ''
  isTyping.value = true
  
  try {
    const response = await axios.post(`${OPENROUTER_CONFIG.baseURL}/chat/completions`, {
      model: OPENROUTER_CONFIG.defaultModel,
      messages: [{ role: 'user', content: userMessage }],
      headers: {
        'Authorization': 'Bearer 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'
      }
    })
    
    messages.value.push({
      text: response.data.choices[0].message.content,
      isUser: false
    })
  } catch (error) {
    messages.value.push({
      text: '抱歉，發生了一些錯誤。請稍後再試。',
      isUser: false,
      isError: true
    })
  }
  
  isTyping.value = false
}

const improveWriting = async () => {
  if (!writingContent.value.trim()) return
  
  isTyping.value = true
  const prompt = writingPrompts[selectedPrompt.value]
  
  try {
    const response = await axios.post(`${OPENROUTER_CONFIG.baseURL}/chat/completions`, {
      model: OPENROUTER_CONFIG.defaultModel,
      messages: [
        { 
          role: 'user', 
          content: `${prompt}\n\n${writingContent.value}` 
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`
      }
    })
    
    writingContent.value = response.data.choices[0].message.content
  } catch (error) {
    console.error('改寫出錯：', error)
  }
  
  isTyping.value = false
}
</script>

<template>
  <n-message-provider>
    <n-config-provider :theme="theme === 'dark' ? darkTheme : null">
      <n-layout class="layout">
        <n-layout-header class="header">
          <div class="header-content">
            <div class="profile">
              <img src="./assets/logo.svg" class="avatar" alt="頭像" />
              <h1>{{ personalInfo.name }}的個人空間</h1>
            </div>
          </div>
        </n-layout-header>
        
        <n-layout-content class="main-content">
          <!-- 個人介紹區 -->
          <div class="hero-section">
            <div class="hero-content">
              <h2 class="quote">{{ personalInfo.quote }}</h2>
            </div>
          </div>
          
          <!-- 特質展示區 -->
          <div class="traits-grid">
            <n-card v-for="trait in personalInfo.traits" 
                   :key="trait.title"
                   class="trait-card"
                   :class="{ 'highlight': trait.highlight }">
              <div class="trait-header">
                <span class="trait-icon">{{ trait.icon }}</span>
                <h3>{{ trait.title }}</h3>
              </div>
              <p class="trait-description">{{ trait.description }}</p>
            </n-card>
          </div>
          
          <n-divider>與我對話</n-divider>
          
          <!-- 聊天區域 -->
          <div class="chat-section">
            <div class="messages" ref="messagesContainer">
              <div v-for="(msg, index) in messages" 
                   :key="index" 
                   :class="['message', msg.isUser ? 'user' : 'ai', msg.isError ? 'error' : '']">
                <div class="message-content" v-html="marked(msg.text)"></div>
              </div>
              <div v-if="isTyping" class="message ai typing">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
            
            <div class="input-area">
              <n-input
                v-model:value="newMessage"
                type="textarea"
                placeholder="來跟我聊聊吧..."
                :autosize="{ minRows: 1, maxRows: 4 }"
                @keyup.enter.prevent="sendMessage"
              />
              <n-button type="primary" @click="sendMessage" class="send-button">
                發送
              </n-button>
            </div>
          </div>
        </n-layout-content>
      </n-layout>
    </n-config-provider>
  </n-message-provider>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: var(--base-color);
}

.header {
  padding: 16px;
  background: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}

.hero-section {
  text-align: center;
  margin-bottom: 48px;
  padding: 48px 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, #2c7a7b 100%);
  border-radius: 16px;
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.quote {
  font-size: 2em;
  font-weight: 300;
  margin-bottom: 24px;
  line-height: 1.4;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.trait-card {
  transition: all 0.3s ease;
  height: 100%;
}

.trait-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.trait-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.trait-icon {
  font-size: 2em;
}

.trait-description {
  color: var(--text-color-secondary);
  line-height: 1.6;
}

.chat-section {
  max-width: 800px;
  margin: 0 auto;
  background: var(--card-color);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.messages {
  height: 400px;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  max-width: 80%;
  padding: 16px;
  border-radius: 16px;
  line-height: 1.6;
  animation: fadeIn 0.3s ease;
}

.message.user {
  align-self: flex-end;
  background: var(--primary-color);
  color: white;
}

.message.ai {
  align-self: flex-start;
  background: var(--card-color);
  border: 1px solid var(--border-color);
}

.message-content {
  font-size: 1.1em;
}

.input-area {
  margin-top: 24px;
  display: flex;
  gap: 16px;
}

.send-button {
  padding: 0 32px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

:root {
  --primary-color: #18a058;
  --text-color: #333;
  --text-color-secondary: #666;
  --border-color: #eee;
  --card-color: #fff;
  --base-color: #f5f7fa;
}

[data-theme="dark"] {
  --text-color: #fff;
  --text-color-secondary: #999;
  --border-color: #333;
  --card-color: #242424;
  --base-color: #181818;
}
</style>
