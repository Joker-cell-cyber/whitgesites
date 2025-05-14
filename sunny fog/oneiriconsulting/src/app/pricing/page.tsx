import PricingCard from '@/components/pricing/PricingCard';
import { Metadata } from 'next';
import { COMPANY } from '../constants/company';

export const metadata: Metadata = {
  title: `Pricing - ${COMPANY.name}`,
  description: 'Explore our affordable consulting packages designed to meet your business needs at any scale.',
};

const PricingPage = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transparent Pricing for Your Business Needs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Select the perfect consulting package for your business, from startups to enterprise solutions.
          </p>
        </div>
        
        {/* Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <PricingCard
            title="Starter Plan"
            description="Perfect for early-stage startups and small businesses"
            price="9.99"
            features={[
              'Initial business assessment',
              'Basic business strategy',
              'Email support',
              'Monthly consultation (1hr)',
              'Basic reporting'
            ]}
          />
          
          <PricingCard
            title="Growth Plan"
            description="Ideal for growing companies looking to scale operations"
            price="19.50"
            features={[
              'Comprehensive business assessment',
              'Tailored growth strategy',
              'Priority email support',
              'Bi-weekly consultation (1hr)',
              'Detailed performance reporting',
              'Market trend analysis'
            ]}
          />
          
          <PricingCard
            title="Professional Plan"
            description="Advanced solutions for established businesses"
            price="29.90"
            features={[
              'Deep dive business analysis',
              'Comprehensive business strategy',
              'Phone and email support',
              'Weekly consultation (1hr)',
              'Advanced reporting dashboard',
              'Competitor analysis',
              'Strategic planning sessions'
            ]}
            isPopular={true}
          />
          
          <PricingCard
            title="Premium Plan"
            description="Comprehensive support for scaling businesses"
            price="39.99"
            features={[
              'All features from Professional Plan',
              'Dedicated business consultant',
              'Custom KPI tracking',
              'Quarterly business review',
              'Strategic partnerships facilitation',
              'Financial modeling',
              'Process optimization',
              'Crisis management planning'
            ]}
          />
          
          <PricingCard
            title="Executive Plan"
            description="End-to-end business optimization and leadership support"
            price="49.90"
            features={[
              'All features from Premium Plan',
              'Executive-level consultation',
              'Board meeting preparation',
              'Investor relations support',
              'Leadership development',
              'Succession planning',
              'Custom partnership opportunities',
              'Priority access to all resources'
            ]}
          />
          
          <PricingCard
            title="Startup Plan"
            description="Tailored support for early-stage founders"
            price="59.50"
            features={[
              'Startup business model validation',
              'Market fit analysis',
              'Funding strategy',
              'Pitch deck review',
              'Investor introduction',
              'Business plan development',
              'Go-to-market strategy'
            ]}
          />
          
          <PricingCard
            title="Digital Transformation"
            description="Modernize your business with digital solutions"
            price="69.99"
            features={[
              'Technology stack assessment',
              'Digital strategy development',
              'Process automation planning',
              'Data integration strategy',
              'Digital marketing roadmap',
              'Technology vendor selection',
              'Implementation oversight'
            ]}
          />
          
          <PricingCard
            title="Financial Mastery"
            description="Optimize your company's financial health"
            price="79.90"
            features={[
              'Financial health assessment',
              'Cash flow optimization',
              'Funding options analysis',
              'Cost reduction strategies',
              'Revenue model optimization',
              'Financial forecasting',
              'Tax efficiency planning'
            ]}
          />
          
          <PricingCard
            title="Marketing Mastery"
            description="Elevate your market presence and customer acquisition"
            price="89.50"
            features={[
              'Marketing audit',
              'Brand positioning strategy',
              'Customer acquisition plan',
              'Content strategy development',
              'Conversion optimization',
              'Analytics setup and tracking',
              'Marketing ROI optimization'
            ]}
          />
          
          <PricingCard
            title="Operation Mastery"
            description="Streamline and optimize your business operations"
            price="99.99"
            features={[
              'Operations assessment',
              'Process mapping and optimization',
              'Supply chain analysis',
              'Quality management systems',
              'Productivity enhancement',
              'Resource allocation optimization',
              'Operational risk management'
            ]}
          />
          
          <PricingCard
            title="Enterprise Plan"
            description="Custom solutions for large organizations"
            price="109.90"
            features={[
              'Enterprise-wide assessment',
              'Global strategy development',
              'Multi-division optimization',
              'C-suite advisory services',
              'Corporate governance review',
              'M&A strategy and support',
              'Global market expansion planning',
              'Enterprise risk management'
            ]}
          />
          
          <PricingCard
            title="Corporate Plan"
            description="Comprehensive corporate strategy and optimization"
            price="119.50"
            features={[
              'All enterprise features',
              'Corporate restructuring',
              'Board and shareholder relations',
              'Corporate social responsibility',
              'Crisis communication planning',
              'Executive coaching',
              'Long-term strategic visioning',
              'Custom research and analysis'
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;