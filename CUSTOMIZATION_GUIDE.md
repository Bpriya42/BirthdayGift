# 🎨 Quick Customization Guide

## 🚀 5-Minute Setup

### Step 1: Personalize Messages
Open `data.js` and replace the sample messages with your own:

```javascript
{
    id: 1,
    text: "Replace this with your personal message! 💖",
    image: "assets/media/your-photo.jpg",  // Optional
    video: null  // Or add a video path
}
```

### Step 2: Add Your Media
1. Put your photos/videos in the `assets/media/` folder
2. Update the file paths in `data.js` to match your files
3. Remove references to files you don't have (set to `null`)

### Step 3: Customize Title
In `index.html`, change:
```html
<h1>💕 25 Reasons I Love You 💕</h1>
<p>A special journey through my heart</p>
```

### Step 4: Test Your Game
Open `index.html` in your browser and play through a few levels to make sure everything works!

## 🎯 Message Ideas

### Romantic Messages:
- "The way you make me laugh every single day"
- "How you always know exactly what to say"
- "Your beautiful smile that lights up my world"

### Funny/Quirky Messages:
- "Your terrible singing in the shower 😂"
- "How you steal all the blankets at night"
- "Your obsession with [their hobby/interest]"

### Memory-Based Messages:
- "Our first date at [location]"
- "That time you [specific funny memory]"
- "How you [something they did that was sweet]"

## 🖼️ Media Tips

### For Photos:
- Use photos from special moments together
- Resize large images to 400px width for faster loading
- Include a mix of selfies, candid shots, and memorable places

### For Videos:
- Keep videos short (30 seconds or less)
- Record a personal message for the final level
- Include funny moments or inside jokes

## 🎨 Color Customization

### Change Background Colors:
In `styles.css`, find and modify:
```css
background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
```

### Change Button Colors:
Look for `.love-button` in `styles.css`:
```css
background: linear-gradient(45deg, #ff6b6b, #ee5a24);
```

## 🎮 Game Difficulty

### Make It Easier:
- Reduce platform heights in `game.js`
- Make tokens larger or easier to reach
- Add more platforms for easier navigation

### Make It More Challenging:
- Add more complex platform layouts
- Increase jump requirements
- Add moving platforms (advanced)

## 📱 Mobile Optimization

The game is already mobile-friendly, but you can:
- Test on different screen sizes
- Adjust font sizes in `styles.css` if needed
- Ensure touch controls work well

## 🎁 Presentation Ideas

### Digital Delivery:
- Email the folder as a zip file
- Upload to a file sharing service
- Host on a simple web server

### Physical Presentation:
- Put it on a USB drive with a cute label
- Set it up on their computer as a surprise
- Include printed screenshots as a teaser

## ⚡ Quick Fixes

### Images Not Loading:
- Check file paths in `data.js`
- Ensure files are in `assets/media/`
- Check file extensions match exactly

### Game Not Starting:
- Open browser developer tools (F12)
- Check for JavaScript errors in console
- Ensure all files are in the correct locations

### Styling Issues:
- Clear browser cache (Ctrl+F5)
- Check CSS syntax in `styles.css`
- Test in different browsers

---

**Remember: The most important part is the thought and love you put into it! 💕** 