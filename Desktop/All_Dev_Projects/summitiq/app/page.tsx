export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Your free contract intelligence toolkit
        </h1>
        <p className="text-lg mb-8">
          Designed to help nonprofits, local governments, and growing teams bring order to contract chaos.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/app" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Enter App</a>
          <a href="/learn" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg">Learn More</a>
        </div>
      </section>
    </main>
  );
}
