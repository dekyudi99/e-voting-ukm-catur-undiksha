import { useState } from 'react';
import { Input, Button, message, Card, Typography, Space, Divider } from 'antd';
import { KeyOutlined, LoginOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import voteApi from '../api/voteApi';
import LogoUKM from '../assets/logoUKMCatur.jpg';
import LogoUndiksha from '../assets/logoUndikshaWarna.png';

const { Title, Text } = Typography;

export default function AccessCode() {
  const [code, setCode] = useState("");
  const [msgApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (inputCode) => voteApi.checkAccess(inputCode),
    onSuccess: () => {
      msgApi.success({
        content: "Akses diverifikasi. Selamat datang!",
        style: { marginTop: '10vh' },
      });
      setTimeout(() => navigate(`/voting/${code}`), 1000);
    },
    onError: (err) => {
      msgApi.error(err.response?.data?.message || "Kode akses tidak dikenali");
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] p-4 relative overflow-hidden w-full">
      {contextHolder}
      
      {/* Dekorasi Latar Belakang Mewah */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#dc2626] opacity-10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#dc2626] opacity-10 blur-[120px] rounded-full" />

      <Card 
        className="w-full max-w-md mx-auto shadow-2xl border-none backdrop-blur-sm bg-white/95"
        style={{ 
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
        }}
      >
        <div className="flex flex-col items-center pt-4 mb-8">
          {/* Header Logo dengan Garis Pemisah Elegan */}
          <div className='flex flex-row items-center justify-center mb-6 px-4 py-2 rounded-2xl bg-gray-50/50 border border-gray-100'>
            <img src={LogoUndiksha} alt="Logo Undiksha" className='h-12 w-auto object-contain'/>
            <Divider type="vertical" className="h-8 bg-gray-300 mx-4" />
            <img src={LogoUKM} alt="Logo UKM Catur" className='h-12 w-auto object-contain rounded-lg'/>
          </div>
          
          <Title level={3} className="text-center m-0! font-black! tracking-tight text-[#1a1a1a]">
            E-VOTING SYSTEM
          </Title>
          <Text className="text-[#dc2626] font-bold tracking-[0.2em] text-[10px] uppercase mb-4">
            UKM Catur Undiksha
          </Text>
          
          <div className="w-12 h-1 bg-[#dc2626] rounded-full mb-6" />
          
          <Text className="text-center text-gray-500 text-sm px-4">
            Masukkan kode otentikasi unik untuk memberikan suara Anda secara rahasia dan aman.
          </Text>
        </div>

        <Space direction="vertical" size="xl" className="w-full">
          <div className="relative">
            <Text strong className="text-[10px] text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
              Authentication Code
            </Text>
            <Input 
              size="large" 
              placeholder="••••••••" 
              prefix={<KeyOutlined className="text-[#dc2626] mr-2" />}
              className="w-full rounded-xl h-16 border-gray-200 bg-gray-50/30 hover:border-[#dc2626] focus:border-[#dc2626] focus:bg-white transition-all text-lg font-mono tracking-widest shadow-sm mb-2"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onPressEnter={() => code && mutation.mutate(code)}
            />
          </div>

          <Button 
            type="primary" 
            size="large" 
            block 
            icon={<LoginOutlined />}
            loading={mutation.isPending}
            onClick={() => mutation.mutate(code)}
            className="h-16 font-black text-sm uppercase tracking-widest rounded-xl hover:bg-blue-800! border-none shadow-xl transition-all duration-300"
          >
            Masuk Bilik Suara
          </Button>
        </Space>

        <div className="mt-10 mb-2 flex flex-col items-center">
          <Divider className="m-0! mb-6! bg-gray-100" />
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <Text className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
              Secure Encrypted Connection Active
            </Text>
          </div>
          <Text className="text-[9px] text-gray-300 mt-2 italic">
            &copy; 2026 Universitas Pendidikan Ganesha
          </Text>
        </div>
      </Card>
    </div>
  );
}