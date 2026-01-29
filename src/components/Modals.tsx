import { X, Upload, CheckCircle, ClipboardList } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--bg-tertiary)] max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
}

export function SendModal({ isOpen, onClose, onSend }: SendModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 border-b border-[var(--bg-tertiary)] flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Kirim FHIR Resource
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-[var(--text-muted)]" />
        </button>
      </div>
      
      <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Tipe Resource</label>
          <select className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--bg-hover)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Patient</option>
            <option>Observation</option>
            <option>Encounter</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">Sistem Tujuan</label>
          <select className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--bg-hover)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>RS Harapan Kita</option>
            <option>Lab Prodia</option>
            <option>Klinik Sehat</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">Resource ID</label>
          <input
            type="text"
            placeholder="Masukkan ID resource"
            className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--bg-hover)] rounded-lg text-white placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="p-6 border-t border-[var(--bg-tertiary)] flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] text-white rounded-lg transition-colors"
        >
          Batal
        </button>
        <button
          onClick={onSend}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          Kirim
        </button>
      </div>
    </Modal>
  );
}

interface ValidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: () => void;
}

export function ValidateModal({ isOpen, onClose, onValidate }: ValidateModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 border-b border-[var(--bg-tertiary)] flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Validasi FHIR Resource
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-[var(--text-muted)]" />
        </button>
      </div>
      
      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-white mb-2">JSON Resource</label>
          <textarea
            rows={8}
            placeholder='{"resourceType": "Patient", "id": "example", ...}'
            className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--bg-hover)] rounded-lg text-white placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
      </div>
      
      <div className="p-6 border-t border-[var(--bg-tertiary)] flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] text-white rounded-lg transition-colors"
        >
          Batal
        </button>
        <button
          onClick={onValidate}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          Validasi
        </button>
      </div>
    </Modal>
  );
}

interface LogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
}

export function LogDetailModal({ isOpen, onClose, onCopy }: LogDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 border-b border-[var(--bg-tertiary)] flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <ClipboardList className="w-5 h-5" />
          Detail Log
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-[var(--text-muted)]" />
        </button>
      </div>
      
      <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-[var(--text-muted)] mb-1">Log ID</div>
            <div className="text-sm font-medium text-white font-mono">LOG-001</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-muted)] mb-1">Timestamp</div>
            <div className="text-sm font-medium text-white">27 Jan 2024, 12:30:15</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-muted)] mb-1">Koneksi</div>
            <div className="text-sm font-medium text-white">RS Harapan Kita</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-muted)] mb-1">Status</div>
            <div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-500/15 text-green-400">
                Success
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">Request Payload</label>
          <div className="bg-[var(--bg-tertiary)] rounded-lg p-4">
            <pre className="text-sm text-[var(--text-secondary)] font-mono overflow-x-auto">
{`{"resourceType":"Patient","id":"PAT-001"}`}
            </pre>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">Response</label>
          <div className="bg-[var(--bg-tertiary)] rounded-lg p-4">
            <pre className="text-sm text-[var(--text-secondary)] font-mono overflow-x-auto">
{`{"resourceType":"Patient","id":"PAT-001","identifier":[{"value":"MRN-2024-001"}],"name":[{"given":["Budi"],"family":"Santoso"}],"gender":"male","birthDate":"1985-03-15"}`}
            </pre>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-t border-[var(--bg-tertiary)] flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] text-white rounded-lg transition-colors"
        >
          Tutup
        </button>
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <ClipboardList className="w-4 h-4" />
          Copy
        </button>
      </div>
    </Modal>
  );
}
