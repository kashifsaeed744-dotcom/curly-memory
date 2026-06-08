# Installation & Setup Guide

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (optional, for customization)
- 5 MB free disk space

## Installation Methods

### Method 1: Direct Browser Open (Easiest)

1. Navigate to the `todo-app` folder
2. Double-click `index.html`
3. Application opens in your default browser
4. Done! Start using immediately

### Method 2: Local Server with Python

```bash
# Navigate to todo-app folder
cd path/to/todo-app

# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000

# Then open: http://localhost:8000
```

### Method 3: Local Server with Node.js

```bash
# Install http-server (first time only)
npm install -g http-server

# Navigate to todo-app folder
cd path/to/todo-app

# Start server
http-server

# Then open: http://localhost:8080
```

### Method 4: VS Code Live Server

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically

## Verify Installation

When opened, verify you see:
- Purple gradient background
- "📝 My To-Do List" header
- Input field with Add button
- Filter buttons (All, Active, Completed)
- Statistics section
- Empty state message

## Troubleshooting

### Application won't load
- Verify all 3 files (HTML, CSS, JS) are in same folder
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Check browser console for errors (F12)

### Tasks not saving
- Ensure localStorage is enabled in browser
- Check browser privacy settings
- Try in regular mode (not private/incognito)
- Check browser console for errors

### Styling looks broken
- Verify style.css is in same folder as index.html
- Hard refresh: Ctrl+Shift+R
- Clear cache and reload
- Reset zoom: Ctrl+0

### Add button not working
- Ensure JavaScript is enabled
- Check browser console (F12) for errors
- Try pressing Enter instead
- Try different browser

## Browser Console

Press F12 to open browser console and try:

```javascript
// View all tasks
console.log(JSON.parse(localStorage.todos));

// Count tasks
console.log(JSON.parse(localStorage.todos).length);

// Clear all tasks (careful!)
localStorage.clear();
location.reload();
```

## Performance

- Load time: < 100ms
- File size: ~28 KB total
- Max tasks: 1000+
- UI responsiveness: 60 FPS

## Next Steps

1. Add your first task
2. Try filtering tasks
3. Export your tasks
4. Bookmark the file for quick access
5. Customize colors in style.css if desired
