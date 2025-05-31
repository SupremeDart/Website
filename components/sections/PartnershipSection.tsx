import Button from '../ui/Button';

export default function PartnershipSection() {
  return (
    <section id="partnership" className="py-24 bg-[#32CD32]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:max-w-2xl mb-10 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Partnership
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Do you want to own your own VTU and Data Purchase Platform?
              Lets help you get started. You could be making a minimum of
              ₦100,000 a month.
            </p>
          </div>
          
          <div>
            <Button 
              variant="primary" 
              size="lg" 
              className="bg-gray-800 text-black hover:bg-gray-100 hover:text-black active:bg-gray-200 shadow-lg"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}