import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Strona nie znaleziona</h2>
          <p className="text-gray-600 mb-8">
            Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
          </p>
        </div>
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Powrót do strony głównej
          </Link>
          <div>
            <button 
              onClick={() => window.history.back()} 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Wróć do poprzedniej strony
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}