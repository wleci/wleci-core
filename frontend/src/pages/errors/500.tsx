import { Link } from "react-router-dom";

export default function InternalServerError() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-gray-300 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Błąd serwera</h2>
          <p className="text-gray-600 mb-8">
            Wystąpił nieoczekiwany błąd serwera. Nasze zespoły zostały powiadomione i pracują nad rozwiązaniem problemu.
          </p>
        </div>
        <div className="space-y-4">
          <button 
            onClick={handleRefresh}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Odśwież stronę
          </button>
          <div className="space-x-4">
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Strona główna
            </Link>
            <span className="text-gray-400">|</span>
            <button 
              onClick={() => window.history.back()} 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Wróć
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}