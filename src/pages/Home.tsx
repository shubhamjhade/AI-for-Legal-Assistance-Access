import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckSquare, ShieldAlert, BookOpen, Briefcase } from 'lucide-react';

/**
 * Landing Page Component.
 */
export default function Home() {
  return (
    <div className="flex flex-col items-center py-12">
      <header className="text-center max-w-3xl mb-16">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Demystifying <span className="text-indigo-600">Legal Jargon</span> with AI
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Legal information shouldn't be a maze. LegalEase AI helps you understand, compare, 
          and navigate legal documents with confidence using advanced Generative AI.
        </p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl" aria-label="Features">
        <FeatureCard 
          icon={<FileText className="w-8 h-8 text-blue-500" aria-hidden="true" />}
          title="Document Simplifier"
          description="Translate complex legalese into plain, understandable English."
          link="/simplify"
        />
        <FeatureCard 
          icon={<CheckSquare className="w-8 h-8 text-green-500" aria-hidden="true" />}
          title="Contract Comparator"
          description="Compare two versions of a contract to highlight changes and inconsistencies."
          link="/compare"
        />
        <FeatureCard 
          icon={<ShieldAlert className="w-8 h-8 text-amber-500" aria-hidden="true" />}
          title="Risk Analyzer"
          description="Automatically identify unusual clauses, obligations, and potential risks."
          link="/analyze"
        />
        <FeatureCard 
          icon={<Briefcase className="w-8 h-8 text-indigo-500" aria-hidden="true" />}
          title="Consult Prep"
          description="Generate summaries and critical questions before meeting your lawyer."
          link="/prep"
        />
      </section>
      
      <section className="mt-20 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between shadow-sm">
        <div className="flex-1 md:pr-8 mb-6 md:mb-0">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <BookOpen className="text-indigo-600" aria-hidden="true" />
            Empower Your Legal Journey
          </h2>
          <p className="text-slate-600">
            Use our robust tools to organize your thoughts, summarize documents, and prepare specific 
            questions. Save billable hours and enter legal discussions with clarity and confidence.
          </p>
        </div>
        <Link 
          to="/prep" 
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Start preparing for your consultation"
        >
          Prepare Now <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

/**
 * Reusable Feature Card Component for the landing page.
 */
function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  return (
    <Link 
      to={link} 
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={`Go to ${title}`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-600 mb-4 text-sm">{description}</p>
      <div className="flex items-center text-indigo-600 font-medium text-sm">
        Try Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </div>
    </Link>
  );
}
