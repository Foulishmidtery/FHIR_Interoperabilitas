// Mock Data for FHIR System
const MockData = {
    patients: [
        { id: 'PAT-001', identifier: 'MRN-2024-001', name: 'Budi Santoso', birthDate: '1985-03-15', gender: 'male', address: 'Jl. Sudirman No. 45, Jakarta', phone: '+62 812-3456-7890', source: 'RS Harapan Kita' },
        { id: 'PAT-002', identifier: 'MRN-2024-002', name: 'Siti Aminah', birthDate: '1990-07-22', gender: 'female', address: 'Jl. Gatot Subroto No. 23, Bandung', phone: '+62 813-5678-9012', source: 'Klinik Sehat' },
        { id: 'PAT-003', identifier: 'MRN-2024-003', name: 'Ahmad Fauzi', birthDate: '1978-11-08', gender: 'male', address: 'Jl. Diponegoro No. 67, Surabaya', phone: '+62 857-1234-5678', source: 'Lab Prodia' },
        { id: 'PAT-004', identifier: 'MRN-2024-004', name: 'Dewi Lestari', birthDate: '1995-02-28', gender: 'female', address: 'Jl. Pahlawan No. 12, Yogyakarta', phone: '+62 878-9012-3456', source: 'RS Sardjito' },
        { id: 'PAT-005', identifier: 'MRN-2024-005', name: 'Hendro Wijaya', birthDate: '1982-09-14', gender: 'male', address: 'Jl. Ahmad Yani No. 89, Semarang', phone: '+62 819-8765-4321', source: 'RS Kariadi' }
    ],
    observations: [
        { id: 'OBS-001', patientId: 'PAT-001', code: '8867-4', display: 'Heart Rate', value: 72, unit: 'bpm', status: 'final' },
        { id: 'OBS-002', patientId: 'PAT-001', code: '8480-6', display: 'Systolic BP', value: 120, unit: 'mmHg', status: 'final' },
        { id: 'OBS-003', patientId: 'PAT-002', code: '2339-0', display: 'Glucose', value: 95, unit: 'mg/dL', status: 'final' },
        { id: 'OBS-004', patientId: 'PAT-003', code: '8310-5', display: 'Temperature', value: 36.8, unit: '°C', status: 'final' },
        { id: 'OBS-005', patientId: 'PAT-004', code: '29463-7', display: 'Body Weight', value: 58, unit: 'kg', status: 'final' }
    ],
    encounters: [
        { id: 'ENC-001', patientId: 'PAT-001', type: 'ambulatory', status: 'finished', provider: 'Dr. Susanto', location: 'Poli Jantung' },
        { id: 'ENC-002', patientId: 'PAT-002', type: 'ambulatory', status: 'finished', provider: 'Dr. Ratna', location: 'Laboratorium' },
        { id: 'ENC-003', patientId: 'PAT-003', type: 'emergency', status: 'finished', provider: 'Dr. Hartono', location: 'IGD' },
        { id: 'ENC-004', patientId: 'PAT-004', type: 'ambulatory', status: 'in-progress', provider: 'Dr. Lina', location: 'Poli Umum' },
        { id: 'ENC-005', patientId: 'PAT-005', type: 'inpatient', status: 'in-progress', provider: 'Dr. Widodo', location: 'Ruang Inap' }
    ],
    connections: [
        { id: 'CONN-001', name: 'RS Harapan Kita', endpoint: 'https://fhir.harapankita.id/r4', authType: 'OAuth2', status: 'online', resourceCount: 15420 },
        { id: 'CONN-002', name: 'Lab Prodia', endpoint: 'https://api.prodia.co.id/fhir', authType: 'API Key', status: 'online', resourceCount: 8234 },
        { id: 'CONN-003', name: 'Klinik Sehat', endpoint: 'https://fhir.kliniksehat.com/r4', authType: 'OAuth2', status: 'online', resourceCount: 3567 },
        { id: 'CONN-004', name: 'RS Sardjito', endpoint: 'https://api.sardjito.ac.id/fhir', authType: 'OAuth2', status: 'offline', resourceCount: 22156 },
        { id: 'CONN-005', name: 'Sistem Riset Nasional', endpoint: 'https://riset.kemkes.go.id/fhir', authType: 'Client Credentials', status: 'pending', resourceCount: 0 }
    ],
    exchangeLogs: [
        { id: 'LOG-001', connection: 'RS Harapan Kita', resourceType: 'Patient', operation: 'READ', status: 'success', responseTime: 145, timestamp: '2024-01-27T12:30:15Z' },
        { id: 'LOG-002', connection: 'Lab Prodia', resourceType: 'Observation', operation: 'CREATE', status: 'success', responseTime: 234, timestamp: '2024-01-27T12:28:45Z' },
        { id: 'LOG-003', connection: 'Klinik Sehat', resourceType: 'Encounter', operation: 'UPDATE', status: 'success', responseTime: 178, timestamp: '2024-01-27T12:25:30Z' },
        { id: 'LOG-004', connection: 'RS Sardjito', resourceType: 'Patient', operation: 'SEARCH', status: 'error', responseTime: 5000, timestamp: '2024-01-27T12:20:00Z', error: 'Timeout' },
        { id: 'LOG-005', connection: 'RS Harapan Kita', resourceType: 'Observation', operation: 'READ', status: 'success', responseTime: 89, timestamp: '2024-01-27T12:15:22Z' }
    ],
    stats: { totalPatients: 1247, totalObservations: 8934, totalEncounters: 2156, activeConnections: 3, exchangesToday: 245, successRate: 98.5 }
};
