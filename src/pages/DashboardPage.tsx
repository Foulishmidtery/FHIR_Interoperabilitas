import { Users, Activity, Building2, Plug as PlugIcon, TrendingUp, TrendingDown, Hospital, Microscope, ChartBar, Send, CheckCircle, Clock } from 'lucide-react';

interface DashboardPageProps {
  onPageChange: (page: string) => void;
  onOpenModal: (modal: string) => void;
}

export function DashboardPage({ onPageChange, onOpenModal }: DashboardPageProps) {
  return (
    <div className="page-content">
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <Users size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Pasien</div>
            <div className="stat-value">1,247</div>
            <span className="stat-change positive">
              <TrendingUp size={14} /> 12% bulan ini
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <Activity size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Observations</div>
            <div className="stat-value">8,934</div>
            <span className="stat-change positive">
              <TrendingUp size={14} /> 8% bulan ini
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <Hospital size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Encounters</div>
            <div className="stat-value">2,156</div>
            <span className="stat-change positive">
              <TrendingUp size={14} /> 5% bulan ini
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info">
            <PlugIcon size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Koneksi Aktif</div>
            <div className="stat-value">3/5</div>
            <span className="stat-change negative">
              <TrendingDown size={14} /> 1 offline
            </span>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)' }}>
        {/* Activity Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <TrendingUp size={20} style={{ marginRight: '8px' }} />
              Aktivitas Pertukaran Data
            </h3>
            <div className="resource-tags">
              <span className="resource-tag active">Hari Ini</span>
              <span className="resource-tag">Minggu Ini</span>
              <span className="resource-tag">Bulan Ini</span>
            </div>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="sendGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00bcd4', stopOpacity: 0.5 }} />
                    <stop offset="100%" style={{ stopColor: '#00bcd4', stopOpacity: 0 }} />
                  </linearGradient>
                  <linearGradient id="recvGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.5 }} />
                    <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path d="M0,180 L100,160 L200,100 L300,60 L400,90 L500,120 L600,140 L600,200 L0,200 Z" fill="url(#sendGrad)" />
                <path d="M0,170 L100,150 L200,90 L300,50 L400,85 L500,130 L600,150" stroke="#00bcd4" strokeWidth="3" fill="none" />
                <path d="M0,175 L100,155 L200,85 L300,45 L400,95 L500,135 L600,155 L600,200 L0,200 Z" fill="url(#recvGrad)" />
                <path d="M0,175 L100,155 L200,85 L300,45 L400,95 L500,135 L600,155" stroke="#10b981" strokeWidth="3" fill="none" />
                <circle cx="300" cy="50" r="5" fill="#00bcd4" />
                <circle cx="300" cy="45" r="5" fill="#10b981" />
              </svg>
              <div className="flex justify-between mt-md text-muted" style={{ fontSize: '0.8rem' }}>
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
              </div>
            </div>
            <div className="flex gap-lg mt-md" style={{ justifyContent: 'center' }}>
              <div className="flex items-center gap-sm">
                <span style={{ width: '12px', height: '12px', background: '#00bcd4', borderRadius: '2px' }}></span>
                <span className="text-muted">Dikirim</span>
              </div>
              <div className="flex items-center gap-sm">
                <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }}></span>
                <span className="text-muted">Diterima</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <PlugIcon size={20} style={{ marginRight: '8px' }} />
              Status Koneksi
            </h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onPageChange('connections')}>Lihat Semua</button>
          </div>
          <div className="card-body">
            <div className="connection-list">
              <div className="connection-item">
                <div className="connection-icon"><Hospital size={24} /></div>
                <div className="connection-info">
                  <div className="connection-name">RS Harapan Kita</div>
                  <div className="connection-url">fhir.harapankita.id</div>
                </div>
                <div className="connection-status">
                  <span className="status-dot online"></span>
                  <span className="text-success">Online</span>
                </div>
              </div>
              <div className="connection-item">
                <div className="connection-icon"><Microscope size={24} /></div>
                <div className="connection-info">
                  <div className="connection-name">Lab Prodia</div>
                  <div className="connection-url">api.prodia.co.id</div>
                </div>
                <div className="connection-status">
                  <span className="status-dot online"></span>
                  <span className="text-success">Online</span>
                </div>
              </div>
              <div className="connection-item">
                <div className="connection-icon"><Building2 size={24} /></div>
                <div className="connection-info">
                  <div className="connection-name">RS Sardjito</div>
                  <div className="connection-url">api.sardjito.ac.id</div>
                </div>
                <div className="connection-status">
                  <span className="status-dot offline"></span>
                  <span className="text-error">Offline</span>
                </div>
              </div>
              <div className="connection-item">
                <div className="connection-icon"><ChartBar size={24} /></div>
                <div className="connection-info">
                  <div className="connection-name">Sistem Riset</div>
                  <div className="connection-url">riset.kemkes.go.id</div>
                </div>
                <div className="connection-status">
                  <span className="status-dot pending"></span>
                  <span className="text-warning">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-2 gap-lg mt-lg">
        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Activity size={20} style={{ marginRight: '8px' }} />
              Aksi Cepat
            </h3>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <div className="quick-action" onClick={() => onPageChange('resources')}>
                <div className="quick-action-icon"><Users size={28} /></div>
                <div className="quick-action-text">Kelola Pasien</div>
              </div>
              <div className="quick-action" onClick={() => onOpenModal('send')}>
                <div className="quick-action-icon"><Send size={28} /></div>
                <div className="quick-action-text">Kirim Resource</div>
              </div>
              <div className="quick-action" onClick={() => onOpenModal('validate')}>
                <div className="quick-action-icon"><CheckCircle size={28} /></div>
                <div className="quick-action-text">Validasi FHIR</div>
              </div>
              <div className="quick-action" onClick={() => onPageChange('connections')}>
                <div className="quick-action-icon"><PlugIcon size={28} /></div>
                <div className="quick-action-text">Tambah Koneksi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Clock size={20} style={{ marginRight: '8px' }} />
              Aktivitas Terbaru
            </h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onPageChange('logs')}>Lihat Semua</button>
          </div>
          <div className="card-body">
            <div className="activity-timeline">
              <div className="activity-item">
                <div className="activity-dot send"></div>
                <div className="activity-content">
                  <div className="activity-title"><strong>Patient</strong> dikirim ke RS Harapan Kita</div>
                  <div className="activity-meta">145ms • 2 menit lalu</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot receive"></div>
                <div className="activity-content">
                  <div className="activity-title"><strong>Observation</strong> diterima dari Lab Prodia</div>
                  <div className="activity-meta">234ms • 5 menit lalu</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot error"></div>
                <div className="activity-content">
                  <div className="activity-title"><strong>Error</strong> koneksi ke RS Sardjito timeout</div>
                  <div className="activity-meta">5000ms • 15 menit lalu</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot send"></div>
                <div className="activity-content">
                  <div className="activity-title"><strong>Encounter</strong> di-update di Klinik Sehat</div>
                  <div className="activity-meta">178ms • 20 menit lalu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}