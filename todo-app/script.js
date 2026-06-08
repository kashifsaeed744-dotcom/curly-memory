// ============================================================================
// LOCAL STORAGE MANAGER
// ============================================================================

class TodoManager {
    constructor(storageKey = 'todos') {
        this.storageKey = storageKey;
        this.todos = this.loadFromStorage();
        this.currentFilter = 'all';
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading todos from storage:', error);
            return [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving todos to storage:', error);
            showToast('Failed to save todos', 'error');
        }
    }

    addTodo(text, priority = 'medium') {
        if (!text.trim()) {
            showToast('Please enter a task', 'warning');
            return null;
        }

        const todo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            priority: priority,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.todos.unshift(todo);
        this.saveToStorage();
        return todo;
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToStorage();
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.completedAt = todo.completed ? new Date().toISOString() : null;
            this.saveToStorage();
        }
    }

    updateTodo(id, text) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.text = text.trim();
            this.saveToStorage();
        }
    }

    updatePriority(id, priority) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.priority = priority;
            this.saveToStorage();
        }
    }

    getAllTodos() {
        return this.todos;
    }

    getFilteredTodos(filter = 'all') {
        switch (filter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    getStats() {
        return {
            total: this.todos.length,
            active: this.todos.filter(todo => !todo.completed).length,
            completed: this.todos.filter(todo => todo.completed).length
        };
    }

    clearCompleted() {
        const clearedCount = this.todos.filter(todo => todo.completed).length;
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveToStorage();
        return clearedCount;
    }

    clearAll() {
        const clearedCount = this.todos.length;
        this.todos = [];
        this.saveToStorage();
        return clearedCount;
    }

    exportAsJSON() {
        return JSON.stringify(this.todos, null, 2);
    }

    importFromJSON(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            if (Array.isArray(imported)) {
                this.todos = imported;
                this.saveToStorage();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing todos:', error);
            return false;
        }
    }
}

// ============================================================================
// UI MANAGER
// ============================================================================

class UIManager {
    constructor(todoManager) {
        this.todoManager = todoManager;
        this.initElements();
        this.attachEventListeners();
        this.render();
    }

    initElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.clearAllBtn = document.getElementById('clearAll');
        this.exportBtn = document.getElementById('exportBtn');
        this.deleteModal = document.getElementById('deleteModal');
        this.confirmDeleteBtn = document.getElementById('confirmDelete');
        this.cancelDeleteBtn = document.getElementById('cancelDelete');
        this.totalCount = document.getElementById('totalCount');
        this.activeCount = document.getElementById('activeCount');
        this.completedCount = document.getElementById('completedCount');
        this.deleteMessage = document.getElementById('deleteMessage');
        this.toastElement = document.getElementById('toast');

        this.pendingDeleteId = null;
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.handleAddTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddTodo();
        });

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e.target.dataset.filter));
        });

        this.clearCompletedBtn.addEventListener('click', () => this.handleClearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.handleClearAll());
        this.exportBtn.addEventListener('click', () => this.handleExport());

        this.confirmDeleteBtn.addEventListener('click', () => this.handleConfirmDelete());
        this.cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModal());

        this.deleteModal.addEventListener('click', (e) => {
            if (e.target === this.deleteModal) this.closeDeleteModal();
        });
    }

    handleAddTodo() {
        const text = this.todoInput.value.trim();
        if (text) {
            const todo = this.todoManager.addTodo(text);
            if (todo) {
                this.todoInput.value = '';
                showToast('Task added successfully!', 'success');
                this.render();
            }
        }
    }

    handleFilterChange(filter) {
        this.todoManager.currentFilter = filter;
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        this.render();
    }

    handleDeleteTodo(id) {
        this.pendingDeleteId = id;
        const todo = this.todoManager.todos.find(t => t.id === id);
        this.deleteMessage.textContent = `Are you sure you want to delete: "${todo.text}"?`;
        this.openDeleteModal();
    }

    handleConfirmDelete() {
        if (this.pendingDeleteId !== null) {
            this.todoManager.deleteTodo(this.pendingDeleteId);
            showToast('Task deleted successfully!', 'success');
            this.closeDeleteModal();
            this.render();
        }
    }

    handleToggleTodo(id) {
        this.todoManager.toggleTodo(id);
        this.render();
    }

    handleClearCompleted() {
        const count = this.todoManager.todos.filter(t => t.completed).length;
        if (count === 0) {
            showToast('No completed tasks to clear', 'warning');
            return;
        }
        this.todoManager.clearCompleted();
        showToast(`Cleared ${count} completed task(s)!`, 'success');
        this.render();
    }

    handleClearAll() {
        if (this.todoManager.todos.length === 0) {
            showToast('No tasks to clear', 'warning');
            return;
        }
        if (confirm('⚠️ This will delete ALL tasks. Are you sure?')) {
            const count = this.todoManager.todos.length;
            this.todoManager.clearAll();
            showToast(`Cleared all ${count} task(s)!`, 'success');
            this.render();
        }
    }

    handleExport() {
        if (this.todoManager.todos.length === 0) {
            showToast('No tasks to export', 'warning');
            return;
        }

        const jsonData = this.todoManager.exportAsJSON();
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('Tasks exported successfully!', 'success');
    }

    openDeleteModal() {
        this.deleteModal.classList.add('active');
    }

    closeDeleteModal() {
        this.deleteModal.classList.remove('active');
        this.pendingDeleteId = null;
    }

    updateStats() {
        const stats = this.todoManager.getStats();
        this.totalCount.textContent = stats.total;
        this.activeCount.textContent = stats.active;
        this.completedCount.textContent = stats.completed;
    }

    render() {
        const todos = this.todoManager.getFilteredTodos(this.todoManager.currentFilter);

        this.todoList.innerHTML = '';

        if (todos.length === 0) {
            this.emptyState.style.display = 'flex';
        } else {
            this.emptyState.style.display = 'none';
            todos.forEach(todo => {
                this.todoList.appendChild(this.createTodoElement(todo));
            });
        }

        this.updateStats();
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                aria-label="Toggle task completion"
            >
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <span class="priority-badge ${todo.priority}">${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}</span>
            <div class="todo-actions">
                <button class="todo-btn edit-btn" title="Edit task">✏️</button>
                <button class="todo-btn delete-btn" title="Delete task">🗑️</button>
            </div>
        `;

        li.querySelector('.todo-checkbox').addEventListener('change', () => {
            this.handleToggleTodo(todo.id);
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            this.handleDeleteTodo(todo.id);
        });

        li.querySelector('.edit-btn').addEventListener('click', () => {
            this.handleEditTodo(todo.id, todo.text);
        });

        return li;
    }

    handleEditTodo(id, currentText) {
        const newText = prompt('Edit task:', currentText);
        if (newText !== null && newText.trim()) {
            this.todoManager.updateTodo(id, newText);
            showToast('Task updated successfully!', 'success');
            this.render();
        }
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const todoManager = new TodoManager();
    const uiManager = new UIManager(todoManager);

    window.todoManager = todoManager;
    window.uiManager = uiManager;

    console.log('✅ To-Do List Application loaded successfully!');
    console.log('📝 Use window.todoManager and window.uiManager for debugging');
});
