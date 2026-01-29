import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ConnectionsPage } from './pages/ConnectionsPage';
import { LogsPage } from './pages/LogsPage';
import { Modal } from './components/Modal';
import { ToastContainer } from './components/Toast';
import { Send, CheckCircle, ScrollText, Plus, Download, Copy } from 'lucide-react';
import './styles/globals.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialPatients, initialObservations, initialEncounters, initialConnections, initialLogs } from './data/initialData';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: 'success' | 'error' | 'info' | 'warning' }>>([]);
  const [toastCounter, setToastCounter] = useState(0);

  const [resourceForm, setResourceForm] = useState({
    type: 'Patient',
    name: '',
    identifier: '',
    birthDate: '',
    gender: 'male',
    address: '',
    phone: '',
    source: 'Local'
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const [connectionForm, setConnectionForm] = useState({
    name: '',
    endpoint: '',
    authType: 'API Key',
    apiKey: ''
  });

  // Global State
  const [patients, setPatients] = useLocalStorage('patients', initialPatients);
  const [observations, setObservations] = useLocalStorage('observations', initialObservations);
  const [encounters, setEncounters] = useLocalStorage('encounters', initialEncounters);
  const [connections, setConnections] = useLocalStorage('connections', initialConnections);
  const [logs, setLogs] = useLocalStorage('logs', initialLogs);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    const id = toastCounter;
    setToasts(prev => [...prev, { id, message, type }]);
    setToastCounter(prev => prev + 1);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const openModal = (modal: string) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  const handleEditResource = (resource: any) => {
    setResourceForm({
      type: 'Patient', // In a real app we'd derive this
      name: resource.name,
      identifier: resource.identifier,
      birthDate: resource.birthDate,
      gender: resource.gender,
      address: resource.address,
      phone: resource.phone,
      source: resource.source
    });
    setEditingId(resource.id);
    openModal('addResource');
  };

  const handleDeleteResource = (id: string, type: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      if (type === 'patient') {
        setPatients(prev => prev.filter(p => p.id !== id));
      } else if (type === 'observation') {
        setObservations(prev => prev.filter(o => o.id !== id));
      } else if (type === 'encounter') {
        setEncounters(prev => prev.filter(e => e.id !== id));
      }

      const newLog = {
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        connection: 'System',
        status: 'success',
        resourceType: type.charAt(0).toUpperCase() + type.slice(1),
        operation: 'DELETE',
        responseTime: '50ms',
        type: 'success'
      };
      setLogs(prev => [newLog, ...prev]);

      showToast('Resource deleted successfully', 'success');
    }
  };

  const handleSaveResource = () => {
    // Basic validation
    if (!resourceForm.name || !resourceForm.identifier) {
      showToast('Please fill in Name and Identifier', 'error');
      return;
    }

    if (editingId) {
      // Update existing
      setPatients(prev => prev.map(p => p.id === editingId ? { ...p, ...resourceForm, id: editingId } : p));

      setLogs(prev => [{
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        connection: 'System',
        status: 'success',
        resourceType: resourceForm.type,
        operation: 'UPDATE',
        responseTime: '45ms',
        type: 'success'
      }, ...prev]);

      showToast('Resource updated successfully!', 'success');
    } else {
      // Create new
      const newPatient = {
        id: `PAT-${Date.now()}`,
        ...resourceForm
      };
      setPatients(prev => [newPatient, ...prev]);

      setLogs(prev => [{
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        connection: 'System',
        status: 'success',
        resourceType: resourceForm.type,
        operation: 'CREATE',
        responseTime: '60ms',
        type: 'success'
      }, ...prev]);

      showToast('Resource created successfully!', 'success');
    }

    closeModal();
    setEditingId(null);
    setResourceForm({
      type: 'Patient', name: '', identifier: '', birthDate: '', gender: 'male', address: '', phone: '', source: 'Local'
    });
  };

  const handleEditConnection = (connection: any) => {
    setConnectionForm({
      name: connection.name,
      endpoint: connection.endpoint,
      authType: connection.authType,
      apiKey: connection.apiKey || ''
    });
    setEditingId(connection.id);
    openModal('addConnection');
  };

  const handleDeleteConnection = (id: string) => {
    if (confirm('Are you sure you want to delete this connection?')) {
      setConnections(prev => prev.filter(c => c.id !== id));

      setLogs(prev => [{
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        connection: 'System',
        status: 'success',
        resourceType: 'Connection',
        operation: 'DELETE',
        responseTime: '50ms',
        type: 'success'
      }, ...prev]);

      showToast('Connection deleted successfully', 'success');
    }
  };

  const handleTestConnection = (id: string, name: string) => {
    showToast(`Testing koneksi ke ${name}...`, 'info');

    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate

      if (isSuccess) {
        setConnections(prev => prev.map(c => c.id === id ? { ...c, status: 'online' } : c));

        setLogs(prev => [{
          id: `LOG-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          connection: name,
          status: 'success',
          resourceType: 'System',
          operation: 'TEST_CONNECTION',
          responseTime: '150ms',
          type: 'success'
        }, ...prev]);

        showToast(`Koneksi ke ${name} berhasil!`, 'success');
      } else {
        setConnections(prev => prev.map(c => c.id === id ? { ...c, status: 'offline' } : c));
        showToast(`Koneksi ke ${name} gagal (Timeout)`, 'error');
      }
    }, 1500);
  };

  const handleReconnect = (id: string, name: string) => {
    showToast(`Mencoba menghubungkan ulang ke ${name}...`, 'warning');

    setTimeout(() => {
      setConnections(prev => prev.map(c => c.id === id ? { ...c, status: 'online' } : c));

      setLogs(prev => [{
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        connection: name,
        status: 'success',
        resourceType: 'System',
        operation: 'RECONNECT',
        responseTime: '320ms',
        type: 'success'
      }, ...prev]);

      showToast(`Berhasil terhubung kembali ke ${name}!`, 'success');
    }, 2000);
  };

  const handleSaveConnection = () => {
    if (!connectionForm.name || !connectionForm.endpoint) {
      showToast('Please fill in Name and Endpoint', 'error');
      return;
    }

    if (editingId) {
      setConnections(prev => prev.map(c => c.id === editingId ? { ...c, ...connectionForm, id: editingId } : c));

      setLogs(prev => [{
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        connection: 'System',
        status: 'success',
        resourceType: 'Connection',
        operation: 'UPDATE',
        responseTime: '45ms',
        type: 'success'
      }, ...prev]);

      showToast('Connection updated successfully!', 'success');
    } else {
      const newConnection = {
        id: `CONN-${Date.now()}`,
        status: 'pending',
        resourceCount: 0,
        ...connectionForm
      };
      setConnections(prev => [...prev, newConnection]);

      setLogs(prev => [{
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        connection: 'System',
        status: 'success',
        resourceType: 'Connection',
        operation: 'CREATE',
        responseTime: '60ms',
        type: 'success'
      }, ...prev]);

      showToast('Connection created successfully!', 'success');
    }

    closeModal();
    setEditingId(null);
    setConnectionForm({ name: '', endpoint: '', authType: 'API Key', apiKey: '' });
  };

  const handleStartAddResource = () => {
    setEditingId(null);
    setResourceForm({
      type: 'Patient', name: '', identifier: '', birthDate: '', gender: 'male', address: '', phone: '', source: 'Local'
    });
    openModal('addResource');
  };

  const handleStartAddConnection = () => {
    setEditingId(null);
    setConnectionForm({ name: '', endpoint: '', authType: 'API Key', apiKey: '' });
    openModal('addConnection');
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Dashboard';
      case 'resources': return 'FHIR Resources';
      case 'connections': return 'Koneksi Sistem';
      case 'logs': return 'Log Pertukaran Data';
      default: return 'Dashboard';
    }
  };

  const getPageBreadcrumb = () => {
    switch (activePage) {
      case 'dashboard': return 'Dashboard';
      case 'resources': return 'Resources';
      case 'connections': return 'Koneksi';
      case 'logs': return 'Logs';
      default: return 'Dashboard';
    }
  };

  const getActionButton = () => {
    switch (activePage) {
      case 'resources':
        return <button className="btn btn-primary" onClick={handleStartAddResource}><Plus size={16} /> Tambah Resource</button>;
      case 'connections':
        return <button className="btn btn-primary" onClick={handleStartAddConnection}><Plus size={16} /> Tambah Koneksi</button>;
      case 'logs':
        return <button className="btn btn-secondary" onClick={() => showToast('Log diekspor ke CSV', 'success')}><Download size={16} /> Export</button>;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        onOpenModal={openModal}
      />

      <main className="main-content">
        <Header
          pageTitle={getPageTitle()}
          pageBreadcrumb={getPageBreadcrumb()}
          actionButton={getActionButton()}
        />

        {activePage === 'dashboard' && (
          <DashboardPage
            onPageChange={setActivePage}
            onOpenModal={openModal}
          />
        )}

        {activePage === 'resources' && (
          <ResourcesPage
            patients={patients}
            observations={observations}
            encounters={encounters}
            onEdit={handleEditResource}
            onDelete={handleDeleteResource}
          />
        )}

        {activePage === 'connections' && (
          <ConnectionsPage
            connections={connections}
            onEdit={handleEditConnection}
            onDelete={handleDeleteConnection}
            onTest={handleTestConnection}
            onReconnect={handleReconnect}
            onShowToast={showToast}
          />
        )}

        {activePage === 'logs' && (
          <LogsPage logs={logs} onOpenModal={openModal} />
        )}
      </main>

      {/* Send Resource Modal */}
      <Modal
        isOpen={activeModal === 'send'}
        onClose={closeModal}
        title={<><Send size={20} style={{ marginRight: '8px' }} /> Kirim FHIR Resource</>}
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>Batal</button>
            <button
              className="btn btn-primary"
              onClick={() => {
                showToast('Resource berhasil dikirim!', 'success');
                closeModal();
              }}
            >
              Kirim
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Tipe Resource</label>
          <select className="form-select">
            <option>Patient</option>
            <option>Observation</option>
            <option>Encounter</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Sistem Tujuan</label>
          <select className="form-select">
            <option>RS Harapan Kita</option>
            <option>Lab Prodia</option>
            <option>Klinik Sehat</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Resource ID</label>
          <input type="text" className="form-input" placeholder="Masukkan ID resource" />
        </div>
      </Modal>

      {/* Validate Modal */}
      <Modal
        isOpen={activeModal === 'validate'}
        onClose={closeModal}
        title={<><CheckCircle size={20} style={{ marginRight: '8px' }} /> Validasi FHIR Resource</>}
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>Batal</button>
            <button
              className="btn btn-success"
              onClick={() => {
                showToast('Resource valid sesuai standar FHIR R4!', 'success');
                closeModal();
              }}
            >
              Validasi
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">JSON Resource</label>
          <textarea
            className="form-textarea"
            rows={8}
            placeholder='{"resourceType": "Patient", "id": "example", ...}'
          ></textarea>
        </div>
      </Modal>

      {/* Log Detail Modal */}
      <Modal
        isOpen={activeModal === 'logDetail'}
        onClose={closeModal}
        title={<><ScrollText size={20} style={{ marginRight: '8px' }} /> Detail Log</>}
        maxWidth="650px"
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>Tutup</button>
            <button
              className="btn btn-primary"
              onClick={() => showToast('Payload disalin!', 'success')}
            >
              <Copy size={16} /> Copy Payload
            </button>
          </>
        }
      >
        <div className="grid grid-2 gap-md mb-lg">
          <div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Log ID</div>
            <div className="font-medium font-mono">LOG-001</div>
          </div>
          <div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Timestamp</div>
            <div className="font-medium">27 Jan 2024, 12:30:15</div>
          </div>
          <div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Koneksi</div>
            <div className="font-medium">RS Harapan Kita</div>
          </div>
          <div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Status</div>
            <div><span className="badge badge-success">Success</span></div>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Request Payload</label>
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, color: 'var(--text-secondary)' }}>
              {`{
  "resourceType": "Patient",
  "id": "PAT-001"
}`}
            </pre>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Response</label>
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, color: 'var(--text-secondary)' }}>
              {`{
  "resourceType": "Patient",
  "id": "PAT-001",
  "identifier": [{"value": "MRN-2024-001"}],
  "name": [{"given": ["Budi"], "family": "Santoso"}],
  "gender": "male",
  "birthDate": "1985-03-15"
}`}
            </pre>
          </div>
        </div>
      </Modal>

      {/* Add Resource Modal */}
      <Modal
        isOpen={activeModal === 'addResource'}
        onClose={closeModal}
        title={editingId ? "Edit Resource" : "+ Tambah FHIR Resource"}
        maxWidth="600px"
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>Batal</button>
            <button
              className="btn btn-primary"
              onClick={handleSaveResource}
            >
              Simpan
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Tipe Resource</label>
          <select
            className="form-select"
            value={resourceForm.type}
            onChange={e => setResourceForm({ ...resourceForm, type: e.target.value })}
          >
            <option>Patient</option>
            <option>Observation</option>
            <option>Encounter</option>
          </select>
        </div>
        <div className="grid grid-2 gap-md">
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input
              type="text"
              className="form-input"
              placeholder="Nama pasien"
              value={resourceForm.name}
              onChange={e => setResourceForm({ ...resourceForm, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Identifier (MRN)</label>
            <input
              type="text"
              className="form-input"
              placeholder="MRN-2024-XXX"
              value={resourceForm.identifier}
              onChange={e => setResourceForm({ ...resourceForm, identifier: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-2 gap-md">
          <div className="form-group">
            <label className="form-label">Tanggal Lahir</label>
            <input
              type="date"
              className="form-input"
              value={resourceForm.birthDate}
              onChange={e => setResourceForm({ ...resourceForm, birthDate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={resourceForm.gender}
              onChange={e => setResourceForm({ ...resourceForm, gender: e.target.value })}
            >
              <option>male</option>
              <option>female</option>
              <option>other</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Alamat</label>
          <input
            type="text"
            className="form-input"
            placeholder="Alamat lengkap"
            value={resourceForm.address}
            onChange={e => setResourceForm({ ...resourceForm, address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Telepon</label>
          <input
            type="text"
            className="form-input"
            placeholder="+62 xxx-xxxx-xxxx"
            value={resourceForm.phone}
            onChange={e => setResourceForm({ ...resourceForm, phone: e.target.value })}
          />
        </div>
      </Modal>

      {/* Add Connection Modal */}
      <Modal
        isOpen={activeModal === 'addConnection'}
        onClose={closeModal}
        title={editingId ? "Edit Connection" : "+ Tambah Koneksi Sistem"}
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>Batal</button>
            <button
              className="btn btn-primary"
              onClick={handleSaveConnection}
            >
              Simpan
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Nama Sistem</label>
          <input
            type="text"
            className="form-input"
            placeholder="Nama rumah sakit/klinik/lab"
            value={connectionForm.name}
            onChange={e => setConnectionForm({ ...connectionForm, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">FHIR Endpoint URL</label>
          <input
            type="text"
            className="form-input"
            placeholder="https://fhir.example.com/r4"
            value={connectionForm.endpoint}
            onChange={e => setConnectionForm({ ...connectionForm, endpoint: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Tipe Autentikasi</label>
          <select
            className="form-select"
            value={connectionForm.authType}
            onChange={e => setConnectionForm({ ...connectionForm, authType: e.target.value })}
          >
            <option>OAuth2</option>
            <option>API Key</option>
            <option>Client Credentials</option>
            <option>Basic Auth</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Client ID / API Key</label>
          <input
            type="text"
            className="form-input"
            placeholder="Masukkan credentials"
            value={connectionForm.apiKey}
            onChange={e => setConnectionForm({ ...connectionForm, apiKey: e.target.value })}
          />
        </div>
      </Modal>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}