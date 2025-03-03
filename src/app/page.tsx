export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Trade Items Without Money
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our community of traders and exchange items based on value, not currency.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90">
            Start Trading
          </button>
          <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">General Listing</h3>
              <p className="text-muted-foreground">
                Post your items and wait for trade offers from the community.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Specific Request</h3>
              <p className="text-muted-foreground">
                List items and specify exactly what you're looking for in return.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Trading Journey</h3>
              <p className="text-muted-foreground">
                Track your trading history and see how items evolve through trades.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 