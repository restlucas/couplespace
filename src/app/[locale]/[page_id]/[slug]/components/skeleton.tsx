export function Skeleton() {
  return (
    <div className="mb-12">
      {/* Presentation */}
      <div className="my-10 mx-8 flex flex-col items-center justify-center">
        <div className="animate-pulse bg-foreground h-44 w-44 rounded-full overflow-hidden relative shadow-lg" />

        <div className="animate-pulse h-10 w-[300px] my-4 rounded-md bg-foreground" />

        <div className="animate-pulse h-[200px] w-full lg:w-[980px] xl:w-[1024px] rounded-xl p-4 sm:p-6 bg-foreground shadow-md" />
      </div>

      {/* Photos and feed */}
      <div className="space-y-8 flex flex-col items-center justify-center px-8">
        {/* Desktop skeleton */}
        <div className="hidden lg:w-[980px] xl:w-[1024px] lg:grid grid-cols-[1fr_2fr_1fr] items-start gap-8">
          {/* Photos */}
          <div>
            <div className="animate-pulse bg-foreground w-[120px] h-10 rounded-md mb-6" />
            <div className="grid grid-cols-3 grid-rows-2 lg:grid-cols-2 lg:grid-rows-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="animate-pulse bg-foreground rounded-md flex items-center justify-center relative shadow-lg cursor-pointer"
                    style={{ aspectRatio: "1" }}
                  />
                );
              })}
            </div>
          </div>

          {/* Feed */}
          <div>
            <div className="w-[120px] h-10 bg-foreground rounded-md animate-pulse mb-6" />

            <div className="flex flex-col gap-8">
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="animate-pulse h-[150px] rounded-xl p-4 sm:p-6 bg-foreground shadow-lg"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile skeleton */}
        <div className="w-full block lg:hidden">
          <div className="flex w-full items-center justify-center rounded-full h-14 mb-8">
            <div className="animate-pulse flex items-center justify-center rounded-full overflow-hidden bg-foreground h-14 w-[120px]" />
          </div>

          <div className="w-full">
            <div>
              <div className="w-[120px] h-10 bg-foreground rounded-md animate-pulse mb-6" />

              <div className="flex flex-col gap-8">
                {Array.from({ length: 6 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="animate-pulse h-[150px] rounded-xl p-4 sm:p-6 bg-foreground shadow-lg"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
