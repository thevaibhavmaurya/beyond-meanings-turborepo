# BeyondMeanings

## Introduction

Research online is broken. You highlight a word, open a new tab, search Google, maybe check Wikipedia, possibly look up a movie on IMDB, then lose track of what you were originally reading. It takes a lot of time. What if you could get comprehensive information with just a single command?

**BeyondMeanings** fixes this.

BeyondMeanings is an intelligent browser extension that brings comprehensive, multi-source research directly to any webpage. Simply highlight any word or phrase, and instantly access organized information from Wikipedia, web search, movie databases, gaming platforms, dictionary definitions and all without leaving your current page.

No more tab switching. No more context loss. No more fragmented research.



## Demo Video

https://github.com/user-attachments/assets/b378e992-8eca-40e7-bad1-d7d123b88c78

## My Challenges

• **Python Was Completely New** - I only knew JavaScript before this, so building anything in Python was tough. Creating an AI agent for the first time? Even tougher. Had to rely heavily on Cursor to help me write the code

• **Learning Agent Architecture** - Had to figure out from scratch how agents work, how LLMs interact with different tools and platforms, and how to make them all talk to each other properly

• **Tool Integration Nightmare** - Integrating Wikipedia, TMDB, IGDB, Tavily, and other APIs with the agent, then combining all those results into something useful for users was way more complex than I expected

• **First Time Building Extensions** - Never built a browser extension before, so learning the Chrome extension APIs, manifest files, and how to make frontend communicate with backend was a whole new world

• **Backend Architecture Issues** - Implemented a backend but honestly, it's not great or scalable yet. Still learning how to structure things properly for real-world use

Overall though, it was an amazing experience and I learned a ton!


## Features

• **Multi-Source Research** - Access Wikipedia, web search, movie databases, gaming info, and dictionary definitions all in one place

• **AI-Powered Intelligence** - Context aware results that understand what you're looking for and provide relevant, organized information

• **Organized Tab Interface** - Clean, structured presentation with dedicated tabs for different types of information sources

• **Real-time Information** - Get the latest web results and current information, not outdated cached content

• **Cross-Platform** - Works seamlessly across all major browsers like Chrome, Firefox, Safari, and Edge

• **Privacy Focused** - No tracking, no data collection, no ads. Your research stays private and secure

## Problems We Solve

• **Constant Tab Switching** - You know that feeling when you're reading something and have to open like 5 different tabs to understand one word? Yeah, that breaks your focus completely. BeyondMeanings lets you get all that info without leaving your page
*[Learn more about tab overload](https://www.cmu.edu/news/stories/archives/2021/may/overcoming-tab-overload.html)*

• **Information Is All Over The Place** - Sometimes you need Wikipedia, sometimes Reddit has the real answer, sometimes it's on Stack Overflow. Why should you check each site manually when one search can do it all?
*[Community discussion](https://www.reddit.com/r/browsers/comments/1k8za0c/looking_for_a_browser_extension_that_can_parallel/)*

• **Doing The Same Search Multiple Times** - How many times have you googled the same thing on different sites? It's such a waste of time. Our extension does one search and gets results from everywhere
*[Research on application switching](https://hbr.org/2022/08/how-much-time-and-energy-do-we-waste-toggling-between-applications)*

• **Results Are Usually A Mess** - Google gives you 10 blue links, Wikipedia gives you a wall of text, and everything else is scattered. We organize it properly so you can actually find what you need
*[Browser extensions for better search](https://www.wired.com/story/9-browser-extensions-search-the-web-better)*

• **Dictionary Popups Are Too Basic** - Those simple definition popups are fine for basic words, but what if you need context about a movie, a game, or some complex topic? We give you the full picture
*[Community feedback](https://www.reddit.com/r/readwise/comments/1781r5m/have_access_to_the_surrounding_text_around_a/)*

• **Mobile Research Sucks** - Trying to research stuff on your phone is painful with all the tab switching and tiny screens. We keep everything in one clean interface that actually works on mobile
*[Mobile usability research](https://www.nngroup.com/articles/mobile-content-is-twice-as-difficult-2011/)*

## Architecture
<img width="3044" height="1837" alt="image" src="https://github.com/user-attachments/assets/37dc1169-a9e0-45ce-9cf8-2581c1e1638a" />

## Installation Guide

### Prerequisites
Make sure you have Node.js, Postgres and pnpm installed on your system.

### Step 1: Environment Configuration
1. **Configure Environment Files**
   - Copy `.env.example` to `.env` in each app directory:
     - `apps/agent/.env.example` → `apps/agent/.env`
     - `apps/api/.env.example` → `apps/api/.env`  
     - `apps/web/.env.example` → `apps/web/.env`
   - Fill in the required environment variables in each `.env` file

### Step 2: Install Dependencies
1. **Install Project Dependencies**
   ```bash
   pnpm i
   ```

2. **Install Agent Dependencies**
   ```bash
   pnpm run install:agent
   ```

### Step 3: Start the Application
1. **Start the Main Project**
   ```bash
   pnpm run dev
   ```

2. **Start the Agent (New Terminal)**
   Open a new terminal window and run:
   ```bash
   pnpm run start:agent
   ```

### Step 4: Install Browser Extension
1. **Open Browser Extension Management**
   - **Chrome/Edge**: Navigate to `chrome://extensions/`
   - **Firefox**: Navigate to `about:debugging#/runtime/this-firefox`

2. **Enable Developer Mode**
   - Toggle "Developer mode" on (Chrome/Edge)
   - Click "This Firefox" → "Load Temporary Add-on" (Firefox)

3. **Load Unpacked Extension**
   - Click "Load unpacked" and select the extension folder
   - The BeyondMeanings extension should now appear in your extensions list

### Step 5: Account Setup & API Configuration
1. **Create Account**
   - Open your browser and navigate to `localhost:3001`
   - Create a new account or sign in

2. **Get API Key**
   - After logging in, copy your API Key from the dashboard

3. **Configure Extension**
   - Click on the BeyondMeanings extension icon in your browser toolbar
   - Paste your API Key in the settings
   - Save the configuration

### Step 6: Start Using BeyondMeanings
1. **Activate Lookup**
   - Highlight any word or phrase on any webpage
   - Press `Cmd+I` (Mac) or `Ctrl+I` (Windows/Linux)
   - View comprehensive research results instantly!

### Troubleshooting
- Ensure all services are running (web app on localhost:3001, agent service)
- Verify your API key is correctly entered in the extension
- Check browser console for any error messages
- Make sure all environment variables are properly configured

## Quick Start

1. **Highlight any text** on any webpage
2. **Right-click** and select "BeyondMeanings Lookup" or use the keyboard shortcut
3. **View organized results** in the popup panel
4. **Explore different tabs** for comprehensive information
5. **Close when done** - you never left your original page!

---
