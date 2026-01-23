# Currency Converter Application

A simple and efficient currency converter built with React, TypeScript, and Vite.

## 📚 Task

Description of the task can be found in the [task.md](./task.md) file.

## 🚀 Getting Started

### Prerequisites

- `Node.js` (v18 or higher recommended)
- `pnpm` or any other package manager you prefer

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:

    ```bash
    pnpm install
    ```

3.  **Environment Setup**:
    - Copy the `.env.example` file to create a new `.env` file:
      ```bash
      cp .env.example .env
      ```
    - Open the `.env` file and replace `example` with your valid CurrencyBeacon API key.
  > [!CAUTION]
  > **Security Note**: Storing the `API_KEY` in `VITE_CURRENCY_BEACON_API_KEY` exposes it to the client side. This is done here **strictly for demonstration purposes**. In a production environment, API keys should be stored securely on a backend server, and the frontend should request data through a proxy or API endpoint to keep credentials safe.

### Running Locally

To start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🛠️ Build

To build the application for production:

```bash
pnpm run build
```

This will compile the TypeScript code and bundle the assets into the `dist` directory.

### Insights on the implementation

Because of the time constraints, I needed to make some trade-offs but still tried to comment major architecture decisions.
