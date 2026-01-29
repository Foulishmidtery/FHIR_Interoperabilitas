# FHIR Interoperability System

A modern, responsive, and secure FHIR Interoperability System built with **Vite, React (SWC), and TypeScript**. This system allows for managing FHIR resources (Patients, Observations, Encounters), checking system connections, and viewing exchange logs.

## Features

- **Dashboard**: Overview of system status and quick stats.
- **Resources**: CRUD operations for FHIR Resources.
- **Connections**: Monitor and configure external system connections.
- **Logs**: View detailed logs of data exchanges.
- **Local Storage**: Data is persisted locally using the browser's Local Storage.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation Steps

1.  **Clone the repository** (if not already done):

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## Usage

- Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).
- Navigate through the sidebar to access different modules.
- Use the "Add" buttons to create new resources or connections.
- Data is automatically saved to your browser's Local Storage.

## Troubleshooting

- **Issues with icons**: Ensure `lucide-react` is installed.
- **Blank page**: Check the console for any errors. Ensure all imports are correct.
- **Data not saving**: Check if Local Storage is enabled in your browser settings.
