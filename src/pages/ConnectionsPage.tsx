import { Check, X, Clock, BarChart3, RefreshCw, Settings, Plug, Building2, Microscope, Database, Trash2 } from 'lucide-react';
// import { useLocalStorage } from '../hooks/useLocalStorage'; // Removed
// import { initialConnections } from '../data/initialData'; // Removed

interface ConnectionsPageProps {
  connections: any[];
  onEdit: (connection: any) => void;
  onDelete: (id: string) => void;
  onTest: (id: string, name: string) => void;
  onReconnect: (id: string, name: string) => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export function ConnectionsPage({ connections, onEdit, onDelete, onTest, onReconnect }: ConnectionsPageProps) {

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <span className="badge badge-success"><span className="status-dot online"></span> Online</span>;
      case 'offline': return <span className="badge badge-error"><span className="status-dot offline"></span> Offline</span>;
      default: return <span className="badge badge-warning"><span className="status-dot pending"></span> Pending</span>;
    }
  };

  const getConnectionIcon = (name: string) => {
    if (name.includes('Lab')) return <Microscope size={24} />;
    if (name.includes('Riset') || name.includes('Data')) return <Database size={24} />;
    return <Building2 size={24} />;
  };

  return (
    <div className="page-content">
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon success"><Check size={28} /></div>
          <div className="stat-content">
            <div className="stat-label">Online</div>
            <div className="stat-value">3</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"><Clock size={28} /></div>
          <div className="stat-content">
            <div className="stat-label">Pending</div>
            <div className="stat-value">1</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--error)' }}>
            <X size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Offline</div>
            <div className="stat-value">1</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info"><BarChart3 size={28} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Resources</div>
            <div className="stat-value">49,377</div>
          </div>
        </div>
      </div>

      {/* Connections Grid */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--spacing-lg)' }}>
        {connections.map((conn) => (
          <div className="card" key={conn.id}>
            <div className="card-header">
              <div className="flex items-center gap-md">
                <div style={{ width: '48px', height: '48px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  {getConnectionIcon(conn.name)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{conn.name}</h3>
                  <div className="text-muted font-mono" style={{ fontSize: '0.75rem' }}>{conn.endpoint.replace('https://', '')}</div>
                </div>
              </div>
              {getStatusBadge(conn.status)}
            </div>
            <div className="card-body">
              <div className="grid grid-2 gap-md mb-md">
                <div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Auth Type</div>
                  <div className="font-medium">{conn.authType}</div>
                </div>
                <div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Resources</div>
                  <div className="font-medium">{conn.resourceCount > 0 ? conn.resourceCount.toLocaleString() : '-'}</div>
                </div>
                <div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Status</div>
                  <div className={`font-medium ${conn.status === 'offline' ? 'text-error' : conn.status === 'pending' ? 'text-warning' : ''}`}>
                    {conn.status === 'online' ? 'Active' : conn.status === 'offline' ? 'Timeout' : 'Menunggu approval'}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer flex gap-sm" style={{ flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onTest(conn.id, conn.name)}
                disabled={conn.status === 'pending'}
                title="Test Connection"
              >
                <RefreshCw size={14} /> Test
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => onEdit(conn)} title="Configure">
                <Settings size={14} /> Config
              </button>

              {conn.status === 'offline' && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onReconnect(conn.id, conn.name)}
                  title="Reconnect"
                >
                  <Plug size={14} /> Reconnect
                </button>
              )}

              <div style={{ flex: 1 }}></div>

              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => onDelete(conn.id)} title="Delete">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}