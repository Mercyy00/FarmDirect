import React, { useState } from 'react';
import { api, getApiConfig, saveApiConfig, DJANGO_CODE_SNIPPETS } from '../services/api';
import { X, Check, Copy, Terminal, Server, RefreshCw, AlertCircle, ExternalLink, Code2 } from 'lucide-react';

interface DjangoIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigChange: () => void;
}

export const DjangoIntegrationModal: React.FC<DjangoIntegrationModalProps> = ({
  isOpen,
  onClose,
  onConfigChange,
}) => {
  const currentConfig = getApiConfig();
  const [mode, setMode] = useState<'mock' | 'django'>(currentConfig.mode);
  const [baseUrl, setBaseUrl] = useState(currentConfig.baseUrl);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'models' | 'serializers' | 'views' | 'urls' | 'cors'>('status');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    saveApiConfig({
      mode,
      baseUrl: baseUrl.trim().replace(/\/$/, ''),
    });
    api.updateConfig({
      mode,
      baseUrl: baseUrl.trim().replace(/\/$/, ''),
    });
    onConfigChange();
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await api.checkDjangoHealth();
      setTestResult(result);
    } catch {
      setTestResult({
        ok: false,
        message: 'Network error trying to connect to Django API',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#D5DDD2] flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="p-6 bg-[#193226] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#52B788] text-[#193226] flex items-center justify-center">
                <Terminal className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold text-white">
                    Python & Django Backend Integration
                  </h2>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#2D5640] text-[#95D5B2]">
                    DRF REST Ready
                  </span>
                </div>
                <p className="text-xs text-[#A8C2B3]">
                  Seamlessly connect this React UI with your Django REST Framework backend
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#A8C2B3] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#E3E8DC] bg-[#F8F9F5] px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('status')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'status'
                  ? 'border-[#2D6A4F] text-[#2D6A4F]'
                  : 'border-transparent text-[#6B7C72] hover:text-[#1E2922]'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              API Connection & Status
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'models'
                  ? 'border-[#2D6A4F] text-[#2D6A4F]'
                  : 'border-transparent text-[#6B7C72] hover:text-[#1E2922]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              models.py
            </button>
            <button
              onClick={() => setActiveTab('serializers')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'serializers'
                  ? 'border-[#2D6A4F] text-[#2D6A4F]'
                  : 'border-transparent text-[#6B7C72] hover:text-[#1E2922]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              serializers.py
            </button>
            <button
              onClick={() => setActiveTab('views')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'views'
                  ? 'border-[#2D6A4F] text-[#2D6A4F]'
                  : 'border-transparent text-[#6B7C72] hover:text-[#1E2922]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              views.py
            </button>
            <button
              onClick={() => setActiveTab('urls')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'urls'
                  ? 'border-[#2D6A4F] text-[#2D6A4F]'
                  : 'border-transparent text-[#6B7C72] hover:text-[#1E2922]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              urls.py
            </button>
            <button
              onClick={() => setActiveTab('cors')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'cors'
                  ? 'border-[#2D6A4F] text-[#2D6A4F]'
                  : 'border-transparent text-[#6B7C72] hover:text-[#1E2922]'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              CORS & Setup
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'status' && (
              <div className="space-y-6">
                {/* Mode Selector */}
                <div className="bg-[#FAFBF9] p-5 rounded-xl border border-[#E3EAE0]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2">
                    Operating Backend Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setMode('mock')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        mode === 'mock'
                          ? 'border-[#2D6A4F] bg-white ring-2 ring-[#2D6A4F]/10 shadow-xs'
                          : 'border-[#D5DDD2] bg-[#F4F7F2] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-[#1E2922]">Demo Standalone Mode</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          Active Ready
                        </span>
                      </div>
                      <p className="text-xs text-[#526359]">
                        Uses high-fidelity in-memory farm data, products, orders, and subscriptions. Perfect for testing and UI demonstrations.
                      </p>
                    </button>

                    <button
                      onClick={() => setMode('django')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        mode === 'django'
                          ? 'border-[#2D6A4F] bg-white ring-2 ring-[#2D6A4F]/10 shadow-xs'
                          : 'border-[#D5DDD2] bg-[#F4F7F2] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-[#1E2922]">Live Django REST API</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                          Python Backend
                        </span>
                      </div>
                      <p className="text-xs text-[#526359]">
                        Sends real HTTP JSON calls to your local or deployed Django server with automatic graceful fallback if the server is stopped.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Base URL Input */}
                <div className="bg-[#FAFBF9] p-5 rounded-xl border border-[#E3EAE0] space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block">
                    Django API Base URL
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="http://127.0.0.1:8000/api"
                      className="flex-1 px-3.5 py-2.5 bg-white border border-[#D5DDD2] rounded-xl text-sm font-mono text-[#1E2922] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F]"
                    />
                    <button
                      onClick={handleTestConnection}
                      disabled={isTesting}
                      className="px-4 py-2.5 bg-[#2D6A4F] hover:bg-[#21543D] disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                      <span>{isTesting ? 'Checking...' : 'Ping Django API'}</span>
                    </button>
                  </div>

                  {testResult && (
                    <div
                      className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                        testResult.ok
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-amber-50 border border-amber-200 text-amber-800'
                      }`}
                    >
                      {testResult.ok ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold">{testResult.ok ? 'Connection Verified!' : 'Connection Notice'}</div>
                        <div className="mt-0.5">{testResult.message}</div>
                        {!testResult.ok && (
                          <div className="mt-1 text-[11px] text-amber-700">
                            Tip: Make sure <code>python manage.py runserver</code> is running and see the CORS & Setup tab.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Endpoints specification */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-3">
                    Configured Django REST Endpoints
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 bg-[#F4F7F2] rounded-lg border border-[#E3EAE0] flex justify-between">
                      <span className="text-emerald-700 font-bold">GET</span>
                      <span className="text-[#1E2922]">/api/products/</span>
                    </div>
                    <div className="p-2.5 bg-[#F4F7F2] rounded-lg border border-[#E3EAE0] flex justify-between">
                      <span className="text-emerald-700 font-bold">GET</span>
                      <span className="text-[#1E2922]">/api/farms/</span>
                    </div>
                    <div className="p-2.5 bg-[#F4F7F2] rounded-lg border border-[#E3EAE0] flex justify-between">
                      <span className="text-emerald-700 font-bold">GET</span>
                      <span className="text-[#1E2922]">/api/subscription-plans/</span>
                    </div>
                    <div className="p-2.5 bg-[#F4F7F2] rounded-lg border border-[#E3EAE0] flex justify-between">
                      <span className="text-blue-700 font-bold">POST</span>
                      <span className="text-[#1E2922]">/api/orders/</span>
                    </div>
                    <div className="p-2.5 bg-[#F4F7F2] rounded-lg border border-[#E3EAE0] flex justify-between">
                      <span className="text-emerald-700 font-bold">GET</span>
                      <span className="text-[#1E2922]">/api/profile/</span>
                    </div>
                    <div className="p-2.5 bg-[#F4F7F2] rounded-lg border border-[#E3EAE0] flex justify-between">
                      <span className="text-blue-700 font-bold">POST</span>
                      <span className="text-[#1E2922]">/api/contact/</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Code Tabs */}
            {activeTab === 'models' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#526359]">
                    Django ORM models for Farm, Product, Order, and OrderItem
                  </span>
                  <button
                    onClick={() => copyToClipboard(DJANGO_CODE_SNIPPETS.models, 'models')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D6A4F] text-white text-xs font-medium rounded-lg hover:bg-[#21543D] transition-colors"
                  >
                    {copiedKey === 'models' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'models' ? 'Copied!' : 'Copy models.py'}</span>
                  </button>
                </div>
                <pre className="bg-[#12241B] text-[#D0E2D7] p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-[#244334]">
                  {DJANGO_CODE_SNIPPETS.models}
                </pre>
              </div>
            )}

            {activeTab === 'serializers' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#526359]">
                    Django REST Framework ModelSerializers
                  </span>
                  <button
                    onClick={() => copyToClipboard(DJANGO_CODE_SNIPPETS.serializers, 'serializers')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D6A4F] text-white text-xs font-medium rounded-lg hover:bg-[#21543D] transition-colors"
                  >
                    {copiedKey === 'serializers' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'serializers' ? 'Copied!' : 'Copy serializers.py'}</span>
                  </button>
                </div>
                <pre className="bg-[#12241B] text-[#D0E2D7] p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-[#244334]">
                  {DJANGO_CODE_SNIPPETS.serializers}
                </pre>
              </div>
            )}

            {activeTab === 'views' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#526359]">
                    DRF ModelViewSets & Health Check View
                  </span>
                  <button
                    onClick={() => copyToClipboard(DJANGO_CODE_SNIPPETS.views, 'views')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D6A4F] text-white text-xs font-medium rounded-lg hover:bg-[#21543D] transition-colors"
                  >
                    {copiedKey === 'views' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'views' ? 'Copied!' : 'Copy views.py'}</span>
                  </button>
                </div>
                <pre className="bg-[#12241B] text-[#D0E2D7] p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-[#244334]">
                  {DJANGO_CODE_SNIPPETS.views}
                </pre>
              </div>
            )}

            {activeTab === 'urls' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#526359]">
                    URL router mapping endpoints to viewsets
                  </span>
                  <button
                    onClick={() => copyToClipboard(DJANGO_CODE_SNIPPETS.urls, 'urls')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D6A4F] text-white text-xs font-medium rounded-lg hover:bg-[#21543D] transition-colors"
                  >
                    {copiedKey === 'urls' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'urls' ? 'Copied!' : 'Copy urls.py'}</span>
                  </button>
                </div>
                <pre className="bg-[#12241B] text-[#D0E2D7] p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-[#244334]">
                  {DJANGO_CODE_SNIPPETS.urls}
                </pre>
              </div>
            )}

            {activeTab === 'cors' && (
              <div className="space-y-4">
                <div className="bg-[#F8F9F5] p-4 rounded-xl border border-[#D5DDD2]">
                  <h4 className="text-sm font-bold text-[#1E2922] mb-1">
                    Step 1: Install Django dependencies
                  </h4>
                  <div className="bg-[#12241B] text-[#95D5B2] p-3 rounded-lg font-mono text-xs my-2 flex justify-between items-center">
                    <span>pip install djangorestframework django-cors-headers</span>
                    <button
                      onClick={() => copyToClipboard('pip install djangorestframework django-cors-headers', 'pip')}
                      className="text-xs text-white hover:underline"
                    >
                      {copiedKey === 'pip' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#1E2922]">
                      Step 2: Add to settings.py
                    </h4>
                    <button
                      onClick={() => copyToClipboard(DJANGO_CODE_SNIPPETS.cors_settings, 'cors_settings')}
                      className="flex items-center gap-1.5 px-3 py-1 bg-[#2D6A4F] text-white text-xs font-medium rounded-lg hover:bg-[#21543D] transition-colors"
                    >
                      {copiedKey === 'cors_settings' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'cors_settings' ? 'Copied!' : 'Copy settings snippet'}</span>
                    </button>
                  </div>
                  <pre className="bg-[#12241B] text-[#D0E2D7] p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-[#244334]">
                    {DJANGO_CODE_SNIPPETS.cors_settings}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer Save & Close */}
          <div className="p-4 bg-[#F8F9F5] border-t border-[#E3E8DC] flex items-center justify-between">
            <span className="text-xs text-[#6B7C72]">
              Current Mode: <strong className="text-[#1E2922]">{mode === 'mock' ? 'Demo Mode (Mock data)' : 'Live Django REST API'}</strong>
            </span>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-[#D5DDD2] rounded-xl text-xs font-semibold text-[#4A5D52] hover:bg-black/5 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSave();
                  onClose();
                }}
                className="px-5 py-2 bg-[#2D6A4F] hover:bg-[#21543D] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
