import { useState } from 'react';
import { SearchInput } from '../components/SearchInput';
import { Users, Activity, Hospital, Eye, Pencil, Trash2 } from 'lucide-react';

interface ResourcesPageProps {
  patients: any[];
  observations: any[];
  encounters: any[];
  onEdit: (resource: any) => void;
  onDelete: (id: string, type: string) => void;
}

export function ResourcesPage({ patients, observations, encounters, onEdit, onDelete }: ResourcesPageProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const shouldShowSection = (type: string) => {
    return activeTab === 'all' || activeTab === type;
  };

  const filterData = (data: any[]) => {
    if (!searchQuery) return data;
    return data.filter(item =>
      JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="page-content">
      {/* Resource Type Selector */}
      <div className="card mb-lg">
        <div className="card-body flex justify-between items-center flex-wrap gap-md">
          <div className="resource-tags">
            <span
              className={`resource-tag ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Semua
            </span>
            <span
              className={`resource-tag ${activeTab === 'patient' ? 'active' : ''}`}
              onClick={() => setActiveTab('patient')}
            >
              <Users size={16} /> Patient
            </span>
            <span
              className={`resource-tag ${activeTab === 'observation' ? 'active' : ''}`}
              onClick={() => setActiveTab('observation')}
            >
              <Activity size={16} /> Observation
            </span>
            <span
              className={`resource-tag ${activeTab === 'encounter' ? 'active' : ''}`}
              onClick={() => setActiveTab('encounter')}
            >
              <Hospital size={16} /> Encounter
            </span>
          </div>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            style={{ maxWidth: '300px' }}
          />
        </div>
      </div>

      {/* Patient Resources */}
      {shouldShowSection('patient') && (
        <div className="card mb-lg">
          <div className="card-header">
            <h3 className="card-title">
              <Users size={20} style={{ marginRight: '8px' }} />
              Patient Resources
            </h3>
            <span className="badge badge-primary">5 records</span>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Identifier</th>
                    <th>Nama</th>
                    <th>Tanggal Lahir</th>
                    <th>Gender</th>
                    <th>Sumber</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData(patients).map((row) => (
                    <tr key={row.id}>
                      <td><code style={{ color: 'var(--primary-400)' }}>{row.id}</code></td>
                      <td>{row.identifier}</td>
                      <td><strong>{row.name}</strong></td>
                      <td>{row.birthDate}</td>
                      <td>
                        <span className={`badge ${row.gender === 'male' ? 'badge-info' : 'badge-warning'}`}>
                          {row.gender}
                        </span>
                      </td>
                      <td>{row.source}</td>
                      <td>
                        <div className="flex gap-sm">
                          <button className="btn btn-ghost btn-icon btn-sm" title="View"><Eye size={16} /></button>
                          <button className="btn btn-ghost btn-icon btn-sm" title="Edit" onClick={() => onEdit(row)}><Pencil size={16} /></button>
                          <button className="btn btn-ghost btn-icon btn-sm" title="Delete" onClick={() => onDelete(row.id, 'patient')}><Trash2 size={16} stroke="var(--error)" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Observation Resources */}
      {shouldShowSection('observation') && (
        <div className="card mb-lg">
          <div className="card-header">
            <h3 className="card-title">
              <Activity size={20} style={{ marginRight: '8px' }} />
              Observation Resources
            </h3>
            <span className="badge badge-success">5 records</span>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Code</th>
                    <th>Display</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData(observations).map((row) => (
                    <tr key={row.id}>
                      <td><code style={{ color: 'var(--primary-400)' }}>{row.id}</code></td>
                      <td>{row.patient}</td>
                      <td><code>{row.code}</code></td>
                      <td>{row.display}</td>
                      <td><strong>{row.value}</strong></td>
                      <td><span className="badge badge-success">{row.status}</span></td>
                      <td>
                        <div className="flex gap-sm">
                          <button className="btn btn-ghost btn-icon btn-sm"><Eye size={16} /></button>
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onEdit(row)}><Pencil size={16} /></button>
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onDelete(row.id, 'observation')}><Trash2 size={16} stroke="var(--error)" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Encounter Resources */}
      {shouldShowSection('encounter') && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Hospital size={20} style={{ marginRight: '8px' }} />
              Encounter Resources
            </h3>
            <span className="badge badge-warning">5 records</span>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Type</th>
                    <th>Provider</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData(encounters).map((row) => (
                    <tr key={row.id}>
                      <td><code style={{ color: 'var(--primary-400)' }}>{row.id}</code></td>
                      <td>{row.patient}</td>
                      <td>{row.type}</td>
                      <td>{row.provider}</td>
                      <td>{row.location}</td>
                      <td>
                        <span className={`badge ${row.status === 'Finished' ? 'badge-success' : 'badge-warning'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-sm">
                          <button className="btn btn-ghost btn-icon btn-sm"><Eye size={16} /></button>
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onEdit(row)}><Pencil size={16} /></button>
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onDelete(row.id, 'encounter')}><Trash2 size={16} stroke="var(--error)" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}