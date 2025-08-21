import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-gray-300 mb-4">403</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Brak dostępu</h2>
          <p className="text-gray-600 mb-8">
            Nie masz uprawnień do przeglądania tej strony. Skontaktuj się z administratorem, jeśli uważasz, że to błąd.
          </p>
        </div>
        <div className="space-y-4">
          <Link 
            to="/dashboard" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Przejdź do panelu
          </Link>
          <div>
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}