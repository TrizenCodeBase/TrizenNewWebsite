import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Enquiry from "./pages/Enquiry.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import ProblemLibrary from "./pages/ProblemLibrary.tsx";
import Workflow from "./pages/Workflow.tsx";
import ApplicationStatus from "./pages/ApplicationStatus.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProductHR from "./pages/ProductHR.tsx";
import ProductAcademy from "./pages/ProductAcademy.tsx";
import ProductConnect from "./pages/ProductConnect.tsx";
import ProductCommunity from "./pages/ProductCommunity.tsx";
import ProductCourses from "./pages/ProductCourses.tsx";
import Careers from "./pages/Careers.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/problem-library" element={<ProblemLibrary />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/application-status" element={<ApplicationStatus />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/product-hr" element={<ProductHR />} />
          <Route path="/product-academy" element={<ProductAcademy />} />
          <Route path="/product-connect" element={<ProductConnect />} />
          <Route path="/product-community" element={<ProductCommunity />} />
          <Route path="/product-courses" element={<ProductCourses />} />
          <Route path="/careers" element={<Careers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
