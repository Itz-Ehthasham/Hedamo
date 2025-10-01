import { Shield, Zap, Heart, Leaf } from 'lucide-react';

export default function FeatureSection() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Analysis",
      description: "Get comprehensive product reports in seconds using advanced AI technology."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Transparency First",
      description: "Uncover hidden ingredients, sourcing practices, and manufacturing details."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health Impact",
      description: "Understand how products affect your health with personalized recommendations."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability Score",
      description: "Make eco-conscious choices with detailed environmental impact assessments."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white/50 to-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Choose Hedamo?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering consumers with AI-driven insights for smarter, healthier, and more ethical purchasing decisions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:bg-white/80 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}