import { Link, useLocation } from "react-router-dom";

const LegalLink = ({ to, title }: { to: string; title: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`text-xs font-normal ${isActive ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}>
      {title}
    </Link>
  );
};

export const Footer = () => (
  <footer className="px-4 py-3 border-t">
    <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-1.5 text-center">
      <p className="text-xs	font-normal text-muted-foreground">© 2025. All rights reserved.</p>
      <div className="flex items-center gap-1.5">
        <LegalLink to="/legal-notice" title="Legal Notice" />
        <span className="text-xs text-muted-foreground">-</span>
        <LegalLink to="/privacy-policy" title="Privacy Policy" />
      </div>
    </div>
  </footer>
);
