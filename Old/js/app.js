// FHIR Interoperability System - Main Application
const App = {
    init() {
        this.initNavigation();
        this.initModals();
        this.initToasts();
    },
    
    initNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
        }
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.getAttribute('href') === window.location.pathname.split('/').pop()) {
                item.classList.add('active');
            }
        });
    },
    
    initModals() {
        document.querySelectorAll('[data-modal-close]').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal(btn.closest('.modal-overlay')));
        });
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.closeModal(overlay);
            });
        });
    },
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    },
    
    closeModal(modal) {
        if (modal) modal.classList.remove('active');
    },
    
    initToasts() {
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    },
    
    showToast(message, type = 'info') {
        const container = document.querySelector('.toast-container');
        const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-message">${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    },
    
    formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    },
    
    formatDateTime(dateStr) {
        return new Date(dateStr).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
