import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import CityPage from "./pages/CityPage.tsx";
import Sobre from "./pages/Sobre.tsx";
import Contato from "./pages/Contato.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminServices from "./pages/admin/AdminServices.tsx";
import AdminCities from "./pages/admin/AdminCities.tsx";
import AdminBlog from "./pages/admin/AdminBlog.tsx";
import AdminPortfolio from "./pages/admin/AdminPortfolio.tsx";
import AdminClients from "./pages/admin/AdminClients.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/servicos/:slug" element={<ServicePage />} />
            <Route path="/desentupidora/:slug" element={<CityPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="servicos" element={<AdminServices />} />
              <Route path="cidades" element={<AdminCities />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="portfolio" element={<AdminPortfolio />} />
              <Route path="clientes" element={<AdminClients />} />
              <Route path="configuracoes" element={<AdminSettings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
