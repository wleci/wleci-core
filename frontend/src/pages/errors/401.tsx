import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-gray-300 mb-4">401</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Brak autoryzacji</h2>
          <p className="text-gray-600 mb-8">
            Musisz się zalogować, aby uzyskać dostęp do tej strony.
          </p>
        </div>
        <div className="space-y-4">
          <Link 
            to="/login" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Zaloguj się
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