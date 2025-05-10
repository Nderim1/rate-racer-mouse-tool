import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ClickSpeedTest from "./pages/ClickSpeedTest";
import DPIAnalyzer from "./pages/DPIAnalyzer";
import InputLagTest from "./pages/InputLagTest";
import SensorPrecisionTest from "./pages/SensorPrecisionTest";
import MouseGuidePage from "./pages/MouseGuide";
import HelpAndSupportPage from "./pages/HelpAndSupportPage";
import RecommendedMicePage from "./pages/RecommendedMicePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/click-speed" element={<ClickSpeedTest />} />
          <Route path="/dpi-analyzer" element={<DPIAnalyzer />} />
          <Route path="/input-lag" element={<InputLagTest />} />
          <Route path="/sensor-precision" element={<SensorPrecisionTest />} />
          <Route path="/guide" element={<MouseGuidePage />} /> 
          <Route path="/sensor-test" element={<PlaceholderPage />} />
          <Route path="/help" element={<HelpAndSupportPage />} /> 
          <Route path="/recommended-mice" element={<RecommendedMicePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
