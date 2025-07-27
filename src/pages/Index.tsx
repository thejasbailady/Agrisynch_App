import { useState } from "react";
import { LanguageProvider } from "@/hooks/use-language";
import { FarmDashboard } from "@/pages/FarmDashboard";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <LanguageProvider>
      <FarmDashboard currentPage={currentPage} onPageChange={setCurrentPage} />
    </LanguageProvider>
  );
};

export default Index;