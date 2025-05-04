<script setup>
import { ref, computed } from 'vue'
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutSider, 
         NMenu, NInput, NButton, NCard, NSpace, NSelect, NMessageProvider } from 'naive-ui'
import { writingPrompts, OPENROUTER_CONFIG } from './config/prompts'
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

const personalTraits = [
  { icon: '🎭', trait: 'INFP 性格' },
  { icon: '🌱', trait: '內向但友善' },
  { icon: '💭', trait: '善於思考' },
  { icon: '🎨', trait: '富有創造力' },
  { icon: '🤝', trait: '重視真誠的交流' }
]

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
      messages: [{ role: 'user', content: userMessage }]
    }, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`
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
          <div class="profile">
            <img src="./assets/logo.svg" class="avatar" alt="頭像" />
            <h1>我的個人空間</h1>
          </div>
        </n-layout-header>
        
        <n-layout has-sider>
          <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            show-trigger
            class="sider"
          >
            <n-menu
              v-model:value="activeTab"
              :options="menuOptions"
            />
            
            <div class="traits-container">
              <h3>個人特質</h3>
              <div class="traits">
                <div v-for="(item, index) in personalTraits" 
                     :key="index" 
                     class="trait-item">
                  <span class="trait-icon">{{ item.icon }}</span>
                  <span class="trait-text">{{ item.trait }}</span>
                </div>
              </div>
            </div>
          </n-layout-sider>
          
          <n-layout-content class="content">
            <div v-if="activeTab === 'chat'" class="chat-container">
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
                  placeholder="輸入訊息..."
                  :autosize="{ minRows: 1, maxRows: 4 }"
                  @keyup.enter.prevent="sendMessage"
                />
                <n-button type="primary" @click="sendMessage">發送</n-button>
              </div>
            </div>
            
            <div v-else-if="activeTab === 'writing'" class="writing-container">
              <n-card title="AI 寫作助手">
                <n-space vertical>
                  <n-select
                    v-model:value="selectedPrompt"
                    :options="Object.entries(writingPrompts).map(([key, value]) => ({
                      label: value,
                      value: key
                    }))"
                    placeholder="選擇寫作風格"
                  />
                  <n-input
                    v-model:value="writingContent"
                    type="textarea"
                    placeholder="在此輸入需要改善的文字..."
                    :autosize="{ minRows: 6, maxRows: 12 }"
                  />
                  <n-button 
                    type="primary"
                    @click="improveWriting"
                    :loading="isTyping"
                  >
                    改善文字
                  </n-button>
                </n-space>
              </n-card>
            </div>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-config-provider>
  </n-message-provider>
</template>

<style scoped>
.layout {
  height: 100vh;
}

.header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  background: var(--primary-color);
  color: white;
}

.profile {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  padding: 4px;
}

.sider {
  background: var(--card-color);
}

.content {
  padding: 20px;
  background: var(--base-color);
}

.traits-container {
  padding: 16px;
  margin-top: 20px;
}

.traits {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trait-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  background: var(--hover-color);
}

.trait-icon {
  font-size: 1.2em;
}

.chat-container {
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
}

.message.user {
  align-self: flex-end;
  background: var(--primary-color);
  color: white;
}

.message.ai {
  align-self: flex-start;
  background: var(--card-color);
}

.message.error {
  background: var(--error-color);
  color: white;
}

.typing {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--text-color);
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
}

.input-area {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.writing-container {
  max-width: 800px;
  margin: 0 auto;
}

:root {
  --primary-color: #18a058;
  --error-color: #d03050;
  --text-color: #333;
  --border-color: #eee;
  --card-color: #fff;
  --base-color: #f5f5f5;
  --hover-color: #f0f0f0;
}

[data-theme="dark"] {
  --text-color: #fff;
  --border-color: #333;
  --card-color: #242424;
  --base-color: #181818;
  --hover-color: #2f2f2f;
}
</style>
