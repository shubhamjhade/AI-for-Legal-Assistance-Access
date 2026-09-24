import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckSquare, ShieldAlert, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center py-12">
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Demystifying <span className="text-indigo-600">Legal Jargon</span> with AI
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Legal information shouldn't be a maze. LegalEase AI helps you understand, compare, 
          and navigate legal documents with confidence using advanced Generative AI.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        <FeatureCard 
          icon={<FileText className="w-8 h-8 text-blue-500" />}
          title="Document Simplifier"
          description="Translate complex legalese into plain, understandable English."
          link="/simplify"
        />
        <FeatureCard 
          icon={<CheckSquare className="w-8 h-8 text-green-500" />}
          title="Contract Comparator"
          description="Compare two versions of a contract to highlight changes and inconsistencies."
          link="/compare"
        />
        <FeatureCard 
          icon={<ShieldAlert className="w-8 h-8 text-amber-500" />}
          title="Risk Analyzer"
          description="Automatically identify unusual clauses, obligations, and potential risks."
          link="/analyze"
        />
      </div>
      
      <div className="mt-20 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 max-w-4xl w-full flex items-center justify-between shadow-sm">
        <div className="flex-1 pr-8">
          <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <BookOpen className="text-indigo-600" />
            Get Ready for your Legal Professional
          </h3>
          <p className="text-slate-600">
            Use our tools to organize your thoughts, summarize documents, and prepare specific 
            questions before consulting a qualified attorney. Save time and money.
          </p>
        </div>
        <Link to="/simplify" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-sm">
          Start Exploring <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) {
  return (
    <Link to={link} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group relative overflow-hidden">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      <div className="flex items-center text-indigo-600 font-medium text-sm">
        Try Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
