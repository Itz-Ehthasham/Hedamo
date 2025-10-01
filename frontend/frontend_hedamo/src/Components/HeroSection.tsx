export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
          Make Smart, Ethical, and{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Health-First
          </span>{' '}
          Choices
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Get instant transparency reports on any product. Make informed decisions with AI-powered insights about health, ethics, and sustainability.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Get Started Free
          </button>
          
          <button className="px-8 py-4 bg-white/20 backdrop-blur-md text-gray-800 font-semibold rounded-xl border border-gray-300 hover:bg-white/30 transition-all duration-200">
            Watch Demo
          </button>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>✨ No credit card required • 🚀 Instant setup • 🔒 Privacy first</p>
        </div>
      </div>
    </section>
  );
}