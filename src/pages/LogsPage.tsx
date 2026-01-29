import { useState } from 'react';
import { SearchInput } from '../components/SearchInput';
import { BarChart3, Check, X, Zap, ScrollText } from 'lucide-react';
// import { useLocalStorage } from '../hooks/useLocalStorage'; // Removed
// import { initialLogs } from '../data/initialData'; // Removed

interface LogsPageProps {
  logs: any[];
  onOpenModal: (modal: string) => void;
}

export function LogsPage({ logs, onOpenModal }: LogsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  // const [logsData] = useLocalStorage('logs', initialLogs);


  return (
    <div className="page-content">
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary"><BarChart3 size={28} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Hari Ini</div>
            <div className="stat-value">245</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><Check size={28} /></div>
          <div className="stat-content">
            <div className="stat-label">Sukses</div>
            <div className="stat-value">241</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--error)' }}>
            <X size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Error</div>
            <div className="stat-value">4</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info"><Zap size={28} /></div>
          <div className="stat-content">
            <div className="stat-label">Avg Response</div>
            <div className="stat-value">187ms</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-lg">
        <div className="card-body">
          <div className="flex items-center gap-md" style={{ flexWrap: 'wrap' }}>
            <select className="form-select" style={{ maxWidth: '180px' }}>
              <option>Semua Status</option>
              <option>Success</option>
              <option>Error</option>
            </select>
            <select className="form-select" style={{ maxWidth: '180px' }}>
              <option>Semua Resource</option>
              <option>Patient</option>
              <option>Observation</option>
              <option>Encounter</option>
            </select>
            <select className="form-select" style={{ maxWidth: '180px' }}>
              <option>Semua Koneksi</option>
              <option>RS Harapan Kita</option>
              <option>Lab Prodia</option>
              <option>Klinik Sehat</option>
            </select>
            <div style={{ flex: 1 }}></div>
            <SearchInput
              placeholder="Cari log..."
              style={{ maxWidth: '250px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <ScrollText size={20} style={{ marginRight: '8px' }} />
            Riwayat Pertukaran
          </h3>
          <span className="text-muted">Menampilkan 8 dari 245 log</span>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Koneksi</th>
                  <th>Resource</th>
                  <th>Operasi</th>
                  <th>Status</th>
                  <th>Response</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((row: any, index: number) => (
                  <tr key={index}>
                    <td><code className="text-muted">{row.timestamp}</code></td>
                    <td>{row.connection}</td>
                    <td>
                      <span className={`badge ${row.resourceType === 'Patient' ? 'badge-primary' :
                        row.resourceType === 'Observation' ? 'badge-info' :
                          row.resourceType === 'Encounter' ? 'badge-warning' :
                            'badge-success'
                        }`}>
                        {row.resourceType}
                      </span>
                    </td>
                    <td>{row.operation}</td>
                    <td>
                      <span className={`badge ${row.type === 'success' ? 'badge-success' : 'badge-error'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className={row.type === 'success' ? 'text-success' : 'text-error'}>
                      {row.responseTime}
                    </td>
                    <td>
                      <button
                        onClick={() => onOpenModal('logDetail')}
                        className="btn btn-ghost btn-sm"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer flex justify-between items-center">
          <span className="text-muted">Halaman 1 dari 31</span>
          <div className="flex gap-sm">
            <button className="btn btn-secondary btn-sm" disabled>← Prev</button>
            <button className="btn btn-secondary btn-sm">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}