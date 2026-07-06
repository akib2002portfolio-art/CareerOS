export default function CardSkeleton() {
  return (
    <div className="w-full max-w-2xl animate-pulse rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 sm:p-8">
      {/* Title placeholder */}
      <div className="mb-6 h-5 w-40 rounded bg-zinc-100 sm:mb-8" />

      {/* Circular score placeholder */}
      <div className="mb-8 flex justify-center">
        <div className="h-44 w-44 rounded-full bg-zinc-100 sm:h-48 sm:w-48" />
      </div>

      {/* Progress bar placeholder */}
      <div className="mb-8 sm:mb-10">
        <div className="mb-1.5 flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-zinc-100" />
          <div className="h-3 w-12 rounded bg-zinc-100" />
        </div>
        <div className="h-2.5 w-full rounded-full bg-zinc-100" />
      </div>

      {/* Two content block placeholders */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 sm:gap-8">
        <div className="h-28 rounded-xl bg-zinc-50" />
        <div className="h-28 rounded-xl bg-zinc-50" />
      </div>
    </div>
  );
}