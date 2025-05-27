# 💕 25 Reasons I Love You - Love Quest Game 💕

A beautiful HTML5 browser game built with Phaser 3 as the perfect personalized gift! Guide your character through 25 levels, collecting love tokens that reveal heartfelt messages, images, and videos.

## 🎮 How to Play

1. Open `index.html` in your web browser
2. Use **Arrow Keys** or **WASD** to move your character
3. **Jump** with Up Arrow or W key
4. Collect the **love tokens** (red hearts) in each level
5. Read the beautiful love messages that appear
6. Progress through all 25 levels to see the final celebration!

## 🎯 Game Features

- **25 Unique Levels** with different platform layouts
- **Beautiful Envelope Animation** when messages are revealed
- **Support for Images and Videos** in love messages
- **Romantic Visual Effects** including floating hearts and sparkles
- **Responsive Design** that works on desktop and mobile
- **Final Celebration** with fireworks and confetti after completing all levels

## 🛠️ Customization Guide

### 1. Personalizing Love Messages

Edit the `data.js` file to add your own personal messages:

```javascript
const loveMessages = [
    {
        id: 1,
        text: "Your custom love message here! 💖",
        image: "assets/media/your-photo.jpg",  // Optional
        video: "assets/media/your-video.mp4"   // Optional
    },
    // ... add 24 more messages
];
```

### 2. Adding Your Own Media

**For Images:**
- Place your photos in the `assets/media/` folder
- Supported formats: JPG, PNG, GIF
- Recommended size: 400px width or smaller for best display

**For Videos:**
- Place your videos in the `assets/media/` folder
- Supported formats: MP4, WebM, OGG
- Keep file sizes small for faster loading (under 10MB recommended)

**Example file structure:**
```
assets/media/
├── our-first-date.jpg
├── vacation-video.mp4
├── funny-moment.gif
└── anniversary-photo.png
```

### 3. Customizing the Game Title

Edit the `index.html` file to change the title:

```html
<h1>💕 Your Custom Title Here 💕</h1>
<p>Your custom subtitle</p>
```

### 4. Changing Colors and Styling

Edit `styles.css` to customize:
- **Background colors**: Look for `background: linear-gradient(...)`
- **Button colors**: Search for `.love-button`
- **Text colors**: Modify `color` properties
- **Fonts**: Change the Google Fonts import at the top

### 5. Adding More Levels

The game automatically cycles through 5 different level layouts. To add more variety:

1. Edit the `levelLayouts` array in `game.js`
2. Add new platform configurations:

```javascript
{ tokenX: 400, tokenY: 200, platforms: [[200, 400], [600, 300]] }
```

## 📁 Project Structure

```
love-quest-game/
├── index.html          # Main game page
├── game.js            # Phaser 3 game logic
├── data.js            # Love messages and media
├── styles.css         # Beautiful styling
├── README.md          # This file
├── assets/
│   ├── media/         # Your photos and videos
│   ├── sprites/       # Game sprites (auto-generated)
│   └── tiles/         # Game tiles (auto-generated)
└── levels/            # Level data (for future expansion)
```

## 🚀 Getting Started

1. **Download/Clone** this project
2. **Customize** the messages in `data.js`
3. **Add your media** to `assets/media/`
4. **Open** `index.html` in a web browser
5. **Share** with your loved one! 💕

## 💡 Tips for the Perfect Gift

- **Personal Photos**: Add photos from your relationship milestones
- **Short Videos**: Include funny moments, messages, or memories
- **Specific Memories**: Reference inside jokes and shared experiences
- **Variety**: Mix serious and funny messages for emotional balance
- **Test First**: Play through the entire game before gifting

## 🌐 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- 📱 Mobile browsers (responsive design)

## 🎨 Technical Details

- **Framework**: Phaser 3.70.0
- **No Build System**: Pure HTML/CSS/JavaScript
- **Lightweight**: Fast loading and smooth performance
- **Offline Ready**: Works without internet after initial load

## 💖 Making It Extra Special

### Ideas for Enhancement:
- Record a personal video message for the final level
- Add background music (edit `game.js` to include audio)
- Create a custom favicon with your photo
- Print out the messages as a physical backup gift
- Host it online so they can play anywhere

### Romantic Presentation Ideas:
- Send the link as a "surprise game"
- Set it up on their computer as a surprise
- Play it together on a special date
- Use it as part of a larger gift presentation

## 🤝 Support

This is a labor of love! If you need help customizing:
1. Check the comments in the code files
2. Test changes in small steps
3. Use browser developer tools to debug
4. Remember: the thought and effort matter most! 💕

---

**Made with 💖 for creating unforgettable moments**

*"The best gifts come from the heart, and this one is coded with love!"* 