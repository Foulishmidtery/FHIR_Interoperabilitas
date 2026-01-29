import { Bell, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  pageTitle: string;
  pageBreadcrumb: string;
  actionButton?: React.ReactNode;
}

export function Header({ pageTitle, pageBreadcrumb, actionButton }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle"><Menu size={20} /></button>
        <div>
          <h1 className="page-title">{pageTitle}</h1>
          <div className="breadcrumb">
            <span>FHIR Hub</span>
            <span className="breadcrumb-separator">/</span>
            <span>{pageBreadcrumb}</span>
          </div>
        </div>
      </div>
      
      <div className="header-right">
        {actionButton}
        <button className="header-btn">
          <span className="notification-dot"></span>
          <Bell size={20} />
        </button>
        <button className="header-btn">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}