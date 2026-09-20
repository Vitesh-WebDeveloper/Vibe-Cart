// WHY WE WRITE THIS: To improve perceived user experience (UX).
// While the Render backend wakes up or fetches data from MongoDB,
// this animated pulse loader shows users where content is about to appear.

export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
      {/* Grey image placeholder */}
      <div className="h-40 w-full rounded-md bg-gray-200" />
      {/* Title placeholder line */}
      <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
      {/* Price placeholder line */}
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
      {/* Button placeholder */}
      <div className="mt-4 h-9 w-full rounded-md bg-gray-200" />
    </div>
  );
};