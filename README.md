# AI Financial Advisor 🚀

An intelligent, highly aesthetic AI Financial Advisor MVP. This application provides users with a knowledgeable chatbot assistant capable of answering complex questions about finance, investing, retirement planning, budgeting, and general wealth management.

Unlike generic AI chat interfaces, this project prioritizes a **very premium, human-centered, and beautiful UI/UX**, feeling more like a high-end fintech application.

## 🌟 Key Features

- **Intelligent Financial Domain Chatbot**: Powered by Google's Gemini API, the AI acts exclusively as a professional, empathetic, and highly analytical financial advisor.
- **Contextual Understanding**: Maintains context over conversations to track users' specific financial situations.
- **Structured Markdown Output**: Renders tables (for budgets/amortization schedules), bullet points, and emphasized text.
- **Premium UI/UX Design**: Sleek dark mode by default, utilizing glassmorphism, modern typography, and smooth micro-animations.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **AI Integration**: Google Gemini API
- **Styling**: Contextual dark theme with custom design tokens

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai_financial_advisor
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.local.env` or `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 💎 Design Philosophy

The UI avoids the "standard AI chat" look in favor of:
- **Aesthetics**: Rich modern dark mode with deep, rich colors and vibrant accents.
- **Typography**: Modern, clean, and highly readable fonts.
- **Layout**: Spacious, distraction-free environment utilizing cards for financial data.

## 📄 Disclaimer

This application is an MVP and an educational prototype. The AI provides educational information and should not be construed as certified financial advice.

---
*Built with Next.js and Google Gemini.*
