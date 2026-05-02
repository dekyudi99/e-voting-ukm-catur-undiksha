import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, Button, Typography, Tag, Spin, Result, message, Space } from 'antd';
import { UserOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import candidatesApi from "../api/candidatesApi";
import voteApi from "../api/voteApi";
import LogoUKM from '../assets/uKMCaturWarna.png';
import LogoUndiksha from '../assets/undikshaWarna.png';
import { useEffect } from "react";

const { Title, Text } = Typography;

export default function VotingArea() {
  const { code } = useParams();
  const navigate = useNavigate();
  const storageUrl = import.meta.env.VITE_STORAGE_URL;

  const { 
    isLoading: isValidating, 
    isError: isCodeInvalid 
  } = useQuery({
    queryKey: ['checkAccess', code],
    queryFn: () => voteApi.checkAccess(code),
    enabled: !!code, // Hanya jalan jika ada code
    retry: false, // Jangan coba lagi jika gagal
    onError: (err) => {
      message.error(err.response?.data?.message || "Akses ditolak!");
      navigate("/", { replace: true }); // replace: true agar user tidak bisa 'back' ke sini
    }
  });

  // 1. Fetch data kandidat dari API
  const { data: candidates, isLoading, isError } = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const response = await candidatesApi.getCandidates();
      return response.data.candidates;
    }
  });

  // 2. Mutation untuk mengirim suara
  const voteMutation = useMutation({
    mutationFn: (no_undi) => voteApi.voting(code, no_undi),
    onSuccess: () => {
      message.success("Suara Anda berhasil direkam. Terima kasih!");
      setTimeout(() => navigate("/"), 2000);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || "Gagal mengirim suara.");
    }
  });

  if (isLoading || isValidating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f4f4]">
        <Spin size="large" tip="Memuat daftar kandidat..." />
      </div>
    );
  }

  if (isCodeInvalid) return null;

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f4f4]">
        <Result
          status="500"
          title="Koneksi Bermasalah"
          subTitle="Gagal mengambil data kandidat dari server."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] pb-20">
      {/* Header Elegan */}
      <div className="bg-[#000000] py-12 px-6 text-center shadow-lg border-b-4 border-[#dc2626] flex flex-row items-center justify-center gap-6 relative overflow-hidden flex-wrap">
        <img src={LogoUndiksha} alt="Logo Undiksha" className="hidden md:flex h-24 w-auto object-contain mx-auto mb-4" />
        <div className="flex flex-col items-center justify-between">
            <Title level={2} style={{ color: '#ffffff', margin: 0 }}>
            Pemilihan Ketua dan Wakil Ketua UKM Catur 2026/2027
            </Title>
            <div className="mt-4 inline-flex items-center bg-[#dc2626] px-4 py-1 rounded-full">
            <Text className="text-white text-xs font-bold uppercase tracking-widest">
                Kode Akses Aktif: {code}
            </Text>
            </div>
        </div>
        <img src={LogoUKM} alt="Logo UKM Catur" className="hidden md:flex h-24 w-auto object-contain mx-auto" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 -mt-8">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2">
          {candidates?.map((c) => (
            <Card
              key={c.id}
              hoverable
              className="w-full max-w-md mx-auto overflow-hidden border-none shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ borderRadius: '24px' }}
              cover={
                <div className="group relative group bg-[#800000]">
                  <img
                    alt={c.calon_ketua}
                    src={`${storageUrl}/${c.path_photo}`}
                    className="w-full max-h-[450px] object-contain grayscale-0 group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* <div className="absolute top-4 left-4">
                    <div className="bg-[#dc2626] text-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-lg border-2 border-white">
                      <span className="text-[10px] font-bold leading-none">NO</span>
                      <span className="text-2xl font-black leading-none">{c.no_undi}</span>
                    </div>
                  </div> */}
                </div>
              }
            >
              <div className="text-center">
                <div className="mb-6">
                  <Title level={3} style={{ margin: 0, color: '#1a1a1a' }}>
                    {c.calon_ketua}
                  </Title>
                  <Text className="text-[#dc2626] font-semibold text-lg italic">
                    & {c.calon_wakil}
                  </Text>
                </div>

                {/* <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                   <div className="text-left border-r border-gray-200 pr-2">
                      <Text type="secondary" className="text-[10px] uppercase block mb-1">Visi</Text>
                      <Text className="text-xs italic leading-tight line-clamp-2">
                        {c.visi || "Visi belum ditambahkan oleh kandidat."}
                      </Text>
                   </div>
                   <div className="text-left pl-2">
                      <Text type="secondary" className="text-[10px] uppercase block mb-1">Misi Utama</Text>
                      <Text className="text-xs italic leading-tight line-clamp-2">
                        {c.misi || "Misi belum ditambahkan oleh kandidat."}
                      </Text>
                   </div>
                </div> */}

                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<CheckCircleOutlined />}
                  loading={voteMutation.isPending}
                  onClick={() => voteMutation.mutate(c.no_undi)}
                  className="h-16 rounded-2xl bg-[#000000] hover:bg-[#dc2626] border-none text-lg font-black shadow-xl uppercase tracking-tighter"
                >
                  Berikan Suara Saya
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <footer className="mt-20 text-center pb-10">
        <Space split={<div className="h-3 w-px bg-gray-300" />}>
           <Text type="secondary" className="text-[10px]">E-VOTING SYSTEM v1.0</Text>
           <Text type="secondary" className="text-[10px]">UKM CATUR 2026</Text>
           <Text type="secondary" className="text-[10px]">BALI, INDONESIA</Text>
        </Space>
      </footer>
    </div>
  );
}