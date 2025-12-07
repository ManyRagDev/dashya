import React, { useState } from 'react';
import { Search, MapPin, Phone, Shield } from 'lucide-react';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      setError('请输入11位手机号码');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://apis.juhe.cn/mobile/get?phone=${phoneNumber}&key=您的key`);
      const data = await response.json();
      
      if (data.error_code === 0) {
        setLocation({
          province: data.result.province,
          city: data.result.city,
          sp: data.result.company
        });
        setError('');
      } else {
        setError('未找到该号码的归属地信息');
      }
    } catch (err) {
      setLocation(null);
      setError('查询失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 模拟数据用于演示
  const handleDemoSearch = () => {
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (phoneNumber.startsWith('139')) {
        setLocation({
          province: '北京',
          city: '北京',
          sp: '中国移动'
        });
      } else if (phoneNumber.startsWith('138')) {
        setLocation({
          province: '上海',
          city: '上海',
          sp: '中国移动'
        });
      } else if (phoneNumber.startsWith('130')) {
        setLocation({
          province: '广东',
          city: '广州',
          sp: '中国联通'
        });
      } else {
        setError('未找到该号码的归属地信息');
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDemoSearch(); // 使用演示功能
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md p-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">号码查询</h1>
          <p className="text-gray-600">安全、快速地查询手机号码归属地</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-10"></div>
          <div className="relative bg-white rounded-lg">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
              onKeyPress={handleKeyPress}
              placeholder="请输入手机号码"
              className="w-full pl-12 pr-20 py-4 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-lg"
              maxLength={11}
            />
            <button
              onClick={handleDemoSearch} // 使用演示功能
              disabled={loading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-1">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>查询中</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Search className="h-4 w-4" />
                  <span>查询</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-4 bg-red-600 rounded-full"></div>
              <span>{error}</span>
            </div>
          </div>
        )}

        {location && !error && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10"></div>
            <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-indigo-600">
                <MapPin className="h-5 w-5" />
                <span className="font-medium text-lg">归属地信息</span>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center space-x-2 bg-white/60 p-3 rounded-lg backdrop-blur-sm">
                  <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                  <span className="font-medium">省份：</span>
                  <span>{location.province}</span>
                </div>
                {location.city && (
                  <div className="flex items-center space-x-2 bg-white/60 p-3 rounded-lg backdrop-blur-sm">
                    <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                    <span className="font-medium">城市：</span>
                    <span>{location.city}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 bg-white/60 p-3 rounded-lg backdrop-blur-sm">
                  <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                  <span className="font-medium">运营商：</span>
                  <span>{location.sp}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-sm text-gray-500">
          <p>本查询工具仅供参考，实际以运营商为准</p>
          <p className="mt-1">支持回车键快速查询</p>
          <p className="mt-1">演示版：支持139/138/130开头的号码</p>
        </div>
      </div>
    </div>
  );
}

export default App;