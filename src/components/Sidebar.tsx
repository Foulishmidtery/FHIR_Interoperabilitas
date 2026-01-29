import { BarChart3, ClipboardList, Plug, ScrollText, Send, CheckCircle } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  onOpenModal: (modal: string) => void;
}

export function Sidebar({ activePage, onPageChange, onOpenModal }: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Plug size={24} />
          </div>
          <div>
            <div className="logo-text">FHIR Hub</div>
            <div className="logo-subtitle">Interoperability System</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <div className="nav-section">
          <div className="nav-section-title">Menu Utama</div>
          <div 
            className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => onPageChange('dashboard')}
          >
            <span className="nav-icon"><BarChart3 size={20} /></span>
            <span>Dashboard</span>
          </div>
          <div 
            className={`nav-item ${activePage === 'resources' ? 'active' : ''}`}
            onClick={() => onPageChange('resources')}
          >
            <span className="nav-icon"><ClipboardList size={20} /></span>
            <span>FHIR Resources</span>
            <span className="nav-badge">3</span>
          </div>
          <div 
            className={`nav-item ${activePage === 'connections' ? 'active' : ''}`}
            onClick={() => onPageChange('connections')}
          >
            <span className="nav-icon"><Plug size={20} /></span>
            <span>Koneksi Sistem</span>
          </div>
          <div 
            className={`nav-item ${activePage === 'logs' ? 'active' : ''}`}
            onClick={() => onPageChange('logs')}
          >
            <span className="nav-icon"><ScrollText size={20} /></span>
            <span>Log Pertukaran</span>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Aksi</div>
          <div className="nav-item" onClick={() => onOpenModal('send')}>
            <span className="nav-icon"><Send size={20} /></span>
            <span>Kirim Resource</span>
          </div>
          <div className="nav-item" onClick={() => onOpenModal('validate')}>
            <span className="nav-icon"><CheckCircle size={20} /></span>
            <span>Validasi Data</span>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <div className="user-name">Admin System</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
}