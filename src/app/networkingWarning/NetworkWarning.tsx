'use client'

import { useState, useEffect } from 'react';

interface NetworkInfo {
  type: string;
  effectiveType: string;
  downlink: string | number;
}

interface NetworkConnection extends EventTarget {
  type?: string;
  effectiveType?: string;
  downlink?: number;
}

declare global {
  interface Navigator {
    connection?: NetworkConnection;
    mozConnection?: NetworkConnection;
    webkitConnection?: NetworkConnection;
  }
}

export default function NetworkWarning() {
  const [showWarning, setShowWarning] = useState<boolean>(false);
    const [forceShow, setForceShow] = useState<boolean>(false); // Новое

  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    type: 'unknown',
    effectiveType: 'unknown',
    downlink: 'unknown'
  });

  useEffect(() => {
    if (forceShow) {
      setShowWarning(true);
      return;
    }
    checkNetworkConnection();

    const connection = navigator.connection || 
                      navigator.mozConnection || 
                      navigator.webkitConnection;

    if (connection) {
      const handleChange = () => checkNetworkConnection();
      connection.addEventListener('change', handleChange);
      
      return () => {
        connection.removeEventListener('change', handleChange);
      };
    }
  }, [forceShow]);

  const checkNetworkConnection = () => {
    const connection = navigator.connection || 
                      navigator.mozConnection || 
                      navigator.webkitConnection;

    if (!connection) {
      console.log('Network Information API недоступен');
      return;
    }

    const type = connection?.type || 'unknown';
    const effectiveType = connection?.effectiveType || 'unknown';
    const downlink = connection?.downlink ?? 'unknown';

    setNetworkInfo({ type, effectiveType, downlink });

    // более гибкая эвристика:
    const isCellular = type === 'cellular' ||
      /2g|3g|4g|slow-2g/.test(String(effectiveType)) ||
      (/Android|iPhone|iPad/i.test(navigator.userAgent) && (downlink === 'unknown' || Number(downlink) < 5));

    if (isCellular) setShowWarning(true);
    else setShowWarning(false);
  };

  const handleCheckAgain = () => {
    checkNetworkConnection();
  };

  if (!showWarning) {
    if (process.env.NODE_ENV === 'development') {
      // показываем только кнопку для dev, чтобы тестировать
      return (
        <button
          onClick={() => setForceShow(!forceShow)}
          className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded z-50"
        >
          Test Warning
        </button>
      );
    }
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full animate-fade-in">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
          Сайт недоступен через мобильного оператора
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          К сожалению, некоторые мобильные операторы блокируют доступ к этому ресурсу.
        </p>

        {/* Instructions */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Как получить доступ:
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Подключитесь к Wi-Fi сети</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Используйте VPN-сервис</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Попробуйте через другую сеть</span>
            </li>
          </ul>
        </div>

        {/* Button */}
        <button
          onClick={handleCheckAgain}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Проверить снова
        </button>

        {/* Network Info */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-800">
            <span className="font-semibold">Обнаружено:</span> Мобильное соединение
          </p>
          <p className="text-sm text-red-800">
            <span className="font-semibold">Тип:</span> {networkInfo.effectiveType}
          </p>
          {networkInfo.downlink !== 'unknown' && (
            <p className="text-sm text-red-800">
              <span className="font-semibold">Скорость:</span> ~{networkInfo.downlink} Mbps
            </p>
          )}
        </div>
      </div>
    </div>
  );
}