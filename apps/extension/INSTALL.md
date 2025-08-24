# Beyond Meanings Extension - Installation Guide

Welcome to the Beyond Meanings browser extension! This guide will walk you through the complete installation and setup process.

## 🚀 Quick Start

1. **Get an API Key** → [Beyond Meanings Dashboard](https://beyondmeanings.com/dashboard)
2. **Install Extension** → Load from source or Chrome Web Store
3. **Configure** → Enter your API key
4. **Use** → Select text + press `Ctrl+I`

---

## 📋 Prerequisites

### System Requirements
- **Browser**: Chrome 88+ or Edge 88+
- **Internet**: Stable internet connection
- **API Key**: Valid Beyond Meanings API key

### Get Your API Key
1. Visit [Beyond Meanings Dashboard](https://beyondmeanings.com/dashboard)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key (starts with `beyond-`)
5. Copy and save your API key securely

---

## 🛠️ Installation Methods

### Method 1: From Chrome Web Store (Recommended)
*Coming Soon - Extension is under review*

1. Visit the Chrome Web Store
2. Search for "Beyond Meanings"
3. Click "Add to Chrome"
4. Confirm installation
5. Skip to [Initial Setup](#-initial-setup)

### Method 2: From Source (Developer Mode)

#### Step 1: Download the Extension
```bash
# Clone the repository
git clone https://github.com/yourusername/beyond-meanings-turborepo.git

# Navigate to extension directory
cd beyond-meanings-turborepo/apps/extension
```

#### Step 2: Load in Chrome/Edge
1. Open Chrome/Edge browser
2. Navigate to `chrome://extensions/`
3. Enable **"Developer mode"** (toggle in top-right)
4. Click **"Load unpacked"**
5. Select the `beyond-meanings-turborepo/apps/extension` folder
6. The extension should appear in your extensions list

#### Step 3: Pin the Extension (Optional)
1. Click the puzzle piece icon in the browser toolbar
2. Find "Beyond Meanings" in the dropdown
3. Click the pin icon to keep it visible

---

## ⚙️ Initial Setup

### Configure Your API Key

1. **Open Extension Popup**
   - Click the Beyond Meanings icon in your browser toolbar
   - Or press `Ctrl+Shift+E` (may vary by browser)

2. **Enter API Key**
   - Paste your API key in the input field
   - Key should start with `beyond-`
   - Click **"Validate & Save"**

3. **Verification**
   - Extension will verify your API key with the server
   - Green checkmark indicates success
   - You'll see the "Setup Complete!" screen

### Troubleshooting Setup
- **"Invalid API key"**: Double-check your key and ensure it's active
- **"Network error"**: Check internet connection and server status
- **"Extension not responding"**: Reload extension in chrome://extensions/

---

## 🎯 How to Use

### Basic Usage
1. **Select Text**: Highlight any text on a webpage
2. **Trigger Research**: Press `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)
3. **View Results**: AI-powered research popup appears
4. **Explore**: Browse different tabs for various types of information
5. **Close**: Click `×`, press `Esc`, or click outside the popup

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+I` / `Cmd+I` | Research selected text |
| `Esc` | Close research popup |
| `Tab` | Navigate popup elements |

### What Gets Researched
The extension provides information from multiple sources:
- **Wikipedia**: Encyclopedic information
- **Dictionary**: Definitions and meanings
- **Web Search**: Recent news and articles
- **Movies**: Film information (if relevant)
- **Games**: Gaming content (if relevant)
- **AI Summary**: Synthesized overview

---

## 🧪 Testing Your Installation

### Test Page
1. Open the included `test.html` file in your browser
2. Try selecting different highlighted terms
3. Use `Ctrl+I` to test the research functionality

### Sample Tests
Try researching these terms to verify everything works:
- **"Artificial Intelligence"** - Tech concept
- **"Leonardo da Vinci"** - Historical figure
- **"Python"** - Programming language
- **"Tokyo"** - Geographic location
- **"Shakespeare"** - Literary figure

### Expected Behavior
1. **Loading State**: Popup appears with spinning animation
2. **Processing**: Shows "Research in progress" status
3. **Results**: Multiple tabs with different information types
4. **Summary**: AI-generated overview at the top

---

## ⚡ Performance & Limits

### API Limits
- Check your plan limits in the Beyond Meanings dashboard
- Research requests count against your monthly quota
- Failed requests don't count against limits

### Response Times
- **Typical**: 3-8 seconds for complete research
- **Timeout**: 60 seconds maximum
- **Factors**: Server load, query complexity, source availability

### Best Practices
- Select meaningful text (avoid single characters)
- Wait for current research to complete before starting new ones
- Use specific terms for better results

---

## 🔧 Advanced Configuration

### API Endpoints
The extension connects to:
- **Development**: `http://localhost:3000/api`
- **Production**: `https://api.beyondmeanings.com/api`

### Modifying Settings
To change API endpoints or other settings:
1. Edit `background.js` and `popup.js`
2. Update the `API_BASE_URL` constant
3. Reload the extension in chrome://extensions/

### Privacy Settings
- Extension only stores API key locally
- No browsing history is collected
- Research queries are sent to Beyond Meanings servers
- No personal data is transmitted

---

## 🐛 Troubleshooting

### Common Issues

#### Extension Not Loading
- **Symptom**: Extension doesn't appear in toolbar
- **Solution**: Check chrome://extensions/, ensure it's enabled
- **Alternative**: Reload the extension

#### No Popup on Shortcut
- **Symptom**: `Ctrl+I` doesn't trigger research
- **Solution**: Check if text is selected, verify API key is configured
- **Alternative**: Try clicking extension icon first

#### Research Timeout
- **Symptom**: "Research timeout" error message
- **Solution**: Try again, check internet connection
- **Alternative**: Try with simpler/shorter text

#### API Key Issues
- **Symptom**: "Invalid API key" messages
- **Solution**: Regenerate key in dashboard, re-enter in extension
- **Alternative**: Check key hasn't expired

### Debug Mode
1. Open Chrome DevTools (`F12`)
2. Go to Console tab
3. Look for "Beyond Meanings" log messages
4. Check Network tab for API calls

### Error Reporting
If you encounter persistent issues:
1. Note the error message exactly
2. Check browser console for errors
3. Note what text you were researching
4. Report to support with details

---

## 📞 Support & Resources

### Getting Help
- **Documentation**: [docs.beyondmeanings.com](https://docs.beyondmeanings.com)
- **API Status**: Check server status page
- **Account Issues**: Beyond Meanings dashboard support

### Useful Links
- **Dashboard**: [beyondmeanings.com/dashboard](https://beyondmeanings.com/dashboard)
- **API Docs**: [docs.beyondmeanings.com/api](https://docs.beyondmeanings.com/api)
- **Chrome Extensions**: [chrome://extensions/](chrome://extensions/)

### Version Information
- **Extension Version**: Check in chrome://extensions/
- **Manifest Version**: 3 (Modern Chrome extension format)
- **Minimum Chrome Version**: 88

---

## 🔄 Updates & Maintenance

### Automatic Updates
- Chrome Web Store version updates automatically
- Check chrome://extensions/ for update status

### Manual Updates
For development versions:
1. Pull latest code from repository
2. Click "Reload" button in chrome://extensions/
3. Test functionality after update

### Keeping API Key Active
- Monitor usage in Beyond Meanings dashboard
- Renew subscription before expiration
- Update API key in extension if regenerated

---

## 🎉 You're All Set!

Your Beyond Meanings extension is now ready to use! Start by selecting any text on a webpage and pressing `Ctrl+I` to experience AI-powered research.

**Happy researching! 🔍✨**