export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1280px] border-t border-[#202020]/30 px-6 py-7 md:px-12 lg:px-16">
      <div className="flex flex-col items-start justify-between gap-3 text-sm text-[#595959] sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Tom Bryson.</p>
        <a href="#top" className="text-link">Back to the top ↑</a>
      </div>
    </footer>
  );
}
