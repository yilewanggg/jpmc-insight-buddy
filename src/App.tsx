import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import DesignSystem from "./pages/DesignSystem.tsx";
import FontComparison from "./pages/FontComparison.tsx";
import DailyDigestVariant from "./pages/DailyDigestVariant.tsx";
import DailyDigestSparkles from "./pages/DailyDigestSparkles.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/font-comparison" element={<FontComparison />} />
          <Route path="/daily-digest-variant" element={<DailyDigestVariant />} />
          <Route path="/daily-digest-sparkles" element={<DailyDigestSparkles />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
