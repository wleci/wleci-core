export default function Maintenance() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Przerwa techniczna</h1>
          <p className="text-gray-600 mb-6">
            Przeprowadzamy obecnie prace konserwacyjne w celu poprawy jakości naszych usług. 
            Serwis będzie niedostępny przez krótki czas.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              <strong>Szacowany czas zakończenia:</strong> około 30 minut
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <button 
            onClick={() => window.location.reload()}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sprawdź ponownie
          </button>
          <div className="text-sm text-gray-500">
            <p>Przepraszamy za niedogodności</p>
            <p className="mt-2">
              W przypadku pilnych spraw skontaktuj się z nami: 
              <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-800 ml-1">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}