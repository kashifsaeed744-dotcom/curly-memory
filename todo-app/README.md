# 📝 To-Do List Application

A beautiful, responsive To-Do List application with local storage functionality.

## Features

✅ **Add & Manage Tasks**
- Add new tasks with Enter key or button click
- Edit existing tasks
- Delete tasks with confirmation
- Mark tasks as complete/incomplete

✅ **Filter & Organize**
- View all tasks
- Filter by active tasks
- Filter by completed tasks
- Real-time statistics

✅ **Local Storage**
- All data saved locally in browser
- Tasks persist across sessions
- Auto-save after every action
- Export tasks as JSON

✅ **Beautiful UI**
- Modern gradient design
- Smooth animations
- Toast notifications
- Confirmation modals
- Fully responsive (mobile, tablet, desktop)
- Dark mode support

## Quick Start

1. **Open the application**
   - Double-click `index.html` in the browser
   - Or use a local server: `python -m http.server 8000`

2. **Add a task**
   - Type in the input field
   - Press Enter or click Add button

3. **Manage tasks**
   - Click checkbox to complete
   - Click pencil to edit
   - Click trash to delete

4. **Filter & export**
   - Use filter buttons (All, Active, Completed)
   - Click Export to download tasks as JSON

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Local Storage

Tasks are automatically saved to your browser's localStorage:
- Storage key: `todos`
- Storage limit: 5-10 MB
- Persists across browser restarts
- Completely private (stored locally)

## Files

- `index.html` - HTML structure
- `style.css` - Responsive styling
- `script.js` - Application logic
- `README.md` - This file

## Developer Console

Access the application programmatically:

```javascript
// View all tasks
window.todoManager.getAllTodos();

// Get statistics
window.todoManager.getStats();

// Export as JSON
window.todoManager.exportAsJSON();

// Clear all tasks
window.todoManager.clearAll();
```

## License

Open source and available for personal and educational use.
