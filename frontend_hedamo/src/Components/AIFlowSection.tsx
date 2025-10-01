import { FileText, CheckCircle } from 'lucide-react';

export default function AIFlowSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            See Hedamo in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how our AI transforms simple product questions into comprehensive transparency reports.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chat Interface Mockup */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">U</span>
                </div>
                <span className="font-medium text-gray-800">You</span>
              </div>
              <p className="text-gray-700">
                "Tell me about the ingredients in Coca-Cola and their health impacts"
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">H</span>
                </div>
                <span className="font-medium text-gray-800">Hedamo AI</span>
              </div>
              <p className="text-gray-700 mb-3">
                "I've analyzed Coca-Cola's ingredients and created a comprehensive report for you:"
              </p>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                  <FileText className="w-4 h-4" />
                  Transparency Report Generated
                </div>
              </div>
            </div>
          </div>
          
          {/* Report Preview */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Instant Report Preview</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Ingredient Analysis</h4>
                  <p className="text-sm text-gray-600">Complete breakdown of all ingredients and additives</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Health Impact Score</h4>
                  <p className="text-sm text-gray-600">Personalized health recommendations and warnings</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Sustainability Rating</h4>
                  <p className="text-sm text-gray-600">Environmental impact and ethical sourcing analysis</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Alternative Suggestions</h4>
                  <p className="text-sm text-gray-600">Healthier and more sustainable product recommendations</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              Try It Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}