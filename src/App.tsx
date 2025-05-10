import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PollingRateTest from "./pages/mouse/PollingRateTest";
import HomePage from "./pages/HomePage";
import MouseToolsPage from "./pages/mouse/MouseToolsPage";
import KeyboardToolsPage from "./pages/keyboard/KeyboardToolsPage";
import MonitorToolsPage from "./pages/monitor/MonitorToolsPage";
import TypingSpeedTest from "./pages/keyboard/TypingSpeedTest";
import KeyRolloverTest from "./pages/keyboard/KeyRolloverTest";
import KeyboardTester from "./pages/keyboard/KeyboardTester";
import DeadPixelTest from "./pages/monitor/DeadPixelTest";
import ScreenUniformityTest from "./pages/monitor/ScreenUniformityTest";
import ColorBandingTest from "./pages/monitor/ColorBandingTest";
import SharpnessTextTest from "./pages/monitor/SharpnessTextTest";
import GhostingTest from "./pages/monitor/GhostingTest";
import ContrastTest from "./pages/monitor/ContrastTest";
import InputLagTestHelper from "./pages/monitor/InputLagTestHelper";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ClickSpeedTest from "./pages/mouse/ClickSpeedTest";
import DPIAnalyzer from "./pages/mouse/DPIAnalyzer";
import InputLagTest from "./pages/mouse/InputLagTest";
import MouseGuide from "./pages/MouseGuide";
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


          {/* Category Home Pages */}
          <Route path="/mouse-tools" element={<MouseToolsPage />} />
          <Route path="/keyboard-tools" element={<KeyboardToolsPage />} />
          <Route path="/monitor-tools" element={<MonitorToolsPage />} />

          {/* Mouse Tool Routes */}
          <Route path="/mouse-tools/polling-rate-test" element={<PollingRateTest />} />
          <Route path="/mouse-tools/click-speed" element={<ClickSpeedTest />} />
          <Route path="/mouse-tools/dpi-analyzer" element={<DPIAnalyzer />} />
          <Route path="/mouse-tools/input-lag" element={<InputLagTest />} />

          {/* Keyboard Tool Routes */}
          <Route path="/keyboard-tools/typing-speed" element={<TypingSpeedTest />} />
          <Route path="/keyboard-tools/key-rollover" element={<KeyRolloverTest />} />
          <Route path="/keyboard-tools/keyboard-tester" element={<KeyboardTester />} />

          {/* Monitor Tool Routes */}
          <Route path="/monitor-tools/dead-pixel-test" element={<DeadPixelTest />} />
          <Route path="/monitor-tools/screen-uniformity-test" element={<ScreenUniformityTest />} />
          <Route path="/monitor-tools/color-banding-test" element={<ColorBandingTest />} />
          <Route path="/monitor-tools/sharpness-text-test" element={<SharpnessTextTest />} />
          <Route path="/monitor-tools/ghosting-test" element={<GhostingTest />} />
          <Route path="/monitor-tools/contrast-test" element={<ContrastTest />} />
          <Route path="/monitor-tools/input-lag-test-helper" element={<InputLagTestHelper />} />

          {/* Utility/Resource Routes */}
          <Route path="/mouse-guide" element={<MouseGuide />} />
          <Route path="/recommended-mice" element={<RecommendedMicePage />} />

          {/* Fallback/Other Routes */}
          <Route path="/placeholder" element={<PlaceholderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
