import DemoRequestForm from "../../(components)/DemoRequestForm/DemoRequestForm";

export default function Landing() {
  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="glass-panel p-8 md:p-12 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="flex-1 space-y-4">
              <div className="pill w-fit">Invoice AI</div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Smart invoicing with the same polished look across the app
              </h1>
              <p className="text-slate-200 text-lg max-w-2xl">
                Centralize requests, demos, and onboarding with a clean
                glassmorphism theme that matches your login experience.
              </p>
            </div>
            <div className="w-full md:w-5/12">
              <DemoRequestForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
