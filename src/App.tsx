import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PollingRateTest from "./pages/PollingRateTest";
import HomePage from "./pages/HomePage";
import KeyboardToolsPage from "./pages/KeyboardToolsPage";
import MonitorToolsPage from "./pages/MonitorToolsPage";
import MouseToolsPage from "./pages/MouseToolsPage";
import TypingSpeedTest from "./pages/keyboard/TypingSpeedTest";
import KeyRolloverTest from "./pages/keyboard/KeyRolloverTest";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/polling-rate-test" element={<PollingRateTest />} />
          <Route path="/mouse-tools" element={<MouseToolsPage />} />
          <Route path="/keyboard-tools" element={<KeyboardToolsPage />} />
          <Route path="/keyboard-tools/typing-speed" element={<TypingSpeedTest />} />
          <Route path="/keyboard-tools/key-rollover" element={<KeyRolloverTest />} />
          <Route path="/monitor-tools" element={<MonitorToolsPage />} />
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
