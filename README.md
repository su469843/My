# 我的個人空間

這是一個基於 Vue.js 的個人介紹和 AI 聊天應用，支持繁體中文、簡體中文和英文三種語言切換。

## 功能

- **個人介紹**：展示個人特質和名言。
- **多語言支持**：支持繁體中文、簡體中文和英文三種語言切換。
- **AI 聊天**：與 AI 進行對話，支持 Markdown 格式顯示。
- **AI 寫作助手**：提供多種寫作風格的文本優化建議。

## 安裝與運行

1. 克隆此倉庫：
   ```bash
   git clone <repository-url>
   ```

2. 進入項目目錄：
   ```bash
   cd My
   ```

3. 安裝依賴：
   ```bash
   npm install
   ```

4. 啟動開發服務器：
   ```bash
   npm run dev
   ```

5. 在瀏覽器中打開 [http://localhost:3000](http://localhost:3000)。

## 使用說明

### 語言切換

- 點擊頁面右上角的語言切換按鈕，選擇所需語言。

### AI 聊天

- 在聊天框中輸入訊息，按下回車或點擊「發送」按鈕與 AI 互動。
- 支持 Markdown 格式顯示。

### AI 寫作助手

- 選擇寫作風格，輸入需要優化的文本，點擊「改善文字」按鈕。

## 項目結構

```
My/
├── public/               # 靜態資源
├── src/                  # 源代碼
│   ├── assets/           # 靜態資源（CSS、圖片等）
│   ├── components/       # Vue 組件
│   ├── config/           # 配置文件
│   ├── i18n/             # 多語言支持
│   ├── App.vue           # 主應用組件
│   └── main.js           # 入口文件
├── package.json          # 項目配置文件
├── vite.config.js        # Vite 配置文件
└── README.md             # 項目說明文件
```

## 技術棧

- Vue.js 3
- Naive UI
- Vue I18n
- Axios
- Vite

## 環境變量

請在項目根目錄下創建一個 `.env` 文件，並添加以下內容：

```
VITE_OPENROUTER_API_KEY=your_api_key_here
```

## 貢獻

歡迎提交問題和功能請求，或創建分支進行開發並提交 Pull Request。

## 許可

此項目基於 MIT 許可。
